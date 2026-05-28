'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce
    .number()
    .min(14, 'Must be at least 14')
    .max(100, 'Must be under 100'),
  weight: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.coerce
      .number()
      .min(30, 'Weight must be at least 30 kg')
      .max(300, 'Weight must be under 300 kg')
      .optional(),
  ),
  height: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.coerce
      .number()
      .min(100, 'Height must be at least 100 cm')
      .max(250, 'Height must be under 250 cm')
      .optional(),
  ),
  goal: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.enum(['muscle_gain', 'weight_loss', 'athleticsm', 'longevity']).optional(),
  ),
  experience: z.enum(['beginner', 'intermediate', 'advanced'], {
    error: 'Experience is required',
  }),
  gender: z.preprocess(
    (v) => (v === '' || v == null ? undefined : v),
    z.enum(['male', 'female', 'other']).optional(),
  ),
});

export interface ProfileFormState {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
}

export async function updateProfile(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const { user } = await getUser();
  if (!user) return { success: false, message: 'Not authenticated.' };

  const raw = {
    name:       formData.get('name'),
    age:        formData.get('age'),
    weight:     formData.get('weight'),
    height:     formData.get('height'),
    goal:       formData.get('goal'),
    experience: formData.get('experience'),
    gender:     formData.get('gender'),
  };

  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = String(issue.path[0]);
      if (!errors[key]) errors[key] = issue.message;
    });
    return { success: false, errors };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name:       parsed.data.name,
        age:        parsed.data.age,
        weight:     parsed.data.weight ?? null,
        height:     parsed.data.height ?? null,
        goal:       parsed.data.goal ?? null,
        experience: parsed.data.experience,
        gender:     parsed.data.gender ?? null,
      },
    });
    return { success: true, message: 'Profile saved.' };
  } catch {
    return { success: false, message: 'Failed to save profile. Please try again.' };
  }
}

export async function deleteAccount(): Promise<{ success: boolean; message?: string }> {
  const { user } = await getUser();
  if (!user) return { success: false, message: 'Not authenticated.' };

  try {
    await prisma.user.delete({ where: { id: user.id } });
  } catch {
    return { success: false, message: 'Failed to delete account. Please try again.' };
  }

  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect('/');
}
