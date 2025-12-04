import { Languages, BookOpen, Brain, Settings } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/translator', icon: Languages, label: 'Translate' },
  { to: '/vocabulary', icon: BookOpen, label: 'Vocabulary' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center w-full h-full text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    isActive && "bg-primary/10"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-0.5 font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
