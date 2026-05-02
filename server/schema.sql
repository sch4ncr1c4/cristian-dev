create table if not exists contacts (
  id bigserial primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);