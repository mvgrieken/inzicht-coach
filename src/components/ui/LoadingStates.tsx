import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import tw from '@/utils/tailwind';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 4 }: SkeletonProps) {
  return (
    <View
      style={[
        tw`bg-neutral-200 dark:bg-neutral-700 animate-pulse`,
        { width, height, borderRadius },
      ]}
    />
  );
}

export function SkeletonText({ lines = 3, lineHeight = 16, spacing = 8 }: {
  lines?: number;
  lineHeight?: number;
  spacing?: number;
}) {
  return (
    <View style={tw`space-y-2`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? '60%' : '100%'}
          height={lineHeight}
        />
      ))}
    </View>
  );
}

export function SkeletonCard() {
  return (
    <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm`}>
      <View style={tw`flex-row items-center mb-3`}>
        <Skeleton width={40} height={40} borderRadius={20} />
        <View style={tw`ml-3 flex-1`}>
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <SkeletonText lines={2} />
    </View>
  );
}

export function SkeletonChatMessage() {
  return (
    <View style={tw`mb-3`}>
      <View style={tw`bg-white dark:bg-neutral-800 p-3 rounded-lg rounded-bl-sm mr-12 shadow-sm`}>
        <SkeletonText lines={2} lineHeight={18} />
        <View style={tw`mt-2 flex-row items-center`}>
          <Skeleton width={60} height={12} />
          <Skeleton width={40} height={12} style={tw`ml-2`} />
        </View>
      </View>
    </View>
  );
}

export function SkeletonDailyLog() {
  return (
    <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm mb-3`}>
      <View style={tw`flex-row justify-between items-center mb-3`}>
        <Skeleton width={100} height={20} />
        <Skeleton width={60} height={20} />
      </View>
      <View style={tw`flex-row items-center mb-2`}>
        <Skeleton width={24} height={24} borderRadius={12} />
        <Skeleton width={80} height={16} style={tw`ml-2`} />
      </View>
      <SkeletonText lines={1} />
    </View>
  );
}

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export function LoadingSpinner({ size = 'large', color, text }: LoadingSpinnerProps) {
  return (
    <View style={tw`flex-1 justify-center items-center p-6`}>
      <ActivityIndicator
        size={size}
        color={color || tw.color('primary-500')}
      />
      {text && (
        <Text style={tw`mt-4 text-neutral-600 dark:text-neutral-400 text-center`}>
          {text}
        </Text>
      )}
    </View>
  );
}

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
}

export function LoadingOverlay({ visible, text }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <View style={tw`absolute inset-0 bg-black/50 justify-center items-center z-50`}>
      <View style={tw`bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg`}>
        <ActivityIndicator size="large" color={tw.color('primary-500')} />
        {text && (
          <Text style={tw`mt-4 text-neutral-800 dark:text-neutral-200 text-center`}>
            {text}
          </Text>
        )}
      </View>
    </View>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionText, onAction }: EmptyStateProps) {
  return (
    <View style={tw`flex-1 justify-center items-center p-6`}>
      {icon && (
        <Text style={tw`text-4xl mb-4`}>
          {icon}
        </Text>
      )}
      <Text style={tw`text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center mb-2`}>
        {title}
      </Text>
      <Text style={tw`text-neutral-600 dark:text-neutral-400 text-center mb-6 leading-5`}>
        {description}
      </Text>
      {actionText && onAction && (
        <View style={tw`bg-primary-500 px-6 py-3 rounded-lg`}>
          <Text style={tw`text-white font-medium`} onPress={onAction}>
            {actionText}
          </Text>
        </View>
      )}
    </View>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Er ging iets mis', 
  description = 'Er is een fout opgetreden bij het laden van de gegevens.',
  onRetry 
}: ErrorStateProps) {
  return (
    <View style={tw`flex-1 justify-center items-center p-6`}>
      <Text style={tw`text-4xl mb-4`}>😔</Text>
      <Text style={tw`text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center mb-2`}>
        {title}
      </Text>
      <Text style={tw`text-neutral-600 dark:text-neutral-400 text-center mb-6 leading-5`}>
        {description}
      </Text>
      {onRetry && (
        <View style={tw`bg-primary-500 px-6 py-3 rounded-lg`}>
          <Text style={tw`text-white font-medium`} onPress={onRetry}>
            Opnieuw proberen
          </Text>
        </View>
      )}
    </View>
  );
}
