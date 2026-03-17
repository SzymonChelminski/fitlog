import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ForgotPasswordPage() {
  const requestReset = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/confirm-password`,
    })

    if (error) return redirect('/auth/forgot-password?error=' + error.message)
    return redirect('/auth/forgot-password?message=Check your email')
  }

  return (
    <form action={requestReset} className="flex flex-col gap-4 max-w-sm m-auto mt-20">
      <h1 className="text-xl font-bold">Reset Password</h1>
      <input name="email" type="email" placeholder="Email" required className="p-2 border text-black" />
      <button className="bg-blue-600 text-white p-2 rounded">Send Reset Link</button>
    </form>
  )
}