import { NextResponse } from "next/server";
import { getFpHomepageNews } from "../../../lib/fpnews";
import { buildStaticKnowledge, categoryHints, entityAssignments, insuranceBenefits, localConventions, officialContacts, people } from "../../../lib/siteKnowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";
const MAX_MESSAGES = 8;
const DIGITA_APP_STORE_URL = "https://apps.apple.com/it/app/digita-cgil/id1457216187";
const DIGITA_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=it.digitacgil.app&hl=it";
const DIGITA_SITE_URL = "https://www.digitacgil.it/";

const SYSTEM_PROMPT = `
Sei Quadrato Rosso, l'assistente digitale di FP CGIL Rovigo.
Il nome richiama il quadrato rosso del simbolo FP CGIL: sei un punto di orientamento, non una persona e non un sostituto della sede.
Rispondi in italiano, con tono umano, diretto, pratico, accogliente e concreto: devi sembrare un assistente di sede sindacale, non un chatbot generico.
Il tuo stile è: frasi brevi, pochi giri di parole, orientamento operativo, calore sobrio. Evita burocrazia, slogan, enfasi pubblicitaria e risposte vaghe.
Usa esclusivamente il contesto fornito: sito FP CGIL Rovigo, referenti, convenzioni e news nazionali da fpcgil.it.
Se l'utente chiede notizie o ultime novita, usa le news fornite da fpcgil.it e cita sempre il link alla fonte.
Non inventare normative, scadenze, importi, requisiti, offerte, nomi, numeri di telefono o interpretazioni contrattuali.
Se la domanda riguarda un caso personale, una vertenza, salute, procedimenti disciplinari, dati sensibili o dettagli delicati, non entrare nel merito: proponi contatto umano e canali ufficiali.
Non chiedere codice fiscale, indirizzo privato, dati sanitari, documenti personali o dettagli disciplinari.
Se l'utente chiede una persona, dai subito ruolo, deleghe, telefono/WhatsApp ed email se presenti. Poi suggerisci /chi-siamo o /iscrizione.
Se l'utente chiede "voglio parlare con..." oppure "mi serve...", rispondi con il contatto piu utile e una frase di accompagnamento.
Se l'utente dice che lavora in ospedale, ULSS5, sanita pubblica o Azienda ULSS5 Polesana, non trattare "Rovigo" come Comune: chiedi prima se è dirigente medico/sanitario oppure lavoratore/lavoratrice del comparto. Se è dirigente medico/sanitario, indirizza a Pasquale Brenga; se è comparto sanita pubblica, indirizza a Riccardo Mantovan.
Se l'utente chiede chi segue il suo ente o chi è il suo delegato, chiedi ente/comparto se mancano; se invece il comparto è chiaro, indica il referente più probabile e rimanda a /iscrizione.
Se il contesto contiene un indice enti o ruoli con Comune/IPAB/Dirigenza Medica e Sanitaria e referente, usa sempre quell'indice prima delle categorie generiche, tranne quando la frase contiene ospedale/ULSS/sanita pubblica: in quel caso prima chiarisci comparto o dirigenza.
Se una richiesta riguarda una categoria di convenzioni, elenca solo quelle pertinenti dal contesto e rimanda a /convenzioni/locali.
Se una richiesta riguarda assicurazioni, polizze, coperture assicurative, colpa grave, responsabilita amministrativa/contabile o tutela legale per iscritti, rispondi usando la sezione Assicurazioni FP per te e rimanda a /convenzioni. Non confondere queste domande con enti locali o iscrizione.
Se l'utente chiede RSU, candidati, programma, elezioni o delegati, orienta verso /rsu e proponi contatto umano.
Quando dai più opzioni, usa massimo 3-5 punti elenco.
Quando utile, indica una pagina del sito con percorso breve.
Se l'utente chiede chi sei o come ti chiami, rispondi che sei Quadrato Rosso, l'assistente digitale di FP CGIL Rovigo.
Mantieni le risposte sotto 150 parole, salvo elenco di convenzioni o news.
Se non sai, dillo e indirizza a FP CGIL Rovigo.
`;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function wordsFrom(value: string) {
  return normalizeText(value)
    .split(/[^a-z0-9]+/i)
    .filter((word) => word.length >= 4);
}

