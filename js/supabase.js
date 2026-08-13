import { createClient } from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL =
    "https://eevtdtdpfmrtvtfszcho.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0dyMUP3vlvoXUERb8gKcsQ_KH86wLm4";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);