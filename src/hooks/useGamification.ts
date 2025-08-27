import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { BadgeType, Achievement } from '@/types';

export type { BadgeType };

// Badge definitions with descriptions and requirements
export const BADGE_DEFINITIONS: Record<BadgeType, { 
  title: string; 
  description: string; 
  emoji: string;
  requirement: string;
}> = {
  first_week: {
    title: 'Eerste Week',
    description: 'Je eerste week volgemaakt!',
    emoji: '🏆',
    requirement: '7 days active',
  },
  first_month: {
    title: 'Eerste Maand',
    description: '30 dagen actief - geweldig!',
    emoji: '🥇',
    requirement: '30 days active',
  },
  streak_5: {
    title: '5-Dagen Streak',
    description: '5 dagen op rij binnen je doel!',
    emoji: '🔥',
    requirement: '5 day streak',
  },
  streak_10: {
    title: '10-Dagen Streak',
    description: '10 dagen consecutief - fantastisch!',
    emoji: '⚡',
    requirement: '10 day streak',
  },
  streak_30: {
    title: '30-Dagen Streak',
    description: 'Een hele maand vol! Ongelofelijk!',
    emoji: '✨',
    requirement: '30 day streak',
  },
  streak_100: {
    title: '100-Dagen Streak',
    description: 'Jij bent een echte kampioen!',
    emoji: '👑',
    requirement: '100 day streak',
  },
  zero_hero: {
    title: 'Nul Held',
    description: '10 alcoholvrije dagen bereikt!',
    emoji: '🦸',
    requirement: '10 alcohol-free days',
  },
  goal_achiever: {
    title: 'Doel Bereiker',
    description: '90% van je doelen behaald!',
    emoji: '🎯',
    requirement: '90% goal achievement rate',
  },
  voice_journaler: {
    title: 'Spraak Dagboeker',
    description: '10 spraaknotities gemaakt!',
    emoji: '🎙️',
    requirement: '10 voice journal entries',
  },
  ai_chatter: {
    title: 'AI Gesprekspartner',
    description: '50 berichten met Sam uitgewisseld!',
    emoji: '💬',
    requirement: '50 chat messages sent',
  },
};

export function useAchievements(userId: string) {
  return useQuery({
    queryKey: ['achievements', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      return data as Achievement[];
    },
    enabled: !!userId,
  });
}

export function useUnlockedBadges(userId: string) {
  const { data: achievements = [] } = useAchievements(userId);
  
  return achievements.map(achievement => achievement.badge_type);
}

export function useEarnBadge() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, badgeType, description }: {
      userId: string;
      badgeType: BadgeType;
      description?: string;
    }) => {
      const { data, error } = await supabase
        .from('achievements')
        .insert({
          user_id: userId,
          badge_type: badgeType,
          description: description || BADGE_DEFINITIONS[badgeType].description,
        })
        .select()
        .single();

      if (error) {
        // If badge already exists, silently fail
        if (error.code === '23505') { // Unique constraint violation
          return null;
        }
        throw error;
      }
      return data as Achievement;
    },
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['achievements', variables.userId] });
      }
    },
  });
}

export function useUpdatePoints() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, pointsToAdd, newStreak, newLongestStreak }: {
      userId: string;
      pointsToAdd?: number;
      newStreak?: number;
      newLongestStreak?: number;
    }) => {
      // Get current points
      const { data: currentPoints, error: fetchError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      const updates: any = {};
      
      if (pointsToAdd !== undefined) {
        updates.points = (currentPoints?.points || 0) + pointsToAdd;
      }
      
      if (newStreak !== undefined) {
        updates.streak_days = newStreak;
      }
      
      if (newLongestStreak !== undefined) {
        updates.longest_streak = Math.max(currentPoints?.longest_streak || 0, newLongestStreak);
      }

      if (Object.keys(updates).length === 0) {
        return currentPoints;
      }

      const { data, error } = await supabase
        .from('user_points')
        .upsert({
          user_id: userId,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user_stats', variables.userId] });
    },
  });
}

// Hook to check for new badge eligibility after logging a day
export function useCheckBadgeEligibility(userId: string) {
  const earnBadge = useEarnBadge();
  const updatePoints = useUpdatePoints();
  const { data: unlockedBadges = [] } = useUnlockedBadges(userId);

  const checkAndAwardBadges = async (userStats: {
    totalDays: number;
    streakDays: number;
    longestStreak: number;
    totalAlcoholFreeDays: number;
    daysWithinGoal: number;
  }) => {
    const badgesToCheck: { type: BadgeType; condition: boolean }[] = [
      { type: 'first_week', condition: userStats.totalDays >= 7 },
      { type: 'first_month', condition: userStats.totalDays >= 30 },
      { type: 'streak_5', condition: userStats.streakDays >= 5 },
      { type: 'streak_10', condition: userStats.streakDays >= 10 },
      { type: 'streak_30', condition: userStats.streakDays >= 30 },
      { type: 'streak_100', condition: userStats.streakDays >= 100 },
      { type: 'zero_hero', condition: userStats.totalAlcoholFreeDays >= 10 },
      { type: 'goal_achiever', condition: userStats.totalDays > 0 && (userStats.daysWithinGoal / userStats.totalDays) >= 0.9 },
    ];

    const newBadges: BadgeType[] = [];

    for (const { type, condition } of badgesToCheck) {
      if (condition && !unlockedBadges.includes(type)) {
        try {
          const result = await earnBadge.mutateAsync({
            userId,
            badgeType: type,
          });
          if (result) {
            newBadges.push(type);
          }
        } catch (error) {
          // Silently continue if badge already exists
        }
      }
    }

    return newBadges;
  };

  return { checkAndAwardBadges };
}