import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';

// Environment variables with fallbacks for development/production
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Supabase config check:');
console.log('URL:', supabaseUrl ? 'SET' : 'MISSING');
console.log('Key:', supabaseAnonKey ? 'SET' : 'MISSING');

// Create a mock client if environment variables are missing (for development/demo)
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables - creating mock client');

  // Mock Supabase client for when env vars are missing
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({
        data: { user: null },
        error: { message: 'Demo mode - environment variables not configured' },
      }),
      signUp: async () => ({
        data: { user: null },
        error: { message: 'Demo mode - environment variables not configured' },
      }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      resetPasswordForEmail: async () => ({ data: null, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({ data: [], error: null }),
          single: () => ({ data: null, error: null }),
          limit: () => ({ data: [], error: null }),
        }),
      }),
      insert: () => ({
        select: () => ({
          single: () => ({ data: null, error: null }),
        }),
      }),
      upsert: () => ({
        select: () => ({
          single: () => ({ data: null, error: null }),
        }),
      }),
      delete: () => ({
        eq: () => ({ error: null }),
      }),
    }),
    rpc: async () => ({ data: null, error: null }),
    functions: {
      invoke: async () => ({
        data: { message: 'Demo response - configure environment variables for full functionality' },
        error: null,
      }),
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
  };
} else {
  console.log('Creating real Supabase client');
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

export { supabase };
