import { useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
      }
    });
  }, []);

  const scheduleDailyReminder = async (hour: number = 21, minute: number = 0) => {
    try {
      // Cancel existing daily reminder
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      // Schedule new daily reminder
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Inzicht Coach',
          body: 'Vergeet niet je dagboek bij te werken! 📝',
          data: { type: 'daily_reminder' },
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
      
      return true;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return false;
    }
  };

  const scheduleMotivationalMessage = async (message: string, delayMinutes: number = 10) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Inzicht Coach 💪',
          body: message,
          data: { type: 'motivational' },
        },
        trigger: {
          seconds: delayMinutes * 60,
        },
      });
      
      return true;
    } catch (error) {
      console.error('Error scheduling motivational message:', error);
      return false;
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      return true;
    } catch (error) {
      console.error('Error canceling notifications:', error);
      return false;
    }
  };

  return {
    expoPushToken,
    scheduleDailyReminder,
    scheduleMotivationalMessage,
    cancelAllNotifications,
  };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#D2691E',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Notificaties uitgeschakeld',
        'Je kunt notificaties later aanzetten in de instellingen voor dagelijkse herinneringen.'
      );
      return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: 'your-expo-project-id', // Replace with actual project ID
    })).data;
  } else {
    Alert.alert('Simulator', 'Push notifications werken niet in de simulator');
  }

  return token;
}