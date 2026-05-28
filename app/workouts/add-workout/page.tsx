import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/auth';
import { ExerciseLibrary } from '@/components/ExerciseLibrary';

export default async function AddWorkoutPage() {
  const { user } = await getUser();
  if (!user) redirect('/auth/login');

  return (
    <main className="bg-custom-page flex flex-1 flex-col gap-8 px-4 py-6 pb-24 text-custom-text-main sm:px-6 sm:py-8">

      <header>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
          Configurator
        </p>
        <h1 className="mt-1 text-3xl font-light leading-snug text-custom-text-main">
          Build Your Workout
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-custom-text-muted">
          Pick a body part, search for exercises, select what you want, then name and save your routine.
        </p>
      </header>

      <ExerciseLibrary />

    </main>
  );
}
