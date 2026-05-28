import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/auth';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();
  if (!user) redirect('/auth/login');
  return <>{children}</>;
}
