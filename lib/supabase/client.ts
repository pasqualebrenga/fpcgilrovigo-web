"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseBrowserEnv } from "./env";

export function createClient() {
  const { publishableKey, url } = getSupabaseBrowserEnv();

  return createBrowserClient(url, publishableKey);
}
