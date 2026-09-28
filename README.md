# Groundwork

Interview (and future negotiation) practice tool with a skill path, grading, and a personalization quiz — deployable on Vercel.

## Before deploying
You need an Anthropic API key from https://console.anthropic.com (this needs prepaid credit loaded — no free tier).

## Local setup
1. `npm i -g vercel` (one-time)
2. `vercel login`
3. From this folder: `vercel dev` to test locally (it will ask you to link/create a project)
4. Add your key locally: create a file named `.env.local` with:
   ```
   ANTHROPIC_API_KEY=your-key-here
   ```

## Deploying
- Easiest: push this folder to a GitHub repo (with `index.html` and `api/` at the top level, not nested inside another folder), then import it at vercel.com → New Project.
- In the Vercel project settings, add an Environment Variable: `ANTHROPIC_API_KEY` = your key.
- Deploy. Vercel gives you a live `.vercel.app` URL automatically.

## Notes
- `api/claude.js` is a serverless function that holds your API key server-side and forwards requests to Anthropic — never put the key directly in `index.html`.
- All progress (grade history, skill path stars, quiz profile, flagged messages) is stored in each visitor's browser (`localStorage`), not a shared database. Good enough for testing; swap in Supabase or Firebase later if you want accounts and cross-device history.
- Admin view for flagged messages: open the deployed site with `?admin=1` added to the URL.
- Whenever this project is updated from the Claude side, re-sync this Vercel version — the two can drift out of sync since they're separate files.
