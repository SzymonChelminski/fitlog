import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/supabase/auth';

import { FaCircleUser } from 'react-icons/fa6';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const getUserGoal = (goal: string | null | undefined) => {
  switch (goal) {
    case 'muscle_gain': return 'Muscle Gain';
    case 'weight_loss': return 'Weight Loss';
    case 'athleticsm':  return 'Athleticism';
    case 'longevity':   return 'Longevity';
    default:            return null;
  }
};

export default async function UserProfileCard() {
  const { user } = await getUser();

  const userProfile = await prisma.user.findUnique({
    where:  { id: user!.id },
    select: { name: true, goal: true, image: true },
  });

  const goal = getUserGoal(userProfile?.goal);

  const initials = userProfile?.name
    ? userProfile.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
    : '';

  return (
    <section className="flex flex-col items-center gap-3 py-2 text-center">
      <Avatar className="outline-custom-primary size-28 outline-2 outline-offset-2">
        {userProfile?.image ? (
          <AvatarImage
            src={userProfile.image}
            alt="profile picture"
            className="size-full"
          />
        ) : (
          <AvatarFallback className="bg-custom-primary/10">
            {initials ? (
              <span className="text-3xl font-medium text-custom-primary">{initials}</span>
            ) : (
              <FaCircleUser className="text-custom-text-muted/60 size-full" />
            )}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex flex-col gap-0.5">
        <p className="text-custom-text-main text-base font-medium leading-tight">
          {userProfile?.name}
        </p>
        {goal && (
          <p className="text-custom-secondary text-xs font-medium uppercase tracking-wide">
            {goal}
          </p>
        )}
      </div>
    </section>
  );
}
