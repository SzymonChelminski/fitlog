import React from 'react';
import { redirect } from 'next/navigation';
import getWorkoutByid from '@/services/getWorkoutById';
import { getExerciseById } from '@/actions/exerciseActions';
import type { Exercise } from '@/types/exercise';
import WorkoutClient from './WorkoutClient';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/supabase/auth';

export default async function workoutDetails({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const workoutId = (await params).workoutId;
  const workout = await getWorkoutByid(workoutId);
  const { user } = await getUser();

  if (!user) redirect('/auth/login');
  if (!workout) redirect('/workouts');

  const exercises = (
    await Promise.all(workout.exerciseIds.map((id: string) => getExerciseById(id)))
  ).filter((ex): ex is Exercise => ex !== null);

  const lastWorkout = await prisma.workoutLog.findFirst({
    where: {
      userId: user.id,
      workoutName: workout.title,
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  const previousData: Record<string, { weight: number; reps: number }[]> = {};
  if (lastWorkout) {
    lastWorkout.exercises.forEach((ex: { exerciseId: string; sets: { weight: number; reps: number }[] }) => {
      previousData[ex.exerciseId] = ex.sets.map((set) => ({
        weight: set.weight,
        reps: set.reps,
      }));
    });
  }

  return (
    <main className="bg-custom-page relative flex flex-1 flex-col gap-6 px-4 py-6 pb-24 sm:px-6">
      <WorkoutClient
        workout={workout}
        exercises={exercises}
        previousData={previousData}
      />
    </main>
  );
}
