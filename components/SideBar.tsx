import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';
import { getUser } from '@/lib/supabase/auth';

// Icons
import { FaBars } from 'react-icons/fa6';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { IoLogIn } from 'react-icons/io5';
import { RiDashboardFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

// Shadcn UI
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Local Components
import Logo from './Logo';
import SignOutButton from './SignOutButton';

import UserProfileCard from './UserProfileCard';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

export default async function SideBar() {
  const { user, error } = await getUser();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="cursor-pointer">
          <FaBars className="size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-primary flex h-full flex-col overflow-y-scroll border-none text-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        showCloseButton={false}
      >
        <SheetHeader>
          <SheetTitle>
            <Logo isText={true} size={40} />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Application navigation sidebar.
          </SheetDescription>
        </SheetHeader>
        <section className="-mt-6 flex h-full flex-col gap-6 p-4">
          <section className="text-custom-text-muted text-md flex flex-col gap-1 font-medium">
            {user ? (
              <UserProfileCard />
            ) : (
              <>
                <h2
                  className={`${bebas.className} text-5xl font-bold text-white`}
                >
                  Ready to <span className="text-custom-primary">evolve?</span>
                </h2>
                <p>
                  Log in to view your profile and personalized workout data.
                  Your Kinetic Observatory awaits.
                </p>
              </>
            )}
          </section>
          <nav className="text-custom-text-main/80 flex flex-col justify-center gap-3">
            <Link href={'/'} className="flex items-center gap-4 text-2xl">
              <RiDashboardFill size={25} />
              <p>Dashboard</p>
            </Link>
            <Link href={'/'} className="flex items-center gap-4 text-2xl">
              <FaUserCircle size={25} />
              <p>My Profile</p>
            </Link>
            <Link
              href={'/workouts'}
              className="flex items-center gap-4 text-2xl"
            >
              <GiWeightLiftingUp size={25} />
              <p>My workouts</p>
            </Link>
            <Link href={'/'} className="flex items-center gap-4 text-2xl">
              <IoMdSettings size={25} />
              <p>Settings</p>
            </Link>
          </nav>
        </section>
        <SheetFooter className="text-custom-text-muted/50">
          <section className="flex flex-col gap-2">
            {user ? (
              <SignOutButton />
            ) : (
              <>
                <Link href={'/auth/login'}>
                  <Button
                    className="text-custom-background-dark bg-custom-primary w-full cursor-pointer py-8 text-xl font-bold"
                    variant="default"
                    size="lg"
                  >
                    <IoLogIn className="size-6" />
                    Log In
                  </Button>
                </Link>
                <Link href={'/auth/register'}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-custom-text-main/80 border-custom-text-main/20 w-full cursor-pointer bg-transparent py-8 text-xl"
                  >
                    Create account
                  </Button>
                </Link>
              </>
            )}
          </section>
          <Separator
            orientation="horizontal"
            className="bg-custom-text-muted/25 mt-2"
          />
          <p className="text-xs">
            SYSTEM VERSION <br />
            v1.0.0-STABLE
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
