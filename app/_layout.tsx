import 'react-native-url-polyfill/auto';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useDeviceContext } from 'twrnc';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import tw from '@/utils/tailwind';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export default function RootLayout() {
  // Enable dark mode support
  useDeviceContext(tw);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <StatusBar style={isDark ? "light" : "dark"} />
          <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: tw.color('primary-500'),
            },
            headerTintColor: tw.color('white'),
            headerTitleStyle: {
              fontWeight: 'bold',
              color: tw.color('white'),
            },
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="onboarding" 
            options={{ 
              headerShown: false,
              gestureEnabled: false 
            }} 
          />
          <Stack.Screen 
            name="auth/login" 
            options={{ 
              title: 'Inloggen',
              presentation: 'modal' 
            }} 
          />
          <Stack.Screen 
            name="auth/register" 
            options={{ 
              title: 'Account aanmaken',
              presentation: 'modal' 
            }} 
          />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}