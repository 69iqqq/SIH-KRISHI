export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      marketplace_listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: 'Crops' | 'Plants' | 'Foods'
          expiry_date: string | null
          freshness: string | null
          image_url: string | null
          price: number
          unit: string | null
          quantity: number | null
          sold_quantity: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: 'Crops' | 'Plants' | 'Foods'
          expiry_date?: string | null
          freshness?: string | null
          image_url?: string | null
          price: number
          unit?: string | null
          quantity?: number | null
          sold_quantity?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: 'Crops' | 'Plants' | 'Foods'
          expiry_date?: string | null
          freshness?: string | null
          image_url?: string | null
          price?: number
          unit?: string | null
          quantity?: number | null
          sold_quantity?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ,
      marketplace_listing_costs: {
        Row: {
          listing_id: string
          user_id: string
          cost_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          listing_id: string
          user_id: string
          cost_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          listing_id?: string
          user_id?: string
          cost_price?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ,
      marketplace_reviews: {
        Row: {
          id: string
          listing_id: string
          reviewer_user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          reviewer_user_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          reviewer_user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ,
      marketplace_orders: {
        Row: {
          id: string
          user_id: string
          total_amount: number
          currency: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_amount?: number
          currency?: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_amount?: number
          currency?: string
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      ,
      marketplace_order_items: {
        Row: {
          id: string
          order_id: string
          listing_id: string | null
          title: string
          unit_price: number
          quantity: number
        }
        Insert: {
          id?: string
          order_id: string
          listing_id?: string | null
          title: string
          unit_price: number
          quantity: number
        }
        Update: {
          id?: string
          order_id?: string
          listing_id?: string | null
          title?: string
          unit_price?: number
          quantity?: number
        }
        Relationships: []
      }
      ,
      marketplace_comments: {
        Row: {
          id: string
          listing_id: string
          commenter_user_id: string
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          commenter_user_id: string
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          commenter_user_id?: string
          comment?: string
          created_at?: string
        }
        Relationships: []
      }
      ,
      product_reviews: {
        Row: {
          id: string
          product_id: number
          reviewer_user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: number
          reviewer_user_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: number
          reviewer_user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
        Relationships: []
      }
      ,
      product_comments: {
        Row: {
          id: string
          product_id: number
          commenter_user_id: string
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: number
          commenter_user_id: string
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: number
          commenter_user_id?: string
          comment?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      purchase_listings: {
        Args: { p_items: Json; p_currency?: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
