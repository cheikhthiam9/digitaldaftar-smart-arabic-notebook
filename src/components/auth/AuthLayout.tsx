import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">DigitalDaftar</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6 md:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground mt-2">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-center text-sm text-muted-foreground">
        <p>© 2024 DigitalDaftar. All rights reserved.</p>
      </footer>
    </div>
  );
}
