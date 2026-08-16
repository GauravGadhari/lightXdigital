import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://gekthchlhadfbdjtyltv.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdla3RoY2hsaGFkZmJkanR5bHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4NTI1MTMsImV4cCI6MjEwMjQyODUxM30.ql8kj01G6Z0zuDQ2oOdjcSdjMjCrBbbYWmyUPBxK8t8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
