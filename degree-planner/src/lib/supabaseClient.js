import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_DB_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_DB_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);