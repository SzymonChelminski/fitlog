import { prisma } from '@/lib/prisma';

export async function GET() {
  await prisma.user.findFirst({
    select: {
      id: true,
    },
  });

  return Response.json({ ok: true });
}
