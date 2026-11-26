import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string;
          number: string;
          title: string;
          category: string;
          summary: string;
          frequency: string;
          icon_name: string;
          photo_hint: string;
          images: string[];
          partner_highlight: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['activities']['Insert']>;
      };
      submissions: {
        Row: {
          id: string;
          name: string;
          phone: string;
          topic: string;
          message: string;
          status: 'new' | 'reviewed';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['submissions']['Row'], 'created_at'>;
        Update: Partial<Pick<Database['public']['Tables']['submissions']['Row'], 'status'>>;
      };
      settings: {
        Row: {
          id: number;
          backend_api_url: string;
          phone_display: string;
          email: string;
          location: string;
          social_links: import('../data/foundationData').SocialLinkItem[];
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['settings']['Row'], 'updated_at'>;
        Update: Partial<Database['public']['Tables']['settings']['Insert']>;
      };
    };
  };
};
