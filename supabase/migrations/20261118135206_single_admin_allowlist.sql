-- Operator-applied only. No application role may grant or change admin access.
begin;

create table public.admin_allowlist (
  singleton boolean primary key default true check (singleton = true),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now()
);

alter table public.admin_allowlist enable row level security;

revoke all on public.admin_allowlist from public, anon, authenticated;
grant select (singleton, user_id) on public.admin_allowlist to authenticated;

create policy "admin reads own membership"
  on public.admin_allowlist for select to authenticated
  using ((select auth.uid()) = user_id);

-- Intentionally no INSERT/UPDATE/DELETE policies or grants.
-- Primary key + CHECK permits at most one authorized UUID.
commit;
