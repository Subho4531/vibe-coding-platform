import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AuthCallbackPage() {
  const supabase = await createClient()

  // Get the session after OAuth callback
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error || !session) {
    redirect('/auth/error')
  }

  // Redirect to dashboard on successful auth
  redirect('/dashboard')
}
