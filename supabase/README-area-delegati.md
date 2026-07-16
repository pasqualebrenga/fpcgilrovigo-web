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
- policy RLS per admin/delegati

## 2. Variabili ambiente

In locale sono in `.env.local`, che non va in git.

Su Vercel vanno aggiunte:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
```

La `SUPABASE_SERVICE_ROLE_KEY` serve solo lato server per inviti e operazioni admin. Non va mai usata nel browser.

## 3. Primo admin

Dopo aver creato il primo utente admin con Supabase Auth, inserire una riga in `profiles` con:

```text
role = admin
group_key = sanita
active = true
```

Da quel momento l'admin potra gestire inviti, eventi, fascicoli e file.

## 4. Flusso previsto

1. Admin invita delegato via email.
2. Delegato crea password dal link di invito.
3. Il sito crea/aggancia il profilo autorizzato.
4. Delegato vede solo contenuti del proprio gruppo.
5. Admin vede anche strumenti di caricamento e modifica.
