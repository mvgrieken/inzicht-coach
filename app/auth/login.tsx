import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import tw from '@/utils/tailwind';
import { useAuthContext } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('test@inzichtcoach.nl');
  const [password, setPassword] = useState('test123456');
  const [isLoading, setIsLoading] = useState(false);



  // Safe AuthContext usage with graceful fallback (no setState in render)
  let authContext: ReturnType<typeof useAuthContext> | null = null;
  let signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  try {
    authContext = useAuthContext();
    signIn = authContext.signIn;
  } catch (error) {
    console.warn('AuthContext error:', error);
    signIn = async () => ({ data: null, error: { message: 'Demo mode - AuthContext not available' } });
  }

  const handleLogin = async () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      Alert.alert('Fout', 'Vul een geldig email adres in');
      return;
    }

    if (!password) {
      Alert.alert('Fout', 'Vul je wachtwoord in');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        Alert.alert('Inloggen mislukt', error.message);
      } else if (data?.user) {
        // Successfully logged in
        router.replace('/dashboard');
      }
    } catch (error) {
      Alert.alert('Fout', 'Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <View style={tw`flex-1 p-6 justify-center`}>
        

        <View style={tw`mb-8`}>
          <Text style={tw`text-3xl font-bold text-primary-500 text-center mb-2`}>
            Welkom bij Inzicht Coach!
          </Text>
                     <Text style={tw`text-base text-neutral-600 dark:text-neutral-400 text-center mb-4`}>
             Log in om je voortgang te bekijken
           </Text>


        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>Email</Text>
          <TextInput
            style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-3 text-neutral-800 dark:text-neutral-200 text-base`}
            value={email}
            onChangeText={setEmail}
            placeholder="je@email.com"
            placeholderTextColor={tw.color('neutral-500')}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>Wachtwoord</Text>
          <TextInput
            style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-3 text-neutral-800 dark:text-neutral-200 text-base`}
            value={password}
            onChangeText={setPassword}
            placeholder="Wachtwoord"
            placeholderTextColor={tw.color('neutral-500')}
            secureTextEntry
            autoComplete="current-password"
            textContentType="password"
          />
        </View>

        <TouchableOpacity
          style={tw`bg-primary-500 rounded-lg p-4 items-center mb-4 ${isLoading ? 'opacity-50' : ''}`}
          onPress={handleLogin}
          disabled={isLoading}
        >
                     <Text style={tw`text-white font-semibold text-base`}>
             {isLoading ? 'Inloggen...' : 'Inloggen'}
           </Text>
        </TouchableOpacity>

        

        <View style={tw`flex-row justify-center mb-4`}>
          <Text style={tw`text-neutral-600 dark:text-neutral-400`}>Nog geen account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text style={tw`text-primary-500 font-medium`}>Registreren</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => {
            Alert.prompt(
              'Wachtwoord vergeten',
              'Vul je email adres in om je wachtwoord te resetten:',
              [
                { text: 'Annuleren', style: 'cancel' },
                {
                  text: 'Versturen',
                  onPress: async (email) => {
                    if (email) {
                      try {
                        const { error } = await authContext?.resetPassword(email) || { error: null };
                        if (error) {
                          Alert.alert('Fout', error.message);
                        } else {
                          Alert.alert('Email verstuurd', 'Check je email voor een reset link.');
                        }
                      } catch (error) {
                        Alert.alert('Fout', 'Er ging iets mis. Probeer het opnieuw.');
                      }
                    }
                  }
                }
              ],
              'plain-text',
              email
            );
          }}
        >
          <Text style={tw`text-primary-500 font-medium text-sm`}>Wachtwoord vergeten?</Text>
        </TouchableOpacity>

        {/* Quick test login */}
        <TouchableOpacity
          style={tw`mt-8 p-3 border border-primary-200 dark:border-primary-800 rounded-lg items-center`}
          onPress={() => {
            setEmail('test@inzichtcoach.nl');
            setPassword('test123456');
          }}
        >
          <Text style={tw`text-primary-500 font-medium text-sm`}>Test account gebruiken</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
