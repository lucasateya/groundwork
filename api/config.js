// Gives the page the public settings it needs, read from Vercel environment
// variables:
//   SUPABASE_URL, SUPABASE_ANON_KEY  sign-in and progress sync. Both are meant to
//     be public: the database's row-level security keeps each person's progress
//     private. If they aren't set, sign-in stays hidden and the site works as before.
//   FORMSPREE_FORM_ID  the contact form (the part after formspree.io/f/). If it
//     isn't set, the contact page says the form isn't ready yet.

// Supabase's dashboard also shows a ".../rest/v1/" address; only the base
// (https://<project>.supabase.co) works for sign-in, so trim anything after it.
function baseUrl(raw) {
  try {
    return new URL(raw.trim()).origin;
  } catch (e) {
    return '';
  }
}

// Accept either the bare ID or the full https://formspree.io/f/<id> address.
function formId(raw) {
  const id = String(raw || '').trim().replace(/^.*\/f\//, '').replace(/[/?#].*$/, '');
  return /^[A-Za-z0-9]{4,20}$/.test(id) ? id : '';
}

export default function handler(req, res) {
  const url = baseUrl(process.env.SUPABASE_URL || '');
  const anonKey = (process.env.SUPABASE_ANON_KEY || '').trim();
  const contactForm = formId(process.env.FORMSPREE_FORM_ID);
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json(Object.assign(
    url && anonKey ? { enabled: true, url, anonKey } : { enabled: false },
    { contactForm }
  ));
}
