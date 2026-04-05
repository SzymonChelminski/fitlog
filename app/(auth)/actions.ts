'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  signUpSchema,
  signUpData,
  signInSchema,
  signInData,
} from '@/lib/validation/auth';

export async function signIn(data: signInData) {
  const validation = await signInSchema.safeParseAsync(data);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};

    validation.error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as string;
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = issue.message;
      }
    });

    return {
      success: false,
      errors: fieldErrors,
      message: undefined,
    };
  }

  const { email, password } = validation.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/auth/sign-in?error=' + encodeURIComponent(error.message));
  }

  return redirect('/');
}

export async function signUp(data: signUpData) {
  const validation = await signUpSchema.safeParseAsync(data);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};

    validation.error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as string;
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = issue.message;
      }
    });

    return {
      success: false,
      errors: fieldErrors,
      message: undefined,
    };
  }

  const {
    email,
    password,
    name,
    age,
    gender,
    height,
    weight,
    goal,
    experience,
  } = validation.data;

  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
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
        email: email,
        name: name,
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        goal: goal,
        experience: experience,
        hasCompletedOnboarding: true,
      },
    });
  } catch (dbError) {
    return redirect('/auth/sign-up?error=Database+Error');
  }

  return redirect('/');
}

export async function checkEmailExists(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true },
  });

  return !!user;
}
