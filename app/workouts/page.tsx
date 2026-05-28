import React from 'react';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/auth';
import { prisma } from '@/lib/prisma';

import { IoMdListBox } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { MdOutlineBolt } from 'react-icons/md';
import Link from 'next/link';

import PlanLibrary from '@/components/PlanLibrary';

export default async function page() {
  const { user } = await getUser();
  if (!user) redirect('/auth/login');

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      trainingPlans: true,
    },
  });

  return (
    <main className="bg-custom-page flex flex-1 flex-col px-4 py-6 text-custom-text-main sm:px-6 sm:py-8">
      {userProfile?.trainingPlans === undefined ||
      userProfile?.trainingPlans.length < 1 ? (
        <section className="flex flex-1 flex-col items-center justify-center gap-6 py-12">
          <span className="bg-custom-card-bg rounded-full p-10">
            <IoMdListBox className="text-custom-text-muted size-20" />
          </span>
          <div className="text-center">
            <h2 className="mb-2 text-2xl text-custom-text-main">No Workouts Yet</h2>
            <p className="text-custom-text-muted mx-auto max-w-xs px-4 text-sm leading-relaxed sm:max-w-sm">
              Your training library is empty. Create your first custom routine
              to start tracking your progress.
            </p>
          </div>
          <Link href="/workouts/add-workout">
            <Button className="bg-custom-primary rounded-full px-8 py-4 text-base">
              BUILD FIRST WORKOUT <MdOutlineBolt className="size-5" />
            </Button>
          </Link>
        </section>
      ) : (
        <section className="flex flex-1 flex-col gap-6">
          <header className="flex flex-col gap-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-custom-secondary">
              Your Collection
            </p>
            <h1 className="text-3xl font-medium text-custom-text-main">
              My Library
            </h1>
          </header>
          <PlanLibrary routines={userProfile?.trainingPlans} />
        </section>
      )}
    </main>
  );
}
