// Gives the page the Supabase project URL and public ("anon") key, which are
// set as Vercel environment variables. Both are meant to be public: the
// database's row-level security is what keeps each person's progress private.
// If they aren't set, sign-in stays hidden and the site works as before.

// Supabase's dashboard also shows a ".../rest/v1/" address; only the base
// (https://<project>.supabase.co) works for sign-in, so trim anything after it.
function baseUrl(raw) {
  try {
    return new URL(raw.trim()).origin;
  } catch (e) {
    return '';
  }
}

export default function handler(req, res) {
  const url = baseUrl(process.env.SUPABASE_URL || '');
  const anonKey = (process.env.SUPABASE_ANON_KEY || '').trim();
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json(url && anonKey ? { enabled: true, url, anonKey } : { enabled: false });
}
