import 'react-native-url-polyfill/auto';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useDeviceContext } from 'twrnc';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import tw from '@/utils/tailwind';

// Create a client with enhanced configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: false, // Don't retry mutations by default
      onError: (error: any) => {
        console.error('Mutation error:', error);
        // In production, you might want to send this to an error tracking service
      },
    },
  },
});

export default function RootLayout() {
  // Enable dark mode support
  useDeviceContext(tw);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}