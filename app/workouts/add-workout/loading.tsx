import { Skeleton } from '@/components/ui/skeleton';

function ExerciseCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-custom-border bg-custom-card-bg p-3">
      <Skeleton className="size-14 shrink-0 rounded-xl" />
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <Skeleton className="h-3.5 w-36 rounded" />
        <Skeleton className="h-3 w-24 rounded" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
      <Skeleton className="size-5 shrink-0 rounded-full" />
    </div>
  );
}

export default function AddWorkoutLoading() {
  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-8 px-6 py-8 pb-24 text-custom-text-main">

      <div className="flex flex-col gap-2">
        <Skeleton className="h-2.5 w-24 rounded-full" />
        <Skeleton className="h-8 w-52 rounded" />
        <Skeleton className="h-3.5 w-72 rounded mt-1" />
      </div>

      <div className="rounded-2xl border border-custom-border bg-custom-card-bg p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-2.5 w-24 rounded-full" />
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-11 w-full rounded-xl" />

      <div className="flex gap-2 flex-wrap -mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <ExerciseCardSkeleton key={i} />
        ))}
      </div>

    </main>
  );
}
