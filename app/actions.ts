'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/supabase/auth';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

const setSchema = z.object({
  reps: z.number().int().nonnegative(),
  weight: z.number().nonnegative(),
  restTimeSeconds: z.number().int().nonnegative().optional(),
});

const exerciseSchema = z.object({
  exerciseId: z.string(),
  name: z.string(),
  sets: z.array(setSchema),
});

const saveWorkoutSchema = z.object({
  workoutName: z.string().min(1),
  durationMinutes: z.number().int().nonnegative().optional(),
  startTime: z.string().datetime().optional(),
  totalSessionVolume: z.number().nonnegative(),
  exercises: z.array(exerciseSchema),
});

export async function saveWorkout(payload: z.infer<typeof saveWorkoutSchema>) {
  const { user } = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const data = saveWorkoutSchema.parse(payload);

  const workoutLog = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const log = await tx.workoutLog.create({
        data: {
          workoutName: data.workoutName,
          durationMinutes: data.durationMinutes,
          startTime: data.startTime ? new Date(data.startTime) : null,
          totalSessionVolume: data.totalSessionVolume,
          userId: user.id,
          exercises: {
            create: data.exercises.map((ex) => ({
              exerciseId: ex.exerciseId,
              name: ex.name,
              sets: {
                create: ex.sets.map((set) => ({
                  reps: set.reps,
                  weight: set.weight,
                  restTimeSeconds: set.restTimeSeconds,
                })),
              },
            })),
          },
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          totalWorkouts: { increment: 1 },
          totalVolume: { increment: data.totalSessionVolume },
        },
      });

      return log;
    },
  );

  revalidatePath('/workouts');
  return { success: true, workoutLogId: workoutLog.id };
}
