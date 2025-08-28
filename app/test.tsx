import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from '@/utils/tailwind';
import { useAuthContext } from '@/contexts/AuthContext';

export default function TestScreen() {
  const router = useRouter();
  const { user, signIn, signOut } = useAuthContext();

  const testLogin = async () => {
    try {
      const { data, error } = await signIn('test@inzichtcoach.nl', 'test123456');
      if (error) {
        Alert.alert('Test Login Failed', error.message);
      } else {
        Alert.alert('Test Login Success', 'You are now logged in!');
      }
    } catch (error) {
      Alert.alert('Test Login Error', 'Something went wrong');
    }
  };

  const testLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        Alert.alert('Test Logout Failed', error.message);
      } else {
        Alert.alert('Test Logout Success', 'You are now logged out!');
      }
    } catch (error) {
      Alert.alert('Test Logout Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <View style={tw`flex-1 p-6 justify-center`}>
        <Text style={tw`text-3xl font-bold text-primary-500 text-center mb-8`}>
          🧪 Test Page
        </Text>

        <View style={tw`bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm mb-6`}>
          <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
            App Status
          </Text>
          <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-2`}>
            User: {user ? '✅ Logged In' : '❌ Not Logged In'}
          </Text>
          <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-2`}>
            Email: {user?.email || 'N/A'}
          </Text>
          <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400`}>
            Name: {user?.user_metadata?.full_name || 'N/A'}
          </Text>
        </View>

        <View style={tw`space-y-4`}>
          <TouchableOpacity
            style={tw`bg-green-500 rounded-lg p-4 items-center`}
            onPress={testLogin}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              🧪 Test Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-red-500 rounded-lg p-4 items-center`}
            onPress={testLogout}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              🧪 Test Logout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-blue-500 rounded-lg p-4 items-center`}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              🏠 Go to Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`bg-purple-500 rounded-lg p-4 items-center`}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              🔐 Go to Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg`}>
          <Text style={tw`text-sm text-yellow-800 dark:text-yellow-200 text-center`}>
            💡 Tip: Hard refresh (Ctrl+F5) if you see old content
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}