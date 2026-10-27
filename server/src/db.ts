import { createClient } from '@supabase/supabase-js';
import { config } from './config';

// Server-side only: uses service role key for unrestricted access.
// Never expose this client or the service role key to the browser.
export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
