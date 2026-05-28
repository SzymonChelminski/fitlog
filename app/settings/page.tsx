import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/auth';
import { SectionLabel } from '@/components/dashboard/SectionLabel';

import { AppearancePanel } from './AppearancePanel';
import { PreferencesPanel } from './PreferencesPanel';
import { DangerZone } from './DangerZone';

export default async function SettingsPage() {
  const { user } = await getUser();
  if (!user) redirect('/auth/login');

  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-10 px-4 py-6 pb-24 text-custom-text-main sm:px-6 sm:py-8">

      <header>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
          Account
        </p>
        <h1 className="mt-1 text-3xl font-light leading-snug text-custom-text-main">
          Settings
        </h1>
      </header>

      <section className="flex flex-col gap-3">
        <SectionLabel eyebrow="Display" title="Appearance" />
        <AppearancePanel />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel eyebrow="Preferences" title="Units & Notifications" />
        <PreferencesPanel />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel eyebrow="Danger Zone" title="Account Actions" />
        <DangerZone />
      </section>

    </main>
  );
}
