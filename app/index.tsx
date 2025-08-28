import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import tw from '@/utils/tailwind';

export default function IndexScreen() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log('🆕 NEW VERSION 7.0.0 - FIXED TABS REDIRECT - TIMESTAMP:', Date.now());
console.log('🚀 NO MORE (TABS) REDIRECTS - NEW DASHBOARD');
    
    // Force redirect to login with state management
    const timer = setTimeout(() => {
      console.log('Setting redirect state...');
      setIsRedirecting(true);
      
      const redirectTimer = setTimeout(() => {
        console.log('Redirecting to login page...');
        router.replace('/auth/login');
      }, 100);
      
      return () => clearTimeout(redirectTimer);
    }, 50);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={tw`flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 justify-center items-center p-6`}>
      <View style={tw`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-sm w-full`}>
        <Text style={tw`text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6`}>
          Inzicht Coach v7.0.0
        </Text>
        
        <View style={tw`items-center mb-6`}>
          <ActivityIndicator size="large" color={tw.color('blue-500')} />
        </View>
        
        <Text style={tw`text-lg text-center text-gray-700 dark:text-gray-300 mb-4`}>
          {isRedirecting ? 'Redirecting to login...' : 'Initializing...'}
        </Text>
        
        <Text style={tw`text-sm text-center text-gray-500 dark:text-gray-400 mb-2`}>
          Timestamp: {Date.now()}
        </Text>
        
        <Text style={tw`text-xs text-center text-gray-400 dark:text-gray-500`}>
          Complete rewrite - Force rebuild
        </Text>
      </View>
    </View>
  );
}
