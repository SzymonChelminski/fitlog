import { Skeleton } from '@/components/ui/skeleton';

function SetRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2">
      <Skeleton className="h-3 w-4 rounded shrink-0" />
      <Skeleton className="h-8 flex-1 rounded-lg" />
      <Skeleton className="h-8 flex-1 rounded-lg" />
      <Skeleton className="size-7 rounded-lg shrink-0" />
    </div>
  );
}

function ExerciseBlockSkeleton() {
  return (
    <div className="rounded-2xl border border-custom-border bg-custom-card-bg p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-lg shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-20 rounded-full" />
        </div>
      </div>
      <div className="divide-y divide-custom-border">
        <SetRowSkeleton />
        <SetRowSkeleton />
        <SetRowSkeleton />
      </div>
    </div>
  );
}

export default function WorkoutDetailLoading() {
  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-6 px-4 py-6 pb-24 text-custom-text-main">

      <div className="flex flex-col gap-2">
        <Skeleton className="h-2.5 w-20 rounded-full" />
        <Skeleton className="h-8 w-48 rounded" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <ExerciseBlockSkeleton />
        <ExerciseBlockSkeleton />
        <ExerciseBlockSkeleton />
      </div>

    </main>
  );
}
