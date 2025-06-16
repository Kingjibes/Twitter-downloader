
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrfzscrzgpwfnginjlkh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZnpzY3J6Z3B3Zm5naW5qbGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDI5MjEsImV4cCI6MjA2NTY3ODkyMX0.dxligDDiQQEGdW1yewM3bxxcKMqOXuI7FjkDjX-m-X8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
