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
import { createClient } from "@/lib/supabase/server";
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

  if (!profile?.active || profile.role !== "admin") {
    throw new Error("Operazione consentita solo agli amministratori.");
  }

  return { profile, supabase, user };
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
  const isAdmin = isActive && profile?.role === "admin";
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
          <strong>{isAdmin ? "Vista amministratore" : "Vista delegato"}</strong>
        </div>
      </section>

      <AreaDelegatiContent groupKey={groupKey} isAdmin={isAdmin} profile={profile} userEmail={user.email || ""} />
    </div>
  );
}

async function AreaDelegatiContent({
  groupKey,
  isAdmin,
  profile,
  userEmail,
}: {
  groupKey: string;
  isAdmin: boolean;
  profile: { email: string; full_name: string; group_key: string; role: string; active: boolean } | null;
  userEmail: string;
}) {
  const supabase = await createClient();
  const [{ data: eventRows }, { data: folderRows }, { data: fileRows }] = await Promise.all([
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
              <span>Ruolo: {profile?.role === "admin" ? "admin" : "delegato"}</span>
              <span>Gruppo: {profile?.group_key}</span>
            </div>
            <form action={signOut} className="healthDelegatesLogoutForm">
              <button type="submit">Esci</button>
            </form>
          </section>

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
