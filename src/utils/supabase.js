import { createClient } from '@supabase/supabase-js'

// Get the Supabase URL and Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // The Supabase URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY// The Supabase API Key (anon or service role key)

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)
