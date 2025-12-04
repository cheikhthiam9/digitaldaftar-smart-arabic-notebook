import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrength?: boolean;
  value?: string;
}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 1) return { score, label: 'Weak', color: 'bg-destructive' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-orange-500' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-500' };
  if (score <= 4) return { score, label: 'Strong', color: 'bg-primary' };
  return { score, label: 'Very Strong', color: 'bg-success' };
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength = false, value = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const strength = showStrength ? getPasswordStrength(value) : null;

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={cn('pr-10', className)}
            value={value}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? 'Hide password' : 'Show password'}
            </span>
          </Button>
        </div>
        
        {showStrength && value && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    i <= strength!.score ? strength!.color : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <p className={cn(
              'text-xs font-medium',
              strength!.score <= 1 ? 'text-destructive' :
              strength!.score <= 2 ? 'text-orange-500' :
              strength!.score <= 3 ? 'text-yellow-600' :
              'text-success'
            )}>
              {strength!.label}
            </p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
