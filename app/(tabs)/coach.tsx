import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';
import tw from '@/utils/tailwind';
import { useAuthContext } from '@/contexts/AuthContext';
import { useChatMessages, useSendMessage, useClearChat } from '@/hooks/useChat';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';

export default function CoachScreen() {
  const { user } = useAuthContext();
  const [message, setMessage] = useState('');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { data: messages = [], isLoading } = useChatMessages(user?.id || '');
  const sendMessageMutation = useSendMessage(user?.id || '');
  const clearChatMutation = useClearChat(user?.id || '');

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;
    
    const messageToSend = message.trim();
    setMessage('');
    
    try {
      await sendMessageMutation.mutateAsync(messageToSend);
      // Scroll to bottom after sending
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'breathing':
        setMessage('Kun je me helpen met een ademhalingsoefening?');
        break;
      case 'motivation':
        setMessage('Ik heb wat motivatie nodig, kun je me helpen?');
        break;
      case 'cravings':
        setMessage('Ik heb trek in alcohol, wat kan ik doen?');
        break;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900 justify-center items-center`}>
        <Text style={tw`text-lg text-neutral-600 dark:text-neutral-400`}>
          Log in om met je AI coach te chatten
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-50 dark:bg-neutral-900`}>
      <View style={tw`flex-1 p-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-2xl font-bold text-primary-500`}>
            AI Coach Sam 🤖
          </Text>
          {messages.length > 0 && (
            <TouchableOpacity
              onPress={() => clearChatMutation.mutate()}
              style={tw`px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg`}
            >
              <Text style={tw`text-xs text-neutral-600 dark:text-neutral-400`}>
                Wissen
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Medical Disclaimer */}
        <View style={tw`bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-3 rounded-lg mb-4`}>
          <Text style={tw`text-orange-800 dark:text-orange-200 text-xs font-medium`}>
            ⚠️ Sam is een AI-assistent, geen medische professional. Bij ernstige problemen: 
            bel 113 (Suicide Prevention) of zoek professionele hulp.
          </Text>
        </View>
        
        {/* Chat Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={tw`flex-1 mb-4`}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            <View style={tw`mb-3`}>
              <View style={tw`bg-white dark:bg-neutral-800 p-3 rounded-lg rounded-bl-sm mr-12 shadow-sm`}>
                <Text style={tw`text-base text-neutral-800 dark:text-neutral-200 leading-6`}>
                  Hoi! Ik ben Sam, je AI coach. Hoe gaat het vandaag met je? 
                  Vertel me gerust hoe je je voelt of waar je mee worstelt.
                </Text>
              </View>
            </View>
          ) : (
            messages.map((msg) => (
              <View key={msg.id} style={tw`mb-3`}>
                {msg.role === 'assistant' ? (
                  <View style={tw`flex-row`}>
                    <View style={tw`bg-white dark:bg-neutral-800 p-3 rounded-lg rounded-bl-sm mr-12 shadow-sm`}>
                      <Text style={tw`text-base text-neutral-800 dark:text-neutral-200 leading-6`}>
                        {msg.message}
                      </Text>
                      <Text style={tw`text-xs text-neutral-500 dark:text-neutral-400 mt-2`}>
                        Sam • {formatTime(msg.created_at)}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={tw`flex-row justify-end`}>
                    <View style={tw`bg-primary-500 p-3 rounded-lg rounded-br-sm ml-12`}>
                      <Text style={tw`text-base text-white leading-6`}>
                        {msg.message}
                      </Text>
                      <Text style={tw`text-xs text-white/70 mt-2 text-right`}>
                        {formatTime(msg.created_at)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))
          )}
          
          {/* Thinking indicator */}
          {sendMessageMutation.isPending && (
            <View style={tw`mb-3`}>
              <View style={tw`bg-white dark:bg-neutral-800 p-3 rounded-lg rounded-bl-sm mr-12 shadow-sm`}>
                <Text style={tw`text-base text-neutral-500 dark:text-neutral-400 italic`}>
                  Sam is aan het typen...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Voice Journal Toggle */}
        <View style={tw`mb-4`}>
          <TouchableOpacity
            style={tw`bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 items-center`}
            onPress={() => setShowVoiceRecorder(!showVoiceRecorder)}
          >
            <Text style={tw`text-blue-700 dark:text-blue-300 font-medium`}>
              🎙️ {showVoiceRecorder ? 'Verberg spraakrecorder' : 'Spraaknotitie maken'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Voice Recorder */}
        {showVoiceRecorder && (
          <View style={tw`mb-4`}>
            <VoiceRecorder 
              userId={user.id}
              onSaved={() => setShowVoiceRecorder(false)}
            />
          </View>
        )}

        {/* Quick Actions */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2`}>
            Snelle hulp:
          </Text>
          <View style={tw`flex-row flex-wrap gap-2`}>
            <TouchableOpacity 
              style={tw`px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-primary-200 dark:border-primary-800`}
              onPress={() => handleQuickAction('breathing')}
            >
              <Text style={tw`text-sm text-primary-700 dark:text-primary-300 font-medium`}>
                🌬️ Ademhalingsoefening
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-primary-200 dark:border-primary-800`}
              onPress={() => handleQuickAction('motivation')}
            >
              <Text style={tw`text-sm text-primary-700 dark:text-primary-300 font-medium`}>
                💪 Motivatie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-primary-200 dark:border-primary-800`}
              onPress={() => handleQuickAction('cravings')}
            >
              <Text style={tw`text-sm text-primary-700 dark:text-primary-300 font-medium`}>
                📚 Tips bij trek
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat Input */}
        <View style={tw`flex-row items-end gap-2`}>
          <TextInput
            style={tw`flex-1 bg-white dark:bg-neutral-800 rounded-lg px-3 py-2 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 max-h-24`}
            value={message}
            onChangeText={setMessage}
            placeholder="Typ je bericht aan Sam..."
            placeholderTextColor={tw.color('neutral-500')}
            multiline
          />
          <TouchableOpacity
            style={tw`bg-primary-500 p-3 rounded-lg ${message.trim() ? '' : 'opacity-50'}`}
            onPress={handleSendMessage}
            disabled={!message.trim() || sendMessageMutation.isPending}
          >
            <Text style={tw`text-white font-medium`}>
              Verstuur
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}