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
  resetPasswordEmailSchema,
  resetPasswordEmailData,
  resetPasswordSchema,
  resetPasswordData,
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
    return {
      success: false as const,
      errors: undefined,
      message: 'Invalid email or password. Please check your credentials and try again.',
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!dbUser) {
    await supabase.auth.signOut();
    return {
      success: false as const,
      errors: undefined,
      message: 'No account found for this email. Please register to create an account.',
    };
  }

  return redirect('/dashboard');
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
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  const isAlreadyInAuth =
    authError?.message === 'User already registered' ||
    (authData?.user != null && (authData.user.identities ?? []).length === 0);

  if (isAlreadyInAuth) {
    const { data: signInResult, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !signInResult?.user) {
      return {
        success: false as const,
        errors: undefined,
        message:
          'This email address is already registered. Please log in instead.',
      };
    }

    const existingProfile = await prisma.user.findUnique({
      where: { id: signInResult.user.id },
      select: { id: true },
    });

    if (existingProfile) {
      return {
        success: false as const,
        errors: undefined,
        message:
          'This email address is already registered. Please log in instead.',
      };
    }

    try {
      await prisma.user.create({
        data: {
          id: signInResult.user.id,
          email,
          name,
          age,
          gender,
          height,
          weight,
          goal,
          experience,
          hasCompletedOnboarding: true,
        },
      });
    } catch {
      await supabase.auth.signOut();
      return {
        success: false as const,
        errors: undefined,
        message: 'Failed to save your profile. Please try again.',
      };
    }

    return redirect('/dashboard');
  }

  if (authError || !authData?.user) {
    return {
      success: false as const,
      errors: undefined,
      message: authError?.message ?? 'Registration failed. Please try again.',
    };
  }

  try {
    await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        name,
        age,
        gender,
        height,
        weight,
        goal,
        experience,
        hasCompletedOnboarding: true,
      },
    });
  } catch {
    return {
      success: false as const,
      errors: undefined,
      message: 'Failed to save your profile. Please try again.',
    };
  }

  await supabase.auth.signInWithPassword({ email, password });

  return redirect('/dashboard');
}

export async function checkEmailExists(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true },
  });

  return !!user;
}

export async function sendPasswordResetLink(data: resetPasswordEmailData) {
  const validation = await resetPasswordEmailSchema.safeParseAsync(data);

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

  const { email } = validation.data;
  const supabase = await createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    return {
      success: false,
      errors: undefined,
      message: error.message,
    };
  }

  return {
    success: true,
    errors: undefined,
    message: 'Check your email for the reset link.',
  };
}

export async function resetPassword(data: resetPasswordData) {
  const validation = await resetPasswordSchema.safeParseAsync(data);

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

  const { password } = validation.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return redirect(
      '/reset-password?error=' + encodeURIComponent(error.message),
    );
  }

  return {
    success: true,
    message: 'Password updated successfully',
  };
}
