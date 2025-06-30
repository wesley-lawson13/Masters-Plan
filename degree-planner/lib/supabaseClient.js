import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_DB_PROJECT_URL;
const supabaseKey = process.env.VITE_DB_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);