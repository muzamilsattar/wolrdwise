import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project details
const SUPABASE_URL = "https://stkhrsocahjdhhbjpqig.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a2hyc29jYWhqZGhoYmpwcWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDczMzYsImV4cCI6MjA0OTQyMzMzNn0.uqH5TZ7xfDw4oKCTbg0ya2F41GY4kzRdqBeyeoiWK1M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
