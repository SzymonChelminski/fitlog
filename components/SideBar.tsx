import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';
import type { IconType } from 'react-icons';

import { getUser } from '@/lib/supabase/auth';
import { cn } from '@/lib/utils';

import { FaBars } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { IoLogIn } from 'react-icons/io5';
import { TiUserAdd } from 'react-icons/ti';
import { RiDashboardFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';

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
import { buttonVariants } from '@/components/ui/button-variants';

import Logo from './Logo';
import SignOutButton from './SignOutButton';
import UserProfileCard from './UserProfileCard';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

function NavLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: IconType;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-custom-text-muted hover:text-custom-text-main flex items-center gap-4 rounded-lg px-3 py-3 text-base transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
    >
      <Icon className="size-5 shrink-0" />
      {label}
    </Link>
  );
}

function Divider() {
  return <div className="mx-3 border-t border-custom-border" />;
}

export default async function SideBar() {
  const { user } = await getUser();

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ size: 'icon', variant: 'ghost' }),
          "cursor-pointer text-custom-text-main hover:bg-transparent hover:text-custom-text-main dark:hover:bg-transparent"
        )}
      >
        <FaBars className="size-5" />
      </SheetTrigger>

      <SheetContent
        className="bg-custom-page flex h-full flex-col overflow-y-scroll border-custom-border text-custom-text-main [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        showCloseButton={false}
      >
        <SheetHeader className="px-6 pb-4 pt-6">
          <SheetTitle>
            <Logo isText={true} size={40} />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Application navigation sidebar.
          </SheetDescription>
        </SheetHeader>

        <section className="flex h-full flex-col gap-8 px-6 py-4">

          <section className="text-custom-text-muted flex flex-col gap-2">
            {user ? (
              <UserProfileCard />
            ) : (
              <>
                <h2 className={`${bebas.className} text-5xl font-bold text-custom-text-main`}>
                  Ready to{' '}
                  <span className="text-custom-primary">evolve?</span>
                </h2>
                <p className="text-sm leading-relaxed">
                  Log in to view your profile and personalized workout data.
                  Your Kinetic Observatory awaits.
                </p>
              </>
            )}
          </section>

          <nav className="flex flex-col">
            <NavLink href="/dashboard" icon={RiDashboardFill} label="Dashboard" />
            <Divider />
            <NavLink href="/profile" icon={FaUserCircle} label="My Profile" />
            <Divider />
            <NavLink href="/workouts" icon={GiWeightLiftingUp} label="My Workouts" />
            <Divider />
            <NavLink href="/settings" icon={IoMdSettings} label="Settings" />
          </nav>

        </section>

        <SheetFooter className="px-6 pb-10 pt-6">
          <section className="flex flex-col gap-2 w-full">
            {user ? (
              <SignOutButton />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    "bg-custom-primary hover:bg-indigo-500 w-full cursor-pointer rounded-lg py-4 text-sm font-semibold text-white dark:text-white flex items-center justify-center"
                  )}
                >
                  <IoLogIn className="size-5 shrink-0" />
                  <span className="ml-1">Log In</span>
                </Link>
                <Link
                  href="/auth/register"
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    "text-custom-text-muted hover:text-custom-text-main w-full cursor-pointer rounded-lg border border-custom-border bg-black/[0.10] py-4 text-sm font-semibold hover:bg-black/[0.16] dark:bg-white/[0.10] dark:hover:bg-white/[0.16] flex items-center justify-center"
                  )}
                >
                  <TiUserAdd className="size-5 shrink-0" />
                  <span className="ml-1">Create Account</span>
                </Link>
              </>
            )}
          </section>

          <p className="mt-4 text-custom-text-muted/40 text-xs">
            SYSTEM VERSION
            <br />
            v1.0.0-STABLE
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
