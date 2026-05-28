'use client';

import { useEffect, useState } from 'react';
import { MdFitnessCenter } from 'react-icons/md';
import { LuBell, LuBellOff } from 'react-icons/lu';

const KEY_UNITS         = 'fitlog:units';
const KEY_NOTIFICATIONS = 'fitlog:notifications';

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-primary focus-visible:ring-offset-2 ${
        checked ? 'bg-custom-primary' : 'bg-black/[0.15] dark:bg-white/[0.15]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block size-4 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

function SettingRow({
  icon,
  label,
  description,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.06] dark:bg-white/[0.06]">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-custom-text-main">{label}</p>
          <p className="text-xs text-custom-text-muted/80">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function UnitSelector({
  value,
  onChange,
}: {
  value: 'kg' | 'lbs';
  onChange: (v: 'kg' | 'lbs') => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-custom-border bg-black/[0.03] dark:bg-white/[0.03] p-1">
      {(['kg', 'lbs'] as const).map((u) => (
        <button
          key={u}
          onClick={() => onChange(u)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-all duration-150 ${
            value === u
              ? 'bg-black/[0.10] dark:bg-white/[0.10] text-custom-text-main'
              : 'text-custom-text-muted hover:text-custom-text-main'
          }`}
        >
          {u}
        </button>
      ))}
    </div>
  );
}

export function PreferencesPanel() {
  const [mounted, setMounted]           = useState(false);
  const [units, setUnitsState]          = useState<'kg' | 'lbs'>('kg');
  const [notifications, setNotifState]  = useState(true);

  useEffect(() => {
    setUnitsState(
      (localStorage.getItem(KEY_UNITS) as 'kg' | 'lbs' | null) ?? 'kg',
    );
    setNotifState(localStorage.getItem(KEY_NOTIFICATIONS) !== 'false');
    setMounted(true);
  }, []);

  const setUnits = (v: 'kg' | 'lbs') => {
    setUnitsState(v);
    localStorage.setItem(KEY_UNITS, v);
  };

  const setNotifications = (v: boolean) => {
    setNotifState(v);
    localStorage.setItem(KEY_NOTIFICATIONS, String(v));
  };

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-custom-border bg-custom-card-bg px-5 py-4">
        <div className="h-12 animate-pulse rounded-lg bg-black/[0.04] dark:bg-white/[0.04]" />
      </div>
    );
  }

  return (
    <div className="glass divide-y divide-custom-border rounded-2xl border border-custom-border bg-custom-card-bg px-5 py-2">
      <SettingRow
        icon={<MdFitnessCenter className="size-4 text-custom-primary" />}
        label="Weight unit"
        description="Used across all workout logs and stats"
      >
        <UnitSelector value={units} onChange={setUnits} />
      </SettingRow>

      <SettingRow
        icon={
          notifications ? (
            <LuBell className="size-4 text-custom-secondary" />
          ) : (
            <LuBellOff className="size-4 text-custom-text-muted/50" />
          )
        }
        label="Notifications"
        description={
          notifications ? 'Workout reminders enabled' : 'All reminders muted'
        }
      >
        <Toggle
          checked={notifications}
          onChange={setNotifications}
          label="Toggle notifications"
        />
      </SettingRow>
    </div>
  );
}
