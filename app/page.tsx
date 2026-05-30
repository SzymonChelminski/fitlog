import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/supabase/auth';
import { GridBackground } from '@/components/GridBackground';
import { FaDumbbell } from 'react-icons/fa6';
import { IoMdListBox } from 'react-icons/io';
import { LuTimer } from 'react-icons/lu';
import { PiChartLineUpBold } from 'react-icons/pi';

const features = [
  {
    icon: FaDumbbell,
    label: 'Custom Plans',
    desc: 'Build tailored routines',
  },
  {
    icon: LuTimer,
    label: 'Live Timer',
    desc: 'Track rest & duration',
  },
  {
    icon: PiChartLineUpBold,
    label: 'Volume Log',
    desc: 'Measure session output',
  },
  {
    icon: IoMdListBox,
    label: 'Exercise Library',
    desc: 'Browse & discover',
  },
];

export default async function Home() {
  const { user } = await getUser();
  if (user) redirect('/dashboard');

  return (
    <main className="bg-custom-page text-custom-text-main flex flex-1 flex-col px-6 py-12 pt-4! sm:px-8 sm:py-16">
      <GridBackground />

      <header className="flex flex-col items-center gap-6 text-center select-none">
        <h1 className="leading-[1.15]">
          <span className="font-display text-custom-text-main block text-[2.2rem] font-black tracking-[0.01em] sm:text-4xl md:text-[4.5rem] lg:text-[5.5rem]">
            Train smarter.
          </span>
          <span className="font-display text-custom-text-muted/65 block text-[1.15rem] font-normal tracking-[0.08em] sm:text-xl md:text-[2.4rem] lg:text-[2.9rem]">
            Log every rep.
          </span>
        </h1>

        <p className="text-custom-text-muted mx-auto max-w-xs text-sm leading-relaxed sm:max-w-sm">
          Precision fitness tracking built for athletes who take their
          performance data seriously.
        </p>
      </header>

      <section
        aria-label="Features"
        className="mt-12 grid grid-cols-2 gap-3 select-none sm:grid-cols-4 sm:gap-4"
      >
        {features.map(({ icon: Icon, label, desc }) => (
          <article
            key={label}
            className="glass border-custom-border bg-custom-card-bg flex flex-col gap-5 rounded-2xl border p-5 sm:p-6"
          >
            <span className="bg-custom-primary/10 flex size-10 items-center justify-center rounded-xl">
              <Icon className="text-custom-primary size-5" aria-hidden="true" />
            </span>

            <div className="flex flex-col gap-1.5">
              <p className="text-custom-text-main text-sm font-medium tracking-tight">
                {label}
              </p>
              <p className="text-custom-text-muted/85 text-xs leading-snug">
                {desc}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section aria-label="Get started" className="mt-12">
        <div className="mx-auto flex w-full max-w-sm flex-col justify-center gap-3 sm:w-fit sm:flex-row sm:gap-4">
          <Link href="/auth/register" className="w-full sm:w-auto">
            <Button
              className="bg-custom-primary w-full cursor-pointer rounded-full px-12 py-7 text-base font-medium tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:w-auto"
              size="lg"
            >
              CREATE ACCOUNT
            </Button>
          </Link>

          <Link href="/auth/login" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              className="border-custom-text-main/50 text-custom-text-main hover:border-custom-text-main/70 w-full cursor-pointer rounded-full border bg-black/[0.07] px-12 py-7 text-base font-medium tracking-[0.12em] transition-colors hover:bg-black/[0.12] sm:w-auto dark:bg-white/[0.07] dark:hover:bg-white/[0.12]"
              size="lg"
            >
              LOG IN
            </Button>
          </Link>
        </div>

        <p className="text-custom-text-muted/50 mt-3 text-center text-[0.68rem] tracking-widest uppercase sm:hidden">
          Track · Analyze · Evolve
        </p>
      </section>
    </main>
  );
}
