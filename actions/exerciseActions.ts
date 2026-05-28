'use server';

export type ExerciseResult = {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
};

type RawExercise = ExerciseResult & { gifUrl: string };

export async function getExerciseById(
  id: string,
): Promise<ExerciseResult | null> {
  const key = process.env.EXERCISES_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${encodeURIComponent(id)}`,
      {
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return null;

    const data: RawExercise = await res.json();
    return {
      id: data.id,
      name: data.name,
      bodyPart: data.bodyPart,
      equipment: data.equipment,
      target: data.target,
      secondaryMuscles: data.secondaryMuscles,
      instructions: data.instructions,
    };
  } catch {
    return null;
  }
}

export async function searchExercises(
  bodyPart: string,
  query: string,
): Promise<{ exercises: ExerciseResult[]; error?: string }> {
  const trimmedQuery = query.trim();

  if (!bodyPart || !trimmedQuery) {
    return { exercises: [] };
  }

  const key = process.env.EXERCISES_API_KEY;
  if (!key) {
    return { exercises: [], error: 'Exercise API key is not configured.' };
  }

  const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(
    trimmedQuery.toLowerCase(),
  )}?limit=100&offset=0`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
  } catch {
    return {
      exercises: [],
      error: 'Could not reach the exercise database. Check your connection.',
    };
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error('ExerciseDB error:', res.status, body);
    return {
      exercises: [],
      error: `Exercise database returned an error (${res.status}). Try again later.`,
    };
  }

  let data: RawExercise[];
  try {
    data = await res.json();
  } catch {
    return { exercises: [], error: 'Unexpected response from the exercise database.' };
  }

  const exercises: ExerciseResult[] = data
    .filter((ex) => ex.bodyPart.toLowerCase() === bodyPart.toLowerCase())
    .slice(0, 5)
    .map(({ id, name, bodyPart: bp, equipment, target, secondaryMuscles, instructions }) => ({
      id,
      name,
      bodyPart: bp,
      equipment,
      target,
      secondaryMuscles,
      instructions,
    }));

  return { exercises };
}
