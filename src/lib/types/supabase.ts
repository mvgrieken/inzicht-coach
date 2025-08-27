export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_type: string
          description: string | null
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_type: string
          description?: string | null
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_type?: string
          description?: string | null
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          role: Database["public"]["Enums"]["message_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          role: Database["public"]["Enums"]["message_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          role?: Database["public"]["Enums"]["message_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_logs: {
        Row: {
          created_at: string
          date: string
          drinks_count: number
          id: string
          mood: Database["public"]["Enums"]["mood_type"] | null
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          drinks_count: number
          id?: string
          mood?: Database["public"]["Enums"]["mood_type"] | null
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          drinks_count?: number
          id?: string
          mood?: Database["public"]["Enums"]["mood_type"] | null
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      motivation_cards: {
        Row: {
          category: Database["public"]["Enums"]["motivation_category"] | null
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["motivation_category"] | null
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["motivation_category"] | null
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "motivation_cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_goal: number | null
          daily_goal: number | null
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_goal?: number | null
          daily_goal?: number | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_goal?: number | null
          daily_goal?: number | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          created_at: string
          id: string
          longest_streak: number | null
          points: number | null
          streak_days: number | null
          total_alcohol_free_days: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          longest_streak?: number | null
          points?: number | null
          streak_days?: number | null
          total_alcohol_free_days?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          longest_streak?: number | null
          points?: number | null
          streak_days?: number | null
          total_alcohol_free_days?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_journals: {
        Row: {
          audio_url: string | null
          created_at: string
          date: string
          id: string
          sentiment: Database["public"]["Enums"]["sentiment_type"] | null
          transcript: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          date: string
          id?: string
          sentiment?: Database["public"]["Enums"]["sentiment_type"] | null
          transcript?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          date?: string
          id?: string
          sentiment?: Database["public"]["Enums"]["sentiment_type"] | null
          transcript?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_journals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_user_points: {
        Args: {
          p_points_to_add?: number
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      message_role: "assistant" | "user"
      mood_type: "bad" | "good" | "neutral" | "very_bad" | "very_good"
      motivation_category: "family" | "financial" | "health" | "other" | "personal"
      sentiment_type: "negative" | "neutral" | "positive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}