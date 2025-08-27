import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from '@/utils/tailwind';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTodayLog } from '@/hooks/useDailyLogs';
import { useUserStats, useWeeklyStats } from '@/hooks/useStats';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { data: todayLog } = useTodayLog(user?.id || '');
  const { data: userStats } = useUserStats(user?.id || '', 2); // Assuming daily goal of 2 drinks
  const { data: weeklyStats } = useWeeklyStats(user?.id || '');

  if (!user) {
    return (
      <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center`}>
        <Text style={tw`text-lg text-neutral-600 dark:text-neutral-400`}>
          Log in om je dashboard te bekijken
        </Text>
      </SafeAreaView>
    );
  }
  const getMotivationalMessage = () => {
    if (!userStats) return "Welkom bij Inzicht Coach! 🌟";
    
    if (userStats.streakDays === 0) return "Begin vandaag je nieuwe streak! 💪";
    if (userStats.streakDays < 7) return `${userStats.streakDays} dagen bezig - lekker doorgaan! 🔥`;
    if (userStats.streakDays < 30) return `Geweldig! ${userStats.streakDays} dagen op rij! ⭐`;
    return `Ongelofelijk! ${userStats.streakDays} dagen streak! 🏆`;
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <Text style={tw`text-2xl font-bold text-primary-500 mb-6 text-center`}>
            {getMotivationalMessage()}
          </Text>
          
          {/* Today's Stats */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
              Vandaag
            </Text>
            <View style={tw`flex-row gap-3`}>
              <View style={tw`flex-1 bg-white dark:bg-neutral-800 p-4 rounded-lg items-center shadow-sm`}>
                <Text style={tw`text-3xl font-bold text-primary-500`}>
                  {todayLog?.drinks_count ?? '-'}
                </Text>
                <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mt-1 text-center`}>
                  glazen gedronken
                </Text>
              </View>
              <View style={tw`flex-1 bg-white dark:bg-neutral-800 p-4 rounded-lg items-center shadow-sm`}>
                <Text style={tw`text-3xl font-bold text-primary-500`}>
                  {userStats?.streakDays ?? 0}
                </Text>
                <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mt-1 text-center`}>
                  dagen streak
                </Text>
              </View>
            </View>
          </View>

          {/* Weekly Progress */}
          {weeklyStats && (
            <View style={tw`mb-6`}>
              <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
                Deze week
              </Text>
              <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm`}>
                <View style={tw`flex-row justify-between items-center mb-3`}>
                  <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                    {weeklyStats.alcoholFreeDays}/7 alcoholvrije dagen
                  </Text>
                  <Text style={tw`text-sm text-primary-500 font-medium`}>
                    {Math.round((weeklyStats.alcoholFreeDays / 7) * 100)}%
                  </Text>
                </View>
                <View style={tw`h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden`}>
                  <View 
                    style={[
                      tw`h-full bg-primary-500 rounded-full`,
                      { width: `${(weeklyStats.alcoholFreeDays / 7) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400 mt-2`}>
                  Totaal: {weeklyStats.totalDrinks} {weeklyStats.totalDrinks === 1 ? 'glas' : 'glazen'}
                </Text>
              </View>
            </View>
          )}

          {/* Lifetime Stats */}
          {userStats && (
            <View style={tw`mb-6`}>
              <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
                Jouw prestaties
              </Text>
              <View style={tw`flex-row gap-3 mb-3`}>
                <View style={tw`flex-1 bg-white dark:bg-neutral-800 p-3 rounded-lg items-center shadow-sm`}>
                  <Text style={tw`text-xl font-bold text-success`}>
                    {userStats.longestStreak}
                  </Text>
                  <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400 text-center`}>
                    langste streak
                  </Text>
                </View>
                <View style={tw`flex-1 bg-white dark:bg-neutral-800 p-3 rounded-lg items-center shadow-sm`}>
                  <Text style={tw`text-xl font-bold text-info`}>
                    {userStats.totalPoints}
                  </Text>
                  <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400 text-center`}>
                    punten
                  </Text>
                </View>
                <View style={tw`flex-1 bg-white dark:bg-neutral-800 p-3 rounded-lg items-center shadow-sm`}>
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

          {/* Quick Actions */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
              Snelle acties
            </Text>
            <TouchableOpacity 
              style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-2 shadow-sm`}
              onPress={() => router.push('/(tabs)/logbook')}
            >
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                📝 Dagboek bijwerken
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg mb-2 shadow-sm`}
              onPress={() => router.push('/(tabs)/coach')}
            >
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                🎙️ Spraaknotitie maken
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm`}
              onPress={() => router.push('/(tabs)/coach')}
            >
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200`}>
                🤖 Chat met AI Coach
              </Text>
            </TouchableOpacity>
          </View>

          {/* Motivation */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
              Motivatie
            </Text>
            <View style={tw`bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-primary-500`}>
              <Text style={tw`text-base text-neutral-800 dark:text-neutral-200 italic leading-6`}>
                {userStats?.streakDays ? 
                  `"Je bent al ${userStats.streakDays} dagen bezig - dat is fantastisch! Elke dag wordt je sterker."` :
                  '"Elke dag dat je je doel behaalt, word je sterker. Je doet het geweldig!"'
                }
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}