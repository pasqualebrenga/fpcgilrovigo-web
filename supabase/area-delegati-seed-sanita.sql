-- Dati iniziali opzionali per provare l'Area Delegati Sanita.
-- Eseguire dopo supabase/area-delegati-schema.sql.

insert into public.delegate_events (title, starts_at, ends_at, place, description, group_key)
select
  'Delegazione trattante ULSS5',
  '2026-07-22 09:30:00+02',
  '2026-07-22 11:30:00+02',
  'ULSS 5 Polesana - Rovigo',
  'Convocazione, piattaforma e materiali preparatori.',
  'sanita'
where not exists (
  select 1 from public.delegate_events where title = 'Delegazione trattante ULSS5' and group_key = 'sanita'
);

insert into public.delegate_events (title, starts_at, ends_at, place, description, group_key)
select
  'Coordinamento delegati sanita',
  '2026-07-25 15:00:00+02',
  '2026-07-25 16:30:00+02',
  'Camera del Lavoro - Rovigo',
  'Aggiornamento su turni, ferie e priorita dei prossimi tavoli.',
  'sanita'
where not exists (
  select 1 from public.delegate_events where title = 'Coordinamento delegati sanita' and group_key = 'sanita'
);

insert into public.delegate_folders (title, section, folder_type, meeting_date, status, description, group_key)
select
  'Delegazione trattante ULSS5',
  'meeting',
  'Tavolo di delegazione',
  '2026-07-22',
  'open',
  'Fascicolo unico con convocazione, piattaforma FP CGIL, appunti preparatori e materiali post-incontro.',
  'sanita'
where not exists (
  select 1 from public.delegate_folders where title = 'Delegazione trattante ULSS5' and section = 'meeting' and group_key = 'sanita'
);

insert into public.delegate_folders (title, section, folder_type, meeting_date, status, description, group_key)
select
  'CCNL, norme e guide rapide',
  'library',
  'Biblioteca normativa',
  null,
  'open',
  'Raccolta stabile di documenti generali: CCNL, 104, congedi, turni, ferie e strumenti per i delegati.',
  'sanita'
where not exists (
  select 1 from public.delegate_folders where title = 'CCNL, norme e guide rapide' and section = 'library' and group_key = 'sanita'
);

insert into public.delegate_folders (title, section, folder_type, meeting_date, status, description, group_key)
select
  'Formazione nuovi delegati',
  'training',
  'Formazione',
  '2026-09-15',
  'draft',
  'Materiali introduttivi su ruolo del delegato, assemblea, raccolta segnalazioni e uso dell''area riservata.',
  'sanita'
where not exists (
  select 1 from public.delegate_folders where title = 'Formazione nuovi delegati' and section = 'training' and group_key = 'sanita'
);
