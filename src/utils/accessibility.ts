import tw from './tailwind';

/**
 * WCAG AA compliant colors for dark mode
 * Ensures 4.5:1 contrast ratio for normal text, 3:1 for large text
 */

export const a11yColors = {
  // High contrast text combinations
  textOnPrimary: {
    light: tw.color('white'), // White on primary-500
    dark: tw.color('white'),  // White on primary-500 (same, good contrast)
  },
  
  textOnBackground: {
    light: tw.color('neutral-900'), // Dark text on light background
    dark: tw.color('neutral-100'),  // Light text on dark background
  },
  
  textSecondary: {
    light: tw.color('neutral-600'), // Medium contrast on light
    dark: tw.color('neutral-400'),  // Medium contrast on dark
  },
  
  // Interactive elements
  focusRing: {
    light: tw.color('primary-500'),
    dark: tw.color('primary-400'), // Slightly lighter for dark mode visibility
  },
  
  // Status colors with proper contrast
  success: {
    light: tw.color('green-700'), // Darker green for light mode
    dark: tw.color('green-400'),  // Lighter green for dark mode
  },
  
  warning: {
    light: tw.color('orange-700'),
    dark: tw.color('orange-400'),
  },
  
  error: {
    light: tw.color('red-700'),
    dark: tw.color('red-400'),
  },
};

/**
 * Get accessible color based on current theme
 */
export const getAccessibleColor = (
  colorKey: keyof typeof a11yColors,
  isDark: boolean
): string => {
  const colorSet = a11yColors[colorKey];
  return isDark ? (colorSet.dark || '#000000') : (colorSet.light || '#FFFFFF');
};

/**
 * Accessibility helper classes for common patterns
 */
export const a11yStyles = {
  // Focus states for keyboard navigation
  focusable: 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none',
  
  // Touch targets (minimum 44px as per Apple HIG)
  touchTarget: 'min-h-11 min-w-11',
  
  // Text contrast classes
  highContrast: 'text-neutral-900 dark:text-neutral-100',
  mediumContrast: 'text-neutral-700 dark:text-neutral-300', 
  lowContrast: 'text-neutral-600 dark:text-neutral-400',
  
  // Interactive states
  interactive: 'active:opacity-70 focus:opacity-80',
  
  // Screen reader optimizations
  screenReaderOnly: 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
};

/**
 * Generate accessible Tailwind classes for interactive elements
 */
export const createAccessibleButton = (variant: 'primary' | 'secondary' | 'outline' = 'primary') => {
  const baseClasses = 'items-center justify-center rounded-lg transition-all duration-150 ' +
    a11yStyles.touchTarget + ' ' + a11yStyles.focusable + ' ' + a11yStyles.interactive;
  
  switch (variant) {
    case 'primary':
      return baseClasses + ' bg-primary-500 hover:bg-primary-600 active:bg-primary-700';
    case 'secondary':
      return baseClasses + ' bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700';
    case 'outline':
      return baseClasses + ' bg-transparent border-2 border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20';
    default:
      return baseClasses;
  }
};