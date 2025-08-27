import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import tw from '@/utils/tailwind';
import { useAuthContext } from '@/contexts/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Fout', 'Vul alle velden in');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Fout', 'Wachtwoorden komen niet overeen');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Fout', 'Wachtwoord moet minimaal 6 karakters lang zijn');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        Alert.alert('Registreren mislukt', error.message);
      } else {
        Alert.alert(
          'Gelukt!', 
          'Check je email voor een verificatielink.',
          [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
        );
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
          <Text style={tw`text-base text-neutral-600 dark:text-neutral-400 text-center`}>
            Maak een account om te beginnen
          </Text>
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
            Naam (optioneel)
          </Text>
          <TextInput
            style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-3 text-neutral-800 dark:text-neutral-200 text-base`}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Je naam"
            placeholderTextColor={tw.color('neutral-500')}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
            Email
          </Text>
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

        <View style={tw`mb-4`}>
          <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
            Wachtwoord
          </Text>
          <TextInput
            style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-3 text-neutral-800 dark:text-neutral-200 text-base`}
            value={password}
            onChangeText={setPassword}
            placeholder="Minimaal 6 karakters"
            placeholderTextColor={tw.color('neutral-500')}
            secureTextEntry
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
            Bevestig wachtwoord
          </Text>
          <TextInput
            style={tw`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-3 text-neutral-800 dark:text-neutral-200 text-base`}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Herhaal je wachtwoord"
            placeholderTextColor={tw.color('neutral-500')}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={tw`bg-primary-500 rounded-lg p-4 items-center mb-4 ${
            isLoading ? 'opacity-50' : ''
          }`}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={tw`text-white font-semibold text-base`}>
            {isLoading ? 'Account maken...' : 'Account maken'}
          </Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-neutral-600 dark:text-neutral-400`}>
            Al een account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={tw`text-primary-500 font-medium`}>
              Inloggen
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}