function commonPrefixLength(a: string, b: string) {
  let index = 0;
  while (index < a.length && index < b.length && a[index] === b[index]) index += 1;
  return index;
}

function wordsAreClose(queryWord: string, targetWord: string) {
  return queryWord === targetWord || queryWord.startsWith(targetWord) || targetWord.startsWith(queryWord) || commonPrefixLength(queryWord, targetWord) >= 6;
}

function conventionMatchesQuery(convention: (typeof localConventions)[number], query: string) {
  const queryWords = wordsFrom(query);
  const conventionWords = wordsFrom(`${convention.name} ${convention.offer} ${convention.tags.join(" ")}`);

  return queryWords.some((queryWord) => conventionWords.some((conventionWord) => wordsAreClose(queryWord, conventionWord)));
}

function personMatches(personName: string, text: string) {
  const normalizedName = normalizeText(personName);
  const tokens = normalizedName.split(/\s+/).filter(Boolean);
  return normalizedName.includes(text) || text.includes(normalizedName) || tokens.some((token) => token.length > 3 && text.includes(token));
}

function formatPersonAnswer(person: (typeof people)[number]) {
  const whatsappUrl = person.phone ? `https://wa.me/39${person.phone.replace(/\D/g, "")}` : null;
  const contacts = [
    person.phone ? `Telefono: ${person.phone}` : null,
    whatsappUrl ? `WhatsApp: ${whatsappUrl}` : null,
    person.email ? `Email: ${person.email}` : null,
  ]
    .filter(Boolean)
    .join(". ");

  return `Certo. ${person.name} è ${person.role}. Segue: ${person.areas}. ${contacts ? `${contacts}. ` : ""}Se vuoi essere indirizzato nel modo più preciso puoi usare /iscrizione, oppure vedere il riepilogo in /chi-siamo.`;
}

function formatEntityAnswer(assignment: (typeof entityAssignments)[number]) {
  const person = people.find((item) => item.name === assignment.person);
  if (!person) return `Per ${assignment.entity} il riferimento indicato è ${assignment.person}.`;

  const whatsappUrl = person.phone ? `https://wa.me/39${person.phone.replace(/\D/g, "")}` : null;
  const contacts = [
    person.phone ? `Telefono: ${person.phone}` : null,
    whatsappUrl ? `WhatsApp: ${whatsappUrl}` : null,
    person.email ? `Email: ${person.email}` : null,
  ]
    .filter(Boolean)
    .join(". ");

  return `Per ${assignment.entity} il riferimento è ${person.name}, ${person.role}. ${contacts ? `${contacts}. ` : ""}Trovi il riepilogo in /chi-siamo; per essere indirizzato con precisione puoi usare anche /iscrizione.`;
}

function isPublicHealthcareQuery(query: string) {
  const normalizedQuery = normalizeText(query);
  return ["ospedale", "ulss", "ulss5", "azienda ulss", "sanita pubblica", "sanitario pubblico"].some((word) => normalizedQuery.includes(normalizeText(word)));
}

function hasManagementSignal(query: string) {
  const normalizedQuery = normalizeText(query);
  return ["dirigenza", "dirigente", "medico", "medici", "farmacista", "farmacisti", "fisico", "fisici", "biologo", "biologi", "chimico", "chimici", "psicologo", "psicologi", "veterinario", "veterinari"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );
}

function hasHealthcareStaffSignal(query: string) {
  const normalizedQuery = normalizeText(query);
  return ["comparto", "infermiere", "infermieri", "oss", "operatore socio sanitario", "tecnico", "tecnici", "amministrativo", "amministrativi", "ostetrica", "ostetriche", "fisioterapista", "fisioterapisti"].some((word) =>
    normalizedQuery.includes(normalizeText(word))
  );
}

