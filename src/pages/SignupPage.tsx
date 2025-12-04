import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Check, X } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { OAuthButtons } from '@/components/auth/OAuthButtons';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

const passwordRequirements = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup, isLoading, isAuthenticated } = useAuthStore();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/translator" replace />;
  }

  const onSubmit = async (data: SignupFormData) => {
    const result = await signup({ name: data.name, email: data.email, password: data.password, confirmPassword: data.confirmPassword });
    
    if (result.success) {
      toast({
        title: 'Account created!',
        description: 'Welcome to DigitalDaftar. Start your learning journey!',
      });
      navigate('/translator');
    } else {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: result.error || 'Please try again.',
      });
    }
  };

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Start your Arabic learning journey today"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={password}
            showStrength
            {...register('password')}
            onChange={(e) => {
              setPassword(e.target.value);
              register('password').onChange(e);
            }}
          />
          
          {/* Password requirements checklist */}
          {password && (
            <div className="space-y-1 pt-1">
              {passwordRequirements.map((req) => {
                const passed = req.test(password);
                return (
                  <div
                    key={req.label}
                    className={cn(
                      'flex items-center gap-2 text-xs transition-colors',
                      passed ? 'text-success' : 'text-muted-foreground'
                    )}
                  >
                    {passed ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <X className="w-3 h-3" />
                    )}
                    {req.label}
                  </div>
                );
              })}
            </div>
          )}
          
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm your password"
            autoComplete="new-password"
            value={confirmPassword}
            {...register('confirmPassword')}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              register('confirmPassword').onChange(e);
            }}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          variant="hero" 
          className="w-full" 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      <div className="mt-6">
        <OAuthButtons />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
