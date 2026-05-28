import React from 'react';
import { redirect } from 'next/navigation';
import getWorkoutByid from '@/services/getWorkoutById';
import { getExerciseById, type ExerciseResult } from '@/actions/exerciseActions';
import { getUser } from '@/lib/supabase/auth';
import EditWorkoutClient from './EditWorkoutClient';

export default async function EditWorkoutPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const workoutId = (await params).workoutId;
  const workout = await getWorkoutByid(workoutId);
  const { user } = await getUser();

  if (!user) redirect('/auth/login');
  if (!workout || workout.userId !== user.id) redirect('/workouts');

  const initialExercises = (
    await Promise.all(workout.exerciseIds.map((id: string) => getExerciseById(id)))
  ).filter((ex): ex is ExerciseResult => ex !== null);

  return (
    <section className="bg-custom-page flex flex-1 flex-col gap-6 px-4 py-6 pb-24 text-custom-text-main sm:px-6 sm:py-8">
      <EditWorkoutClient workout={workout} initialExercises={initialExercises} />
    </section>
  );
}
