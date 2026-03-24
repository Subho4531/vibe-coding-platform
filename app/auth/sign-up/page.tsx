import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default async function SignUpPage() {
  const supabase = await createClient()

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  const handleGithubSignUp = async () => {
    'use server'
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (error) {
      redirect('/auth/error')
    }

    if (data.url) {
      redirect(data.url)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-6">
          {/* Logo/Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground">Join Vibe Coding today</p>
          </div>

          {/* GitHub Sign Up */}
          <form action={handleGithubSignUp} className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white gap-2 py-6 text-base font-semibold"
            >
              <Github className="w-5 h-5" />
              Sign Up with GitHub
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">or</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="pt-4 border-t border-border space-y-3">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">What you get</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                <span>Unlimited project generations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                <span>Deploy to Vercel directly</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">+</span>
                <span>Live code preview & debugging</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Your GitHub account will only be used for authentication
        </p>
      </div>
    </div>
  )
}
