import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';

// Supabase configuration - hardcoded for immediate functionality
const supabaseUrl = 'https://trrsgvxoylhcudtiimvb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRycnNndnhveWxoY3VkdGlpbXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxOTQ3OTIsImV4cCI6MjA3MTc3MDc5Mn0.PG4cDu5UVUwE4Kp7NejdTcxdJDypkpdpQSO97Ipl8kQ';

// Force use hardcoded values (ignore environment variables)
const finalSupabaseUrl = supabaseUrl;
const finalSupabaseAnonKey = supabaseAnonKey;

console.log('🔧 Supabase Config Check:');
console.log('URL:', finalSupabaseUrl ? '✅ SET' : '❌ MISSING');
console.log('Key:', finalSupabaseAnonKey ? '✅ SET' : '❌ MISSING');
console.log('✅ Creating real Supabase client');

// Create Supabase client with enhanced configuration
export const supabase = createClient<Database>(finalSupabaseUrl, finalSupabaseAnonKey, {
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
