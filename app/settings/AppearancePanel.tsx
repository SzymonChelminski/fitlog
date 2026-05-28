'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

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

export function AppearancePanel() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="glass divide-y divide-custom-border rounded-2xl border border-custom-border bg-custom-card-bg px-5 py-2">
      <SettingRow
        icon={
          isDark || !mounted ? (
            <MdDarkMode className="size-4 text-custom-secondary" />
          ) : (
            <MdLightMode className="size-4 text-custom-secondary" />
          )
        }
        label="Dark mode"
        description={
          !mounted
            ? 'Loading…'
            : isDark
            ? 'Switch to light theme'
            : 'Switch to dark theme'
        }
      >
        <Toggle
          checked={mounted ? isDark : true}
          onChange={(on) => setTheme(on ? 'dark' : 'light')}
          label="Toggle dark mode"
        />
      </SettingRow>
    </div>
  );
}
