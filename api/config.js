// Gives the page the Supabase project URL and public ("anon") key, which are
// set as Vercel environment variables. Both are meant to be public: the
// database's row-level security is what keeps each person's progress private.
// If they aren't set, sign-in stays hidden and the site works as before.

export default function handler(req, res) {
  const url = process.env.SUPABASE_URL || '';
  const anonKey = process.env.SUPABASE_ANON_KEY || '';
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json(url && anonKey ? { enabled: true, url, anonKey } : { enabled: false });
}
