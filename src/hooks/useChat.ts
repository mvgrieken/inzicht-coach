import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { sendChatMessage } from '@/services/ai';
import { ChatMessage } from '@/types';

export function useChatMessages(userId: string) {
  return useQuery({
    queryKey: ['chat_messages', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(50); // Last 50 messages

      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!userId,
  });
}

export function useSendMessage(userId: string) {
  const queryClient = useQueryClient();
  const [isThinking, setIsThinking] = useState(false);

  const saveChatMessage = useCallback(async (message: string, role: 'user' | 'assistant') => {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        message,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return data as ChatMessage;
  }, [userId]);

  return useMutation({
    mutationFn: async (message: string) => {
      if (!userId) throw new Error('User not authenticated');

      setIsThinking(true);
      
      try {
        // Save user message
        await saveChatMessage(message, 'user');

        // Get conversation history for context
        const { data: history } = await supabase
          .from('chat_messages')
          .select('message, role')
          .eq('user_id', userId)
          .order('created_at', { ascending: true })
          .limit(20);

        const conversationHistory = (history || []).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.message,
        }));

        // Add current message to history
        conversationHistory.push({
          role: 'user',
          content: message,
        });

        // Get AI response
        const aiResponse = await sendChatMessage(message, conversationHistory);
        
        // Save AI response
        const savedAiMessage = await saveChatMessage(aiResponse.message, 'assistant');
        
        return savedAiMessage;
      } finally {
        setIsThinking(false);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch chat messages
      queryClient.invalidateQueries({ queryKey: ['chat_messages', userId] });
    },
    meta: {
      isThinking,
    },
  });
}

export function useClearChat(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat_messages', userId] });
    },
  });
}