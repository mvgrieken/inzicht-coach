import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import tw from '@/utils/tailwind';
import { useAuthContext } from '@/contexts/AuthContext';
import { useDailyLogs, useTodayLog, useCreateDailyLog } from '@/hooks/useDailyLogs';
import { LogEntry } from '@/components/logbook/LogEntry';
import { QuickLogButtons } from '@/components/logbook/QuickLogButtons';
import { DetailedLogForm } from '@/components/logbook/DetailedLogForm';

export default function LogbookScreen() {
  const { user } = useAuthContext();
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  
  // Hooks for data fetching and mutations
  const { data: dailyLogs = [], isLoading: logsLoading } = useDailyLogs(user?.id || '');
  const { data: todayLog, isLoading: todayLoading } = useTodayLog(user?.id || '');
  const createLogMutation = useCreateDailyLog();

  const handleQuickLog = async (drinksCount: number) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    try {
      await createLogMutation.mutateAsync({
        user_id: user.id,
        date: today,
        drinks_count: drinksCount,
      });
      
      Alert.alert('Gelukt!', `${drinksCount} ${drinksCount === 1 ? 'glas' : 'glazen'} gelogd voor vandaag.`);
    } catch (error) {
      Alert.alert('Fout', 'Er ging iets mis bij het opslaan. Probeer het opnieuw.');
    }
  };

  const handleDetailedLog = async (data: { drinks_count: number; notes?: string; mood?: any }) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    try {
      await createLogMutation.mutateAsync({
        user_id: user.id,
        date: today,
        ...data,
      });
      
      setShowDetailedForm(false);
      Alert.alert('Gelukt!', 'Je dagboek is bijgewerkt!');
    } catch (error) {
      Alert.alert('Fout', 'Er ging iets mis bij het opslaan. Probeer het opnieuw.');
    }
  };

  const formatTodayDate = () => {
    return new Date().toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center`}>
        <Text style={tw`text-lg text-neutral-600 dark:text-neutral-400`}>
          Log in om je dagboek te bekijken
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <Text style={tw`text-2xl font-bold text-primary-500 mb-6 text-center`}>
            Dagboek
          </Text>
          
          {/* Today's Entry */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
              Vandaag
            </Text>
            
            {todayLoading ? (
              <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm items-center`}>
                <Text style={tw`text-neutral-600 dark:text-neutral-400`}>
                  Laden...
                </Text>
              </View>
            ) : todayLog ? (
              <LogEntry log={todayLog} onPress={() => setShowDetailedForm(true)} />
            ) : (
              <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm`}>
                <View style={tw`flex-row justify-between items-center mb-3`}>
                  <Text style={tw`text-base font-semibold text-neutral-800 dark:text-neutral-200`}>
                    {formatTodayDate()}
                  </Text>
                  <Text style={tw`text-sm text-neutral-600 dark:text-neutral-400`}>
                    Nog niet ingevuld
                  </Text>
                </View>
                <TouchableOpacity 
                  style={tw`bg-primary-500 p-3 rounded-lg items-center mt-2`}
                  onPress={() => setShowDetailedForm(true)}
                >
                  <Text style={tw`text-white text-base font-semibold`}>
                    📝 Log je dag
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Quick Add - only show if today is not logged */}
          {!todayLog && !todayLoading && (
            <View style={tw`mb-6`}>
              <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
                Snel invoeren
              </Text>
              <QuickLogButtons 
                onLogDrinks={handleQuickLog} 
                disabled={createLogMutation.isPending}
              />
            </View>
          )}

          {/* Detailed Form */}
          {showDetailedForm && (
            <View style={tw`mb-6`}>
              <DetailedLogForm
                initialDrinks={todayLog?.drinks_count || 0}
                initialNotes={todayLog?.notes || ''}
                initialMood={todayLog?.mood}
                onSubmit={handleDetailedLog}
                onCancel={() => setShowDetailedForm(false)}
                isLoading={createLogMutation.isPending}
              />
            </View>
          )}

          {/* Previous Entries */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3`}>
              Recente dagen
            </Text>
            
            {logsLoading ? (
              <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm items-center`}>
                <Text style={tw`text-neutral-600 dark:text-neutral-400`}>
                  Laden...
                </Text>
              </View>
            ) : dailyLogs.length === 0 ? (
              <View style={tw`bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm items-center`}>
                <Text style={tw`text-neutral-600 dark:text-neutral-400`}>
                  Nog geen dagboekentries. Begin vandaag met loggen! 💪
                </Text>
              </View>
            ) : (
              dailyLogs
                .filter(log => log.date !== new Date().toISOString().split('T')[0]) // Exclude today
                .slice(0, 10) // Show only last 10 entries
                .map((log) => (
                  <LogEntry 
                    key={log.id} 
                    log={log} 
                  />
                ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}