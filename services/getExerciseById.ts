import exercisesData from '@/data/exercises.json';
import { Exercise } from '@/types/exercise';

const exerciseLookup: Record<string, Exercise> = Object.fromEntries(
  (exercisesData as Exercise[]).map((ex) => [ex.id, ex]),
);

export const getExerciseById = (id: string): Exercise | undefined => {
  return exerciseLookup[id];
};
