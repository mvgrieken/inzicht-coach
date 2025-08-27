import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';

// Environment variables with strict validation
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing required environment variables: EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY must be set'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch {
  throw new Error('Invalid EXPO_PUBLIC_SUPABASE_URL format');
}

// Create Supabase client with enhanced configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'inzicht-coach/1.0.0',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Health check function
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
};
