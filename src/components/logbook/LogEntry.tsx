import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '@/utils/tailwind';
import { DailyLog } from '@/types';

interface LogEntryProps {
  log: DailyLog;
  onPress?: () => void;
  goal?: number;
}

export function LogEntry({ log, onPress, goal = 2 }: LogEntryProps) {
  const isWithinGoal = log.drinks_count <= goal;
  const isAlcoholFree = log.drinks_count === 0;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (isAlcoholFree) return 'text-success';
    if (isWithinGoal) return 'text-success';
    return 'text-warning';
  };

  const getStatusText = () => {
    if (isAlcoholFree) return '✅ Alcoholvrij';
    if (isWithinGoal) return '✅ Doel gehaald';
    return '⚠️ Over limiet';
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'very_good': return '😄';
      case 'good': return '🙂';
      case 'neutral': return '😐';
      case 'bad': return '😞';
      case 'very_bad': return '😢';
      default: return '';
    }
  };

  return (
    <TouchableOpacity 
      style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-3 shadow-sm`}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-base font-semibold text-neutral-800 dark:text-neutral-200`}>
          {formatDate(log.date)}
        </Text>
        <Text style={tw`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </Text>
      </View>
      
      <View style={tw`flex-row items-center mb-2`}>
        <Text style={tw`text-lg font-bold text-primary-500 mr-2`}>
          {log.drinks_count}
        </Text>
        <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400`}>
          {log.drinks_count === 1 ? 'glas' : 'glazen'}
        </Text>
        {log.mood && (
          <Text style={tw`ml-auto text-lg`}>
            {getMoodEmoji(log.mood)}
          </Text>
        )}
      </View>
      
      {log.notes && (
        <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 italic mt-1`}>
          {log.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
}