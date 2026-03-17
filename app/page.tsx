import SignOutButton from '@/components/SignOutButton'
import { getUser } from '@/lib/supabase/auth';
import { redirect } from 'next/navigation'

export default async function Home() {
  const { user } = await getUser();

  if (!user) redirect('/auth/sign-in');

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Hello, {user.email}</h1>
    <SignOutButton />
    </main>
  );
}