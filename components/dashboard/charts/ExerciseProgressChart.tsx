'use client';

import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const C = {
  primary:   '#4f46e5',
  secondary: '#38bdf8',
  orange:    '#fb923c',
  textMuted: '#94a3b8',
  axis:      'rgba(255,255,255,0.07)',
  grid:      'rgba(255,255,255,0.05)',
} as const;

export const EXERCISE_COLORS = [C.primary, C.secondary, C.orange] as const;

export interface ExerciseSeriesData {
  exerciseId: string;
  name:       string;
  color:      string;
  weightData: (number | null)[];
  repsData:   (number | null)[];
}

export interface ExerciseProgressChartProps {
  allDates: string[];
  rawDates: string[];
  series:   ExerciseSeriesData[];
}

type Metric = 'weight' | 'reps';
type Period = '1M' | '3M' | '6M' | 'all';

const PERIOD_DAYS: Record<Period, number> = {
  '1M':  30,
  '3M':  90,
  '6M':  180,
  'all': Infinity,
};

const chartSx = {
  width:  '100%',
  height: '100%',
  '& .MuiChartsAxis-tickLabel tspan': {
    fill:       C.textMuted,
    fontSize:   '10px',
    fontFamily: 'inherit',
  },
  '& .MuiChartsAxis-line': { stroke: C.axis },
  '& .MuiChartsAxis-tick': { stroke: C.axis },
  '& .MuiChartsGrid-line': {
    stroke:          C.grid,
    strokeDasharray: '4 4',
  },
  '& .MuiLineElement-root': { strokeWidth: 2 },
  '& .MuiMarkElement-root': {
    r:           3,
    strokeWidth: 2,
  },
} as const;

export function ExerciseProgressChart({
  allDates,
  rawDates,
  series,
}: ExerciseProgressChartProps) {
  const [metric, setMetric] = useState<Metric>('weight');
  const [period, setPeriod] = useState<Period>('all');

  const days = PERIOD_DAYS[period];
  const cutoff = new Date();
  if (days !== Infinity) cutoff.setDate(cutoff.getDate() - days);

  const visibleIndices = rawDates.reduce<number[]>((acc, key, i) => {
    if (days === Infinity || new Date(key) >= cutoff) acc.push(i);
    return acc;
  }, []);

  const filteredDates  = visibleIndices.map((i) => allDates[i]);
  const filteredSeries = series.map((s) => ({
    ...s,
    weightData: visibleIndices.map((i) => s.weightData[i]),
    repsData:   visibleIndices.map((i) => s.repsData[i]),
  }));

  const hasData = filteredSeries.length > 0 && filteredDates.length > 0;

  const chartSeries = filteredSeries.map((s) => ({
    label:        s.name,
    color:        s.color,
    data:         metric === 'weight' ? s.weightData : s.repsData,
    connectNulls: true,
    curve:        'monotoneX' as const,
    showMark:     true,
    valueFormatter: (v: number | null) =>
      v == null
        ? '–'
        : metric === 'weight'
          ? `${v} kg`
          : `${v} reps`,
  }));

  return (
    <div className="glass flex flex-col gap-4 rounded-2xl border border-custom-border bg-custom-card-bg p-5">

      <div className="flex flex-col gap-3">

        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
              Top Exercises
            </p>
            <p className="text-sm font-medium text-custom-text-main">
              Performance Over Time
            </p>
          </div>

          <div className="flex shrink-0 gap-0.5 pt-0.5">
            {(['1M', '3M', '6M', 'all'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                  period === p
                    ? 'bg-custom-primary/15 text-custom-primary'
                    : 'text-custom-text-muted/50 hover:text-custom-text-muted'
                }`}
              >
                {p === 'all' ? 'All' : p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 rounded-lg border border-custom-border bg-black/[0.03] p-1 dark:bg-white/[0.03]">
          {(['weight', 'reps'] as Metric[]).map((m) => {
            const active = metric === m;
            return (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-md px-2 py-2 transition-all ${
                  active
                    ? 'bg-black/[0.10] text-custom-text-main dark:bg-white/[0.10]'
                    : 'text-custom-text-muted/70 hover:text-custom-text-muted'
                }`}
              >
                <span className="text-xs font-medium">
                  {m === 'weight' ? 'Weight' : 'Reps'}
                </span>
                <span
                  className="text-[9px] leading-none transition-opacity"
                  style={{ opacity: active ? 0.45 : 0.2 }}
                >
                  {m === 'weight' ? 'kg' : 'total'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {series.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {series.map((s) => (
            <div key={s.exerciseId} className="flex items-center gap-1.5">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[10px] font-medium capitalize text-custom-text-muted">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {!hasData ? (
        <div className="flex h-44 items-center justify-center">
          <p className="text-xs text-custom-text-muted/60">
            {series.length === 0
              ? 'Log some workouts to see your progress here'
              : 'No sessions in this time period'}
          </p>
        </div>
      ) : (
        <div className="min-w-0 w-full overflow-hidden">
          <div className="-ml-[65px] w-[calc(100%+65px)]">
            <LineChart
              series={chartSeries}
              xAxis={[
                {
                  scaleType: 'point',
                  data:      filteredDates,
                  tickLabelStyle: {
                    fill:       C.textMuted,
                    fontSize:   10,
                    fontFamily: 'inherit',
                  },
                  disableLine:  true,
                  disableTicks: true,
                },
              ]}
              yAxis={[
                {
                  tickNumber:   4,
                  disableLine:  true,
                  disableTicks: true,
                  valueFormatter: (v: number | null) => `${v ?? 0}`,
                  tickLabelStyle: {
                    fill:       C.textMuted,
                    fontSize:   10,
                    fontFamily: 'inherit',
                  },
                },
              ]}
              grid={{ horizontal: true }}
              height={220}
              margin={{ top: 12, right: 8, bottom: 32, left: 48 }}
              sx={chartSx}
              slots={{ legend: () => null }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
