import { create } from 'zustand';
import type { User, AuthState, LoginCredentials, SignupCredentials } from '@/types';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (credentials: SignupCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

// Mock user for testing
const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  preferredLanguage: 'en',
  subscription: 'free',
  createdAt: new Date(),
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!credentials.email || !credentials.password) {
      set({ isLoading: false });
      return { success: false, error: 'Please fill in all fields' };
    }
    
    if (credentials.password.length < 8) {
      set({ isLoading: false });
      return { success: false, error: 'Invalid email or password' };
    }

    console.log('Login attempt:', { email: credentials.email });
    
    set({ 
      user: { ...mockUser, email: credentials.email },
      isAuthenticated: true,
      isLoading: false 
    });
    
    return { success: true };
  },

  signup: async (credentials) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!credentials.name || !credentials.email || !credentials.password) {
      set({ isLoading: false });
      return { success: false, error: 'Please fill in all fields' };
    }
    
    if (credentials.password !== credentials.confirmPassword) {
      set({ isLoading: false });
      return { success: false, error: 'Passwords do not match' };
    }
    
    if (credentials.password.length < 8) {
      set({ isLoading: false });
      return { success: false, error: 'Password must be at least 8 characters' };
    }

    console.log('Signup attempt:', { name: credentials.name, email: credentials.email });
    
    set({ 
      user: { ...mockUser, name: credentials.name, email: credentials.email },
      isAuthenticated: true,
      isLoading: false 
    });
    
    return { success: true };
  },

  logout: () => {
    console.log('Logout');
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
