import { Skeleton } from '@/components/ui/skeleton';

function SectionLabelSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-2.5 w-16 rounded-full" />
      <Skeleton className="h-5 w-36 rounded" />
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-custom-border bg-custom-card-bg px-3 py-4">
      <Skeleton className="size-5 rounded-full" />
      <Skeleton className="h-5 w-12 rounded" />
      <Skeleton className="h-2.5 w-16 rounded-full" />
    </div>
  );
}

function MetricChipSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-custom-border bg-custom-card-bg p-4">
      <Skeleton className="h-2.5 w-12 rounded-full" />
      <Skeleton className="h-6 w-20 rounded" />
    </div>
  );
}

export default function ProfileLoading() {
  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-10 px-6 py-8 pb-24 text-custom-text-main">

      <div className="flex flex-col gap-2">
        <Skeleton className="h-2.5 w-28 rounded-full" />
        <Skeleton className="h-8 w-36 rounded" />
      </div>

      <section className="flex flex-col items-center gap-5 rounded-2xl border border-custom-border bg-custom-card-bg px-6 py-8">
        <Skeleton className="size-28 rounded-full" />

        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-7 w-40 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-3 w-32 rounded-full" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabelSkeleton />
        <div className="grid grid-cols-2 gap-3">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabelSkeleton />
        <div className="grid grid-cols-2 gap-3">
          <MetricChipSkeleton />
          <MetricChipSkeleton />
          <MetricChipSkeleton />
          <MetricChipSkeleton />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabelSkeleton />
        <div className="rounded-2xl border border-custom-border bg-custom-card-bg p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Skeleton className="h-2.5 w-24 rounded-full" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-2.5 w-20 rounded-full" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Skeleton className="h-2.5 w-20 rounded-full" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
          <Skeleton className="mt-6 h-10 w-full rounded-lg" />
        </div>
      </section>

    </main>
  );
}
