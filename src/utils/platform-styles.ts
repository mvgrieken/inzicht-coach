import { Platform } from 'react-native';
import tw from './tailwind';

/**
 * Platform-specific Tailwind utilities
 * Enhanced styling based on iOS/Android/Web platform
 */

export const platformStyles = {
  // Safe area handling
  safeArea: Platform.select({
    ios: tw`pt-safe-offset-2`,
    android: tw`pt-6`,
    web: tw`pt-4`,
    default: tw`pt-4`,
  }),

  // Shadow variations per platform
  cardShadow: Platform.select({
    ios: tw`shadow-lg`,
    android: tw`elevation-4`,
    web: tw`shadow-md`,
    default: tw`shadow-sm`,
  }),

  // Button interactions
  buttonPress: Platform.select({
    ios: tw`active:opacity-70`,
    android: tw`active:bg-primary-600`,
    web: tw`hover:bg-primary-600 active:bg-primary-700`,
    default: tw`active:opacity-70`,
  }),

  // Typography fine-tuning
  heading: Platform.select({
    ios: tw`font-semibold tracking-tight`,
    android: tw`font-bold`,
    web: tw`font-semibold antialiased`,
    default: tw`font-semibold`,
  }),

  // Input fields
  textInput: Platform.select({
    ios: tw`border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-3`,
    android: tw`border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2`,
    web: tw`border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500`,
    default: tw`border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-3`,
  }),
};

/**
 * Get platform-optimized Tailwind classes
 */
export const getPlatformStyle = (styles: {
  ios?: string;
  android?: string;
  web?: string;
  default?: string;
}): string => {
  return Platform.select({
    ios: styles.ios || styles.default || '',
    android: styles.android || styles.default || '',
    web: styles.web || styles.default || '',
    default: styles.default || '',
  }) as string;
};

/**
 * Combine base classes with platform-specific enhancements
 */
export const withPlatformStyles = (baseClasses: string, platformStyles: {
  ios?: string;
  android?: string;
  web?: string;
}): string => {
  const platformSpecific = getPlatformStyle({
    ios: platformStyles.ios,
    android: platformStyles.android,
    web: platformStyles.web,
    default: '',
  });
  
  return `${baseClasses} ${platformSpecific}`.trim();
};