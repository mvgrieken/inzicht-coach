import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import tw from '@/utils/tailwind';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('🆕 NEW VERSION 3.0.0 - Direct redirect to login');
    
    // Force redirect to login immediately
    const timer = setTimeout(() => {
      console.log('Redirecting to login page...');
      router.replace('/auth/login');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center p-4`}>
      <Text style={tw`text-2xl font-bold text-primary-500 mb-4`}>
        Inzicht Coach v3.0.0
      </Text>
      <Text style={tw`text-base text-neutral-600 dark:text-neutral-400 mb-4`}>
        Redirecting to login...
      </Text>
      <Text style={tw`text-sm text-neutral-500`}>
        If you see this for more than 2 seconds, refresh the page
      </Text>
    </View>
  );
}
