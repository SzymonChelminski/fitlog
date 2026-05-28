'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { ExerciseProgressChartProps } from './ExerciseProgressChart';

const ExerciseProgressChart = dynamic(
  () =>
    import('./ExerciseProgressChart').then((m) => m.ExerciseProgressChart),
  {
    ssr: false,
    loading: () => (
      <div className="glass flex flex-col gap-4 rounded-2xl border border-custom-border bg-custom-card-bg p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-2.5 w-24 rounded-full" />
            <Skeleton className="h-4 w-44 rounded" />
          </div>
          <Skeleton className="h-[60px] w-full rounded-lg" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-3 w-16 rounded-full" />
        </div>
        <Skeleton className="h-[220px] w-full rounded-xl" />
      </div>
    ),
  },
);

export function ExerciseProgressWrapper(props: ExerciseProgressChartProps) {
  return <ExerciseProgressChart {...props} />;
}

