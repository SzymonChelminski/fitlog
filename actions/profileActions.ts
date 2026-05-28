'use server';

import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/supabase/auth';

export interface AvatarActionState {
  success: boolean;
  message?: string;
}

export async function updateAvatar(
  _prev: AvatarActionState,
  formData: FormData,
): Promise<AvatarActionState> {
  const { user } = await getUser();
  if (!user) return { success: false, message: 'Not authenticated.' };

  const imageData = formData.get('image') as string | null;
  if (!imageData) return { success: false, message: 'No image provided.' };

  if (imageData.length > 700_000)
    return { success: false, message: 'Image is too large (max ~500 KB).' };

  if (!imageData.startsWith('data:image/'))
    return { success: false, message: 'Invalid image format.' };

  try {
    await prisma.user.update({
      where: { id: user.id },
      data:  { image: imageData },
    });
    return { success: true };
  } catch {
    return { success: false, message: 'Failed to save avatar.' };
  }
}
