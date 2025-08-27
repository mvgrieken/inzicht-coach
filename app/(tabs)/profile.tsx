import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from '@/utils/tailwind';
import { useAuthContext } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useStats';
import { useAchievements, BADGE_DEFINITIONS } from '@/hooks/useGamification';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthContext();
  const { data: userStats } = useUserStats(user?.id || '', 2);
  const { data: achievements = [] } = useAchievements(user?.id || '');

  const handleSignOut = async () => {
    Alert.alert(
      'Uitloggen',
      'Weet je zeker dat je wilt uitloggen?',
      [
        { text: 'Annuleren', style: 'cancel' },
        { 
          text: 'Uitloggen', 
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/auth/login');
          }
        },
      ]
    );
  };

  const getInitials = (name?: string) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!user) return null;
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <Text style={tw`text-2xl font-bold text-primary-500 mb-6 text-center`}>
            Mijn Profiel 👤
          </Text>
          
          {/* User Info */}
          <View style={tw`items-center mb-8`}>
            <View style={tw`w-20 h-20 bg-primary-500 rounded-full items-center justify-center mb-3`}>
              <Text style={tw`text-3xl font-bold text-white`}>
                {getInitials(user.user_metadata?.full_name)}
              </Text>
            </View>
            <Text style={tw`text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1`}>
              {user.user_metadata?.full_name || 'Gebruiker'}
            </Text>
            <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400`}>
              {user.email}
            </Text>
          </View>

          {/* Stats Overview */}
          {userStats && (
            <View style={tw`mb-8`}>
              <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
                Mijn statistieken
              </Text>
              <View style={tw`flex-row flex-wrap gap-3`}>
                <View style={tw`flex-1 min-w-24 bg-white dark:bg-neutral-800 p-4 rounded-lg items-center shadow-sm`}>
                  <Text style={tw`text-xl font-bold text-primary-500`}>
                    {userStats.totalDays}
                  </Text>
                  <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400 text-center`}>
                    dagen actief
                  </Text>
                </View>
                <View style={tw`flex-1 min-w-24 bg-white dark:bg-neutral-800 p-4 rounded-lg items-center shadow-sm`}>
                  <Text style={tw`text-xl font-bold text-success`}>
                    {userStats.streakDays}
                  </Text>
                  <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400 text-center`}>
                    huidige streak
                  </Text>
                </View>
                <View style={tw`flex-1 min-w-24 bg-white dark:bg-neutral-800 p-4 rounded-lg items-center shadow-sm`}>
                  <Text style={tw`text-xl font-bold text-info`}>
                    {userStats.totalDays > 0 ? Math.round((userStats.daysWithinGoal / userStats.totalDays) * 100) : 0}%
                  </Text>
                  <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400 text-center`}>
                    doelen behaald
                  </Text>
                </View>
                <View style={tw`flex-1 min-w-24 bg-white dark:bg-neutral-800 p-4 rounded-lg items-center shadow-sm`}>
                  <Text style={tw`text-xl font-bold text-secondary-500`}>
                    €{userStats.moneySaved}
                  </Text>
                  <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400 text-center`}>
                    bespaard
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Achievements */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
              Behaalde badges
            </Text>
            <View style={tw`flex-row flex-wrap gap-3`}>
              {Object.entries(BADGE_DEFINITIONS).map(([badgeType, definition]) => {
                const isEarned = achievements.some(a => a.badge_type === badgeType);
                return (
                  <View 
                    key={badgeType}
                    style={tw`bg-white dark:bg-neutral-800 p-3 rounded-lg items-center shadow-sm w-20 ${
                      !isEarned ? 'opacity-40' : ''
                    }`}
                  >
                    <Text style={tw`text-2xl mb-1`}>
                      {isEarned ? definition.emoji : '🔒'}
                    </Text>
                    <Text style={tw`text-xs text-neutral-800 dark:text-neutral-200 text-center font-medium`}>
                      {definition.title}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Text style={tw`text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center`}>
              {achievements.length}/{Object.keys(BADGE_DEFINITIONS).length} badges verdiend
            </Text>
          </View>

          {/* Settings */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4`}>
              Instellingen
            </Text>
            
            <TouchableOpacity style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-2 flex-row justify-between items-center shadow-sm`}>
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                📱 Notificaties
              </Text>
              <Text style={tw`text-lg text-neutral-400`}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-2 flex-row justify-between items-center shadow-sm`}>
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                🎯 Doelen aanpassen
              </Text>
              <Text style={tw`text-lg text-neutral-400`}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-2 flex-row justify-between items-center shadow-sm`}>
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                📊 Data exporteren
              </Text>
              <Text style={tw`text-lg text-neutral-400`}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-2 flex-row justify-between items-center shadow-sm`}>
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                🔒 Privacy
              </Text>
              <Text style={tw`text-lg text-neutral-400`}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-2 flex-row justify-between items-center shadow-sm`}>
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                ℹ️ Over deze app
              </Text>
              <Text style={tw`text-lg text-neutral-400`}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Emergency & Sign Out */}
          <View style={tw`mb-6`}>
            <TouchableOpacity style={tw`bg-red-500 p-4 rounded-lg items-center mb-3`}>
              <Text style={tw`text-white font-semibold text-base`}>
                🆘 Hulp nodig?
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={tw`bg-neutral-200 dark:bg-neutral-700 p-4 rounded-lg items-center`}
              onPress={handleSignOut}
            >
              <Text style={tw`text-neutral-700 dark:text-neutral-300 font-medium text-base`}>
                Uitloggen
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}