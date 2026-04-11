'use server';

import { getUser } from '@/lib/supabase/auth';
import { prisma } from '@/lib/prisma';

export default async function createTrainingPlan(
  planName: string,
  exerciseIds: Array<string>,
) {
  const { user, error } = await getUser();

  if (error || !user) {
    return {
      success: false,
      error: error?.message || 'User is not authenticated.',
    };
  }

  try {
    const trainingPlan = await prisma.trainingPlan.create({
      data: {
        title: planName,
        exerciseIds: exerciseIds,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return {
      success: true,
      planId: trainingPlan.id,
    };
  } catch (dbError) {
    console.error('Database error:', dbError);
    return {
      success: false,
      error: 'Failed to create training plan.',
    };
  }
}
