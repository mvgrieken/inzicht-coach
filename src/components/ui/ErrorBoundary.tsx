import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from '@/utils/tailwind';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you would send this to an error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReportError = () => {
    const { error, errorInfo } = this.state;
    
    // In production, you might want to open a support form or email
    Alert.alert(
      'Fout melden',
      'Er is een fout opgetreden. Wil je dit melden aan het support team?',
      [
        { text: 'Annuleren', style: 'cancel' },
        { 
          text: 'Melden', 
          onPress: () => {
            // Here you would typically open a support form or email
            console.log('Error report:', { error, errorInfo });
            Alert.alert('Bedankt', 'Je melding is ontvangen. We gaan dit zo snel mogelijk oplossen.');
          }
        }
      ]
    );
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center p-6`}>
          <View style={tw`bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm w-full`}>
            <Text style={tw`text-4xl text-center mb-4`}>😔</Text>
            <Text style={tw`text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center mb-2`}>
              Oeps! Er ging iets mis
            </Text>
            <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 text-center mb-6 leading-5`}>
              Er is een onverwachte fout opgetreden. Probeer de app opnieuw te starten of neem contact op met support.
            </Text>
            
            <View style={tw`space-y-3`}>
              <TouchableOpacity
                style={tw`bg-primary-500 p-3 rounded-lg items-center`}
                onPress={this.handleReset}
              >
                <Text style={tw`text-white font-medium`}>
                  Opnieuw proberen
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={tw`bg-neutral-200 dark:bg-neutral-700 p-3 rounded-lg items-center`}
                onPress={this.handleReportError}
              >
                <Text style={tw`text-neutral-700 dark:text-neutral-300 font-medium`}>
                  Fout melden
                </Text>
              </TouchableOpacity>
            </View>
            
            {__DEV__ && this.state.error && (
              <View style={tw`mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg`}>
                <Text style={tw`text-xs text-red-600 dark:text-red-400 font-mono`}>
                  {this.state.error.toString()}
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    // In production, you would send this to an error tracking service
    // Example: Sentry.captureException(error, { tags: { context } });
    
    // You might also want to show a toast or alert to the user
    Alert.alert(
      'Fout',
      'Er is een fout opgetreden. Probeer het opnieuw.',
      [{ text: 'OK' }]
    );
  };

  return { handleError };
}
