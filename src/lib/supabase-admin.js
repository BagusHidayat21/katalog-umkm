import { createClient } from "@supabase/supabase-js";

// Klien Supabase dengan secret key: hanya dipakai di server (Server Action), tidak pernah diimpor client component
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);
