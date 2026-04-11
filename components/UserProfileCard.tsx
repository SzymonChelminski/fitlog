import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/supabase/auth';

import { FaCircleUser } from 'react-icons/fa6';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const getUserGoal = (goal: string | null | undefined) => {
  if (!goal) return;

  switch (goal) {
    case 'muscle_gain':
      return 'Muscle gain';
    case 'weight_loss':
      return 'Weight loss';
    case 'athleticsm':
      return 'Athleticsm';
    case 'longevity':
      return 'Longevity';
  }
};

export default async function UserProfileCard() {
  const { user } = await getUser();

  const userProfile = await prisma.user.findUnique({
    where: { id: user!.id },
    include: {
      trainingPlans: true,
    },
  });

  return (
    <section>
      <section className="flex items-center gap-2">
        <Avatar className="outline-custom-primary m-2 size-25 outline-3 outline-offset-2">
          {userProfile?.image ? (
            <AvatarImage
              src={userProfile.image}
              alt="profile picture"
              className="size-full"
            />
          ) : (
            <AvatarFallback className="bg-custom-text-muted">
              <FaCircleUser className="text-primary size-full" />
            </AvatarFallback>
          )}
        </Avatar>
        <span>
          <p className="text-custom-text-main text-xl wrap-break-word">
            {userProfile?.name}
          </p>
          <p className="text-sm break-all">
            Goal:{' '}
            <span className="text-custom-secondary">
              {getUserGoal(userProfile?.goal)}
            </span>
          </p>
        </span>
      </section>
    </section>
  );
}
