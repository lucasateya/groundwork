// Per-visitor limit on AI requests, counted per IP address per hour.
//
// With Upstash Redis connected (Vercel → Storage), the count is shared by all
// of Vercel's servers. Without it, each server keeps its own rough count, which
// is looser but still stops a single runaway visitor.

const LIMIT = Number(process.env.AI_REQUESTS_PER_HOUR) || 150;
const memory = new Map(); // key -> count (this server only)

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

export function visitorIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || String(req.headers['x-real-ip'] || '') || (req.socket && req.socket.remoteAddress) || 'unknown';
}

// True when this visitor has used up this hour's requests.
export async function overLimit(ip) {
  const hour = Math.floor(Date.now() / 3600000);
  const key = 'gw:ai:' + ip + ':' + hour;
  const redis = redisConfig();
  if (redis) {
    try {
      const r = await fetch(redis.url + '/pipeline', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + redis.token, 'Content-Type': 'application/json' },
        body: JSON.stringify([['INCR', key], ['EXPIRE', key, '3600']])
      });
      const out = await r.json();
      const count = Array.isArray(out) && out[0] ? Number(out[0].result) : NaN;
      if (!Number.isNaN(count)) return count > LIMIT;
    } catch (e) {
      // Redis unreachable: fall back to this server's own count.
    }
  }
  if (memory.size > 5000) {
    for (const k of memory.keys()) if (!k.endsWith(':' + hour)) memory.delete(k);
  }
  const count = (memory.get(key) || 0) + 1;
  memory.set(key, count);
  return count > LIMIT;
}
