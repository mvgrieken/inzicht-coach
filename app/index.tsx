import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import tw from '@/utils/tailwind';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('🆕 NEW VERSION 5.0.0 - NO TABS ROUTE - TIMESTAMP:', Date.now());
console.log('🚀 COMPLETE ROUTING RESET - NO AUTH CONTEXT - NO TABS');
    
    // Force redirect to login immediately
    const timer = setTimeout(() => {
      console.log('Redirecting to login page...');
      router.replace('/auth/login');
    }, 50);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center p-4`}>
      <Text style={tw`text-2xl font-bold text-primary-500 mb-4`}>
        Inzicht Coach v5.0.0
      </Text>
      <Text style={tw`text-base text-neutral-600 dark:text-neutral-400 mb-4`}>
        Force Cache Bust - Redirecting to login...
      </Text>
      <Text style={tw`text-sm text-neutral-500 mb-2`}>
        Timestamp: {Date.now()}
      </Text>
      <Text style={tw`text-xs text-neutral-400`}>
        If you see this for more than 1 second, refresh the page
      </Text>
    </View>
  );
}
