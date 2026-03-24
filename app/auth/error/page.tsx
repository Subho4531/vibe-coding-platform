import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
            <p className="text-muted-foreground">
              Something went wrong during authentication. Please try again.
            </p>
          </div>

          <Link href="/auth/login">
            <Button className="w-full" size="lg">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
