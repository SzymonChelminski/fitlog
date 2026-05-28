import type { IconType } from 'react-icons';

type Tint = 'primary' | 'secondary' | 'neutral';

const ICON_BG: Record<Tint, string> = {
  primary:   'bg-custom-primary/10',
  secondary: 'bg-custom-secondary/10',
  neutral:   'bg-black/[0.06] dark:bg-white/[0.06]',
};

const ICON_COLOR: Record<Tint, string> = {
  primary:   'text-custom-primary',
  secondary: 'text-custom-secondary',
  neutral:   'text-custom-text-muted/70',
};

export function StatWidget({
  icon: Icon,
  value,
  label,
  tint = 'primary',
}: {
  icon: IconType;
  value: string;
  label: string;
  tint?: Tint;
}) {
  const isNA = value === 'N/A';

  return (
    <div className="glass flex flex-col justify-between gap-6 rounded-2xl border border-custom-border bg-custom-card-bg p-5">
      <span
        className={`flex size-9 items-center justify-center rounded-lg ${ICON_BG[tint]}`}
      >
        <Icon className={`size-4 ${ICON_COLOR[tint]}`} />
      </span>
      <div>
        <p
          className={`text-2xl font-light tracking-tight ${
            isNA ? 'text-custom-text-muted/55' : 'text-custom-text-main'
          }`}
        >
          {value}
        </p>
        <p className="mt-0.5 text-xs text-custom-text-muted/75">{label}</p>
      </div>
    </div>
  );
}
