import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function SignUpPage() {
  const signUp = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    })

    if (error) return redirect('/auth/sign-up?error=' + error.message)
    return redirect('/auth/sign-in')
  }

  return (
    <form action={signUp} className="flex flex-col gap-4 max-w-sm m-auto mt-20 text-black">
      <input name="email" type="email" placeholder="Email" required className="p-2 border" />
      <input name="password" type="password" placeholder="Hasło" required className="p-2 border" />
      <button className="bg-blue-600 text-white p-2 rounded">Zarejestruj się</button>
    </form>
  )
}