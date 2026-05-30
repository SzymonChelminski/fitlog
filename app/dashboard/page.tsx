import { redirect } from 'next/navigation';

import { FaDumbbell } from 'react-icons/fa6';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { LuTimer } from 'react-icons/lu';
import {
  MdOutlineBolt,
  MdLocalFireDepartment,
  MdCalendarToday,
  MdLock,
} from 'react-icons/md';
import { PiChartLineUpBold, PiTrophyBold } from 'react-icons/pi';
import { RiMedalLine } from 'react-icons/ri';

import { getUser } from '@/lib/supabase/auth';
import { prisma } from '@/lib/prisma';
import { SectionLabel } from '@/components/dashboard/SectionLabel';
import { StatWidget } from '@/components/dashboard/StatWidget';
import { RecentActivityItem } from '@/components/dashboard/RecentActivityItem';
import type { DayData } from '@/components/dashboard/charts/WeeklyPerformanceChart';
import { WeeklyChartWrapper } from '@/components/dashboard/charts/WeeklyChartWrapper';
import { ExerciseProgressWrapper } from '@/components/dashboard/charts/ExerciseProgressWrapper';
import {
  EXERCISE_COLORS,
  type ExerciseSeriesData,
} from '@/components/dashboard/charts/ExerciseProgressChart';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

