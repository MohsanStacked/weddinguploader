// Supabase configuration
// In a production environment, these would be loaded from environment variables

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key',
  storageBucket: 'wedding-uploads'
};