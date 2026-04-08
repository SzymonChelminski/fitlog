import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function SignUpPage() {
  const signUp = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();
    const origin = (await headers()).get('origin');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });

    if (error) return redirect('/auth/sign-up?error=' + error.message);
    return redirect('/auth/sign-in');
  };

  return (
    <form
      action={signUp}
      className="m-auto mt-20 flex max-w-sm flex-col gap-4 text-black"
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Hasło"
        required
        className="border p-2"
      />
      <button className="rounded bg-blue-600 p-2 text-white">
        Zarejestruj się
      </button>
    </form>
  );
}
