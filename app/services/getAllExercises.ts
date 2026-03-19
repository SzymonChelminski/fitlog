import fetchExercisesFromRapid from "./exerciseService";

export default async function getAllExercises() {
  const data = await fetchExercisesFromRapid();
  return data;
}