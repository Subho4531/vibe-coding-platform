import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function LoginPage() {
  const supabase = await createClient()

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  const handleGithubSignIn = async () => {
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
            <h1 className="text-3xl font-bold text-foreground">Vibe Coding</h1>
            <p className="text-muted-foreground">AI-powered code generation platform</p>
          </div>

          {/* GitHub Sign In */}
          <form action={handleGithubSignIn} className="space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white gap-2 py-6 text-base font-semibold"
            >
              <Github className="w-5 h-5" />
              Sign In with GitHub
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

          {/* Sign Up Link */}
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/sign-up" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Features */}
          <div className="pt-4 border-t border-border space-y-3">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Features</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Free AI models (Llama, Mistral, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Monaco editor IDE in browser</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span>
                <span>Live code preview & execution</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}
