// Forwards chat requests from the Groundwork page to Anthropic, keeping the
// API key server-side. The checks below block casual misuse of this endpoint
// (other sites calling it, huge requests). They are not airtight — a
// determined person can fake an Origin header — so also set a monthly spend
// limit in the Anthropic Console.

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const MAX_TOKENS = 1000;
const MAX_SYSTEM_CHARS = 6000;
const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 20000; // grading sends the whole transcript as one message
const MAX_TOTAL_CHARS = 40000;

function isSameSite(req) {
  const origin = req.headers.origin || req.headers.referer;
  if (!origin) return false;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  try {
    return new URL(origin).host === host;
  } catch (e) {
    return false;
  }
}

function validate(body) {
  if (!body || typeof body !== 'object') return 'Invalid request body';
  const { system, messages } = body;
  if (typeof system !== 'string' || system.length === 0 || system.length > MAX_SYSTEM_CHARS) {
    return 'Invalid system prompt';
  }
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return 'Invalid messages';
  }
  let total = system.length;
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return 'Invalid message role';
    if (typeof m.content !== 'string' || m.content.length === 0 || m.content.length > MAX_MESSAGE_CHARS) {
      return 'Invalid message content';
    }
    total += m.content.length;
  }
  if (total > MAX_TOTAL_CHARS) return 'Request too large';
  if (messages[0].role !== 'user') return 'First message must be from the user';
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isSameSite(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Server is missing ANTHROPIC_API_KEY' });
  }
  const problem = validate(req.body);
  if (problem) {
    return res.status(400).json({ error: problem });
  }
  try {
    const { system, messages } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      })
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error contacting Claude' });
  }
}
