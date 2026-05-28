'use client';

import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const C = {
  primary:   '#4f46e5',
  secondary: '#38bdf8',
  orange:    '#fb923c',
  textMuted: '#94a3b8',
  axis:      'rgba(255,255,255,0.07)',
  grid:      'rgba(255,255,255,0.05)',
} as const;

export interface DayData {
  day: string;
  volume: number;
  duration: number;
  kcal: number;
}

type Metric = 'volume' | 'duration' | 'kcal';

interface MetricConfig {
  key:       Metric;
  label:     string;
  unit:      string;
  color:     string;
  yFormat:   (v: number) => string;
  tipFormat: (v: number) => string;
}

const METRICS: MetricConfig[] = [
  {
    key:       'volume',
    label:     'Volume',
    unit:      'kg',
    color:     C.primary,
    yFormat:   (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`),
    tipFormat: (v) =>
      v >= 1000
        ? `${(v / 1000).toFixed(1)}t`
        : `${Math.round(v).toLocaleString()} kg`,
  },
  {
    key:       'duration',
    label:     'Duration',
    unit:      'min',
    color:     C.secondary,
    yFormat:   (v) => `${v}`,
    tipFormat: (v) => `${v} min`,
  },
  {
    key:       'kcal',
    label:     'Calories',
    unit:      'kcal',
    color:     C.orange,
    yFormat:   (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`),
    tipFormat: (v) => `${v.toLocaleString()} kcal`,
  },
];

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
  '& .MuiBarElement-root': { rx: 4, ry: 4 },
} as const;

export function WeeklyPerformanceChart({ data }: { data: DayData[] }) {
  const [metric, setMetric] = useState<Metric>('volume');

  const active  = METRICS.find((m) => m.key === metric)!;
  const values  = data.map((d) => d[metric]);
  const hasData = values.some((v) => v > 0);

  return (
    <div className="glass flex flex-col gap-4 rounded-2xl border border-custom-border bg-custom-card-bg p-5">

      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
            This Week
          </p>
          <p className="text-sm font-medium text-custom-text-main">
            Daily Breakdown
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-lg border border-custom-border bg-black/[0.03] p-1 dark:bg-white/[0.03]">
          {METRICS.map((m) => {
            const isActive = metric === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setMetric(m.key)}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-md px-2 py-2 transition-all ${
                  isActive
                    ? 'bg-black/[0.10] text-custom-text-main dark:bg-white/[0.10]'
                    : 'text-custom-text-muted/70 hover:text-custom-text-muted'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 shrink-0 rounded-full transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? m.color
                        : 'rgba(148,163,184,0.25)',
                    }}
                  />
                  <span className="text-xs font-medium">{m.label}</span>
                </span>
                <span
                  className="text-[9px] leading-none transition-opacity"
                  style={{ opacity: isActive ? 0.45 : 0.2 }}
                >
                  {m.unit}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {!hasData ? (
        <div className="flex h-44 items-center justify-center">
          <p className="text-xs text-custom-text-muted/60">
            No data for this week yet
          </p>
        </div>
      ) : (
        <div className="min-w-0 w-full overflow-hidden">
          <div className="-ml-[65px] w-[calc(100%+65px)]">
          <BarChart
            series={[
              {
                data:           values,
                color:          active.color,
                valueFormatter: (v) =>
                  v != null ? active.tipFormat(v as number) : '0',
                highlightScope: { highlight: 'item', fade: 'global' },
              },
            ]}
            xAxis={[
              {
                scaleType: 'band',
                data:      data.map((d) => d.day),
                tickLabelStyle: {
                  fill:       C.textMuted,
                  fontSize:   11,
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
                valueFormatter: (v: number | null) =>
                  active.yFormat(v ?? 0),
                tickLabelStyle: {
                  fill:       C.textMuted,
                  fontSize:   10,
                  fontFamily: 'inherit',
                },
              },
            ]}
            grid={{ horizontal: true }}
            height={200}
            margin={{ top: 8, right: 8, bottom: 32, left: 48 }}
            sx={chartSx}
            slots={{ legend: () => null }}
          />
          </div>
        </div>
      )}
    </div>
  );
}
