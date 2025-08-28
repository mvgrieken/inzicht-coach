import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/contexts/AuthContext';
import tw from '@/utils/tailwind';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <ScrollView style={tw`flex-1 p-6`}>
        <View style={tw`mb-8`}>
          <Text style={tw`text-3xl font-bold text-primary-500 mb-2`}>
            Dashboard v6.0.0
          </Text>
          <Text style={tw`text-base text-neutral-600 dark:text-neutral-400`}>
            Welkom terug, {user?.email || 'Gebruiker'}!
          </Text>
        </View>

        <View style={tw`bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
            Inzicht Coach Features
          </Text>
          
          <View style={tw`space-y-4`}>
            <TouchableOpacity 
              style={tw`bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800`}
              onPress={() => console.log('Coach feature coming soon')}
            >
              <Text style={tw`text-lg font-medium text-blue-700 dark:text-blue-300 mb-1`}>
                🤖 AI Coach
              </Text>
              <Text style={tw`text-sm text-blue-600 dark:text-blue-400`}>
                Chat met je persoonlijke AI coach
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={tw`bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800`}
              onPress={() => console.log('Logbook feature coming soon')}
            >
              <Text style={tw`text-lg font-medium text-green-700 dark:text-green-300 mb-1`}>
                📝 Logboek
              </Text>
              <Text style={tw`text-sm text-green-600 dark:text-green-400`}>
                Houd je voortgang bij
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={tw`bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800`}
              onPress={() => console.log('Knowledge feature coming soon')}
            >
              <Text style={tw`text-lg font-medium text-purple-700 dark:text-purple-300 mb-1`}>
                📚 Kennisbank
              </Text>
              <Text style={tw`text-sm text-purple-600 dark:text-purple-400`}>
                Leer meer over jezelf
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`bg-white dark:bg-neutral-800 rounded-lg p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
            Account
          </Text>
          
          <TouchableOpacity 
            style={tw`bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800`}
            onPress={handleSignOut}
          >
            <Text style={tw`text-lg font-medium text-red-700 dark:text-red-300 text-center`}>
              Uitloggen
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800`}>
          <Text style={tw`text-sm text-blue-700 dark:text-blue-300 text-center`}>
            🎉 Succes! Je bent nu ingelogd en ziet de nieuwe dashboard.
          </Text>
          <Text style={tw`text-xs text-blue-600 dark:text-blue-400 text-center mt-2`}>
            Geen (tabs) redirects meer!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
