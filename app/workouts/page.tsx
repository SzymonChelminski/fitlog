import React from 'react';
import { getUser } from '@/lib/supabase/auth';
import { prisma } from '@/lib/prisma';

import { IoMdListBox } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { MdOutlineBolt } from 'react-icons/md';
import Link from 'next/link';

import PlanLibrary from '@/components/PlanLibrary';

export default async function page() {
  const { user, error } = await getUser();

  const userProfile = await prisma.user.findUnique({
    where: { id: user!.id },
    include: {
      trainingPlans: true,
    },
  });

  return (
    <section className="bg-primary flex flex-1 justify-center p-4 text-white">
      {userProfile?.trainingPlans === undefined ||
      userProfile?.trainingPlans.length < 1 ? (
        <section className="flex flex-col items-center justify-around gap-4">
          <span className="bg-custom-card-bg rounded-full p-10">
            <IoMdListBox className="text-custom-text-muted size-50" />
          </span>
          <span className="text-center">
            <h2 className="mb-2 text-2xl">No Workouts Yet</h2>
            <p className="text-custom-text-muted px-8">
              Your training library is empty. Create your first custom routine
              to start tracking your progress.
            </p>
          </span>
          <Link href="/workouts/add-workout">
            <Button className="bg-custom-primary rounded-full p-4 px-8 text-lg">
              BUILD FIRST WORKOUT <MdOutlineBolt className="size-6" />
            </Button>
          </Link>
        </section>
      ) : (
        <section className="bg-primary flex flex-1 flex-col">
          <span className="flex flex-col gap-2">
            <h2 className="text-custom-secondary font-bold">YOUR COLLECTION</h2>
            <h1 className="text-custom-text-main text-4xl font-medium">
              My Library
            </h1>
          </span>
          <PlanLibrary routines={userProfile?.trainingPlans} />
        </section>
      )}
    </section>
  );
}
