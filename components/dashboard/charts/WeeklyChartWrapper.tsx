'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { DayData } from './WeeklyPerformanceChart';

const WeeklyPerformanceChart = dynamic(
  () =>
    import('./WeeklyPerformanceChart').then((m) => m.WeeklyPerformanceChart),
  {
    ssr: false,
    loading: () => (
      <div className="glass flex flex-col gap-4 rounded-2xl border border-custom-border bg-custom-card-bg p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-16 rounded-full" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
          <Skeleton className="h-8 w-full rounded-full" />
        </div>
        <Skeleton className="h-44 w-full rounded-xl" />
      </div>
    ),
  },
);

export function WeeklyChartWrapper({ data }: { data: DayData[] }) {
  return <WeeklyPerformanceChart data={data} />;
}
