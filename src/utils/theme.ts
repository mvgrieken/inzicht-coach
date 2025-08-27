export const theme = {
  colors: {
    primary: '#D2691E', // Chocolate/Orange
    primaryLight: '#F4A460', // Sandy Brown
    primaryDark: '#8B4513', // Saddle Brown
    
    secondary: '#2E8B57', // Sea Green
    secondaryLight: '#90EE90', // Light Green
    secondaryDark: '#006400', // Dark Green
    
    background: '#F5F5F5', // White Smoke
    surface: '#FFFFFF', // White
    card: '#FFFFFF', // White
    
    text: '#333333', // Dark Gray
    textSecondary: '#666666', // Medium Gray
    textLight: '#999999', // Light Gray
    textWhite: '#FFFFFF', // White
    white: '#FFFFFF', // White alias
    
    success: '#4CAF50', // Green
    warning: '#FF9800', // Orange
    error: '#F44336', // Red
    info: '#2196F3', // Blue
    
    border: '#E0E0E0', // Light Gray
    divider: '#EEEEEE', // Very Light Gray
    
    // Mood colors
    moodVeryBad: '#F44336',
    moodBad: '#FF7043',
    moodNeutral: '#FFC107',
    moodGood: '#4CAF50',
    moodVeryGood: '#2E7D32',
    
    // Special colors
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    weights: {
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
} as const;

export type Theme = typeof theme;