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
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          banner_image_url: string | null
          status: 'draft' | 'active' | 'archived'
          is_featured: boolean
          display_order: number
          seo_title: string | null
          seo_description: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          short_description: string | null
          description: string | null
          brand: string | null
          category_id: string | null
          collection_id: string | null
          tags: string[]
          status: 'draft' | 'active' | 'archived'
          is_featured: boolean
          is_new_arrival: boolean
          is_best_seller: boolean
          gender: 'men' | 'women' | 'unisex' | null
          regular_price: number
          sale_price: number | null
          cost_price: number | null
          tax_class: string | null
          inventory: number
          reserved_stock: number
          low_stock_threshold: number
          collection_display_order: number
          seo_title: string | null
          meta_description: string | null
          meta_keywords: string | null
          social_sharing_image: string | null
          canonical_url: string | null
          visibility: ('homepage' | 'hidden' | 'featured' | 'collection_only' | 'search_visibility')[]
          fragrance_family: string | null
          concentration: string | null
          top_notes: string[]
          heart_notes: string[]
          base_notes: string[]
          longevity: string | null
          projection: string | null
          recommended_seasons: string[]
          recommended_occasions: string[]
          bottle_sizes: { size: string; price_adjustment: number | null }[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_description?: string | null
          description?: string | null
          brand?: string | null
          category_id?: string | null
          collection_id?: string | null
          tags?: string[]
          status?: 'draft' | 'active' | 'archived'
          is_featured?: boolean
          is_new_arrival?: boolean
          is_best_seller?: boolean
          gender?: 'men' | 'women' | 'unisex' | null
          regular_price?: number
          sale_price?: number | null
          cost_price?: number | null
          tax_class?: string | null
          inventory?: number
          reserved_stock?: number
          low_stock_threshold?: number
          collection_display_order?: number
          seo_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          social_sharing_image?: string | null
          canonical_url?: string | null
          visibility?: ('homepage' | 'hidden' | 'featured' | 'collection_only' | 'search_visibility')[]
          fragrance_family?: string | null
          concentration?: string | null
          top_notes?: string[]
          heart_notes?: string[]
          base_notes?: string[]
          longevity?: string | null
          projection?: string | null
          recommended_seasons?: string[]
          recommended_occasions?: string[]
          bottle_sizes?: { size: string; price_adjustment: number | null }[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_description?: string | null
          description?: string | null
          brand?: string | null
          category_id?: string | null
          collection_id?: string | null
          tags?: string[]
          status?: 'draft' | 'active' | 'archived'
          is_featured?: boolean
          is_new_arrival?: boolean
          is_best_seller?: boolean
          gender?: 'men' | 'women' | 'unisex' | null
          regular_price?: number
          sale_price?: number | null
          cost_price?: number | null
          tax_class?: string | null
          inventory?: number
          reserved_stock?: number
          low_stock_threshold?: number
          collection_display_order?: number
          seo_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          social_sharing_image?: string | null
          canonical_url?: string | null
          visibility?: ('homepage' | 'hidden' | 'featured' | 'collection_only' | 'search_visibility')[]
          fragrance_family?: string | null
          concentration?: string | null
          top_notes?: string[]
          heart_notes?: string[]
          base_notes?: string[]
          longevity?: string | null
          projection?: string | null
          recommended_seasons?: string[]
          recommended_occasions?: string[]
          bottle_sizes?: { size: string; price_adjustment: number | null }[]
          created_at?: string
          updated_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          title: string
          sku: string | null
          barcode: string | null
          price: number | null
          sale_price: number | null
          inventory: number
          weight: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          title: string
          sku?: string | null
          barcode?: string | null
          price?: number | null
          sale_price?: number | null
          inventory?: number
          weight?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          title?: string
          sku?: string | null
          barcode?: string | null
          price?: number | null
          sale_price?: number | null
          inventory?: number
          weight?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          alt_text: string | null
          sort_order: number
          is_thumbnail: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          alt_text?: string | null
          sort_order?: number
          is_thumbnail?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          url?: string
          alt_text?: string | null
          sort_order?: number
          is_thumbnail?: boolean
          created_at?: string
        }
      }
      related_products: {
        Row: {
          id: string
          product_id: string
          related_product_id: string
          type: 'related' | 'frequently_bought_together'
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          related_product_id: string
          type?: 'related' | 'frequently_bought_together'
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          related_product_id?: string
          type?: 'related' | 'frequently_bought_together'
          created_at?: string
        }
      }
      inventory_history: {
        Row: {
          id: string
          product_id: string
          previous_quantity: number
          new_quantity: number
          change_amount: number
          reason: string
          notes: string | null
          updated_by: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          previous_quantity: number
          new_quantity: number
          change_amount: number
          reason?: string
          notes?: string | null
          updated_by?: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          previous_quantity?: number
          new_quantity?: number
          change_amount?: number
          reason?: string
          notes?: string | null
          updated_by?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string | null
          shipping_address: Json
          billing_address: Json
          subtotal: number
          shipping_cost: number
          discount: number
          tax: number
          total_amount: number
          order_status: 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed'
          fulfillment_status: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled'
          private_notes: string | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          shipping_address: Json
          billing_address: Json
          subtotal?: number
          shipping_cost?: number
          discount?: number
          tax?: number
          total_amount?: number
          order_status?: 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed'
          fulfillment_status?: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled'
          private_notes?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_id?: string | null
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          shipping_address?: Json
          billing_address?: Json
          subtotal?: number
          shipping_cost?: number
          discount?: number
          tax?: number
          total_amount?: number
          order_status?: 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed'
          fulfillment_status?: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled'
          private_notes?: string | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          variant_id: string | null
          product_name: string
          variant_name: string | null
          sku: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          variant_id?: string | null
          product_name: string
          variant_name?: string | null
          sku?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          variant_id?: string | null
          product_name?: string
          variant_name?: string | null
          sku?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      order_timeline: {
        Row: {
          id: string
          order_id: string
          status_type: string
          status_value: string
          note: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          status_type: string
          status_value: string
          note?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          status_type?: string
          status_value?: string
          note?: string | null
          created_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_status: 'draft' | 'active' | 'archived'
      product_gender: 'men' | 'women' | 'unisex'
      store_visibility: 'homepage' | 'hidden' | 'featured' | 'collection_only' | 'search_visibility'
      related_product_type: 'related' | 'frequently_bought_together'
      order_status: 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed'
      fulfillment_status: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
