import { NextResponse } from "next/server";
import { getFpHomepageNews } from "../../../lib/fpnews";
import { buildStaticKnowledge, localConventions, people } from "../../../lib/siteKnowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";
const MAX_MESSAGES = 8;

const SYSTEM_PROMPT = `
Sei Quadrato Rosso, l'assistente digitale di FP CGIL Rovigo.
Il nome richiama il quadrato rosso del simbolo FP CGIL: sei un punto di orientamento, non una persona e non un sostituto della sede.
Rispondi in italiano, con tono umano, diretto, pratico, accogliente e concreto.
Quando ha senso, puoi aprire con formule brevi come "Certo" o "Ti aiuto io", ma evita frasi finte, enfatiche o troppo promozionali.
Usa esclusivamente il contesto fornito: sito FP CGIL Rovigo, referenti, convenzioni e news nazionali da fpcgil.it.
Se l'utente chiede notizie o ultime novita, usa le news fornite da fpcgil.it e cita il link alla fonte.
Non inventare normative, scadenze, importi, requisiti, offerte, nomi, numeri di telefono o interpretazioni contrattuali.
Se la domanda riguarda un caso personale, una vertenza, salute, procedimenti disciplinari, dati sensibili o dettagli delicati, non entrare nel merito: proponi contatto umano e canali ufficiali.
Non chiedere codice fiscale, indirizzo privato, dati sanitari, documenti personali o dettagli disciplinari.
Se un nome corrisponde a un referente, dai ruolo, deleghe, telefono/email se presenti e suggerisci /chi-siamo o /iscrizione.
Se una richiesta riguarda una categoria di convenzioni, elenca solo quelle pertinenti dal contesto e rimanda a /convenzioni/locali.
Quando utile, indica una pagina del sito con percorso breve.
Se l'utente chiede chi sei o come ti chiami, rispondi che sei Quadrato Rosso, l'assistente digitale di FP CGIL Rovigo.
Mantieni le risposte sotto 130 parole, salvo elenco di convenzioni o news.
Se non sai, dillo e indirizza a FP CGIL Rovigo.
`;

function formatNewsContext(news: Awaited<ReturnType<typeof getFpHomepageNews>>) {
  if (!news.length) return "- News fpcgil.it non disponibili in questo momento.";

  return news
    .slice(0, 8)
    .map((item) => `- ${item.title}${item.date ? ` (${item.date})` : ""}: ${item.excerpt || "senza estratto"} Fonte: ${item.url}`)
    .join("\n");
}

async function buildKnowledgeContext() {
  const news = await getFpHomepageNews(8);
  return `
${buildStaticKnowledge()}

Ultime news e novita da fpcgil.it:
${formatNewsContext(news)}
`;
}

function cleanMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== "object") return false;
      const message = item as Partial<ChatMessage>;
      return (message.role === "user" || message.role === "assistant") && typeof message.content === "string";
    })
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }))
    .slice(-MAX_MESSAGES);
}

