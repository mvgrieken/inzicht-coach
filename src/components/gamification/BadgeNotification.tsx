import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated } from 'react-native';
import tw from '@/utils/tailwind';
import { BadgeType, BADGE_DEFINITIONS } from '@/hooks/useGamification';

interface BadgeNotificationProps {
  visible: boolean;
  badgeType: BadgeType | null;
  onClose: () => void;
}

export function BadgeNotification({ visible, badgeType, onClose }: BadgeNotificationProps) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!badgeType) return null;

  const badge = BADGE_DEFINITIONS[badgeType];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={tw`flex-1 bg-black/50 justify-center items-center p-4`}>
        <Animated.View
          style={[
            tw`bg-white dark:bg-neutral-800 p-6 rounded-2xl items-center max-w-80 w-full shadow-lg`,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={tw`w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full items-center justify-center mb-4`}>
            <Text style={tw`text-4xl`}>{badge.emoji}</Text>
          </View>
          
          <Text style={tw`text-2xl font-bold text-primary-500 mb-2 text-center`}>
            Badge Verdiend! 🎉
          </Text>
          
          <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2 text-center`}>
            {badge.title}
          </Text>
          
          <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mb-6 text-center leading-5`}>
            {badge.description}
          </Text>
          
          <TouchableOpacity
            style={tw`bg-primary-500 px-8 py-3 rounded-lg`}
            onPress={handleClose}
          >
            <Text style={tw`text-white font-semibold`}>
              Geweldig! 🚀
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}