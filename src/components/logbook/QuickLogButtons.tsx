import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import tw from '@/utils/tailwind';

interface QuickLogButtonsProps {
  onLogDrinks: (count: number) => void;
  disabled?: boolean;
}

export function QuickLogButtons({ onLogDrinks, disabled = false }: QuickLogButtonsProps) {
  const buttons = [
    { count: 0, label: '0 glazen', emoji: '✅' },
    { count: 1, label: '1 glas', emoji: '🥃' },
    { count: 2, label: '2 glazen', emoji: '🍺' },
    { count: 3, label: '3+ glazen', emoji: '🍷' },
  ];

  return (
    <View style={tw`flex-row flex-wrap gap-2`}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.count}
          style={tw`flex-1 min-w-20 bg-white dark:bg-neutral-800 p-3 rounded-lg items-center shadow-sm ${
            disabled ? 'opacity-50' : ''
          }`}
          onPress={() => onLogDrinks(button.count === 3 ? 3 : button.count)}
          disabled={disabled}
        >
          <Text style={tw`text-lg mb-1`}>{button.emoji}</Text>
          <Text style={tw`text-neutral-800 dark:text-neutral-200 text-xs font-medium text-center`}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}