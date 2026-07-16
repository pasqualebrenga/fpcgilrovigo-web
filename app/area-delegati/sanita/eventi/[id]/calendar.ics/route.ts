import { createClient } from "@/lib/supabase/server";

function formatIcsDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Accesso richiesto", { status: 401 });
  }

  const { data: event } = await supabase
    .from("delegate_events")
    .select("id, title, starts_at, ends_at, place, description")
    .eq("id", id)
    .maybeSingle();

  if (!event) {
    return new Response("Evento non trovato", { status: 404 });
  }

  const now = formatIcsDate(new Date().toISOString());
  const fileName = `${event.id}.ics`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FP CGIL Rovigo//Area Delegati Sanita//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@fpcgilrovigo.it`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatIcsDate(event.starts_at)}`,
    `DTEND:${formatIcsDate(event.ends_at)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.place || "")}`,
    `DESCRIPTION:${escapeIcsText(event.description || "")}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "text/calendar; charset=utf-8",
    },
  });
}
