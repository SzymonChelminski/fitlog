'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { IoLogOut } from 'react-icons/io5';

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <Button
      onClick={handleSignOut}
      className="w-fit cursor-pointer text-2xl font-medium"
      variant="ghost"
    >
      <IoLogOut className="size-7" />
      Sign out
    </Button>
  );
}
