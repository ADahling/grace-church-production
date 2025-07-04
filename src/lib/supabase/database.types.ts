export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      beta_feedback: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          feedback: string
          rating: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          feedback: string
          rating?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          feedback?: string
          rating?: number | null
          created_at?: string
        }
        Relationships: []
      }
      community_groups: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          language: string | null
          member_count: number | null
          name: string
          schedule: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language?: string | null
          member_count?: number | null
          name: string
          schedule?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language?: string | null
          member_count?: number | null
          name?: string
          schedule?: string | null
        }
        Relationships: []
      }
      faith_traditions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string | null
          id: string
          mood: string | null
          tags: string[] | null
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          mood?: string | null
          tags?: string[] | null
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          mood?: string | null
          tags?: string[] | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      languages: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      prayer_intentions: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: 'healing' | 'family' | 'work' | 'spiritual_growth' | 'guidance' | 'gratitude' | 'other'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'active' | 'answered' | 'ongoing' | 'closed'
          is_private: boolean
          saint_intercession: string | null
          scripture_reference: string | null
          tags: string[] | null
          prayer_count: number
          last_prayed_at: string | null
          answered_at: string | null
          answer_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category?: 'healing' | 'family' | 'work' | 'spiritual_growth' | 'guidance' | 'gratitude' | 'other'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'active' | 'answered' | 'ongoing' | 'closed'
          is_private?: boolean
          saint_intercession?: string | null
          scripture_reference?: string | null
          tags?: string[] | null
          prayer_count?: number
          last_prayed_at?: string | null
          answered_at?: string | null
          answer_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: 'healing' | 'family' | 'work' | 'spiritual_growth' | 'guidance' | 'gratitude' | 'other'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'active' | 'answered' | 'ongoing' | 'closed'
          is_private?: boolean
          saint_intercession?: string | null
          scripture_reference?: string | null
          tags?: string[] | null
          prayer_count?: number
          last_prayed_at?: string | null
          answered_at?: string | null
          answer_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_intentions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prayer_requests: {
        Row: {
          created_at: string | null
          description: string
          id: string
          is_anonymous: boolean | null
          prayer_count: number | null
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          is_anonymous?: boolean | null
          prayer_count?: number | null
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          is_anonymous?: boolean | null
          prayer_count?: number | null
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prayer_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prayers: {
        Row: {
          audio_url: string | null
          category: string | null
          content: string
          created_at: string | null
          id: string
          language: string | null
          title: string
          tradition: string | null
        }
        Insert: {
          audio_url?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          language?: string | null
          title: string
          tradition?: string | null
        }
        Update: {
          audio_url?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          language?: string | null
          title?: string
          tradition?: string | null
        }
        Relationships: []
      }
      saints: {
        Row: {
          biography: string | null
          created_at: string | null
          feast_day: string | null
          id: string
          name: string
          patronage: string[] | null
        }
        Insert: {
          biography?: string | null
          created_at?: string | null
          feast_day?: string | null
          id?: string
          name: string
          patronage?: string[] | null
        }
        Update: {
          biography?: string | null
          created_at?: string | null
          feast_day?: string | null
          id?: string
          name?: string
          patronage?: string[] | null
        }
        Relationships: []
      }
      user_prayer_history: {
        Row: {
          created_at: string | null
          duration: number | null
          id: string
          prayer_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration?: number | null
          id?: string
          prayer_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration?: number | null
          id?: string
          prayer_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_prayer_history_prayer_id_fkey"
            columns: ["prayer_id"]
            isOneToOne: false
            referencedRelation: "prayers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_prayer_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          faith_tradition: string | null
          hospice: string | null
          id: string
          preferred_devotions: string[] | null
          preferred_language: string | null
          spiritual_background: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          faith_tradition?: string | null
          hospice?: string | null
          id: string
          preferred_devotions?: string[] | null
          preferred_language?: string | null
          spiritual_background?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          faith_tradition?: string | null
          hospice?: string | null
          id?: string
          preferred_devotions?: string[] | null
          preferred_language?: string | null
          spiritual_background?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

