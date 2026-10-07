-- Run once in the Neon or Supabase SQL editor.
create table if not exists leads (
  id           bigserial primary key,
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  organisation text,
  language     text,
  message      text not null,
  source       text not null default 'contact-form',
  status       text not null default 'new',
  ip_hash      text
);

create table if not exists conversations (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip_hash    text,
  handoff    boolean not null default false
);

create table if not exists messages (
  id              bigserial primary key,
  conversation_id uuid not null references conversations(id) on delete cascade,
  created_at      timestamptz not null default now(),
  role            text not null check (role in ('user', 'assistant')),
  content         text not null
);

create table if not exists rate_events (
  id         bigserial primary key,
  created_at timestamptz not null default now(),
  kind       text not null,
  ip_hash    text not null
);

create index if not exists rate_events_lookup on rate_events (kind, ip_hash, created_at);
create index if not exists messages_conversation on messages (conversation_id, created_at);
