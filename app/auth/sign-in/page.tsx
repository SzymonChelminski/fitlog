import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default function SignInPage() {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/auth/sign-in?error=' + encodeURIComponent(error.message))
    }

    return redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form 
        action={signIn} 
        className="flex flex-col gap-4 w-full max-w-md bg-white/5 p-8 rounded-xl border border-white/10"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Zaloguj się do FitLog</h1>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white">Email</label>
          <input 
            name="email" 
            type="email" 
            placeholder="twoj@email.com" 
            required 
            className="p-2 rounded bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white">Hasło</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            required 
            className="p-2 rounded bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Zaloguj się
        </button>
        
        <p className="text-sm text-center text-gray-400 mt-4">
          Nie masz konta? <a href="/auth/sign-up" className="text-blue-400 hover:underline">Zarejestruj się</a>
        </p>
      </form>
    </div>
  )
}