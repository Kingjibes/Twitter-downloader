import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://vaqdviyquslqqcsyvsnn.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcWR2aXlxdXNscXFjc3l2c25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDg5NjMsImV4cCI6MjA2MzkyNDk2M30.OArCs-Wu4avlW3OAQ3vY-Ftb6a_yj7PYPShrU4dC8J8';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);