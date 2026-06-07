const SUPABASE_URL =
'https://cspzkofhgfrnkhjpfazb.supabase.co';

const SUPABASE_ANON_KEY =
'sb_publishable_oYbR_A78f8SRKdJbkeZegQ_4gAx-567';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);