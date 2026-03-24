'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Zap, Code2, Sparkles, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (user) {
        setIsLoggedIn(true);
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  if (!mounted || isLoggedIn) {
    return null;
  }
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
                ✨ AI-Powered Development
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Generate Websites with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Natural Language</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Transform your ideas into production-ready Next.js websites instantly. Just describe what you want, and let AI handle the code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/ide">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base h-12">
                <Zap className="w-5 h-5" />
                Launch IDE
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/auth/sign-up">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-card text-base h-12"
              >
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to build beautiful, functional websites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors duration-200 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to create amazing websites</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}
                </div>
                <div className="space-y-2 pt-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Why Choose Vibe Coding?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex gap-4 items-start p-4 rounded-lg hover:bg-card/50 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 rounded-2xl border border-primary/20">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers building faster with Vibe Coding
            </p>
          </div>

          <Link href="/generator">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base h-12">
              <Rocket className="w-5 h-5" />
              Launch Generator
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const features = [
  {
    title: 'AI-Powered Generation',
    description: 'Advanced AI models understand your requirements and generate clean, production-ready code.',
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Next.js & React',
    description: 'Built on modern frameworks with TypeScript, Tailwind CSS, and best practices.',
    icon: <Code2 className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Real-time Streaming',
    description: 'Watch your code being generated in real-time with instant feedback and updates.',
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
];

const steps = [
  {
    title: 'Describe Your Vision',
    description: 'Write a simple description of the website you want to build',
  },
  {
    title: 'AI Creates Code',
    description: 'Our AI generates complete, working Next.js code instantly',
  },
  {
    title: 'Deploy & Customize',
    description: 'Copy the code and deploy it, then customize as needed',
  },
];

const benefits = [
  'Save hours of development time on repetitive tasks',
  'Get production-ready code you can deploy immediately',
  'Learn best practices from AI-generated code',
  'Iterate faster with instant code generation',
  'No more boilerplate writing',
  'Scale your productivity exponentially',
];
