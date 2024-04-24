import { createClient } from '@supabase/supabase-js'

const URL = 'https://ihkussglvecfasfpksjr.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imloa3Vzc2dsdmVjZmFzZnBrc2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5OTQwNDEsImV4cCI6MjAyOTU3MDA0MX0.S7aYNF8E5mDZGXeg4Ej_pq0CtvrcXyOVXe8MPtTAFTk';

export const supabase = createClient(URL, API_KEY);