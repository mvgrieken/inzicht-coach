import React, { createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return default values instead of throwing error
    return {
      session: null,
      user: null,
      loading: true,
      signIn: async () => ({ data: null, error: new Error('AuthContext not available') }),
      signUp: async () => ({ data: null, error: new Error('AuthContext not available') }),
      signOut: async () => ({ error: new Error('AuthContext not available') }),
      resetPassword: async () => ({ data: null, error: new Error('AuthContext not available') }),
    };
  }
  return context;
}