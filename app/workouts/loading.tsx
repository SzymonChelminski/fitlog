import { Skeleton } from '@/components/ui/skeleton';

function PlanCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-custom-border bg-custom-card-bg px-4 py-4 gap-4">
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <Skeleton className="h-4 w-40 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-3 w-20 rounded-full" />
        </div>
      </div>
      <Skeleton className="size-8 shrink-0 rounded-lg" />
    </div>
  );
}

export default function WorkoutsLoading() {
  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-4 p-4 text-custom-text-main">

      <div className="flex flex-col gap-2 mb-2">
        <Skeleton className="h-2.5 w-28 rounded-full" />
        <Skeleton className="h-9 w-36 rounded" />
      </div>

      <div className="flex flex-col gap-3">
        <PlanCardSkeleton />
        <PlanCardSkeleton />
        <PlanCardSkeleton />
        <PlanCardSkeleton />
      </div>

      <Skeleton className="h-16 w-full rounded-2xl opacity-50" />

    </main>
  );
}
