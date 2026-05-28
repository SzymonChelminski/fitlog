import { Skeleton } from '@/components/ui/skeleton';

function StatWidgetSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-custom-border bg-custom-card-bg p-5">
      <Skeleton className="size-9 rounded-lg" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-7 w-20 rounded" />
        <Skeleton className="h-3 w-28 rounded" />
      </div>
    </div>
  );
}

function RecentItemSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-custom-border bg-custom-card-bg px-4 py-3.5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-lg shrink-0" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <Skeleton className="h-3.5 w-16 rounded" />
        <Skeleton className="h-3 w-10 rounded" />
      </div>
    </div>
  );
}

function SectionLabelSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-2.5 w-16 rounded-full" />
      <Skeleton className="h-6 w-32 rounded" />
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-10 px-6 py-8 pb-24 text-custom-text-main">

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-2.5 w-20 rounded-full" />
          <Skeleton className="h-9 w-52 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabelSkeleton />
        <div className="grid grid-cols-2 gap-3">
          <StatWidgetSkeleton />
          <StatWidgetSkeleton />
          <StatWidgetSkeleton />
          <StatWidgetSkeleton />
          <div className="col-span-2">
            <StatWidgetSkeleton />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-custom-border bg-custom-card-bg p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-2.5 w-16 rounded-full" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
          <Skeleton className="h-44 w-full rounded-xl" />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-4 rounded-2xl border border-custom-border bg-custom-card-bg p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-2.5 w-24 rounded-full" />
              <Skeleton className="h-4 w-44 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-1 rounded-lg border border-custom-border p-1">
              <Skeleton className="h-[52px] w-full rounded-md" />
              <Skeleton className="h-[52px] w-full rounded-md" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="h-3 w-16 rounded-full" />
          </div>
          <Skeleton className="h-[220px] w-full rounded-xl" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabelSkeleton />
        <div className="flex flex-col gap-2">
          <RecentItemSkeleton />
          <RecentItemSkeleton />
          <RecentItemSkeleton />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabelSkeleton />
        <div className="grid grid-cols-2 gap-3">
          <StatWidgetSkeleton />
          <StatWidgetSkeleton />
          <StatWidgetSkeleton />
          <StatWidgetSkeleton />
        </div>
      </section>

    </main>
  );
}
