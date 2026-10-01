-- Groundwork: saved progress for signed-in users.
-- Run this once in Supabase: SQL Editor > New query > paste > Run.
--
-- One row per user. `data` holds a JSON copy of their progress (lesson stars,
-- grades and skill scores, quiz answers, question-of-the-day result and
-- practice days). Conversations and voice are never stored.

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row Level Security: each person can only see and change their own row.
alter table public.progress enable row level security;

drop policy if exists "Read own progress" on public.progress;
create policy "Read own progress" on public.progress
  for select using (auth.uid() = user_id);

drop policy if exists "Insert own progress" on public.progress;
create policy "Insert own progress" on public.progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "Update own progress" on public.progress;
create policy "Update own progress" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Delete own progress" on public.progress;
create policy "Delete own progress" on public.progress
  for delete using (auth.uid() = user_id);
