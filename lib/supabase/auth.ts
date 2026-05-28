'use server';

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, error };
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true },
  });

  if (!dbUser) {
    return { user: null, error: null };
  }

  return { user, error: null };
}
