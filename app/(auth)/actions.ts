'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  age: number | string;
  gender: string;
  height: number | string;
  weight: number | string;
  goal: string;
  experience: string;
};

export async function signUp(data: SignUpData) {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (authError || !authData.user) {
    return redirect(
      '/auth/sign-up?error=' +
        encodeURIComponent(authError?.message || 'Auth error'),
    );
  }

  try {
    await prisma.user.create({
      data: {
        id: authData.user.id,
        email: data.email,
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
        height: Number(data.height),
        weight: Number(data.weight),
        goal: data.goal,
        experience: data.experience,
        hasCompletedOnboarding: true,
      },
    });
  } catch (dbError) {
    return redirect('/auth/sign-up?error=Database+Error');
  }

  return redirect('/');
}
