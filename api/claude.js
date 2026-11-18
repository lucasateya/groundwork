// Runs every AI request for the Groundwork page. The page sends only a request
// type, settings and conversation text; the instructions (prompts) and safety
// rules are built here on the server, so they can't be changed from the browser.
//
// The checks below block casual misuse (other sites calling this, huge
// requests, one visitor sending too many). They aren't airtight, so also set a
// monthly spend limit in the Anthropic Console.

import { buildRequest, parseChat, BadRequest } from './_lib/prompts.js';
import { overLimit, visitorIp } from './_lib/ratelimit.js';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const MAX_BODY_CHARS = 60000;

// Structured output, plus low effort for quick chat turns on models that
// support effort (Claude 5 family and later).
function outputConfig(request) {
  const cfg = { format: request.format };
  if (request.chat && /^claude-(opus|sonnet|haiku|fable)-([5-9])/.test(MODEL)) cfg.effort = 'low';
  return cfg;
}

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
  if (!req.body || typeof req.body !== 'object' || JSON.stringify(req.body).length > MAX_BODY_CHARS) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  if (await overLimit(visitorIp(req))) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  let request;
  try {
    request = buildRequest(req.body);
  } catch (err) {
    if (err instanceof BadRequest) return res.status(400).json({ error: err.message });
    console.error('Could not build prompt:', err);
    return res.status(500).json({ error: 'Server error building the request' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(Object.assign({
        model: MODEL,
        // Chat replies are short, but the model's thinking counts toward
        // max_tokens too, so leave room or the reply gets cut off mid-way.
        max_tokens: request.chat ? Math.max(request.maxTokens, 4000) : request.maxTokens,
        system: request.system,
        messages: request.messages
      }, request.format ? { output_config: outputConfig(request) } : {}))
    });
    const data = await response.json();
    if (!response.ok) {
      const status = response.status === 429 ? 429 : response.status;
      return res.status(status).json({ error: response.status === 429 ? 'rate_limited' : data });
    }
    const text = (data.content || []).map(b => b.text || '').join('').trim();
    if (!text) return res.status(502).json({ error: 'Empty response' });
    return res.status(200).json(request.chat ? parseChat(text) : { text });
  } catch (err) {
    return res.status(500).json({ error: 'Server error contacting Claude' });
  }
}
