import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import tw from '@/utils/tailwind';

export function ThemeTest() {
  const colorScheme = useColorScheme();
  
  return (
    <View style={tw`p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm m-4`}>
      <Text style={tw`text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2`}>
        Theme Test Component
      </Text>
      
      <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-4`}>
        Current scheme: {colorScheme || 'unknown'}
      </Text>
      
      {/* Color swatches */}
      <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
        <View style={tw`w-8 h-8 bg-primary-500 rounded`} />
        <View style={tw`w-8 h-8 bg-secondary-500 rounded`} />
        <View style={tw`w-8 h-8 bg-success rounded`} />
        <View style={tw`w-8 h-8 bg-warning rounded`} />
        <View style={tw`w-8 h-8 bg-error rounded`} />
      </View>
      
      {/* Text samples */}
      <Text style={tw`text-base text-neutral-800 dark:text-neutral-200 mb-1`}>
        Primary text
      </Text>
      <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-1`}>
        Secondary text
      </Text>
      <Text style={tw`text-xs text-neutral-500 dark:text-neutral-500 mb-4`}>
        Tertiary text
      </Text>
      
      {/* Interactive elements */}
      <TouchableOpacity style={tw`bg-primary-500 p-2 rounded mb-2`}>
        <Text style={tw`text-white text-center font-medium`}>
          Primary Button
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={tw`border border-primary-500 p-2 rounded`}>
        <Text style={tw`text-primary-500 text-center font-medium`}>
          Outline Button  
        </Text>
      </TouchableOpacity>
    </View>
  );
}