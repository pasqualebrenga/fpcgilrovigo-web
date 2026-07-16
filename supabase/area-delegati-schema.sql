-- Area Delegati FP CGIL Rovigo
-- Run this file from Supabase SQL Editor after reviewing it.

create extension if not exists pgcrypto;

create table if not exists public.authorized_delegates (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  group_key text not null default 'sanita',
  role text not null default 'delegate' check (role in ('admin', 'delegate')),
  status text not null default 'invited' check (status in ('invited', 'active', 'suspended')),
  invited_at timestamptz,
  accepted_at timestamptz,
  auth_user_id uuid unique references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  group_key text not null default 'sanita',
  role text not null default 'delegate' check (role in ('admin', 'delegate')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.delegate_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  place text,
  description text,
  group_key text not null default 'sanita',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.delegate_folders (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  section text not null check (section in ('meeting', 'library', 'training')),
  folder_type text,
  meeting_date date,
  status text not null default 'draft' check (status in ('draft', 'open', 'closed', 'archived')),
  description text,
  group_key text not null default 'sanita',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.delegate_files (
  id uuid primary key default gen_random_uuid(),
  folder_id uuid not null references public.delegate_folders(id) on delete cascade,
  title text not null,
  file_kind text,
  storage_path text not null unique,
  size_bytes bigint,
  group_key text not null default 'sanita',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists authorized_delegates_touch_updated_at on public.authorized_delegates;
create trigger authorized_delegates_touch_updated_at
before update on public.authorized_delegates
for each row execute function public.touch_updated_at();

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists delegate_events_touch_updated_at on public.delegate_events;
create trigger delegate_events_touch_updated_at
before update on public.delegate_events
for each row execute function public.touch_updated_at();

drop trigger if exists delegate_folders_touch_updated_at on public.delegate_folders;
create trigger delegate_folders_touch_updated_at
before update on public.delegate_folders
for each row execute function public.touch_updated_at();

drop trigger if exists delegate_files_touch_updated_at on public.delegate_files;
create trigger delegate_files_touch_updated_at
before update on public.delegate_files
for each row execute function public.touch_updated_at();

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
      and role = 'admin'
      and active = true
  );
$$;

create or replace function public.current_area_group()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select group_key
  from public.profiles
  where id = auth.uid()
    and active = true
  limit 1;
$$;

alter table public.authorized_delegates enable row level security;
alter table public.profiles enable row level security;
alter table public.delegate_events enable row level security;
alter table public.delegate_folders enable row level security;
alter table public.delegate_files enable row level security;

drop policy if exists "Admins can manage authorized delegates" on public.authorized_delegates;
create policy "Admins can manage authorized delegates"
on public.authorized_delegates
for all
to authenticated
using (public.is_area_admin())
with check (public.is_area_admin());

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_area_admin());

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
on public.profiles
for all
to authenticated
using (public.is_area_admin())
with check (public.is_area_admin());

drop policy if exists "Delegates can read group events" on public.delegate_events;
create policy "Delegates can read group events"
on public.delegate_events
for select
to authenticated
using (public.is_area_admin() or group_key = public.current_area_group());

drop policy if exists "Admins can manage events" on public.delegate_events;
create policy "Admins can manage events"
on public.delegate_events
for all
to authenticated
using (public.is_area_admin())
with check (public.is_area_admin());

drop policy if exists "Delegates can read group folders" on public.delegate_folders;
create policy "Delegates can read group folders"
on public.delegate_folders
for select
to authenticated
using (public.is_area_admin() or group_key = public.current_area_group());

drop policy if exists "Admins can manage folders" on public.delegate_folders;
create policy "Admins can manage folders"
on public.delegate_folders
for all
to authenticated
using (public.is_area_admin())
with check (public.is_area_admin());

drop policy if exists "Delegates can read group files" on public.delegate_files;
create policy "Delegates can read group files"
on public.delegate_files
for select
to authenticated
using (public.is_area_admin() or group_key = public.current_area_group());

drop policy if exists "Admins can manage files" on public.delegate_files;
create policy "Admins can manage files"
on public.delegate_files
for all
to authenticated
using (public.is_area_admin())
with check (public.is_area_admin());

insert into storage.buckets (id, name, public)
values ('delegate-area-private', 'delegate-area-private', false)
on conflict (id) do nothing;

drop policy if exists "Delegates can read authorized storage objects" on storage.objects;
create policy "Delegates can read authorized storage objects"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'delegate-area-private'
  and exists (
    select 1
    from public.delegate_files
    where delegate_files.storage_path = storage.objects.name
      and (
        public.is_area_admin()
        or delegate_files.group_key = public.current_area_group()
      )
  )
);

drop policy if exists "Admins can insert storage objects" on storage.objects;
create policy "Admins can insert storage objects"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'delegate-area-private'
  and public.is_area_admin()
);

drop policy if exists "Admins can update storage objects" on storage.objects;
create policy "Admins can update storage objects"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'delegate-area-private'
  and public.is_area_admin()
)
with check (
  bucket_id = 'delegate-area-private'
  and public.is_area_admin()
);

drop policy if exists "Admins can delete storage objects" on storage.objects;
create policy "Admins can delete storage objects"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'delegate-area-private'
  and public.is_area_admin()
);