function getWeekStart(): Date {
  const now = new Date();
  const daysFromMonday = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysFromMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function dayIndex(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

function mondayOf(date: Date): number {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function computeLongestStreak(dates: Date[], minSessions = 3): number {
  if (dates.length === 0) return 0;

  const weekCount = new Map<number, number>();
  for (const d of dates) {
    const key = mondayOf(d);
    weekCount.set(key, (weekCount.get(key) ?? 0) + 1);
  }

  const qualifying = [...weekCount.entries()]
    .filter(([, count]) => count >= minSessions)
    .map(([monday]) => monday)
    .sort((a, b) => a - b);

  if (qualifying.length === 0) return 0;

  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  let best = 1;
  let current = 1;

  for (let i = 1; i < qualifying.length; i++) {
    if (qualifying[i] - qualifying[i - 1] === ONE_WEEK) {
      current++;
      if (current > best) best = current;
    } else {
      current = 1;
    }
  }

  return best;
}

function estimateKcal(
  durationMinutes: number,
  weightKg: number,
  gender?: string | null,
): number {
  const sexFactor = gender === 'male' ? 1.1 : gender === 'female' ? 1.0 : 1.05;
  return Math.round(5 * weightKg * (durationMinutes / 60) * sexFactor);
}

export function formatVolume(kg: number): string {
  if (kg >= 10_000) return `${(kg / 1000).toFixed(0)}t`;
  if (kg >= 1_000) return `${(kg / 1000).toFixed(1)}t`;
  return `${Math.round(kg).toLocaleString()} kg`;
}

export function formatDuration(minutes: number): string {
  if (!minutes) return '0m';
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatDate(date: Date): string {
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const GOAL_LABELS: Record<string, string> = {
  muscle_gain: 'Muscle Gain',
  weight_loss: 'Weight Loss',
  athleticsm: 'Athleticism',
  longevity: 'Longevity',
};

const EXP_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default async function DashboardPage() {
  const { user } = await getUser();
  if (!user) redirect('/auth/login');

  const weekStart = getWeekStart();

  const [
    userProfile,
    recentLogs,
    weeklyLogs,
    weeklyPRCount,
    allLogs,
    trainingPlans,
  ] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),

    prisma.workoutLog.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: 5,
    }),

    prisma.workoutLog.findMany({
      where: { userId: user.id, date: { gte: weekStart } },
    }),

    prisma.set.count({
      where: {
        isPersonalRecord: true,
        performedExercise: {
          workoutLog: { userId: user.id, date: { gte: weekStart } },
        },
      },
    }),

    prisma.workoutLog.findMany({
      where: { userId: user.id },
      select: { date: true },
    }),

    prisma.trainingPlan.findMany({
      where: { userId: user.id },
      select: { id: true, title: true },
    }),
  ]);

  if (!userProfile) redirect('/auth/login');

  const totalWorkoutCount = allLogs.length;

  let exerciseSeries: ExerciseSeriesData[] = [];
  let progressDates: string[] = [];
  let progressRawDates: string[] = [];

  if (totalWorkoutCount >= 3) {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const performedExercisesRaw = await prisma.performedExercise.findMany({
      where: { workoutLog: { userId: user.id, date: { gte: ninetyDaysAgo } } },
      select: {
        exerciseId: true,
        name: true,
        sets: { select: { reps: true, weight: true } },
        workoutLog: { select: { date: true } },
      },
      orderBy: { workoutLog: { date: 'asc' } },
    });

    const exerciseFreq = new Map<string, { name: string; count: number }>();
    for (const pe of performedExercisesRaw) {
      const entry = exerciseFreq.get(pe.exerciseId);
      if (entry) {
        entry.count++;
      } else {
        exerciseFreq.set(pe.exerciseId, { name: pe.name, count: 1 });
      }
    }

    const top3 = [...exerciseFreq.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3);

    const allDateSet = new Set<string>();
    for (const pe of performedExercisesRaw) {
      allDateSet.add(pe.workoutLog.date.toISOString().slice(0, 10));
    }
    const sortedDates = [...allDateSet].sort();

    progressRawDates = sortedDates;
    progressDates = sortedDates.map((k) =>
      new Date(k).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      }),
    );

    exerciseSeries = top3.map(([exerciseId, { name }], colorIdx) => {
      const dateBestWeight = new Map<string, number>();
      const dateBestReps = new Map<string, number>();

      for (const pe of performedExercisesRaw) {
        if (pe.exerciseId !== exerciseId) continue;
        const dateKey = pe.workoutLog.date.toISOString().slice(0, 10);
        for (const set of pe.sets) {
          const currentBest = dateBestWeight.get(dateKey) ?? 0;
          if (set.weight > currentBest) {
            dateBestWeight.set(dateKey, set.weight);
            dateBestReps.set(dateKey, set.reps);
          }
        }
      }

      return {
        exerciseId,
        name,
        color: EXERCISE_COLORS[colorIdx],
        weightData: sortedDates.map((d) => dateBestWeight.get(d) ?? null),
        repsData: sortedDates.map((d) => dateBestReps.get(d) ?? null),
      };
    });
  }

  const bodyWeightKg = userProfile.weight ?? 70;
  const gender = userProfile.gender;

  const weeklyWorkouts = weeklyLogs.length;
  const weeklyVolume = weeklyLogs.reduce(
    (s: number, l: { totalSessionVolume: number }) => s + l.totalSessionVolume,
    0,
  );
  const weeklyMinutes = weeklyLogs.reduce(
    (s: number, l: { durationMinutes: number | null }) =>
      s + (l.durationMinutes ?? 0),
    0,
  );
  const weeklyKcal = estimateKcal(weeklyMinutes, bodyWeightKg, gender);

  const longestStreak = computeLongestStreak(
    allLogs.map((l: { date: Date }) => l.date),
  );

  const dailyVolume = Array(7).fill(0) as number[];
  const dailyDuration = Array(7).fill(0) as number[];

  for (const log of weeklyLogs) {
    const idx = dayIndex(log.date);
    dailyVolume[idx] += log.totalSessionVolume;
    dailyDuration[idx] += log.durationMinutes ?? 0;
  }

  const chartData: DayData[] = DAYS.map((day, i) => ({
    day,
    volume: Math.round(dailyVolume[i]),
    duration: dailyDuration[i],
    kcal: estimateKcal(dailyDuration[i], bodyWeightKg, gender),
  }));

  const noWeekData = weeklyWorkouts === 0;

  const weeklyVolumeStr = noWeekData ? 'N/A' : formatVolume(weeklyVolume);
  const weeklyTimeStr = noWeekData ? 'N/A' : formatDuration(weeklyMinutes);
  const weeklyPRStr = noWeekData ? 'N/A' : String(weeklyPRCount);
  const weeklyCalStr =
    noWeekData || weeklyMinutes === 0
      ? 'N/A'
      : `${weeklyKcal.toLocaleString()} kcal`;

  const totalVolumeStr =
    userProfile.totalWorkouts === 0
      ? 'N/A'
      : formatVolume(userProfile.totalVolume);
  const streakStr =
    longestStreak === 0
      ? 'N/A'
      : `${longestStreak} ${longestStreak === 1 ? 'week' : 'weeks'}`;

  const planMap = new Map(
    trainingPlans.map((p: { id: string; title: string }) => [p.title, p.id]),
  );

  const firstName = userProfile.name.split(' ')[0];

  return (
    <main className="bg-custom-page text-custom-text-main flex flex-1 cursor-default flex-col gap-10 px-4 py-6 pb-24 select-none sm:px-6 sm:py-8">
      <header className="flex flex-col gap-4">
        <div>
          <p className="text-custom-secondary text-[0.65rem] font-semibold tracking-[0.15em] uppercase"></p>
          <h1 className="text-custom-text-main mt-1 text-3xl leading-snug font-light">
            {getGreeting()}, <span className="font-normal">{firstName}</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="border-custom-border text-custom-text-muted/70 inline-flex items-center gap-1.5 rounded-full border bg-black/[0.04] px-3 py-1 text-xs dark:bg-white/[0.04]">
            <MdOutlineBolt className="text-custom-primary size-3" />
            Level {userProfile.userLevel}
          </span>
          {userProfile.experience && (
            <span className="border-custom-border text-custom-text-muted/70 inline-flex items-center gap-1.5 rounded-full border bg-black/[0.04] px-3 py-1 text-xs dark:bg-white/[0.04]">
              {EXP_LABELS[userProfile.experience] ?? userProfile.experience}
            </span>
          )}
          {userProfile.goal && (
            <span className="border-custom-border text-custom-text-muted/70 inline-flex items-center gap-1.5 rounded-full border bg-black/[0.04] px-3 py-1 text-xs dark:bg-white/[0.04]">
              {GOAL_LABELS[userProfile.goal] ?? userProfile.goal}
            </span>
          )}
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <SectionLabel eyebrow="This Week" title="Performance" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatWidget
            icon={PiChartLineUpBold}
            value={weeklyVolumeStr}
            label="Volume lifted"
            tint="primary"
          />
          <StatWidget
            icon={LuTimer}
            value={weeklyTimeStr}
            label="Time trained"
            tint="secondary"
          />
          <StatWidget
            icon={MdCalendarToday}
            value={weeklyWorkouts === 0 ? 'N/A' : String(weeklyWorkouts)}
            label="Sessions"
            tint="neutral"
          />
          <StatWidget
            icon={RiMedalLine}
            value={weeklyPRStr}
            label="Personal records"
            tint="primary"
          />
          <div className="col-span-2 md:col-span-4">
            <StatWidget
              icon={MdLocalFireDepartment}
              value={weeklyCalStr}
              label="Estimated calories burned"
              tint="secondary"
            />
          </div>
        </div>
      </section>

      <section>
        <WeeklyChartWrapper data={chartData} />
      </section>

      <section>
        {totalWorkoutCount < 3 ? (
          <div className="glass border-custom-border bg-custom-card-bg flex flex-col gap-3 rounded-2xl border p-5">
            <div>
              <p className="text-custom-secondary text-[0.65rem] font-semibold tracking-[0.15em] uppercase">
                Top Exercises
              </p>
              <p className="text-custom-text-main text-sm font-medium">
                Performance Over Time
              </p>
            </div>
            <div className="flex h-44 flex-col items-center justify-center gap-2">
              <MdLock className="text-custom-text-muted/30 size-8" />
              <p className="text-custom-text-main text-sm font-medium">
                Unlock after 3 workouts
              </p>
              <p className="text-custom-text-muted/60 text-xs">
                {totalWorkoutCount}/3 sessions completed
              </p>
            </div>
          </div>
        ) : (
          <ExerciseProgressWrapper
            allDates={progressDates}
            rawDates={progressRawDates}
            series={exerciseSeries}
          />
        )}
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel eyebrow="Recent Activity" title="Last Workouts" />

        {recentLogs.length === 0 ? (
          <div className="glass border-custom-border bg-custom-card-bg flex flex-col items-center gap-3 rounded-2xl border py-12">
            <FaDumbbell className="text-custom-text-muted/40 size-8" />
            <p className="text-custom-text-muted/65 text-sm">
              No workouts logged yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recentLogs.map(
              (log: {
                id: string;
                workoutName: string;
                date: Date;
                totalSessionVolume: number;
                durationMinutes: number | null;
              }) => {
                const planId = planMap.get(log.workoutName);
                return (
                  <RecentActivityItem
                    key={log.id}
                    workoutName={log.workoutName}
                    formattedDate={formatDate(log.date)}
                    formattedVolume={formatVolume(log.totalSessionVolume)}
                    formattedDuration={
                      log.durationMinutes != null
                        ? formatDuration(log.durationMinutes)
                        : null
                    }
                    href={planId ? `/workouts/${planId}` : undefined}
                  />
                );
              },
            )}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel eyebrow="All Time" title="Totals" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <StatWidget
            icon={GiWeightLiftingUp}
            value={String(userProfile.totalWorkouts)}
            label="Workouts completed"
            tint="primary"
          />
          <StatWidget
            icon={PiChartLineUpBold}
            value={totalVolumeStr}
            label="Total volume"
            tint="secondary"
          />
          <div className="col-span-2 md:col-span-1">
            <StatWidget
              icon={PiTrophyBold}
              value={streakStr}
              label="Longest weekly streak"
              tint="primary"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
