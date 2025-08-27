import React from 'react';
import { Text, TextStyle } from 'react-native';
import tw from '@/utils/tailwind';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'text' | 'textSecondary' | 'textLight' | 'white' | 'success' | 'warning' | 'error';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  style?: TextStyle;
}

export function Typography({
  children,
  variant = 'body',
  color = 'text',
  align = 'left',
  weight,
  style,
}: TypographyProps) {
  const getClasses = () => {
    let classes = '';
    
    // Variant styles
    switch (variant) {
      case 'h1':
        classes += 'text-4xl font-bold leading-11 mb-4 ';
        break;
      case 'h2':
        classes += 'text-3xl font-bold leading-9 mb-2 ';
        break;
      case 'h3':
        classes += 'text-2xl font-semibold leading-8 mb-2 ';
        break;
      case 'h4':
        classes += 'text-xl font-semibold leading-7 mb-1 ';
        break;
      case 'body':
        classes += 'text-base leading-6 ';
        break;
      case 'caption':
        classes += 'text-sm leading-5 ';
        break;
      case 'small':
        classes += 'text-xs leading-4 ';
        break;
    }
    
    // Color
    switch (color) {
      case 'primary':
        classes += 'text-primary-500 ';
        break;
      case 'secondary':
        classes += 'text-secondary-500 ';
        break;
      case 'text':
        classes += 'text-neutral-800 dark:text-neutral-200 ';
        break;
      case 'textSecondary':
        classes += 'text-neutral-600 dark:text-neutral-400 ';
        break;
      case 'textLight':
        classes += 'text-neutral-500 dark:text-neutral-500 ';
        break;
      case 'white':
        classes += 'text-white ';
        break;
      case 'success':
        classes += 'text-green-600 ';
        break;
      case 'warning':
        classes += 'text-orange-600 ';
        break;
      case 'error':
        classes += 'text-red-600 ';
        break;
    }
    
    // Alignment
    switch (align) {
      case 'center':
        classes += 'text-center ';
        break;
      case 'right':
        classes += 'text-right ';
        break;
      default:
        classes += 'text-left ';
        break;
    }
    
    // Weight override
    if (weight) {
      switch (weight) {
        case 'normal':
          classes += 'font-normal ';
          break;
        case 'medium':
          classes += 'font-medium ';
          break;
        case 'semibold':
          classes += 'font-semibold ';
          break;
        case 'bold':
          classes += 'font-bold ';
          break;
      }
    }
    
    return classes.trim();
  };

  return (
    <Text style={[tw`${getClasses()}`, style]}>
      {children}
    </Text>
  );
}