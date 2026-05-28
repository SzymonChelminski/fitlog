import { Skeleton } from '@/components/ui/skeleton';

function SectionLabelSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-2.5 w-16 rounded-full" />
      <Skeleton className="h-5 w-36 rounded" />
    </div>
  );
}

function SettingRowSkeleton({ hasTrailing = true }: { hasTrailing?: boolean }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="size-9 shrink-0 rounded-lg" />
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-3.5 w-28 rounded" />
        <Skeleton className="h-2.5 w-44 rounded" />
      </div>
      {hasTrailing && <Skeleton className="h-6 w-10 rounded-full" />}
    </div>
  );
}

function PanelSkeleton({ rows }: { rows: number }) {
  return (
    <div className="divide-y divide-custom-border rounded-2xl border border-custom-border bg-custom-card-bg px-5 py-2">
      {Array.from({ length: rows }).map((_, i) => (
        <SettingRowSkeleton key={i} />
      ))}
    </div>
  );
}

export default function SettingsLoading() {
  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-10 px-6 py-8 pb-24 text-custom-text-main">

      <div className="flex flex-col gap-2">
        <Skeleton className="h-2.5 w-16 rounded-full" />
        <Skeleton className="h-8 w-32 rounded" />
      </div>

      <section className="flex flex-col gap-3">
        <SectionLabelSkeleton />
        <PanelSkeleton rows={1} />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabelSkeleton />
        <Skeleton className="h-10 w-full rounded-2xl" />
        <PanelSkeleton rows={2} />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabelSkeleton />
        <PanelSkeleton rows={2} />
      </section>

    </main>
  );
}
