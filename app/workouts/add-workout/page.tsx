import { ExerciseLibrary } from '@/components/ExerciseLibrary';
import getAllExercises from '@/app/services/getExercisesList';

export default async function page() {
  const exercises = await getAllExercises();

  return (
    <section className="bg-primary flex flex-1 flex-col gap-4 p-4">
      <section>
        <h2 className="text-custom-secondary font-semibold">CONFIGURATOR</h2>
        <h1 className="text-custom-text-main text-2xl font-medium">
          New Workout setup
        </h1>
        <p className="text-custom-text-muted">
          Browse our extensive library to find the right movements for your
          goals. Simply select the exercises you want to include in your new
          workout routine.
        </p>
      </section>
      <ExerciseLibrary exercises={exercises} />
    </section>
  );
}
