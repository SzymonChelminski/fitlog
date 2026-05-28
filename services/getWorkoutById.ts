import React from 'react';
import { prisma } from '@/lib/prisma';

export default async function getWorkoutByid(workoutId: string) {
  const workout = await prisma.trainingPlan.findUnique({
    where: {
      id: workoutId,
    },
  });

  return workout;
}
