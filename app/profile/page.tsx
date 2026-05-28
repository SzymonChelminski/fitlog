import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/auth';
import { prisma } from '@/lib/prisma';
import { SectionLabel } from '@/components/dashboard/SectionLabel';

import { FaDumbbell } from 'react-icons/fa6';
import { MdOutlineBolt } from 'react-icons/md';
import { LuCalendarDays, LuRuler, LuWeight, LuTrophy, LuFlame } from 'react-icons/lu';
import { GiMuscleUp } from 'react-icons/gi';

import { AvatarUpload } from './AvatarUpload';
import { ProfileForm } from './ProfileForm';

const GOAL_LABELS: Record<string, string> = {
  muscle_gain: 'Muscle Gain',
  weight_loss: 'Weight Loss',
  athleticsm:  'Athleticism',
  longevity:   'Longevity',
};

const EXP_LABELS: Record<string, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
  advanced:     'Advanced',
};

const EXP_COLOR: Record<string, string> = {
  beginner:     'text-emerald-400 bg-emerald-400/10',
  intermediate: 'text-custom-secondary bg-custom-secondary/10',
  advanced:     'text-custom-primary bg-custom-primary/10',
};

function formatVolume(kg: number) {
  if (kg >= 1_000_000) return `${(kg / 1_000_000).toFixed(1)}M kg`;
  if (kg >= 1_000)     return `${(kg / 1_000).toFixed(1)}k kg`;
  return `${Math.round(kg)} kg`;
}

function formatMemberSince(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function computeStreak(dates: Date[]) {
  if (dates.length === 0) return 0;
  const days = [...new Set(
    dates.map((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()),
  )].sort((a, b) => a - b);

  let longest = 1, current = 1;
  for (let i = 1; i < days.length; i++) {
    if (days[i] - days[i - 1] === 86_400_000) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

function StatCard({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="glass flex flex-1 flex-col items-center gap-1.5 rounded-2xl border border-custom-border bg-custom-card-bg px-3 py-4 text-center">
      <Icon className={`size-5 ${accent ?? 'text-custom-primary'}`} />
      <p className="text-lg font-semibold leading-none text-custom-text-main">{value}</p>
      <p className="text-[0.65rem] font-medium uppercase tracking-wide text-custom-text-muted/75">{label}</p>
    </div>
  );
}

function MetricChip({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
}) {
  if (value == null || value === '') return null;
  return (
    <div className="glass flex flex-col gap-1 rounded-2xl border border-custom-border bg-custom-card-bg p-4">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-custom-text-muted/70">
        {label}
      </p>
      <p className="text-xl font-light text-custom-text-main">
        {value}
        {unit && <span className="ml-1 text-sm text-custom-text-muted">{unit}</span>}
      </p>
    </div>
  );
}

export default async function ProfilePage() {
  const { user } = await getUser();
  if (!user) redirect('/auth/login');

  const [profile, workoutLogs] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name:          true,
        age:           true,
        weight:        true,
        height:        true,
        goal:          true,
        experience:    true,
        image:         true,
        gender:        true,
        totalWorkouts: true,
        totalVolume:   true,
        userLevel:     true,
        createdAt:     true,
        trainingPlans: { select: { id: true } },
      },
    }),
    prisma.workoutLog.findMany({
      where:  { userId: user.id },
      select: { date: true },
    }),
  ]);

  if (!profile) redirect('/auth/login');

  const longestStreak = computeStreak(workoutLogs.map((l: { date: Date }) => l.date));
  const expColor      = EXP_COLOR[profile.experience] ?? 'text-custom-text-muted bg-custom-card-bg';

  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-10 px-4 py-6 pb-24 text-custom-text-main sm:px-6 sm:py-8">

      <header>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
          Kinetic Observatory
        </p>
        <h1 className="mt-1 text-3xl font-light leading-snug text-custom-text-main">
          My Profile
        </h1>
      </header>

      <section className="glass flex flex-col items-center gap-5 rounded-2xl border border-custom-border bg-custom-card-bg px-6 py-8">
        <AvatarUpload currentImage={profile.image} name={profile.name} />

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-medium text-custom-text-main">{profile.name}</h2>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-custom-primary/10 px-3 py-0.5 text-xs font-semibold text-custom-primary">
              <MdOutlineBolt className="size-3" />
              Level {profile.userLevel}
            </span>

            <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${expColor}`}>
              {EXP_LABELS[profile.experience] ?? profile.experience}
            </span>

            {profile.goal && (
              <span className="inline-flex items-center rounded-full border border-custom-border px-3 py-0.5 text-xs text-custom-text-muted">
                {GOAL_LABELS[profile.goal] ?? profile.goal}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-custom-text-muted/70">
            Member since {formatMemberSince(profile.createdAt)}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel eyebrow="Performance" title="All-Time Stats" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            icon={FaDumbbell}
            value={String(profile.totalWorkouts)}
            label="Workouts"
            accent="text-custom-primary"
          />
          <StatCard
            icon={LuFlame}
            value={longestStreak > 0 ? `${longestStreak}d` : '—'}
            label="Best Streak"
            accent="text-orange-400"
          />
          <StatCard
            icon={GiMuscleUp}
            value={formatVolume(profile.totalVolume)}
            label="Total Volume"
            accent="text-custom-secondary"
          />
          <StatCard
            icon={LuTrophy}
            value={String(profile.trainingPlans.length)}
            label="Routines"
            accent="text-yellow-400"
          />
        </div>
      </section>

      {(profile.age || profile.height || profile.weight || profile.gender) && (
        <section className="flex flex-col gap-3">
          <SectionLabel eyebrow="Biometrics" title="Physical Profile" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {profile.age    && <MetricChip label="Age"    value={profile.age}    unit="yrs" />}
            {profile.height && <MetricChip label="Height" value={profile.height} unit="cm"  />}
            {profile.weight && <MetricChip label="Weight" value={profile.weight} unit="kg"  />}
            {profile.gender && (
              <MetricChip
                label="Gender"
                value={profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
              />
            )}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <SectionLabel eyebrow="Edit" title="Personal Info" />
        <ProfileForm profile={profile} />
      </section>

    </main>
  );
}
