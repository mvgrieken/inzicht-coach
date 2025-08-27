export type Mood = 'very_bad' | 'bad' | 'neutral' | 'good' | 'very_good';

export type BadgeType = 
  | 'first_week'
  | 'first_month'
  | 'streak_5'
  | 'streak_10'
  | 'streak_30'
  | 'streak_100'
  | 'zero_hero'
  | 'goal_achiever'
  | 'voice_journaler'
  | 'ai_chatter';

export interface DailyLog {
  id: string;
  user_id: string;
  date: string;
  drinks_count: number;
  notes?: string;
  mood?: Mood;
  created_at: string;
  updated_at: string;
}

export interface VoiceJournal {
  id: string;
  user_id: string;
  date: string;
  audio_url?: string;
  transcript?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  badge_type: BadgeType;
  earned_at: string;
  description?: string;
}

export interface MotivationCard {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category?: 'health' | 'family' | 'personal' | 'financial' | 'other';
  created_at: string;
  updated_at: string;
}

export interface UserPoints {
  id: string;
  user_id: string;
  points: number;
  streak_days: number;
  longest_streak: number;
  total_alcohol_free_days: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  current_goal?: number; // drinks per week
  daily_goal?: number; // drinks per day
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  totalDays: number;
  streakDays: number;
  longestStreak: number;
  totalPoints: number;
  daysWithinGoal: number;
  averageDrinksPerWeek: number;
  moneySaved: number;
  caloriesSaved: number;
}