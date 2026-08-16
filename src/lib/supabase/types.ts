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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          published_at: string | null
          related_package: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          related_package?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          related_package?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_related_package_fkey"
            columns: ["related_package"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      booking_flights: {
        Row: {
          airline: string
          arrival_airport: string
          arrival_at: string
          baggage_allowance: string | null
          booking_item_id: string
          class: Database["public"]["Enums"]["flight_class"]
          confirmation_code: string | null
          departure_airport: string
          departure_at: string
          flight_number: string | null
          id: string
          is_return_leg: boolean
          pnr: string | null
        }
        Insert: {
          airline: string
          arrival_airport: string
          arrival_at: string
          baggage_allowance?: string | null
          booking_item_id: string
          class?: Database["public"]["Enums"]["flight_class"]
          confirmation_code?: string | null
          departure_airport: string
          departure_at: string
          flight_number?: string | null
          id?: string
          is_return_leg?: boolean
          pnr?: string | null
        }
        Update: {
          airline?: string
          arrival_airport?: string
          arrival_at?: string
          baggage_allowance?: string | null
          booking_item_id?: string
          class?: Database["public"]["Enums"]["flight_class"]
          confirmation_code?: string | null
          departure_airport?: string
          departure_at?: string
          flight_number?: string | null
          id?: string
          is_return_leg?: boolean
          pnr?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_flights_booking_item_id_fkey"
            columns: ["booking_item_id"]
            isOneToOne: true
            referencedRelation: "booking_items"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_hotels: {
        Row: {
          address: string | null
          board: Database["public"]["Enums"]["board_type"]
          booking_item_id: string
          check_in: string
          check_out: string
          city: string
          confirmation_code: string | null
          country: string
          hotel_name: string
          id: string
          nights: number | null
          room_type: string | null
          stars: number | null
          supplier_ref: string | null
        }
        Insert: {
          address?: string | null
          board?: Database["public"]["Enums"]["board_type"]
          booking_item_id: string
          check_in: string
          check_out: string
          city: string
          confirmation_code?: string | null
          country: string
          hotel_name: string
          id?: string
          nights?: number | null
          room_type?: string | null
          stars?: number | null
          supplier_ref?: string | null
        }
        Update: {
          address?: string | null
          board?: Database["public"]["Enums"]["board_type"]
          booking_item_id?: string
          check_in?: string
          check_out?: string
          city?: string
          confirmation_code?: string | null
          country?: string
          hotel_name?: string
          id?: string
          nights?: number | null
          room_type?: string | null
          stars?: number | null
          supplier_ref?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_hotels_booking_item_id_fkey"
            columns: ["booking_item_id"]
            isOneToOne: true
            referencedRelation: "booking_items"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_insurance: {
        Row: {
          beneficiaries: number
          booking_item_id: string
          coverage_amount: number | null
          coverage_currency: string | null
          coverage_details: Json | null
          id: string
          plan_name: string | null
          policy_number: string | null
          provider: string
          valid_from: string
          valid_to: string
        }
        Insert: {
          beneficiaries?: number
          booking_item_id: string
          coverage_amount?: number | null
          coverage_currency?: string | null
          coverage_details?: Json | null
          id?: string
          plan_name?: string | null
          policy_number?: string | null
          provider: string
          valid_from: string
          valid_to: string
        }
        Update: {
          beneficiaries?: number
          booking_item_id?: string
          coverage_amount?: number | null
          coverage_currency?: string | null
          coverage_details?: Json | null
          id?: string
          plan_name?: string | null
          policy_number?: string | null
          provider?: string
          valid_from?: string
          valid_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_insurance_booking_item_id_fkey"
            columns: ["booking_item_id"]
            isOneToOne: true
            referencedRelation: "booking_items"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_items: {
        Row: {
          booking_id: string
          commission_rate: number
          commission_received_at: string | null
          commission_status: Database["public"]["Enums"]["commission_status"]
          description: string
          id: string
          product_type: Database["public"]["Enums"]["product_type"]
          quantity: number
          sort_order: number
          status: Database["public"]["Enums"]["item_status"]
          total_price: number | null
          unit_price: number
        }
        Insert: {
          booking_id: string
          commission_rate?: number
          commission_received_at?: string | null
          commission_status?: Database["public"]["Enums"]["commission_status"]
          description: string
          id?: string
          product_type: Database["public"]["Enums"]["product_type"]
          quantity?: number
          sort_order?: number
          status?: Database["public"]["Enums"]["item_status"]
          total_price?: number | null
          unit_price: number
        }
        Update: {
          booking_id?: string
          commission_rate?: number
          commission_received_at?: string | null
          commission_status?: Database["public"]["Enums"]["commission_status"]
          description?: string
          id?: string
          product_type?: Database["public"]["Enums"]["product_type"]
          quantity?: number
          sort_order?: number
          status?: Database["public"]["Enums"]["item_status"]
          total_price?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_items_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_itineraries: {
        Row: {
          booking_item_id: string
          days: Json | null
          delivered_at: string | null
          destination: string
          duration_days: number
          id: string
          notes: string | null
          travel_style: string | null
        }
        Insert: {
          booking_item_id: string
          days?: Json | null
          delivered_at?: string | null
          destination: string
          duration_days: number
          id?: string
          notes?: string | null
          travel_style?: string | null
        }
        Update: {
          booking_item_id?: string
          days?: Json | null
          delivered_at?: string | null
          destination?: string
          duration_days?: number
          id?: string
          notes?: string | null
          travel_style?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_itineraries_booking_item_id_fkey"
            columns: ["booking_item_id"]
            isOneToOne: true
            referencedRelation: "booking_items"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_tours: {
        Row: {
          booking_item_id: string
          city: string
          confirmation_code: string | null
          duration_hours: number | null
          id: string
          includes: string[] | null
          language: string | null
          meeting_point: string | null
          notes: string | null
          operator: string | null
          participants: number
          starts_at: string
          tour_name: string
        }
        Insert: {
          booking_item_id: string
          city: string
          confirmation_code?: string | null
          duration_hours?: number | null
          id?: string
          includes?: string[] | null
          language?: string | null
          meeting_point?: string | null
          notes?: string | null
          operator?: string | null
          participants?: number
          starts_at: string
          tour_name: string
        }
        Update: {
          booking_item_id?: string
          city?: string
          confirmation_code?: string | null
          duration_hours?: number | null
          id?: string
          includes?: string[] | null
          language?: string | null
          meeting_point?: string | null
          notes?: string | null
          operator?: string | null
          participants?: number
          starts_at?: string
          tour_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_tours_booking_item_id_fkey"
            columns: ["booking_item_id"]
            isOneToOne: true
            referencedRelation: "booking_items"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_transfers: {
        Row: {
          booking_item_id: string
          confirmation_code: string | null
          dropoff_location: string
          flight_ref: string | null
          id: string
          passengers: number
          pickup_at: string
          pickup_location: string
          supplier: string | null
          type: Database["public"]["Enums"]["transfer_type"]
          vehicle_type: string | null
        }
        Insert: {
          booking_item_id: string
          confirmation_code?: string | null
          dropoff_location: string
          flight_ref?: string | null
          id?: string
          passengers?: number
          pickup_at: string
          pickup_location: string
          supplier?: string | null
          type: Database["public"]["Enums"]["transfer_type"]
          vehicle_type?: string | null
        }
        Update: {
          booking_item_id?: string
          confirmation_code?: string | null
          dropoff_location?: string
          flight_ref?: string | null
          id?: string
          passengers?: number
          pickup_at?: string
          pickup_location?: string
          supplier?: string | null
          type?: Database["public"]["Enums"]["transfer_type"]
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_transfers_booking_item_id_fkey"
            columns: ["booking_item_id"]
            isOneToOne: true
            referencedRelation: "booking_items"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          amount_paid: number
          contact_id: string
          created_at: string
          created_by: string | null
          group_size: number
          id: string
          lead_id: string | null
          notes: string | null
          quote_id: string | null
          reference: string | null
          status: Database["public"]["Enums"]["booking_status"]
          total_price: number
          travel_date_from: string | null
          travel_date_to: string | null
          updated_at: string
        }
        Insert: {
          amount_paid?: number
          contact_id: string
          created_at?: string
          created_by?: string | null
          group_size?: number
          id?: string
          lead_id?: string | null
          notes?: string | null
          quote_id?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_price: number
          travel_date_from?: string | null
          travel_date_to?: string | null
          updated_at?: string
        }
        Update: {
          amount_paid?: number
          contact_id?: string
          created_at?: string
          created_by?: string | null
          group_size?: number
          id?: string
          lead_id?: string | null
          notes?: string | null
          quote_id?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_price?: number
          travel_date_from?: string | null
          travel_date_to?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          source: Database["public"]["Enums"]["contact_source"]
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          source?: Database["public"]["Enums"]["contact_source"]
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          source?: Database["public"]["Enums"]["contact_source"]
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_activities: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          lead_id: string
          metadata: Json | null
          type: Database["public"]["Enums"]["activity_type"]
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id: string
          metadata?: Json | null
          type: Database["public"]["Enums"]["activity_type"]
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          type?: Database["public"]["Enums"]["activity_type"]
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          adults: number
          assigned_to: string | null
          budget_max: number | null
          budget_min: number | null
          children: number
          contact_id: string
          created_at: string
          destination: string | null
          duration_days: number | null
          estimated_value: number | null
          flexible_dates: boolean | null
          id: string
          lost_at: string | null
          lost_reason: string | null
          observations: string | null
          stage: Database["public"]["Enums"]["lead_stage"]
          travel_date_from: string | null
          travel_date_to: string | null
          updated_at: string
          won_at: string | null
        }
        Insert: {
          adults?: number
          assigned_to?: string | null
          budget_max?: number | null
          budget_min?: number | null
          children?: number
          contact_id: string
          created_at?: string
          destination?: string | null
          duration_days?: number | null
          estimated_value?: number | null
          flexible_dates?: boolean | null
          id?: string
          lost_at?: string | null
          lost_reason?: string | null
          observations?: string | null
          stage?: Database["public"]["Enums"]["lead_stage"]
          travel_date_from?: string | null
          travel_date_to?: string | null
          updated_at?: string
          won_at?: string | null
        }
        Update: {
          adults?: number
          assigned_to?: string | null
          budget_max?: number | null
          budget_min?: number | null
          children?: number
          contact_id?: string
          created_at?: string
          destination?: string | null
          duration_days?: number | null
          estimated_value?: number | null
          flexible_dates?: boolean | null
          id?: string
          lost_at?: string | null
          lost_reason?: string | null
          observations?: string | null
          stage?: Database["public"]["Enums"]["lead_stage"]
          travel_date_from?: string | null
          travel_date_to?: string | null
          updated_at?: string
          won_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          badge: string | null
          cities: string[]
          countries: string[]
          created_at: string
          destination: string
          duration_days: number
          highlights: string[] | null
          id: string
          includes: string[] | null
          is_active: boolean
          is_popular: boolean
          itinerary: Json | null
          max_group: number | null
          name: string
          not_includes: string[] | null
          photo_url: string | null
          price_from: number | null
          product_id: string | null
          profile_text: string | null
          slug: string
          tagline: string | null
          updated_at: string
        }
        Insert: {
          badge?: string | null
          cities?: string[]
          countries?: string[]
          created_at?: string
          destination: string
          duration_days: number
          highlights?: string[] | null
          id?: string
          includes?: string[] | null
          is_active?: boolean
          is_popular?: boolean
          itinerary?: Json | null
          max_group?: number | null
          name: string
          not_includes?: string[] | null
          photo_url?: string | null
          price_from?: number | null
          product_id?: string | null
          profile_text?: string | null
          slug: string
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          badge?: string | null
          cities?: string[]
          countries?: string[]
          created_at?: string
          destination?: string
          duration_days?: number
          highlights?: string[] | null
          id?: string
          includes?: string[] | null
          is_active?: boolean
          is_popular?: boolean
          itinerary?: Json | null
          max_group?: number | null
          name?: string
          not_includes?: string[] | null
          photo_url?: string | null
          price_from?: number | null
          product_id?: string | null
          profile_text?: string | null
          slug?: string
          tagline?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "packages_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string
          due_date: string | null
          id: string
          installments: number
          method: string | null
          notes: string | null
          paid_at: string | null
          receipt_url: string | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          installments?: number
          method?: string | null
          notes?: string | null
          paid_at?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          installments?: number
          method?: string | null
          notes?: string | null
          paid_at?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number | null
          commission_rate: number | null
          created_at: string
          currency: string
          description: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at: string
        }
        Insert: {
          base_price?: number | null
          commission_rate?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          type: Database["public"]["Enums"]["product_type"]
          updated_at?: string
        }
        Update: {
          base_price?: number | null
          commission_rate?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          type?: Database["public"]["Enums"]["product_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          is_active?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      quote_items: {
        Row: {
          description: string
          id: string
          product_id: string | null
          product_type: Database["public"]["Enums"]["product_type"]
          quantity: number
          quote_id: string
          sort_order: number
          total_price: number | null
          unit_price: number
        }
        Insert: {
          description: string
          id?: string
          product_id?: string | null
          product_type: Database["public"]["Enums"]["product_type"]
          quantity?: number
          quote_id: string
          sort_order?: number
          total_price?: number | null
          unit_price: number
        }
        Update: {
          description?: string
          id?: string
          product_id?: string | null
          product_type?: Database["public"]["Enums"]["product_type"]
          quantity?: number
          quote_id?: string
          sort_order?: number
          total_price?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          accepted_at: string | null
          created_at: string
          created_by: string | null
          id: string
          lead_id: string
          message: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["quote_status"]
          total: number
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id: string
          message?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id?: string
          message?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      travelers: {
        Row: {
          booking_id: string
          date_of_birth: string | null
          document_expiry: string | null
          document_number: string | null
          document_type: string | null
          email: string | null
          full_name: string
          id: string
          is_lead_traveler: boolean
          nationality: string | null
          notes: string | null
          phone: string | null
          visa_expiry: string | null
        }
        Insert: {
          booking_id: string
          date_of_birth?: string | null
          document_expiry?: string | null
          document_number?: string | null
          document_type?: string | null
          email?: string | null
          full_name: string
          id?: string
          is_lead_traveler?: boolean
          nationality?: string | null
          notes?: string | null
          phone?: string | null
          visa_expiry?: string | null
        }
        Update: {
          booking_id?: string
          date_of_birth?: string | null
          document_expiry?: string | null
          document_number?: string | null
          document_type?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_lead_traveler?: boolean
          nationality?: string | null
          notes?: string | null
          phone?: string | null
          visa_expiry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "travelers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      activity_type:
        | "mensagem"
        | "ligacao"
        | "whatsapp"
        | "email"
        | "nota"
        | "mudanca_stage"
        | "proposta"
        | "reserva"
      board_type:
        | "sem_refeicao"
        | "cafe_manha"
        | "meia_pensao"
        | "pensao_completa"
        | "all_inclusive"
      booking_status:
        | "rascunho"
        | "confirmado"
        | "pago"
        | "em_viagem"
        | "concluido"
        | "cancelado"
        | "reembolsado"
      commission_status: "pendente" | "recebido"
      contact_source:
        | "site"
        | "whatsapp"
        | "instagram"
        | "facebook"
        | "indicacao"
        | "google"
        | "outro"
      flight_class: "economica" | "premium_economy" | "executiva" | "primeira"
      item_status: "pendente" | "confirmado" | "cancelado"
      lead_stage:
        | "novo"
        | "qualificado"
        | "proposta_enviada"
        | "negociacao"
        | "reservado"
        | "em_preparacao"
        | "em_viagem"
        | "concluido"
        | "perdido"
      payment_status:
        | "pendente"
        | "pago"
        | "atrasado"
        | "cancelado"
        | "reembolsado"
      post_status: "rascunho" | "publicado" | "arquivado"
      product_type:
        | "pacote_completo"
        | "pacote_personalizado"
        | "voo"
        | "hotel"
        | "transfer"
        | "seguro"
        | "excursao"
        | "roteiro"
        | "consultoria"
      quote_status: "rascunho" | "enviado" | "aceito" | "recusado" | "expirado"
      transfer_type:
        | "aeroporto_hotel"
        | "hotel_aeroporto"
        | "inter_cidades"
        | "privativo"
        | "compartilhado"
      user_role: "admin" | "agent"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      activity_type: [
        "mensagem",
        "ligacao",
        "whatsapp",
        "email",
        "nota",
        "mudanca_stage",
        "proposta",
        "reserva",
      ],
      board_type: [
        "sem_refeicao",
        "cafe_manha",
        "meia_pensao",
        "pensao_completa",
        "all_inclusive",
      ],
      booking_status: [
        "rascunho",
        "confirmado",
        "pago",
        "em_viagem",
        "concluido",
        "cancelado",
        "reembolsado",
      ],
      commission_status: ["pendente", "recebido"],
      contact_source: [
        "site",
        "whatsapp",
        "instagram",
        "facebook",
        "indicacao",
        "google",
        "outro",
      ],
      flight_class: ["economica", "premium_economy", "executiva", "primeira"],
      item_status: ["pendente", "confirmado", "cancelado"],
      lead_stage: [
        "novo",
        "qualificado",
        "proposta_enviada",
        "negociacao",
        "reservado",
        "em_preparacao",
        "em_viagem",
        "concluido",
        "perdido",
      ],
      payment_status: [
        "pendente",
        "pago",
        "atrasado",
        "cancelado",
        "reembolsado",
      ],
      post_status: ["rascunho", "publicado", "arquivado"],
      product_type: [
        "pacote_completo",
        "pacote_personalizado",
        "voo",
        "hotel",
        "transfer",
        "seguro",
        "excursao",
        "roteiro",
        "consultoria",
      ],
      quote_status: ["rascunho", "enviado", "aceito", "recusado", "expirado"],
      transfer_type: [
        "aeroporto_hotel",
        "hotel_aeroporto",
        "inter_cidades",
        "privativo",
        "compartilhado",
      ],
      user_role: ["admin", "agent"],
    },
  },
} as const
