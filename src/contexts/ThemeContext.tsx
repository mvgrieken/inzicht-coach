import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import tw from '@/utils/tailwind';

interface ThemeContextType {
  isDark: boolean;
  colorScheme: 'light' | 'dark';
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme() || 'light';
  const isDark = colorScheme === 'dark';

  const colors = {
    primary: tw.color('primary-500'),
    background: tw.color(isDark ? 'neutral-900' : 'neutral-50'),
    surface: tw.color(isDark ? 'neutral-800' : 'white'),
    text: tw.color(isDark ? 'neutral-200' : 'neutral-800'),
    textSecondary: tw.color(isDark ? 'neutral-400' : 'neutral-600'),
    border: tw.color(isDark ? 'neutral-700' : 'neutral-200'),
    success: tw.color('green-600'),
    warning: tw.color('orange-600'),
    error: tw.color('red-600'),
  };

  const value: ThemeContextType = {
    isDark,
    colorScheme,
    colors: {
      primary: colors.primary || '#3B82F6',
      background: colors.background || '#FFFFFF',
      surface: colors.surface || '#F8FAFC',
      text: colors.text || '#1F2937',
      textSecondary: colors.textSecondary || '#6B7280',
      border: colors.border || '#E5E7EB',
      success: colors.success || '#10B981',
      warning: colors.warning || '#F59E0B',
      error: colors.error || '#EF4444',
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}