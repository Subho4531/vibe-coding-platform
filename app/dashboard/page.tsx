import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vibe Coding</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.user_metadata?.user_name || user.email}</p>
          </div>
          <form action={handleSignOut}>
            <Button type="submit" variant="outline" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Project */}
          <Link href="/generator">
            <div className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors cursor-pointer group">
              <div className="text-3xl mb-3">✨</div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                New Project
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Generate a new website from natural language
              </p>
            </div>
          </Link>

          {/* Recent Projects */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="text-3xl mb-3">📁</div>
            <h2 className="text-xl font-bold text-foreground">Recent Projects</h2>
            <p className="text-sm text-muted-foreground mt-2">Your generated projects will appear here</p>
          </div>

          {/* Settings */}
          <Link href="/settings">
            <div className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors cursor-pointer group">
              <div className="text-3xl mb-3">⚙️</div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Settings
              </h2>
              <p className="text-sm text-muted-foreground mt-2">Configure API keys and preferences</p>
            </div>
          </Link>
        </div>

        {/* Features */}
        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold text-foreground">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border/50 bg-background">
              <h3 className="font-semibold text-foreground mb-2">🤖 AI Code Generation</h3>
              <p className="text-sm text-muted-foreground">
                Describe your website, and our AI generates complete Next.js code in seconds
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border/50 bg-background">
              <h3 className="font-semibold text-foreground mb-2">🎨 Monaco Editor</h3>
              <p className="text-sm text-muted-foreground">
                Edit code in a full-featured browser IDE with syntax highlighting and intellisense
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border/50 bg-background">
              <h3 className="font-semibold text-foreground mb-2">▶️ Live Preview</h3>
              <p className="text-sm text-muted-foreground">
                Execute and preview code in real-time using Piston API
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border/50 bg-background">
              <h3 className="font-semibold text-foreground mb-2">🚀 Deploy to Vercel</h3>
              <p className="text-sm text-muted-foreground">
                Push your generated code directly to Vercel for instant deployment
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
