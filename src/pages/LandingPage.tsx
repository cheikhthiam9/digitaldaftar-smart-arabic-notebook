import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { BookOpen, Languages, Brain, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

const features = [
  {
    icon: Languages,
    title: 'Instant Translation',
    description: 'Translate Arabic ↔ French/English with AI-powered accuracy',
  },
  {
    icon: BookOpen,
    title: 'Personal Vocabulary',
    description: 'Save words and build your personalized learning bank',
  },
  {
    icon: Brain,
    title: 'Smart Flashcards',
    description: 'Practice with adaptive quizzes that match your level',
  },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  // Redirect to translator if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/translator" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl">DigitalDaftar</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="hero" asChild className="hidden sm:inline-flex">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Arabic Learning
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Your Smart{' '}
            <span className="text-gradient-primary">Arabic Learning</span>{' '}
            Companion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Master Arabic with instant translations, personal vocabulary building, 
            and AI-powered flashcards. Perfect for French and English speakers.
          </motion.p>

          {/* Arabic sample text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block bg-card border border-border rounded-2xl px-6 py-4 mb-10 shadow-lg"
          >
            <p className="font-arabic text-2xl md:text-3xl text-foreground mb-2" dir="rtl">
              مرحباً بك في رحلة التعلم
            </p>
            <p className="text-muted-foreground text-sm">
              "Welcome to your learning journey"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/login">I have an account</Link>
            </Button>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 DigitalDaftar. Start your Arabic learning journey today.</p>
        </div>
      </footer>
    </div>
  );
}
