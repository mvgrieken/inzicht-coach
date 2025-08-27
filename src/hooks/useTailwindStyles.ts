import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import tw from '@/utils/tailwind';

/**
 * Performance-optimized hook for consistent Tailwind styling
 * Memoizes commonly used style combinations to prevent unnecessary recalculations
 */

export function useTailwindStyles() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Memoize common style patterns to improve performance
  const commonStyles = useMemo(() => ({
    // Layout styles
    screen: tw`flex-1 bg-neutral-50 dark:bg-neutral-900`,
    container: tw`p-4`,
    card: tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm`,
    
    // Typography styles
    heading: tw`text-2xl font-bold text-primary-500 mb-6 text-center`,
    sectionTitle: tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`,
    bodyText: tw`text-base text-neutral-800 dark:text-neutral-200`,
    secondaryText: tw`text-sm text-neutral-600 dark:text-neutral-400`,
    
    // Interactive elements
    primaryButton: tw`bg-primary-500 p-3 rounded-lg items-center`,
    secondaryButton: tw`bg-neutral-200 dark:bg-neutral-600 p-3 rounded-lg items-center`,
    outlineButton: tw`border border-primary-500 p-3 rounded-lg items-center`,
    
    // Status indicators
    successText: tw`text-green-600 dark:text-green-400`,
    warningText: tw`text-orange-600 dark:text-orange-400`, 
    errorText: tw`text-red-600 dark:text-red-400`,
    
    // Input fields
    textInput: tw`bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-2 text-neutral-800 dark:text-neutral-200`,
    
    // Stats and metrics
    statCard: tw`flex-1 bg-white dark:bg-neutral-800 p-4 rounded-lg items-center shadow-sm`,
    statNumber: tw`text-3xl font-bold text-primary-500`,
    statLabel: tw`text-sm text-neutral-600 dark:text-neutral-400 mt-1 text-center`,
    
    // Progress elements
    progressBar: tw`h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden`,
    progressFill: tw`h-full bg-primary-500 rounded-full`,
    
  }), [isDark]);

  // Dynamic style generators
  const getButtonStyle = useMemo(() => (
    variant: 'primary' | 'secondary' | 'outline' | 'ghost',
    size: 'sm' | 'md' | 'lg' = 'md'
  ) => {
    const baseClasses = 'items-center justify-center rounded-lg';
    const sizeClasses = {
      sm: 'px-3 py-2',
      md: 'px-4 py-3', 
      lg: 'px-6 py-4'
    };
    
    const variantClasses = {
      primary: 'bg-primary-500 active:bg-primary-600',
      secondary: 'bg-secondary-500 active:bg-secondary-600',
      outline: 'border border-primary-500 bg-transparent active:bg-primary-50 dark:active:bg-primary-900/20',
      ghost: 'bg-transparent active:bg-neutral-100 dark:active:bg-neutral-700'
    };
    
    return tw`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  }, []);

  const getTextStyle = useMemo(() => (
    variant: 'heading' | 'body' | 'caption' | 'small',
    color: 'primary' | 'text' | 'secondary' | 'success' | 'warning' | 'error' = 'text'
  ) => {
    const variantClasses = {
      heading: 'text-xl font-semibold',
      body: 'text-base',
      caption: 'text-sm',
      small: 'text-xs'
    };
    
    const colorClasses = {
      primary: 'text-primary-500',
      text: 'text-neutral-800 dark:text-neutral-200',
      secondary: 'text-neutral-600 dark:text-neutral-400',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-orange-600 dark:text-orange-400',
      error: 'text-red-600 dark:text-red-400'
    };
    
    return tw`${variantClasses[variant]} ${colorClasses[color]}`;
  }, []);

  return {
    isDark,
    colorScheme,
    styles: commonStyles,
    getButtonStyle,
    getTextStyle,
  };
}