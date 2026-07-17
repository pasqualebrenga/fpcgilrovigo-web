-- Upgrade Area Delegati: ruolo superadmin / GODMODE.
-- Eseguire una volta nel SQL Editor di Supabase sul progetto esistente.

alter table public.authorized_delegates
drop constraint if exists authorized_delegates_role_check;

alter table public.authorized_delegates
add constraint authorized_delegates_role_check
check (role in ('superadmin', 'admin', 'delegate'));

alter table public.authorized_delegates
add column if not exists invite_link text;

alter table public.authorized_delegates
add column if not exists invite_expires_at timestamptz;

alter table public.profiles
drop constraint if exists profiles_role_check;

alter table public.profiles
add constraint profiles_role_check
check (role in ('superadmin', 'admin', 'delegate'));

create or replace function public.is_area_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'superadmin')
      and active = true
  );
$$;

create or replace function public.is_area_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'superadmin'
      and active = true
  );
$$;

drop policy if exists "Admins can manage authorized delegates" on public.authorized_delegates;
create policy "Admins can manage authorized delegates"
on public.authorized_delegates
for all
to authenticated
using (public.is_area_superadmin())
with check (public.is_area_superadmin());

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_area_superadmin());

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
on public.profiles
for all
to authenticated
using (public.is_area_superadmin())
with check (public.is_area_superadmin());

-- Promuove Pasquale Brenga a superadmin / GODMODE.
-- Lo script e idempotente: se il profilo esiste lo aggiorna, se manca lo crea.
insert into public.profiles (id, email, full_name, group_key, role, active)
values (
  '54bf6041-4e64-4782-9a90-759c2b33eda0',
  'pasquale.brenga@gmail.com',
  'Pasquale Brenga',
  'sanita',
  'superadmin',
  true
)
on conflict (id) do update
set email = excluded.email,
    full_name = excluded.full_name,
    group_key = excluded.group_key,
    role = excluded.role,
    active = excluded.active;

insert into public.authorized_delegates (email, full_name, group_key, role, status, accepted_at, auth_user_id)
values (
  'pasquale.brenga@gmail.com',
  'Pasquale Brenga',
  'sanita',
  'superadmin',
  'active',
  now(),
  '54bf6041-4e64-4782-9a90-759c2b33eda0'
)
on conflict (email) do update
set full_name = excluded.full_name,
    group_key = excluded.group_key,
    role = excluded.role,
    status = excluded.status,
    invite_link = null,
    invite_expires_at = null,
    accepted_at = coalesce(public.authorized_delegates.accepted_at, excluded.accepted_at),
    auth_user_id = excluded.auth_user_id;
