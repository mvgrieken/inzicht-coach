import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import tw from '@/utils/tailwind';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonClasses = () => {
    let classes = 'items-center justify-center rounded-lg shadow-sm ';
    
    // Variants
    switch (variant) {
      case 'primary':
        classes += 'bg-primary-500 ';
        break;
      case 'secondary':
        classes += 'bg-secondary-500 ';
        break;
      case 'outline':
        classes += 'bg-transparent border border-primary-500 ';
        break;
      case 'ghost':
        classes += 'bg-transparent ';
        break;
    }
    
    // Sizes
    switch (size) {
      case 'sm':
        classes += 'px-4 py-1 min-h-8 ';
        break;
      case 'md':
        classes += 'px-6 py-2 min-h-11 ';
        break;
      case 'lg':
        classes += 'px-8 py-4 min-h-13 ';
        break;
    }
    
    // Disabled state
    if (disabled) {
      classes += 'opacity-50 ';
    }
    
    return classes;
  };

  const getTextClasses = () => {
    let classes = 'text-center font-semibold ';
    
    // Text colors based on variant
    switch (variant) {
      case 'primary':
      case 'secondary':
        classes += 'text-white ';
        break;
      case 'outline':
      case 'ghost':
        classes += 'text-primary-500 ';
        break;
    }
    
    // Text sizes
    switch (size) {
      case 'sm':
        classes += 'text-sm ';
        break;
      case 'md':
        classes += 'text-base ';
        break;
      case 'lg':
        classes += 'text-lg ';
        break;
    }
    
    return classes;
  };

  return (
    <TouchableOpacity
      style={[tw`${getButtonClasses()}`, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[tw`${getTextClasses()}`, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}