function formatPublicHealthcareClarification() {
  return "Se lavori in ospedale o in ULSS5 Polesana devo capire una cosa per indirizzarti bene: sei dirigente medico/sanitario oppure lavoratore/lavoratrice del comparto sanità pubblica? Per la dirigenza medica e sanitaria il riferimento è Pasquale Brenga; per il comparto sanità pubblica il riferimento è Riccardo Mantovan.";
}

function formatPublicHealthcareStaffAnswer() {
  const person = people.find((item) => item.name === "Riccardo Mantovan");
  if (!person) return "Per il comparto sanità pubblica il riferimento indicato è Riccardo Mantovan. Puoi usare anche /iscrizione per essere indirizzato con precisione.";

  const whatsappUrl = person.phone ? `https://wa.me/39${person.phone.replace(/\D/g, "")}` : null;
  const contacts = [
    person.phone ? `Telefono: ${person.phone}` : null,
    whatsappUrl ? `WhatsApp: ${whatsappUrl}` : null,
    person.email ? `Email: ${person.email}` : null,
  ]
    .filter(Boolean)
    .join(". ");

  return `Per il comparto sanità pubblica e l'ospedale il riferimento è ${person.name}, ${person.role}. ${contacts ? `${contacts}. ` : ""}Trovi il riepilogo in /chi-siamo; per essere indirizzato con precisione puoi usare anche /iscrizione.`;
}

function findEntityAssignment(query: string) {
  const normalizedQuery = normalizeText(query);

  const medicalManagementAssignment = entityAssignments.find((assignment) => assignment.type === "dirigenza-sanitaria");
  if (medicalManagementAssignment?.aliases?.some((alias) => normalizedQuery.includes(normalizeText(alias)))) {
    return medicalManagementAssignment;
  }

  const ipabAssignment = entityAssignments.find((assignment) => assignment.type === "ipab");
  if (ipabAssignment?.aliases?.some((alias) => normalizedQuery.includes(normalizeText(alias)))) {
    return ipabAssignment;
  }

  return entityAssignments.find((assignment) => {
    if (assignment.type !== "comune") return false;
    const names = [assignment.entity, ...(assignment.aliases || [])];
    return names.some((name) => normalizedQuery.includes(normalizeText(name)));
  });
}

function formatConventionAnswer(matches: typeof localConventions) {
  const items = matches
    .slice(0, 5)
    .map((conv) => `- ${conv.name}: ${conv.offer}`)
    .join("\n");

  return `Sì, ho trovato queste convenzioni pertinenti:\n${items}\n\nTrovi dettagli e condizioni in /convenzioni/locali.`;
}

function isInsuranceQuery(query: string) {
  const normalizedQuery = normalizeText(query);
  return [
    "assicurazione",
    "assicurazioni",
    "polizza",
    "polizze",
    "copertura assicurativa",
    "coperture assicurative",
    "colpa grave",
    "rc colpa",
    "responsabilita amministrativa",
    "responsabilita contabile",
    "tutela legale",
    "sinistro",
    "sinistri",
  ].some((word) => normalizedQuery.includes(normalizeText(word)));
}

