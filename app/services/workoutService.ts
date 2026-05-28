'use server';

import { createClient } from '@/lib/supabase/server';

export async function deleteWorkout(workoutId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('TrainingPlan')
    .delete()
    .eq('id', workoutId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateWorkout(workoutId: string, title: string, exerciseIds: string[]) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('TrainingPlan')
    .update({ title, exerciseIds })
    .eq('id', workoutId);

  if (error) {
    throw new Error(error.message);
  }
}