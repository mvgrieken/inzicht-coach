import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { DailyLog, Mood } from '@/types';
import { useUpdatePoints, useCheckBadgeEligibility } from './useGamification';
import { useUserStats } from './useStats';

export function useDailyLogs(userId: string) {
  return useQuery({
    queryKey: ['daily_logs', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as DailyLog[];
    },
    enabled: !!userId,
  });
}

export function useTodayLog(userId: string) {
  const today = new Date().toISOString().split('T')[0];
  
  return useQuery({
    queryKey: ['daily_log', userId, today],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', userId)
        .eq('date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected if no log exists
        throw error;
      }
      
      return data as DailyLog | null;
    },
    enabled: !!userId,
  });
}

export function useCreateDailyLog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (log: {
      user_id: string;
      date: string;
      drinks_count: number;
      notes?: string;
      mood?: Mood;
    }) => {
      const { data, error } = await supabase
        .from('daily_logs')
        .upsert({
          ...log,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      
      // Award points based on the log
      const points = log.drinks_count === 0 ? 10 : log.drinks_count <= 2 ? 5 : 0;
      
      if (points > 0) {
        // Update points (this will also trigger badge checks via other hooks)
        await supabase.rpc('update_user_points', {
          p_user_id: log.user_id,
          p_points_to_add: points,
        });
      }

      return data as DailyLog;
    },
    onSuccess: (data) => {
      // Invalidate and refetch daily logs and stats
      queryClient.invalidateQueries({ queryKey: ['daily_logs', data.user_id] });
      queryClient.invalidateQueries({ queryKey: ['daily_log', data.user_id, data.date] });
      queryClient.invalidateQueries({ queryKey: ['user_stats', data.user_id] });
      queryClient.invalidateQueries({ queryKey: ['weekly_stats', data.user_id] });
    },
  });
}

export function useDeleteDailyLog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (logId: string) => {
      const { error } = await supabase
        .from('daily_logs')
        .delete()
        .eq('id', logId);

      if (error) throw error;
      return logId;
    },
    onSuccess: (_, logId) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['daily_logs'] });
    },
  });
}