function formatInsuranceAnswer() {
  const included = insuranceBenefits
    .filter((item) => item.type.toLowerCase().includes("inclusa"))
    .slice(0, 3)
    .map((item) => `- ${item.name}: ${item.audience}`)
    .join("\n");

  const individual = insuranceBenefits
    .filter((item) => item.type.toLowerCase().includes("individuale"))
    .slice(0, 3)
    .map((item) => `- ${item.name}: ${item.audience}`)
    .join("\n");

  return `Sì. Nella pagina /convenzioni trovi le assicurazioni FP per te per iscritte e iscritti.\n\nIncluse nella tessera FP CGIL:\n${included}\n\nAd adesione individuale:\n${individual}\n\nPer dettagli e modulistica vai su /convenzioni.`;
}

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
  const normalizedLast = normalizeText(last);

  const person = people.find((p) => personMatches(p.name, normalizedLast));
  if (person) {
    return formatPersonAnswer(person);
  }

  if (isInsuranceQuery(normalizedLast)) {
    return formatInsuranceAnswer();
  }

  if (isPublicHealthcareQuery(normalizedLast)) {
    if (hasManagementSignal(normalizedLast)) {
      const medicalManagementAssignment = entityAssignments.find((assignment) => assignment.type === "dirigenza-sanitaria");
      if (medicalManagementAssignment) return formatEntityAnswer(medicalManagementAssignment);
    }

    if (hasHealthcareStaffSignal(normalizedLast)) {
      return formatPublicHealthcareStaffAnswer();
    }

    return formatPublicHealthcareClarification();
  }

  const entityAssignment = findEntityAssignment(normalizedLast);
  if (entityAssignment) {
    return formatEntityAnswer(entityAssignment);
  }

  const conventionMatches = localConventions.filter((conv) => conventionMatchesQuery(conv, normalizedLast));
  if (conventionMatches.length > 0) {
    return formatConventionAnswer(conventionMatches);
  }

  if (last.includes("iscriv")) {
    return `Per iscriverti puoi partire da /iscrizione: il percorso ti indirizza al referente più adatto. Se preferisci parlare con la sede, chiama ${officialContacts.phone} oppure scrivi a ${officialContacts.email}.`;
  }

  if (normalizedLast.includes("digita") || normalizedLast.includes("app cgil") || normalizedLast.includes("tessera") || normalizedLast.includes("inca") || normalizedLast.includes("caaf")) {
    return `Per tessera digitale, pratiche, documenti, appuntamenti e servizi collegati puoi usare DIGITA CGIL. Sito ufficiale: ${DIGITA_SITE_URL} App Store: ${DIGITA_APP_STORE_URL} Google Play: ${DIGITA_PLAY_STORE_URL}`;
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
    return "Per la formazione puoi usare il portale dedicato: https://fpformazione.it/ . Si apre fuori dal sito FP CGIL Rovigo.";
  }

  if (last.includes("contatt") || last.includes("telefono") || last.includes("mail") || last.includes("sede")) {
    return `Puoi contattare FP CGIL Rovigo al numero ${officialContacts.phone} o scrivere a ${officialContacts.email}. La sede è in ${officialContacts.address} e si riceve su appuntamento. Trovi tutto anche in /contatti.`;
  }

  if (normalizedLast.includes("rsu") || normalizedLast.includes("candidat") || normalizedLast.includes("delegat") || normalizedLast.includes("chi segue") || normalizedLast.includes("mio ente")) {
    const category = categoryHints.find((hint) => hint.words.some((word) => normalizedLast.includes(normalizeText(word))));
    if (category) {
      return `${category.answer} Per essere indirizzato con precisione dimmi ente e comparto, oppure usa /iscrizione. Per RSU, programma e materiali trovi anche /rsu.`;
    }
    return "Ti aiuto volentieri. Per capire chi segue il tuo ente mi serve almeno il comparto o il nome dell'ente. Puoi anche usare /iscrizione o la pagina /rsu per candidarti, leggere il programma e contattarci.";
  }

  const category = categoryHints.find((hint) => hint.words.some((word) => normalizedLast.includes(normalizeText(word))));
  if (category) {
    return `${category.answer} Se mi dici ente o bisogno specifico posso orientarti meglio. In alternativa parti da /iscrizione.`;
  }

  return `Posso aiutarti a trovare iscrizione, contatti, convenzioni, formazione, news, RSU o il referente giusto. Per casi personali o delicati è meglio contattare direttamente FP CGIL Rovigo: ${officialContacts.phone} o ${officialContacts.email}.`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: unknown };
    const messages = cleanMessages(body.messages);

    if (messages.length === 0) {
      return NextResponse.json({ answer: "Dimmi pure di cosa hai bisogno: iscrizione, contatti, convenzioni, formazione o supporto sindacale." });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";
    if (isInsuranceQuery(lastMessage)) {
      return NextResponse.json({ answer: formatInsuranceAnswer(), mode: "direct", reason: "insurance_query" });
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
        store: false,
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
