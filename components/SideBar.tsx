import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';

// Icons
import { FaBars, FaDatabase } from 'react-icons/fa6';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { IoLogIn } from 'react-icons/io5';
import { RiDashboardFill } from 'react-icons/ri';

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

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

export default function SideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="cursor-pointer">
          <FaBars className="size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-primary flex h-full flex-col border-none text-white"
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
        <section className="flex h-full flex-col gap-6 p-4">
          <section className="text-custom-text-muted text-md flex flex-col gap-1 font-medium">
            <h2 className={`${bebas.className} text-5xl font-bold text-white`}>
              Ready to <span className="text-custom-primary">evolve?</span>
            </h2>
            <p>
              Log in to view your profile and personalized workout data. Your
              Kinetic Observatory awaits.
            </p>
          </section>
          <nav className="text-custom-text-main/80 flex flex-col justify-center gap-2">
            <Link href={'/'} className="flex items-center gap-4 text-3xl">
              <RiDashboardFill size={30} />
              <p>Dashboard</p>
            </Link>
            <Link href={'/'} className="flex items-center gap-4 text-3xl">
              <GiWeightLiftingUp size={30} />
              <p>My workouts</p>
            </Link>
            <Link href={'/'} className="flex items-center gap-4 text-3xl">
              <FaDatabase size={30} />
              <p>All Exercises</p>
            </Link>
          </nav>
        </section>
        <SheetFooter className="text-custom-text-muted/50">
          <section className="flex flex-col gap-2">
            <Button
              className="text-custom-background-dark bg-custom-primary cursor-pointer py-8 text-xl font-bold"
              variant="default"
              size="lg"
            >
              <IoLogIn className="size-6" />
              Log In
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-custom-text-main/80 border-custom-text-main/20 cursor-pointer bg-transparent py-8 text-xl"
            >
              Create account
            </Button>
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
