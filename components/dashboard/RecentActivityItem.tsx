import Link from 'next/link';
import { FaDumbbell } from 'react-icons/fa6';

interface Props {
  workoutName: string;
  formattedDate: string;
  formattedVolume: string;
  formattedDuration: string | null;
  href?: string;
}

export function RecentActivityItem({
  workoutName,
  formattedDate,
  formattedVolume,
  formattedDuration,
  href,
}: Props) {
  const inner = (
    <div className="glass flex items-center justify-between rounded-lg border border-custom-border bg-custom-card-bg px-4 py-3.5 transition-colors hover:bg-custom-overlay-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-custom-primary/10">
          <FaDumbbell className="size-3.5 text-custom-primary" />
        </span>
        <div>
          <p className="text-sm font-medium text-custom-text-main">
            {workoutName}
          </p>
          <p className="text-xs text-custom-text-muted/70">{formattedDate}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <p className="text-sm font-medium text-custom-text-main">
          {formattedVolume}
        </p>
        {formattedDuration && (
          <p className="text-xs text-custom-text-muted/70">{formattedDuration}</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {inner}
      </Link>
    );
  }

  return inner;
}
