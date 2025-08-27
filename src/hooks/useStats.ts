import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { UserStats, DailyLog } from '@/types';

export function useUserStats(userId: string, dailyGoal: number = 2) {
  return useQuery({
    queryKey: ['user_stats', userId, dailyGoal],
    queryFn: async (): Promise<UserStats> => {
      if (!userId) throw new Error('User ID required');
      
      // Get all daily logs for the user
      const { data: logs, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: true });

      if (error) throw error;

      const dailyLogs = logs as DailyLog[];
      
      if (dailyLogs.length === 0) {
        return {
          totalDays: 0,
          streakDays: 0,
          longestStreak: 0,
          totalPoints: 0,
          daysWithinGoal: 0,
          averageDrinksPerWeek: 0,
          moneySaved: 0,
          caloriesSaved: 0,
        };
      }

      // Calculate statistics
      const totalDays = dailyLogs.length;
      const daysWithinGoal = dailyLogs.filter(log => log.drinks_count <= dailyGoal).length;
      const totalDrinks = dailyLogs.reduce((sum, log) => sum + log.drinks_count, 0);
      const averageDrinksPerWeek = (totalDrinks / totalDays) * 7;
      
      // Calculate current streak (consecutive days within goal from the end)
      let streakDays = 0;
      for (let i = dailyLogs.length - 1; i >= 0; i--) {
        if (dailyLogs[i].drinks_count <= dailyGoal) {
          streakDays++;
        } else {
          break;
        }
      }
      
      // Calculate longest streak
      let longestStreak = 0;
      let currentStreak = 0;
      
      dailyLogs.forEach(log => {
        if (log.drinks_count <= dailyGoal) {
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      });

      // Calculate savings (assumptions: €5 per drink, 150 calories per drink)
      const drinksAvoided = dailyLogs
        .filter(log => log.drinks_count === 0)
        .length * 2; // Assuming 2 drinks per day was the norm
        
      const moneySaved = drinksAvoided * 5; // €5 per drink
      const caloriesSaved = drinksAvoided * 150; // 150 calories per drink
      
      // Calculate points (10 points per alcohol-free day, 5 points per day within goal)
      const totalPoints = dailyLogs.reduce((points, log) => {
        if (log.drinks_count === 0) return points + 10;
        if (log.drinks_count <= dailyGoal) return points + 5;
        return points;
      }, 0);

      return {
        totalDays,
        streakDays,
        longestStreak,
        totalPoints,
        daysWithinGoal,
        averageDrinksPerWeek,
        moneySaved,
        caloriesSaved,
      };
    },
    enabled: !!userId,
  });
}

export function useWeeklyStats(userId: string) {
  return useQuery({
    queryKey: ['weekly_stats', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID required');
      
      // Get logs for the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const dateString = sevenDaysAgo.toISOString().split('T')[0];
      
      const { data: logs, error } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('date', dateString)
        .order('date', { ascending: true });

      if (error) throw error;

      const dailyLogs = logs as DailyLog[];
      const totalDrinks = dailyLogs.reduce((sum, log) => sum + log.drinks_count, 0);
      const daysLogged = dailyLogs.length;
      const alcoholFreeDays = dailyLogs.filter(log => log.drinks_count === 0).length;
      
      return {
        totalDrinks,
        daysLogged,
        alcoholFreeDays,
        averagePerDay: daysLogged > 0 ? totalDrinks / daysLogged : 0,
      };
    },
    enabled: !!userId,
  });
}