async function fallbackAnswer(messages: ChatMessage[]) {
  const last = messages[messages.length - 1]?.content.toLowerCase() || "";
  const normalizedLast = last.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const person = people.find((p) => normalizedLast.includes(p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
  if (person) {
    return `${person.name} è ${person.role}. Deleghe: ${person.areas}. ${person.phone ? `Telefono/WhatsApp: ${person.phone}. ` : ""}${person.email ? `Email: ${person.email}. ` : ""}Trovi il riepilogo in /chi-siamo; per essere indirizzato usa anche /iscrizione.`;
  }

  const conventionMatches = localConventions.filter((conv) => conv.tags.some((tag) => normalizedLast.includes(tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
  if (conventionMatches.length > 0) {
    return `Ho trovato queste convenzioni pertinenti: ${conventionMatches
      .slice(0, 4)
      .map((conv) => `${conv.name}: ${conv.offer}`)
      .join(" ")} Vedi tutti i dettagli in /convenzioni/locali.`;
  }

  if (last.includes("iscriv") || last.includes("tessera")) {
    return "Per iscriverti o chiedere informazioni sull'iscrizione puoi partire dalla pagina /iscrizione. Se preferisci parlare con la sede, chiama 0425 377311 oppure scrivi a fp.rovigo@veneto.cgil.it.";
  }

  if (normalizedLast.includes("news") || normalizedLast.includes("notizie") || normalizedLast.includes("novita") || normalizedLast.includes("ultime")) {
    const news = await getFpHomepageNews(3);
    if (news.length > 0) {
      return `Le ultime news da fpcgil.it sono: ${news
        .map((item) => `${item.title}${item.url ? ` (${item.url})` : ""}`)
        .join(" - ")}. Trovi il riepilogo anche in /news.`;
    }
    return "In questo momento non riesco a recuperare le news da fpcgil.it. Puoi controllare la pagina /news o riprovare tra poco.";
  }

  if (last.includes("convenzion")) {
    return "Per le convenzioni trovi /convenzioni/locali e /convenzioni/nazionali. Puoi chiedermi anche per tema, ad esempio mare, ristoranti, dentista, benessere o casa.";
  }

  if (normalizedLast.includes("chi sei") || normalizedLast.includes("come ti chiami") || normalizedLast.includes("nome")) {
    return "Sono Quadrato Rosso, l'assistente digitale di FP CGIL Rovigo. Ti aiuto a orientarti tra contatti, referenti, convenzioni, iscrizione, formazione e news.";
  }

  if (last.includes("formazione") || last.includes("corso")) {
    return "Per la formazione puoi usare il portale dedicato: https://formazionepartecipazione.fpcgil.it/ . Si apre fuori dal sito FP CGIL Rovigo.";
  }

  if (last.includes("contatt") || last.includes("telefono") || last.includes("mail") || last.includes("sede")) {
    return "Puoi contattare FP CGIL Rovigo al numero 0425 377311 o scrivere a fp.rovigo@veneto.cgil.it. La sede è in Via Calatafimi 1/B, Rovigo, e si riceve su appuntamento. Trovi tutto anche in /contatti.";
  }

  if (last.includes("delegat") || last.includes("area riservata") || last.includes("document")) {
    return "L'area delegati è un progetto che può raccogliere documenti, modulistica e materiali divisi per categoria. Per ora ti consiglio di contattare la sede: possiamo indirizzarti al referente corretto.";
  }

  return "Posso aiutarti a trovare iscrizione, contatti, convenzioni, formazione, news o il referente giusto. Per casi personali o delicati è meglio contattare direttamente FP CGIL Rovigo: 0425 377311 o fp.rovigo@veneto.cgil.it.";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: unknown };
    const messages = cleanMessages(body.messages);

    if (messages.length === 0) {
      return NextResponse.json({ answer: "Dimmi pure di cosa hai bisogno: iscrizione, contatti, convenzioni, formazione o supporto sindacale." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ answer: await fallbackAnswer(messages), mode: "fallback", reason: "missing_openai_api_key" });
    }

    const knowledgeContext = await buildKnowledgeContext();
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        instructions: `${SYSTEM_PROMPT}\n\nCONTESTO CONTROLLATO:\n${knowledgeContext}`,
        input: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        max_output_tokens: 520,
      }),
    });

    if (!response.ok) {
      console.warn("OpenAI chat request failed", response.status, await response.text());
      return NextResponse.json({ answer: await fallbackAnswer(messages), mode: "fallback", reason: `openai_http_${response.status}` });
    }

    const data = await response.json();
    const answer = typeof data.output_text === "string" && data.output_text.trim() ? data.output_text.trim() : await fallbackAnswer(messages);

    return NextResponse.json({ answer, mode: "ai" });
  } catch {
    return NextResponse.json(
      { answer: "In questo momento l'assistente non riesce a rispondere. Puoi contattare FP CGIL Rovigo al 0425 377311 o scrivere a fp.rovigo@veneto.cgil.it." },
      { status: 200 }
    );
  }
}
