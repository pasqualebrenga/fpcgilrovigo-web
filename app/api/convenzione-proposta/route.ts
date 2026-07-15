import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO_EMAIL = "fp.ro.brenga@veneto.cgil.it";
const FROM_EMAIL = "FP CGIL Rovigo <noreply@fpcgilrovigo.it>";
const REPLY_TO_EMAIL = "fp.ro.brenga@veneto.cgil.it";
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "application/pdf"]);

const fieldLabels: Array<[string, string]> = [
  ["ragioneSociale", "Ragione sociale"],
  ["nomeCommerciale", "Nome commerciale"],
  ["partitaIva", "Partita IVA / Codice fiscale"],
  ["indirizzo", "Indirizzo"],
  ["comune", "Comune"],
  ["sito", "Sito web / social"],
  ["referenteNome", "Referente"],
  ["referenteRuolo", "Ruolo"],
  ["telefono", "Telefono"],
  ["email", "Email"],
  ["categoria", "Categoria attività"],
  ["tipoVantaggio", "Tipo di vantaggio"],
  ["durata", "Durata proposta"],
  ["valore", "Valore indicativo"],
  ["descrizione", "Descrizione proposta"],
  ["condizioni", "Condizioni e note"],
];

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizePdfText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7E\n]/g, "");
}

function escapePdfText(value: string) {
  return normalizePdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapLine(value: string, maxLength = 92) {
  const words = normalizePdfText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function createPdf(values: Record<string, string>) {
  const lines = [
    "Proposta di convenzione - FP CGIL Rovigo",
    `Data invio: ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" })}`,
    "",
    ...fieldLabels.flatMap(([key, label]) => {
      const value = values[key] || "Non indicato";
      return [`${label}:`, ...wrapLine(value), ""];
    }),
    "Privacy:",
    "Il proponente dichiara di aver letto l'informativa privacy e autorizza il ricontatto.",
    "",
    "Nota:",
    "L'invio della proposta non comporta approvazione automatica della convenzione.",
  ];

  const pages: string[][] = [];
  let currentPage: string[] = [];
  lines.forEach((line) => {
    if (currentPage.length >= 46) {
      pages.push(currentPage);
      currentPage = [];
    }
    currentPage.push(line);
  });
  if (currentPage.length) pages.push(currentPage);

  const objects: string[] = [];
  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = addObject("");
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");
  const pageIds: number[] = [];

  pages.forEach((pageLines) => {
    const streamLines = ["BT", "/F1 10 Tf", "50 790 Td", "14 TL"];
    pageLines.forEach((line, index) => {
      if (index > 0) streamLines.push("T*");
      streamLines.push(`(${escapePdfText(line)}) Tj`);
    });
    streamLines.push("ET");
    const stream = streamLines.join("\n");
    const contentId = addObject(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  });

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  const chunks = ["%PDF-1.4\n"];
  const offsets: number[] = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(chunks.join("")));
    chunks.push(`${index + 1} 0 obj\n${object}\nendobj\n`);
  });

  const xrefOffset = Buffer.byteLength(chunks.join(""));
  chunks.push(`xref\n0 ${objects.length + 1}\n`);
  chunks.push("0000000000 65535 f \n");
  offsets.slice(1).forEach((offset) => {
    chunks.push(`${String(offset).padStart(10, "0")} 00000 n \n`);
  });
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  return Buffer.from(chunks.join(""), "utf8");
}

function safeFilename(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "allegato";
}

async function fileToAttachment(file: File, prefix: string) {
  if (!file.name || file.size === 0) return null;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Il file ${file.name} supera il limite di 2 MB.`);
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error(`Il file ${file.name} ha un formato non consentito.`);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    filename: `${prefix}-${safeFilename(file.name)}`,
    content: buffer.toString("base64"),
  };
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Invio email non configurato: manca RESEND_API_KEY." },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const values = Object.fromEntries(fieldLabels.map(([key]) => [key, getText(formData, key)]));

    const requiredFields = ["ragioneSociale", "partitaIva", "indirizzo", "comune", "referenteNome", "telefono", "email", "categoria", "tipoVantaggio", "descrizione"];
    const missing = requiredFields.filter((key) => !values[key]);
    if (missing.length) {
      return NextResponse.json({ error: "Compila tutti i campi obbligatori." }, { status: 400 });
    }

    if (getText(formData, "privacy") !== "on" || getText(formData, "truth") !== "on") {
      return NextResponse.json({ error: "Devi accettare le dichiarazioni richieste." }, { status: 400 });
    }

    const logo = formData.get("logo");
    const attachment = formData.get("allegato");
    const uploadedAttachments = (
      await Promise.all([
        logo instanceof File ? fileToAttachment(logo, "logo") : null,
        attachment instanceof File ? fileToAttachment(attachment, "materiale") : null,
      ])
    ).filter((item): item is { filename: string; content: string } => Boolean(item));

    const totalUploadedSize = uploadedAttachments.reduce((sum, item) => sum + Buffer.byteLength(item.content, "base64"), 0);
    if (totalUploadedSize > MAX_TOTAL_ATTACHMENT_SIZE) {
      return NextResponse.json({ error: "Gli allegati superano il limite totale consentito." }, { status: 400 });
    }

    const pdfBuffer = createPdf(values);
    const pdfName = `proposta-convenzione-${safeFilename(values.ragioneSociale)}.pdf`;

    const rows = fieldLabels
      .map(([key, label]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(values[key] || "Non indicato")}</td></tr>`)
      .join("");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: REPLY_TO_EMAIL,
        subject: `Nuova proposta convenzione - ${values.ragioneSociale}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5">
            <h1 style="color:#d40000">Nuova proposta di convenzione</h1>
            <p>È arrivata una nuova proposta dal sito FP CGIL Rovigo.</p>
            <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:760px">
              ${rows}
            </table>
            <p>In allegato trovi il PDF riepilogativo e gli eventuali materiali caricati.</p>
          </div>
        `,
        text: fieldLabels.map(([key, label]) => `${label}: ${values[key] || "Non indicato"}`).join("\n"),
        attachments: [
          {
            filename: pdfName,
            content: pdfBuffer.toString("base64"),
          },
          ...uploadedAttachments,
        ],
        tags: [
          { name: "source", value: "proponi-convenzione" },
          { name: "site", value: "fpcgilrovigo" },
        ],
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.warn("Resend proposal email failed", response.status, data);
      return NextResponse.json({ error: "Non sono riuscito a inviare la proposta. Riprova tra poco." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data.id || null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore durante l'invio della proposta.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
