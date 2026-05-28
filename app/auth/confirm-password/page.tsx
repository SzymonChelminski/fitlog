import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function ConfirmPasswordPage() {
  const updatePassword = async (formData: FormData) => {
    'use server'
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) return redirect('/auth/confirm-password?error=' + error.message)
    return redirect('/auth/sign-in?message=Password updated')
  }

  return (
    <form action={updatePassword} className="flex flex-col gap-4 max-w-sm m-auto mt-20">
      <h1 className="text-xl font-bold">Enter New Password</h1>
      <input name="password" type="password" placeholder="New Password" required className="p-2 border text-black" />
      <button className="bg-green-600 text-white p-2 rounded">Update Password</button>
    </form>
  )
}