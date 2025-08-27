import { Tabs, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import tw from '@/utils/tailwind';

// Icon component with Tailwind styling
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <Text style={tw`text-2xl ${focused ? 'text-primary-500' : 'text-neutral-500'}`}>
      {name === 'dashboard' && '📊'}
      {name === 'logbook' && '📝'}
      {name === 'coach' && '🤖'}
      {name === 'knowledge' && '📚'}
      {name === 'profile' && '👤'}
    </Text>
  );
}

export default function TabLayout() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center`}>
        <Text style={tw`text-lg text-neutral-600 dark:text-neutral-400`}>
          Laden...
        </Text>
      </View>
    );
  }

  if (!user) {
    return null; // Redirect is handled in useEffect
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tw.color('primary-500'),
        tabBarInactiveTintColor: tw.color('neutral-500'),
        headerStyle: {
          backgroundColor: tw.color('primary-500'),
        },
        headerTintColor: tw.color('white'),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: tw.color('white dark:bg-neutral-800'),
          borderTopColor: tw.color('neutral-200 dark:border-neutral-700'),
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerTitle: 'Inzicht Coach',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="dashboard" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="logbook"
        options={{
          title: 'Dagboek',
          headerTitle: 'Dagboek',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="logbook" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: 'AI Coach',
          headerTitle: 'AI Coach',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="coach" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="knowledge"
        options={{
          title: 'Kennis',
          headerTitle: 'Kennisbank',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="knowledge" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profiel',
          headerTitle: 'Mijn Profiel',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}