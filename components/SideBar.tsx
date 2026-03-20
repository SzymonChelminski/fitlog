import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';
import { getUser } from '@/lib/supabase/auth';

// Icons
import { FaBars, FaDatabase } from 'react-icons/fa6';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { IoLogIn } from 'react-icons/io5';
import { RiDashboardFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { FaUser } from 'react-icons/fa6';
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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from '@/components/ui/progress';

// Local Components
import Logo from './Logo';
import SignOutButton from './SignOutButton';

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
              <section className="bg-custom-text-muted/10 flex flex-col gap-4 rounded-lg p-4">
                <section className="flex gap-4">
                  <Avatar className="size-20 rounded-md">
                    <AvatarImage
                      className="rounded-lg"
                      src="https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
                    />
                    {/* <AvatarFallback></AvatarFallback> */}
                  </Avatar>
                  <section className="flex flex-col justify-center">
                    <p className="text-custom-text-main text-2xl font-medium">
                      Nicole
                    </p>
                    <p className="text-custom-secondary">Diamond</p>
                  </section>
                </section>
                <section className="flex flex-col gap-2">
                  <span className="flex w-full justify-between">
                    <p>GOAL</p>
                    <p>73%</p>
                  </span>
                  <Progress className="[&>div]:bg-custom-primary" value={73} />
                </section>
              </section>
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
            <Link href={'/'} className="flex items-center gap-4 text-3xl">
              <RiDashboardFill size={30} />
              <p>Dashboard</p>
            </Link>
            <Link href={'/'} className="flex items-center gap-4 text-3xl">
              <FaUserCircle size={30} />
              <p>My Profile</p>
            </Link>
            <Link href={'/'} className="flex items-center gap-4 text-3xl">
              <GiWeightLiftingUp size={30} />
              <p>My workouts</p>
            </Link>
            <Link href={'/'} className="flex items-center gap-4 text-3xl">
              <IoMdSettings size={30} />
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
                <Link href={'/auth/sign-in'}>
                  <Button
                    className="text-custom-background-dark bg-custom-primary w-full cursor-pointer py-8 text-xl font-bold"
                    variant="default"
                    size="lg"
                  >
                    <IoLogIn className="size-6" />
                    Log In
                  </Button>
                </Link>
                <Link href={'/'}>
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
