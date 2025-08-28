import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuthContext } from '@/contexts/AuthContext';
import tw from '@/utils/tailwind';

export default function IndexScreen() {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log('🆕 NEW VERSION 8.0.0 - SUPABASE AUTH - TIMESTAMP:', Date.now());
    console.log('🚀 AUTH STATUS - Loading:', loading, 'User:', user ? 'LOGGED IN' : 'NOT LOGGED IN');
    
    // Wait for auth to load, then redirect
    if (!loading) {
      const timer = setTimeout(() => {
        console.log('Setting redirect state...');
        setIsRedirecting(true);
        
        const redirectTimer = setTimeout(() => {
          if (user) {
            console.log('User is logged in, redirecting to dashboard...');
            router.replace('/dashboard');
          } else {
            console.log('User not logged in, redirecting to login...');
            router.replace('/auth/login');
          }
        }, 100);
        
        return () => clearTimeout(redirectTimer);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [user, loading, router]);

  return (
    <View style={tw`flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 justify-center items-center p-6`}>
      <View style={tw`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-sm w-full`}>
        <Text style={tw`text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6`}>
          Inzicht Coach v8.0.0
        </Text>
        
        <View style={tw`items-center mb-6`}>
          <ActivityIndicator size="large" color={tw.color('blue-500')} />
        </View>
        
        <Text style={tw`text-lg text-center text-gray-700 dark:text-gray-300 mb-4`}>
          {loading ? 'Checking authentication...' : 
           isRedirecting ? 'Redirecting...' : 
           user ? 'Welcome back!' : 'Please log in'}
        </Text>
        
        <Text style={tw`text-sm text-center text-gray-500 dark:text-gray-400 mb-2`}>
          Auth Status: {loading ? 'Loading...' : user ? 'Logged In' : 'Not Logged In'}
        </Text>
        
        <Text style={tw`text-xs text-center text-gray-400 dark:text-gray-500`}>
          Supabase Auth - Version 8.0.0
        </Text>
      </View>
    </View>
  );
}
