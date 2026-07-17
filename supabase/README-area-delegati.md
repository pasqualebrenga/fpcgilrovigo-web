# Area Delegati - Setup Supabase

## 1. SQL Editor

Aprire Supabase, entrare nel progetto FP CGIL Rovigo e lanciare il file:

```text
supabase/area-delegati-schema.sql
```

Lo script crea:

- tabella inviti delegati
- profili utente
- eventi calendario
- fascicoli
- file collegati ai fascicoli
- bucket privato `delegate-area-private`
- policy RLS per superadmin/admin/delegati

Se lo schema era gia stato creato prima dell'introduzione del ruolo `superadmin`, lanciare anche:

```text
supabase/area-delegati-godmode.sql
```

## 2. Variabili ambiente

In locale sono in `.env.local`, che non va in git.

Su Vercel vanno aggiunte:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
```

La `SUPABASE_SERVICE_ROLE_KEY` serve solo lato server per inviti e operazioni admin. Non va mai usata nel browser.

## 3. Primo superadmin

Dopo aver creato il primo utente con Supabase Auth, inserire o aggiornare una riga in `profiles` con:

```text
role = superadmin
group_key = sanita
active = true
```

Da quel momento il superadmin potra invitare nuovi utenti e assegnare i ruoli.

## 4. Flusso previsto

1. Superadmin invita delegato o admin via email.
2. Delegato crea password dal link di invito.
3. Il sito crea/aggancia il profilo autorizzato.
4. Delegato vede solo contenuti del proprio gruppo.
5. Admin vede strumenti di caricamento e modifica.
6. Superadmin vede anche la gestione utenti.
