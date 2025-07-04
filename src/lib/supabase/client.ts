import { createBrowserClient } from "@supabase/ssr";
import { config } from "../config";
import type { Database } from "./database.types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || config.supabase.url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || config.supabase.anonKey,
  );
}
