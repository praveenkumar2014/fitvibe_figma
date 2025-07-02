import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'trainer' | 'consultant' | 'vendor';
  subscription?: 'free' | 'premium' | 'pro';
  hasAccessPass?: boolean;
  createdAt: string;
  profile?: {
    age?: number;
    height?: number;
    weight?: number;
    fitnessGoal?: string;
    activityLevel?: string;
    dietaryPreferences?: string[];
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data with proper role assignment
          const mockUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'user',
            subscription: 'free',
            hasAccessPass: email.includes('admin') ? true : false,
            createdAt: new Date().toISOString(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          };

          set({ user: mockUser, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Login failed');
        }
      },

      signup: async (userData) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newUser: User = {
            id: Date.now().toString(),
            email: userData.email!,
            name: userData.name!,
            role: 'user',
            subscription: 'free',
            hasAccessPass: false,
            createdAt: new Date().toISOString(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
          };

          set({ user: newUser, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('Signup failed');
        }
      },

      logout: () => {
        set({ user: null });
        // Clear any stored tokens
        localStorage.removeItem('token');
      },

      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'fitvibe-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
);