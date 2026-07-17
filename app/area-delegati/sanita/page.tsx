import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Download,
  FileText,
  FolderOpen,
  LockKeyhole,
  Mail,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { CopyInviteLink } from "./copy-invite-link";
import { DeleteConfirmForm } from "./delete-confirm-form";

export const metadata: Metadata = {
  title: "Area Delegati Sanità - FP CGIL Rovigo",
  description: "Area riservata per delegati sanità FP CGIL Rovigo.",
  robots: {
    index: false,
    follow: false,
  },
};

type DelegateEventRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  place: string | null;
  description: string | null;
};

type DelegateFolderRow = {
  id: string;
  title: string;
  section: "meeting" | "library" | "training";
  folder_type: string | null;
  meeting_date: string | null;
  status: string;
  description: string | null;
  created_at: string;
};

type DelegateFileRow = {
  id: string;
  folder_id: string;
  title: string;
  file_kind: string | null;
  storage_path: string;
  size_bytes: number | null;
  created_at: string;
  signedUrl?: string;
};

type AreaRole = "superadmin" | "admin" | "delegate";

type AuthorizedDelegateRow = {
  id: string;
  email: string;
  full_name: string;
  group_key: string;
  role: AreaRole;
  status: "invited" | "active" | "suspended";
  invited_at: string | null;
  invite_link: string | null;
  invite_expires_at: string | null;
  accepted_at: string | null;
  auth_user_id: string | null;
};

function Badge({ children }: { children: ReactNode }) {
  return <span className="healthDelegatesBadge">{children}</span>;
}

function formatDateParts(value: string) {
  const date = new Date(value);

  return {
    day: new Intl.DateTimeFormat("it-IT", { day: "2-digit", timeZone: "Europe/Rome" }).format(date),
    month: new Intl.DateTimeFormat("it-IT", { month: "short", timeZone: "Europe/Rome" })
      .format(date)
      .replace(".", ""),
    time: new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Rome",
    }).format(date),
  };
}

function formatLongDate(value: string | null) {
  if (!value) {
    return "Data da definire";
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  }).format(new Date(value));
}

function formatFileSize(size: number | null) {
  if (!size) {
    return "file";
  }

  if (size < 1024 * 1024) {
    return `${Math.ceil(size / 1024)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    archived: "Archiviato",
    closed: "Chiuso",
    draft: "Bozza",
    open: "Aperto",
  };

  return labels[status] || status;
}

function EmptyState({ children }: { children: ReactNode }) {
  return <div className="healthDelegatesEmpty">{children}</div>;
}

function getRequiredText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Campo obbligatorio mancante: ${key}`);
  }

  return value.trim();
}

function getOptionalText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function getRomeTimestamp(date: string, time: string) {
  return `${date}T${time}:00+02:00`;
}

function getSafeStorageName(name: string) {
  const cleanName = name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return cleanName.slice(0, 96) || "documento";
}

function roleLabel(role: string | null | undefined) {
  const labels: Record<string, string> = {
    admin: "admin",
    delegate: "delegato",
    superadmin: "superadmin",
  };

  return role ? labels[role] || role : "delegato";
}

function userStatusLabel(status: string | null | undefined) {
  const labels: Record<string, string> = {
    active: "attivo",
    invited: "invitato",
    suspended: "bloccato",
  };

  return status ? labels[status] || status : "invitato";
}

function userStatusDetail(user: AuthorizedDelegateRow) {
  if (user.status === "suspended") {
    return "Accesso bloccato";
  }

  if (user.accepted_at) {
    return `Account attivo dal ${formatLongDate(user.accepted_at)}`;
  }

  if (user.auth_user_id) {
    return "Utente generato, in attesa del primo accesso";
  }

  if (user.invited_at) {
    return `Invito generato il ${formatLongDate(user.invited_at)}`;
  }

  return "Invito da generare";
}

function userLinkCopyLabel(user: AuthorizedDelegateRow) {
  return user.status === "active" || user.accepted_at ? "Copia link password" : "Copia link invito";
}

function userLinkActionLabel(user: AuthorizedDelegateRow) {
  return user.status === "active" || user.accepted_at ? "Reset password" : "Invia link";
}

function getAreaRedirectUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?next=/area-delegati/reset-password`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/auth/confirm?next=/area-delegati/reset-password`;
  }

  return "http://localhost:3001/auth/confirm?next=/area-delegati/reset-password";
}

function getAreaBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return "http://localhost:3001";
}

function buildInviteLink(tokenHash: string, type: "invite" | "recovery") {
  const url = new URL("/auth/confirm", getAreaBaseUrl());
  url.searchParams.set("token_hash", tokenHash);
  url.searchParams.set("type", type);
  url.searchParams.set("next", "/area-delegati/reset-password");
  return url.toString();
}

async function requireAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/area-delegati/login?next=/area-delegati/sanita");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, group_key, role, active")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.active || !["admin", "superadmin"].includes(profile.role)) {
    throw new Error("Operazione consentita solo agli amministratori.");
  }

  return { profile, supabase, user };
}

async function requireSuperAdminSession() {
  const session = await requireAdminSession();

  if (session.profile.role !== "superadmin") {
    throw new Error("Operazione consentita solo al superadmin.");
  }

  return session;
}

