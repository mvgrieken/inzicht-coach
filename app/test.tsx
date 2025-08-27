import { View, Text } from 'react-native';
import tw from '@/utils/tailwind';

export default function TestScreen() {
  return (
    <View style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center p-4`}>
      <Text style={tw`text-3xl font-bold text-primary-500 mb-6`}>
        🎉 Inzicht Coach Test
      </Text>
      
      <View style={tw`bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md w-full`}>
        <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
          ✅ Web Deployment Succesvol!
        </Text>
        
        <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-2`}>
          • React Native Web: ✅ Werkt
        </Text>
        <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-2`}>
          • Tailwind CSS: ✅ Werkt  
        </Text>
        <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-2`}>
          • Expo Router: ✅ Werkt
        </Text>
        <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-4`}>
          • Netlify Hosting: ✅ Werkt
        </Text>
        
        <View style={tw`bg-green-50 p-3 rounded border border-green-200`}>
          <Text style={tw`text-green-800 font-medium text-center`}>
            🚀 App is ready voor gebruik!
          </Text>
        </View>
      </View>
      
      <Text style={tw`text-xs text-neutral-500 mt-8 text-center`}>
        Environment Check:
      </Text>
      <Text style={tw`text-xs text-neutral-500 text-center`}>
        Supabase URL: {process.env.EXPO_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ MISSING'}
      </Text>
      <Text style={tw`text-xs text-neutral-500 text-center`}>
        Supabase Key: {process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ MISSING'}
      </Text>
    </View>
  );
}