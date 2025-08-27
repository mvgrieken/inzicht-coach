import React from 'react';
import { View, ViewStyle } from 'react-native';
import tw from '@/utils/tailwind';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  style, 
  padding = 'md',
  shadow = 'sm' 
}: CardProps) {
  const getPaddingClass = () => {
    switch (padding) {
      case 'xs': return 'p-1';
      case 'sm': return 'p-2';
      case 'md': return 'p-4';
      case 'lg': return 'p-6';
      case 'xl': return 'p-8';
      default: return 'p-4';
    }
  };

  const getShadowClass = () => {
    switch (shadow) {
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow-md';
      case 'lg': return 'shadow-lg';
      default: return 'shadow-sm';
    }
  };

  return (
    <View style={[
      tw`bg-white dark:bg-neutral-800 rounded-lg ${getPaddingClass()} ${getShadowClass()}`,
      style
    ]}>
      {children}
    </View>
  );
}