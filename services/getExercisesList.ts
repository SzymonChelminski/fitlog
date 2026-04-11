import exercisesData from '@/data/exercises.json';
import { Exercise } from '../types/exercise';

export default async function getAllExercises(): Promise<Exercise[]> {
  return exercisesData as Exercise[];
}
