import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { useAuthContext } from '@/contexts/AuthContext';
import tw from '@/utils/tailwind';

export default function IndexScreen() {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  
  // Debug: Check environment variables
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    // Add some debug logging for web deployment
    console.log('IndexScreen mounted');
    console.log('Supabase URL:', supabaseUrl ? 'SET' : 'NOT SET');
    console.log('Supabase Key:', supabaseKey ? 'SET' : 'NOT SET');
    console.log('Loading:', loading, 'User:', user ? 'LOGGED IN' : 'NOT LOGGED IN');

    // Add delay to prevent race conditions
    const timer = setTimeout(() => {
      console.log('Timer fired - Loading:', loading, 'User:', user ? 'LOGGED IN' : 'NOT LOGGED IN');
      if (!loading) {
        if (user) {
          console.log('Redirecting to tabs');
          router.replace('/(tabs)');
        } else {
          console.log('Redirecting to login');
          router.replace('/auth/login');
        }
      } else {
        console.log('Still loading, waiting...');
      }
    }, 500); // Increased delay

    return () => clearTimeout(timer);
  }, [user, loading, router, supabaseUrl, supabaseKey]);

  return (
    <View style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center p-4`}>
      <Text style={tw`text-2xl font-bold text-primary-500 mb-4`}>
        Inzicht Coach
      </Text>
      <Text style={tw`text-base text-neutral-600 dark:text-neutral-400 mb-4`}>
        {loading ? 'Laden...' : 'Initialiseren...'}
      </Text>
      
      {/* Debug info for web */}
      {__DEV__ && (
        <View style={tw`bg-gray-100 p-4 rounded-lg mt-4`}>
          <Text style={tw`text-xs text-gray-600 mb-2`}>Debug Info:</Text>
          <Text style={tw`text-xs text-gray-600`}>
            Supabase URL: {supabaseUrl ? 'SET' : 'NOT SET'}
          </Text>
          <Text style={tw`text-xs text-gray-600`}>
            Supabase Key: {supabaseKey ? 'SET' : 'NOT SET'}
          </Text>
          <Text style={tw`text-xs text-gray-600`}>
            Loading: {loading ? 'true' : 'false'}
          </Text>
        </View>
      )}
    </View>
  );
}
