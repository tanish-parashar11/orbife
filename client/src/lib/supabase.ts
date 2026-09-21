import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export async function signInWithSupabase(email: string, password: string) {
  if (!supabase) return { configured: false as const, error: null };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { configured: true as const, error };
}

export async function signUpWithSupabase(email: string, password: string) {
  if (!supabase) return { configured: false as const, error: null };
  const { error } = await supabase.auth.signUp({ email, password });
  return { configured: true as const, error };
}
