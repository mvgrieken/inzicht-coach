import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from '@/utils/tailwind';
import { Mood } from '@/types';

interface DetailedLogFormProps {
  initialDrinks?: number;
  initialNotes?: string;
  initialMood?: Mood;
  onSubmit: (data: { drinks_count: number; notes?: string; mood?: Mood }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function DetailedLogForm({
  initialDrinks = 0,
  initialNotes = '',
  initialMood,
  onSubmit,
  onCancel,
  isLoading = false,
}: DetailedLogFormProps) {
  const [drinksCount, setDrinksCount] = useState(initialDrinks.toString());
  const [notes, setNotes] = useState(initialNotes);
  const [mood, setMood] = useState<Mood | undefined>(initialMood);

  const moodOptions: { value: Mood; label: string; emoji: string }[] = [
    { value: 'very_good', label: 'Heel goed', emoji: '😄' },
    { value: 'good', label: 'Goed', emoji: '🙂' },
    { value: 'neutral', label: 'Neutraal', emoji: '😐' },
    { value: 'bad', label: 'Slecht', emoji: '😞' },
    { value: 'very_bad', label: 'Heel slecht', emoji: '😢' },
  ];

  const handleSubmit = () => {
    const drinks = parseInt(drinksCount, 10);
    if (isNaN(drinks) || drinks < 0) {
      Alert.alert('Fout', 'Voer een geldig aantal glazen in (0 of hoger)');
      return;
    }

    onSubmit({
      drinks_count: drinks,
      notes: notes.trim() || undefined,
      mood: mood,
    });
  };

  return (
    <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm`}>
      <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
        Dagboek invullen
      </Text>

      {/* Drinks count input */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
          Aantal glazen alcohol
        </Text>
        <TextInput
          style={tw`bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-2 text-neutral-800 dark:text-neutral-200`}
          value={drinksCount}
          onChangeText={setDrinksCount}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={tw.color('neutral-500')}
        />
      </View>

      {/* Mood selection */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
          Hoe voelde je je vandaag?
        </Text>
        <View style={tw`flex-row flex-wrap gap-2`}>
          {moodOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={tw`px-3 py-2 rounded-lg border ${
                mood === option.value
                  ? 'bg-primary-500 border-primary-500'
                  : 'bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600'
              }`}
              onPress={() => setMood(mood === option.value ? undefined : option.value)}
            >
              <Text style={tw`text-xs ${
                mood === option.value
                  ? 'text-white'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}>
                {option.emoji} {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Notes input */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
          Notities (optioneel)
        </Text>
        <TextInput
          style={tw`bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-2 text-neutral-800 dark:text-neutral-200`}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          placeholder="Bijv. 'Uitje met vrienden', 'Stressvolle dag', etc."
          placeholderTextColor={tw.color('neutral-500')}
        />
      </View>

      {/* Action buttons */}
      <View style={tw`flex-row gap-2`}>
        {onCancel && (
          <TouchableOpacity
            style={tw`flex-1 bg-neutral-200 dark:bg-neutral-600 p-3 rounded-lg items-center`}
            onPress={onCancel}
            disabled={isLoading}
          >
            <Text style={tw`text-neutral-700 dark:text-neutral-300 font-medium`}>
              Annuleren
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={tw`flex-1 bg-primary-500 p-3 rounded-lg items-center ${
            isLoading ? 'opacity-50' : ''
          }`}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={tw`text-white font-medium`}>
            {isLoading ? 'Opslaan...' : 'Opslaan'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}