async function markCurrentAreaUserAccepted(userId: string, email: string | undefined) {
  const adminSupabase = createAdminClient();
  const now = new Date().toISOString();
  const update = {
    accepted_at: now,
    auth_user_id: userId,
    invite_link: null,
    invite_expires_at: null,
    status: "active",
  };

  await adminSupabase
    .from("authorized_delegates")
    .update(update)
    .eq("auth_user_id", userId)
    .is("accepted_at", null);

  if (email) {
    await adminSupabase
      .from("authorized_delegates")
      .update(update)
      .eq("email", email.toLowerCase())
      .is("accepted_at", null);
  }
}

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/area-delegati/login");
}

async function createDelegateEvent(formData: FormData) {
  "use server";

  const { profile, supabase, user } = await requireAdminSession();
  const date = getRequiredText(formData, "event_date");
  const startTime = getRequiredText(formData, "start_time");
  const endTime = getRequiredText(formData, "end_time");
  const title = getRequiredText(formData, "title");

  const { error } = await supabase.from("delegate_events").insert({
    created_by: user.id,
    description: getOptionalText(formData, "description"),
    ends_at: getRomeTimestamp(date, endTime),
    group_key: profile.group_key,
    place: getOptionalText(formData, "place"),
    starts_at: getRomeTimestamp(date, startTime),
    title,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/area-delegati/sanita");
}

async function inviteAreaUser(formData: FormData) {
  "use server";

  const { profile } = await requireSuperAdminSession();
  const email = getRequiredText(formData, "email").toLowerCase();
  const fullName = getRequiredText(formData, "full_name");
  const role = getRequiredText(formData, "role");
  const groupKey = getOptionalText(formData, "group_key") || profile.group_key;

  if (!["superadmin", "admin", "delegate"].includes(role)) {
    throw new Error("Ruolo non valido.");
  }

  const adminSupabase = createAdminClient();
  let linkType: "invite" | "recovery" = "invite";
  let linkResult = await adminSupabase.auth.admin.generateLink({
    type: "invite",
    email,
    options: {
      data: {
        full_name: fullName,
        group_key: groupKey,
        role,
      },
      redirectTo: getAreaRedirectUrl(),
    },
  });

  if (linkResult.error) {
    linkType = "recovery";
    linkResult = await adminSupabase.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: getAreaRedirectUrl(),
      },
    });
  }

  const properties = linkResult.data.properties as { hashed_token?: string } | undefined;
  const tokenHash = properties?.hashed_token;

  if (linkResult.error || !linkResult.data.user || !tokenHash) {
    throw new Error(linkResult.error?.message || "Generazione invito non riuscita.");
  }

  const inviteLink = buildInviteLink(tokenHash, linkType);
  const inviteExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { error: profileError } = await adminSupabase.from("profiles").upsert({
    active: true,
    email,
    full_name: fullName,
    group_key: groupKey,
    id: linkResult.data.user.id,
    role,
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { error: authorizedError } = await adminSupabase.from("authorized_delegates").upsert(
    {
      auth_user_id: linkResult.data.user.id,
      email,
      full_name: fullName,
      group_key: groupKey,
      invite_expires_at: inviteExpiresAt,
      invite_link: inviteLink,
      invited_at: new Date().toISOString(),
      role,
      status: "invited",
    },
    { onConflict: "email" },
  );

  if (authorizedError) {
    throw new Error(authorizedError.message);
  }

  revalidatePath("/area-delegati/sanita");
}

async function refreshAreaUserLink(formData: FormData) {
  "use server";

  await requireSuperAdminSession();
  const authorizedId = getRequiredText(formData, "authorized_id");
  const adminSupabase = createAdminClient();
  const { data: areaUser, error: areaUserError } = await adminSupabase
    .from("authorized_delegates")
    .select("id, email, full_name, group_key, role, status, auth_user_id, accepted_at")
    .eq("id", authorizedId)
    .maybeSingle();

  if (areaUserError || !areaUser) {
    throw new Error(areaUserError?.message || "Utente non trovato.");
  }

  if (areaUser.status === "suspended") {
    throw new Error("Riattiva l'utente prima di generare un nuovo link.");
  }

  let linkType: "invite" | "recovery" = areaUser.accepted_at || areaUser.status === "active" ? "recovery" : "invite";
  let linkResult =
    linkType === "invite"
      ? await adminSupabase.auth.admin.generateLink({
          type: "invite",
          email: areaUser.email,
          options: {
            data: {
              full_name: areaUser.full_name,
              group_key: areaUser.group_key,
              role: areaUser.role,
            },
            redirectTo: getAreaRedirectUrl(),
          },
        })
      : await adminSupabase.auth.admin.generateLink({
          type: "recovery",
          email: areaUser.email,
          options: {
            redirectTo: getAreaRedirectUrl(),
          },
        });

  if (linkResult.error && linkType === "invite") {
    linkType = "recovery";
    linkResult = await adminSupabase.auth.admin.generateLink({
      type: "recovery",
      email: areaUser.email,
      options: {
        redirectTo: getAreaRedirectUrl(),
      },
    });
  }

  const properties = linkResult.data.properties as { hashed_token?: string } | undefined;
  const tokenHash = properties?.hashed_token;

  if (linkResult.error || !linkResult.data.user || !tokenHash) {
    throw new Error(linkResult.error?.message || "Generazione link non riuscita.");
  }

  const { error: updateError } = await adminSupabase
    .from("authorized_delegates")
    .update({
      auth_user_id: linkResult.data.user.id,
      invite_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      invite_link: buildInviteLink(tokenHash, linkType),
      invited_at: new Date().toISOString(),
    })
    .eq("id", authorizedId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/area-delegati/sanita");
}

async function suspendAreaUser(formData: FormData) {
  "use server";

  const { user } = await requireSuperAdminSession();
  const authorizedId = getRequiredText(formData, "authorized_id");
  const adminSupabase = createAdminClient();
  const { data: areaUser, error: areaUserError } = await adminSupabase
    .from("authorized_delegates")
    .select("id, auth_user_id")
    .eq("id", authorizedId)
    .maybeSingle();

  if (areaUserError || !areaUser) {
    throw new Error(areaUserError?.message || "Utente non trovato.");
  }

  if (areaUser.auth_user_id === user.id) {
    throw new Error("Non puoi bloccare il tuo stesso account superadmin.");
  }

  const { error: authorizedError } = await adminSupabase
    .from("authorized_delegates")
    .update({ status: "suspended", invite_link: null, invite_expires_at: null })
    .eq("id", authorizedId);

  if (authorizedError) {
    throw new Error(authorizedError.message);
  }

  if (areaUser.auth_user_id) {
    const { error: profileError } = await adminSupabase
      .from("profiles")
      .update({ active: false })
      .eq("id", areaUser.auth_user_id);

    if (profileError) {
      throw new Error(profileError.message);
    }
  }

  revalidatePath("/area-delegati/sanita");
}

async function reactivateAreaUser(formData: FormData) {
  "use server";

  await requireSuperAdminSession();
  const authorizedId = getRequiredText(formData, "authorized_id");
  const adminSupabase = createAdminClient();
  const { data: areaUser, error: areaUserError } = await adminSupabase
    .from("authorized_delegates")
    .select("id, auth_user_id")
    .eq("id", authorizedId)
    .maybeSingle();

  if (areaUserError || !areaUser) {
    throw new Error(areaUserError?.message || "Utente non trovato.");
  }

  const { error: authorizedError } = await adminSupabase
    .from("authorized_delegates")
    .update({ status: "active" })
    .eq("id", authorizedId);

  if (authorizedError) {
    throw new Error(authorizedError.message);
  }

  if (areaUser.auth_user_id) {
    const { error: profileError } = await adminSupabase
      .from("profiles")
      .update({ active: true })
      .eq("id", areaUser.auth_user_id);

    if (profileError) {
      throw new Error(profileError.message);
    }
  }

  revalidatePath("/area-delegati/sanita");
}

async function deleteAreaUser(formData: FormData) {
  "use server";

  const { user } = await requireSuperAdminSession();
  const authorizedId = getRequiredText(formData, "authorized_id");
  const adminSupabase = createAdminClient();
  const { data: areaUser, error: areaUserError } = await adminSupabase
    .from("authorized_delegates")
    .select("id, auth_user_id")
    .eq("id", authorizedId)
    .maybeSingle();

  if (areaUserError || !areaUser) {
    throw new Error(areaUserError?.message || "Utente non trovato.");
  }

  if (areaUser.auth_user_id === user.id) {
    throw new Error("Non puoi eliminare il tuo stesso account superadmin.");
  }

  if (areaUser.auth_user_id) {
    const { error: authError } = await adminSupabase.auth.admin.deleteUser(areaUser.auth_user_id);

    if (authError) {
      throw new Error(authError.message);
    }
  }

  const { error: authorizedError } = await adminSupabase.from("authorized_delegates").delete().eq("id", authorizedId);

  if (authorizedError) {
    throw new Error(authorizedError.message);
  }

  revalidatePath("/area-delegati/sanita");
}

async function createDelegateFolder(formData: FormData) {
  "use server";

  const { profile, supabase, user } = await requireAdminSession();
  const section = getRequiredText(formData, "section");

  if (!["meeting", "library", "training"].includes(section)) {
    throw new Error("Sezione fascicolo non valida.");
  }

  const { error } = await supabase.from("delegate_folders").insert({
    created_by: user.id,
    description: getOptionalText(formData, "description"),
    folder_type: getOptionalText(formData, "folder_type"),
    group_key: profile.group_key,
    meeting_date: getOptionalText(formData, "meeting_date"),
    section,
    status: getRequiredText(formData, "status"),
    title: getRequiredText(formData, "title"),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/area-delegati/sanita");
}

async function uploadDelegateFile(formData: FormData) {
  "use server";

  const { profile, supabase, user } = await requireAdminSession();
  const folderId = getRequiredText(formData, "folder_id");
  const title = getRequiredText(formData, "title");
  const fileKind = getOptionalText(formData, "file_kind");
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Seleziona un file da caricare.");
  }

  const storagePath = `${profile.group_key}/${folderId}/${crypto.randomUUID()}-${getSafeStorageName(file.name)}`;
  const { error: uploadError } = await supabase.storage.from("delegate-area-private").upload(storagePath, file, {
    contentType: file.type || "application/octet-stream",
  });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { error: insertError } = await supabase.from("delegate_files").insert({
    created_by: user.id,
    file_kind: fileKind,
    folder_id: folderId,
    group_key: profile.group_key,
    size_bytes: file.size,
    storage_path: storagePath,
    title,
  });

  if (insertError) {
    await supabase.storage.from("delegate-area-private").remove([storagePath]);
    throw new Error(insertError.message);
  }

  revalidatePath("/area-delegati/sanita");
}

async function deleteDelegateFile(formData: FormData) {
  "use server";

  const { profile, supabase } = await requireAdminSession();
  const fileId = getRequiredText(formData, "file_id");

  const { data: file, error: readError } = await supabase
    .from("delegate_files")
    .select("id, group_key, storage_path")
    .eq("id", fileId)
    .eq("group_key", profile.group_key)
    .maybeSingle();

  if (readError || !file) {
    throw new Error(readError?.message || "File non trovato.");
  }

  const { error: storageError } = await supabase.storage.from("delegate-area-private").remove([file.storage_path]);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { error: deleteError } = await supabase.from("delegate_files").delete().eq("id", file.id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  revalidatePath("/area-delegati/sanita");
}

async function deleteDelegateFolder(formData: FormData) {
  "use server";

  const { profile, supabase } = await requireAdminSession();
  const folderId = getRequiredText(formData, "folder_id");

  const { data: files, error: filesError } = await supabase
    .from("delegate_files")
    .select("storage_path")
    .eq("folder_id", folderId)
    .eq("group_key", profile.group_key);

  if (filesError) {
    throw new Error(filesError.message);
  }

  const paths = (files || []).map((file) => file.storage_path).filter(Boolean);

  if (paths.length > 0) {
    const { error: storageError } = await supabase.storage.from("delegate-area-private").remove(paths);

    if (storageError) {
      throw new Error(storageError.message);
    }
  }

  const { error } = await supabase
    .from("delegate_folders")
    .delete()
    .eq("id", folderId)
    .eq("group_key", profile.group_key);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/area-delegati/sanita");
}

export default async function HealthDelegatesDemoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/area-delegati/login?next=/area-delegati/sanita");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name, group_key, role, active")
    .eq("id", user.id)
    .maybeSingle();

  const isActive = profile?.active === true;
  const isAdmin = isActive && ["admin", "superadmin"].includes(profile?.role || "");
  const isSuperAdmin = isActive && profile?.role === "superadmin";
  const groupKey = profile?.group_key || "sanita";

  if (!isActive) {
    return (
      <div className="healthDelegatesPage">
        <section className="healthDelegatesHero">
          <div>
            <Badge>
              <LockKeyhole size={16} /> Accesso non attivo
            </Badge>
            <h1>Area Delegati Sanità</h1>
            <p>
              Il tuo account esiste, ma non risulta ancora abilitato alla consultazione dei materiali riservati.
            </p>
          </div>
          <div className="healthDelegatesHeroPanel" aria-label="Account non attivo">
            <ShieldCheck size={24} />
            <strong>Verifica necessaria</strong>
            <span>Contatta FP CGIL Rovigo per completare l’attivazione.</span>
          </div>
        </section>
        <section className="healthDelegatesCard">
          <form action={signOut}>
            <button className="healthDelegatesButton" type="submit">
              Esci
            </button>
          </form>
        </section>
      </div>
    );
  }

  await markCurrentAreaUserAccepted(user.id, user.email);

  return (
    <div className="healthDelegatesPage">
      <section className="healthDelegatesHero">
        <div>
          <Badge>
            <LockKeyhole size={16} /> Area riservata
          </Badge>
          <h1>Area Delegati Sanità</h1>
          <p>Appuntamenti, fascicoli dei tavoli, documentazione utile e formazione per delegati.</p>
        </div>
        <div className="healthDelegatesHeroPanel" aria-label="Stato prototipo">
          <ShieldCheck size={24} />
          <strong>{isSuperAdmin ? "GODMODE" : isAdmin ? "Vista amministratore" : "Vista delegato"}</strong>
        </div>
      </section>

      <AreaDelegatiContent
        groupKey={groupKey}
        isAdmin={isAdmin}
        isSuperAdmin={isSuperAdmin}
        profile={profile}
        currentUserId={user.id}
        userEmail={user.email || ""}
      />
    </div>
  );
}

async function AreaDelegatiContent({
  groupKey,
  isAdmin,
  isSuperAdmin,
  profile,
  currentUserId,
  userEmail,
}: {
  groupKey: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  profile: { email: string; full_name: string; group_key: string; role: string; active: boolean } | null;
  currentUserId: string;
  userEmail: string;
}) {
  const supabase = await createClient();
  const [{ data: eventRows }, { data: folderRows }, { data: fileRows }, { data: authorizedRows }] = await Promise.all([
    supabase
      .from("delegate_events")
      .select("id, title, starts_at, ends_at, place, description")
      .eq("group_key", groupKey)
      .order("starts_at", { ascending: true }),
    supabase
      .from("delegate_folders")
      .select("id, title, section, folder_type, meeting_date, status, description, created_at")
      .eq("group_key", groupKey)
      .order("meeting_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false }),
    supabase
      .from("delegate_files")
      .select("id, folder_id, title, file_kind, storage_path, size_bytes, created_at")
      .eq("group_key", groupKey)
      .order("created_at", { ascending: false }),
    isSuperAdmin
      ? supabase
          .from("authorized_delegates")
          .select(
            "id, email, full_name, group_key, role, status, invited_at, invite_link, invite_expires_at, accepted_at, auth_user_id",
          )
          .order("full_name", {
            ascending: true,
          })
      : Promise.resolve({ data: [] }),
  ]);

  const filesWithLinks = await Promise.all(
    ((fileRows || []) as DelegateFileRow[]).map(async (file) => {
      const { data } = await supabase.storage.from("delegate-area-private").createSignedUrl(file.storage_path, 60 * 30);

      return {
        ...file,
        signedUrl: data?.signedUrl,
      };
    }),
  );
  const filesByFolder = filesWithLinks.reduce<Record<string, DelegateFileRow[]>>((accumulator, file) => {
    accumulator[file.folder_id] = [...(accumulator[file.folder_id] || []), file];
    return accumulator;
  }, {});
  const events = (eventRows || []) as DelegateEventRow[];
  const folders = (folderRows || []) as DelegateFolderRow[];
  const meetingFolders = folders.filter((folder) => folder.section === "meeting");
  const libraryFolders = folders.filter((folder) => folder.section === "library");
  const trainingFolders = folders.filter((folder) => folder.section === "training");
  const latestMaterials = filesWithLinks.slice(0, 6);
  const areaUsers = (authorizedRows || []) as AuthorizedDelegateRow[];

  return (
    <section className="healthDelegatesLayout">
        <div className="healthDelegatesMain">
          <section className="healthDelegatesCard">
            <div className="healthDelegatesSectionHeader">
              <div>
                <Badge>
                  <CalendarDays size={15} /> Calendario interno
                </Badge>
                <h2>Agenda delegati sanità</h2>
              </div>
              {isAdmin ? (
                <a className="healthDelegatesButton" href="#admin-eventi">
                  Nuovo evento <Plus size={17} />
                </a>
              ) : null}
            </div>

            <div className="healthDelegatesCalendarMock">
              <div className="healthDelegatesCalendarTop">
                <strong>FP CGIL Rovigo - Sanità</strong>
                <span>{events.length} eventi presenti nel calendario</span>
              </div>
              <div className="healthDelegatesEvents">
                {events.length > 0 ? (
                  events.map((event) => {
                    const date = formatDateParts(event.starts_at);

                    return (
                      <article key={event.id} className="healthDelegatesEvent">
                        <div className="healthDelegatesDate">
                          <strong>{date.day}</strong>
                          <span>{date.month}</span>
                        </div>
                        <div>
                          <div className="healthDelegatesEventMeta">
                            <Clock3 size={15} /> {date.time} · {event.place || "Luogo da definire"}
                          </div>
                          <h3>{event.title}</h3>
                          <p>{event.description || "Dettagli in aggiornamento."}</p>
                          <div className="healthDelegatesActions">
                            <a href={`/area-delegati/sanita/eventi/${event.id}/calendar.ics`} download>
                              <Download size={16} /> Aggiungi al telefono
                            </a>
                            {isAdmin ? (
                              <button type="button">
                                <Pencil size={16} /> Modifica
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <EmptyState>
                    <strong>Nessun evento caricato</strong>
                    <span>Quando l&apos;amministratore aggiunge il primo appuntamento, comparirà qui.</span>
                  </EmptyState>
                )}
              </div>
            </div>
          </section>

          <section className="healthDelegatesCard">
            <div className="healthDelegatesSectionHeader">
              <div>
                <Badge>
                  <FolderOpen size={15} /> Fascicoli per incontro
                </Badge>
                <h2>Materiale specifico dei tavoli</h2>
                <p>
                  Ogni incontro ha una cartella/fascicolo: dentro ci stanno convocazione, piattaforma, verbali, appunti
                  e allegati. Così i file non finiscono sparsi.
                </p>
              </div>
            </div>

            <div className="healthDelegatesMeetingGrid">
              {meetingFolders.length > 0 ? (
                meetingFolders.map((folder) => {
                  const files = filesByFolder[folder.id] || [];

                  return (
                    <article key={folder.id} className="healthDelegatesMeetingCard">
                      <div className="healthDelegatesMeetingTop">
                        <div>
                          <span>{folder.folder_type || "Fascicolo"}</span>
                          <h3>{folder.title}</h3>
                        </div>
                        <strong>{statusLabel(folder.status)}</strong>
                      </div>
                      <p>{folder.description || "Descrizione in aggiornamento."}</p>
                      <div className="healthDelegatesMeetingMeta">
                        <Clock3 size={15} /> {formatLongDate(folder.meeting_date)} · {files.length} file
                      </div>
                      <div className="healthDelegatesFileList">
                        {files.length > 0 ? (
                          files.map((file) => (
                            <div key={file.id} className="healthDelegatesFileRow">
                              <a href={file.signedUrl || "#"}>
                                <FileText size={17} />
                                <span>{file.title}</span>
                                <strong>
                                  {file.file_kind || "File"} · {formatFileSize(file.size_bytes)}
                                </strong>
                              </a>
                              {isAdmin ? (
                                <DeleteConfirmForm
                                  action={deleteDelegateFile}
                                  confirmMessage={`Eliminare il file "${file.title}"?`}
                                  hiddenName="file_id"
                                  hiddenValue={file.id}
                                >
                                  <button aria-label={`Elimina ${file.title}`} type="submit">
                                    <Trash2 size={15} /> Elimina
                                  </button>
                                </DeleteConfirmForm>
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <span className="healthDelegatesMiniEmpty">Nessun file in questo fascicolo.</span>
                        )}
                      </div>
                      {isAdmin ? (
                        <DeleteConfirmForm
                          action={deleteDelegateFolder}
                          className="healthDelegatesDangerForm"
                          confirmMessage={`Eliminare il fascicolo "${folder.title}" e tutti i file collegati?`}
                          hiddenName="folder_id"
                          hiddenValue={folder.id}
                        >
                          <button type="submit">
                            <Trash2 size={15} /> Elimina fascicolo
                          </button>
                        </DeleteConfirmForm>
                      ) : null}
                    </article>
                  );
                })
              ) : (
                <EmptyState>
                  <strong>Nessun fascicolo creato</strong>
                  <span>Qui appariranno cartelle per delegazioni trattanti, incontri RSU e riunioni.</span>
                </EmptyState>
              )}
            </div>
          </section>

          <section className="healthDelegatesCard">
            <div className="healthDelegatesSectionHeader">
              <div>
                <Badge>
                  <BookOpen size={15} /> Biblioteca normativa
                </Badge>
                <h2>Materiali generali da norma</h2>
                <p>Guide stabili per rispondere rapidamente alle domande più frequenti nei reparti.</p>
              </div>
              <div className="healthDelegatesSearch">
                <Search size={17} />
                <span>Cerca documenti</span>
              </div>
            </div>

            <div className="healthDelegatesLibrary">
              {libraryFolders.length > 0 ? (
                libraryFolders.map((section) => {
                  const files = filesByFolder[section.id] || [];

                  return (
                    <article key={section.id}>
                      <div>
                        <h3>{section.title}</h3>
                        <span>{files.length} materiali</span>
                      </div>
                      <ul>
                        {files.length > 0 ? (
                          files.map((file) => (
                            <li key={file.id}>
                              <span>
                                {file.signedUrl ? <a href={file.signedUrl}>{file.title}</a> : file.title}
                                {isAdmin ? (
                                  <DeleteConfirmForm
                                    action={deleteDelegateFile}
                                    className="healthDelegatesInlineDelete"
                                    confirmMessage={`Eliminare il file "${file.title}"?`}
                                    hiddenName="file_id"
                                    hiddenValue={file.id}
                                  >
                                    <button aria-label={`Elimina ${file.title}`} type="submit">
                                      <Trash2 size={13} />
                                    </button>
                                  </DeleteConfirmForm>
                                ) : null}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li>Nessun documento caricato</li>
                        )}
                      </ul>
                      {isAdmin ? (
                        <DeleteConfirmForm
                          action={deleteDelegateFolder}
                          className="healthDelegatesDangerForm"
                          confirmMessage={`Eliminare il fascicolo "${section.title}" e tutti i file collegati?`}
                          hiddenName="folder_id"
                          hiddenValue={section.id}
                        >
                          <button type="submit">
                            <Trash2 size={15} /> Elimina fascicolo
                          </button>
                        </DeleteConfirmForm>
                      ) : null}
                    </article>
                  );
                })
              ) : (
                <EmptyState>
                  <strong>Biblioteca da popolare</strong>
                  <span>CCNL, 104, genitorialità, turni e guide rapide compariranno qui.</span>
                </EmptyState>
              )}
            </div>
          </section>

          <section className="healthDelegatesCard">
            <div className="healthDelegatesSectionHeader">
              <div>
                <Badge>
                  <Users size={15} /> Formazione
                </Badge>
                <h2>Materiali per la formazione delegati</h2>
                <p>
                  Una sezione separata dai tavoli: qui carichiamo slide, dispense e strumenti usati negli incontri CGIL
                  di formazione.
                </p>
              </div>
            </div>

            <div className="healthDelegatesTrainingGrid">
              {trainingFolders.length > 0 ? (
                trainingFolders.map((training) => {
                  const files = filesByFolder[training.id] || [];

                  return (
                    <article key={training.id} className="healthDelegatesTrainingCard">
                      <span>{formatLongDate(training.meeting_date)}</span>
                      <h3>{training.title}</h3>
                      <p>{training.description || "Materiali formativi in aggiornamento."}</p>
                      <ul>
                        {files.length > 0 ? (
                          files.map((file) => (
                            <li key={file.id}>
                              <span>
                                {file.signedUrl ? <a href={file.signedUrl}>{file.title}</a> : file.title}
                                {isAdmin ? (
                                  <DeleteConfirmForm
                                    action={deleteDelegateFile}
                                    className="healthDelegatesInlineDelete"
                                    confirmMessage={`Eliminare il file "${file.title}"?`}
                                    hiddenName="file_id"
                                    hiddenValue={file.id}
                                  >
                                    <button aria-label={`Elimina ${file.title}`} type="submit">
                                      <Trash2 size={13} />
                                    </button>
                                  </DeleteConfirmForm>
                                ) : null}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li>Nessun file caricato</li>
                        )}
                      </ul>
                      {isAdmin ? (
                        <DeleteConfirmForm
                          action={deleteDelegateFolder}
                          className="healthDelegatesDangerForm"
                          confirmMessage={`Eliminare il fascicolo "${training.title}" e tutti i file collegati?`}
                          hiddenName="folder_id"
                          hiddenValue={training.id}
                        >
                          <button type="submit">
                            <Trash2 size={15} /> Elimina fascicolo
                          </button>
                        </DeleteConfirmForm>
                      ) : null}
                    </article>
                  );
                })
              ) : (
                <EmptyState>
                  <strong>Nessuna formazione caricata</strong>
                  <span>Qui raccoglieremo slide, dispense e materiali degli incontri CGIL.</span>
                </EmptyState>
              )}
            </div>
          </section>
        </div>

        <aside className="healthDelegatesAside">
          <section className="healthDelegatesCard">
            <Badge>
              <Mail size={15} /> Accesso
            </Badge>
            <div className="healthDelegatesLoginBox">
              <strong>{profile?.full_name || userEmail}</strong>
              <span>{profile?.email || userEmail}</span>
              <span>Ruolo: {roleLabel(profile?.role)}</span>
              <span>Gruppo: {profile?.group_key}</span>
            </div>
            <form action={signOut} className="healthDelegatesLogoutForm">
              <button type="submit">Esci</button>
            </form>
          </section>

          {isSuperAdmin ? (
            <section className="healthDelegatesCard" id="godmode-utenti">
              <Badge>
                <ShieldCheck size={15} /> GODMODE
              </Badge>
              <div className="healthDelegatesAdminIntro">
                <h2>Gestione utenti</h2>
                <p>Solo il superadmin può generare inviti e assegnare i ruoli dell&apos;area riservata.</p>
              </div>

              <form action={inviteAreaUser} className="healthDelegatesForm" aria-label="Genera invito area delegati">
                <h3>Genera invito</h3>
                <label>
                  Nome e cognome
                  <input name="full_name" required type="text" placeholder="Nome Cognome" />
                </label>
                <label>
                  Email
                  <input name="email" required type="email" placeholder="nome@dominio.it" />
                </label>
                <div className="healthDelegatesFormTwo">
                  <label>
                    Ruolo
                    <select name="role" required defaultValue="delegate">
                      <option value="delegate">Delegato</option>
                      <option value="admin">Admin contenuti</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                  </label>
                  <label>
                    Gruppo
                    <select name="group_key" required defaultValue={groupKey}>
                      <option value="sanita">Sanità</option>
                    </select>
                  </label>
                </div>
                <button type="submit">
                  <Mail size={17} /> Genera link invito
                </button>
              </form>

              <div className="healthDelegatesUserList">
                {areaUsers.length > 0 ? (
                  areaUsers.map((areaUser) => (
                    <article key={areaUser.id}>
                      <div>
                        <strong>{areaUser.full_name}</strong>
                        <span>{areaUser.email}</span>
                        <em>{userStatusDetail(areaUser)}</em>
                        {areaUser.invite_link ? (
                          <CopyInviteLink inviteLink={areaUser.invite_link} label={userLinkCopyLabel(areaUser)} />
                        ) : null}
                      </div>
                      <div>
                        <span>{roleLabel(areaUser.role)}</span>
                        <span>{userStatusLabel(areaUser.status)}</span>
                        {areaUser.auth_user_id !== currentUserId ? (
                          <div className="healthDelegatesUserActions">
                            {areaUser.status !== "suspended" ? (
                              <form action={refreshAreaUserLink}>
                                <input name="authorized_id" type="hidden" value={areaUser.id} />
                                <button type="submit">
                                  <Mail size={14} /> {userLinkActionLabel(areaUser)}
                                </button>
                              </form>
                            ) : null}
                            {areaUser.status === "suspended" ? (
                              <form action={reactivateAreaUser}>
                                <input name="authorized_id" type="hidden" value={areaUser.id} />
                                <button type="submit">
                                  <ShieldCheck size={14} /> Riattiva
                                </button>
                              </form>
                            ) : (
                              <DeleteConfirmForm
                                action={suspendAreaUser}
                                className="healthDelegatesUserActionForm"
                                confirmMessage={`Bloccare l'accesso di ${areaUser.full_name}?`}
                                hiddenName="authorized_id"
                                hiddenValue={areaUser.id}
                              >
                                <button type="submit">
                                  <LockKeyhole size={14} /> Blocca
                                </button>
                              </DeleteConfirmForm>
                            )}
                            <DeleteConfirmForm
                              action={deleteAreaUser}
                              className="healthDelegatesUserActionForm"
                              confirmMessage={`Eliminare definitivamente l'account di ${areaUser.full_name}?`}
                              hiddenName="authorized_id"
                              hiddenValue={areaUser.id}
                            >
                              <button className="danger" type="submit">
                                <Trash2 size={14} /> Elimina
                              </button>
                            </DeleteConfirmForm>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))
                ) : (
                  <span className="healthDelegatesMiniEmpty">Nessun utente trovato.</span>
                )}
              </div>
            </section>
          ) : null}

          {isAdmin ? (
            <section className="healthDelegatesCard" id="admin-eventi">
              <Badge>
                <ShieldCheck size={15} /> Admin
              </Badge>
              <div className="healthDelegatesAdminIntro">
                <h2>Gestione contenuti</h2>
                <p>Qui compaiono i comandi per eventi, fascicoli e formazione.</p>
              </div>

              <div className="healthDelegatesAdminGrid">
                <form action={createDelegateEvent} className="healthDelegatesForm" aria-label="Crea evento">
                  <h3>Crea evento</h3>
                  <label>
                    Titolo evento
                    <input name="title" required type="text" defaultValue="Tavolo integrativo ULSS5" />
                  </label>
                  <div className="healthDelegatesFormTwo">
                    <label>
                      Data
                      <input name="event_date" required type="date" defaultValue="2026-08-04" />
                    </label>
                    <label>
                      Inizio
                      <input name="start_time" required type="time" defaultValue="09:30" />
                    </label>
                  </div>
                  <div className="healthDelegatesFormTwo">
                    <label>
                      Fine
                      <input name="end_time" required type="time" defaultValue="11:00" />
                    </label>
                    <label>
                      Luogo
                      <input name="place" type="text" defaultValue="ULSS 5 Polesana - Rovigo" />
                    </label>
                  </div>
                  <label>
                    Note evento
                    <textarea name="description" defaultValue="Convocazione e materiali preparatori." />
                  </label>
                  <button type="submit">
                    <Plus size={17} /> Salva evento
                  </button>
                </form>

                <form action={createDelegateFolder} className="healthDelegatesForm" aria-label="Crea fascicolo">
                  <h3>Crea fascicolo</h3>
                  <label>
                    Titolo fascicolo
                    <input name="title" required type="text" defaultValue="Nuovo incontro RSU sanità" />
                  </label>
                  <div className="healthDelegatesFormTwo">
                    <label>
                      Sezione
                      <select name="section" required defaultValue="meeting">
                        <option value="meeting">Materiale specifico tavolo</option>
                        <option value="library">Documentazione generale</option>
                        <option value="training">Formazione</option>
                      </select>
                    </label>
                    <label>
                      Stato
                      <select name="status" required defaultValue="open">
                        <option value="open">Aperto</option>
                        <option value="draft">Bozza</option>
                        <option value="closed">Chiuso</option>
                        <option value="archived">Archiviato</option>
                      </select>
                    </label>
                  </div>
                  <div className="healthDelegatesFormTwo">
                    <label>
                      Tipo fascicolo
                      <input name="folder_type" type="text" defaultValue="RSU" />
                    </label>
                    <label>
                      Data incontro
                      <input name="meeting_date" type="date" />
                    </label>
                  </div>
                  <label>
                    Descrizione
                    <textarea name="description" defaultValue="Cartella con convocazione, verbale e materiali collegati." />
                  </label>
                  <button type="submit">
                    <FolderOpen size={17} /> Crea fascicolo
                  </button>
                </form>

                <form action={uploadDelegateFile} className="healthDelegatesForm" aria-label="Carica file in fascicolo">
                  <h3>Carica file</h3>
                  <label>
                    Fascicolo
                    <select name="folder_id" required defaultValue={folders[0]?.id || ""}>
                      {folders.length > 0 ? (
                        folders.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.title} · {folder.section === "meeting" ? "tavolo" : folder.section}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Crea prima un fascicolo
                        </option>
                      )}
                    </select>
                  </label>
                  <label>
                    Titolo file
                    <input name="title" required type="text" defaultValue="Verbale incontro RSU luglio" />
                  </label>
                  <label>
                    Tipo
                    <select name="file_kind" defaultValue="verbale">
                      <option value="convocazione">Convocazione</option>
                      <option value="piattaforma">Piattaforma</option>
                      <option value="verbale">Verbale</option>
                      <option value="slide">Slide</option>
                      <option value="guida">Guida</option>
                      <option value="allegato">Allegato</option>
                    </select>
                  </label>
                  <label>
                    File
                    <input name="file" required type="file" />
                  </label>
                  <button disabled={folders.length === 0} type="submit">
                    <Upload size={17} /> Carica su Storage
                  </button>
                </form>
              </div>
            </section>
          ) : null}

          <section className="healthDelegatesCard">
            <Badge>
              <FileText size={15} /> Ultimi caricamenti
            </Badge>
            <div className="healthDelegatesLatest">
              {latestMaterials.length > 0 ? (
                latestMaterials.map((item) => (
                  <a key={item.id} href={item.signedUrl || "#"}>
                    {item.title}
                    <ArrowRight size={15} />
                  </a>
                ))
              ) : (
                <span className="healthDelegatesMiniEmpty">Nessun file caricato.</span>
              )}
            </div>
          </section>

        </aside>
      </section>
  );
}
