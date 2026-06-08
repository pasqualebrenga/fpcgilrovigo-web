export type SitePerson = {
  name: string;
  role: string;
  areas: string;
  sectors: string;
  phone?: string;
  email?: string;
};

export type LocalConvention = {
  name: string;
  offer: string;
  tags: string[];
  phone?: string;
  page: string;
};

export const sitePages = [
  {
    title: "Home",
    path: "/",
    summary: "Panoramica FP CGIL Rovigo, iscrizione, contatti rapidi, news e servizi principali.",
  },
  {
    title: "Iscrizione",
    path: "/iscrizione",
    summary: "Percorso guidato per indirizzare l'utente al referente corretto in base a settore e ente.",
  },
  {
    title: "Chi siamo",
    path: "/chi-siamo",
    summary: "Segreteria FP CGIL Rovigo, ruoli, deleghe, settori, contatti telefonici, WhatsApp ed email.",
  },
  {
    title: "Contatti",
    path: "/contatti",
    summary: "Sede, telefono, email, PEC, mappa e canali ufficiali. Si riceve su appuntamento.",
  },
  {
    title: "Convenzioni",
    path: "/convenzioni",
    summary: "Ingresso alle convenzioni locali e nazionali riservate agli iscritti.",
  },
  {
    title: "Convenzioni locali",
    path: "/convenzioni/locali",
    summary: "Convenzioni attive sul territorio di Rovigo e provincia, incluse mare, ristorazione, salute e servizi.",
  },
  {
    title: "Convenzioni nazionali",
    path: "/convenzioni/nazionali",
    summary: "Documento PDF con convenzioni nazionali.",
  },
  {
    title: "News",
    path: "/news",
    summary: "News aggregate automaticamente da fpcgil.it e rimando alla fonte nazionale.",
  },
  {
    title: "Formazione",
    path: "/formazione",
    summary: "Rimando al portale Formazione e Partecipazione FP CGIL.",
  },
];

export const officialContacts = {
  office: "FP CGIL Rovigo",
  address: "Via Calatafimi 1/B, 45100 Rovigo",
  phone: "0425 377311",
  email: "fp.rovigo@veneto.cgil.it",
  pec: "fp@pec.cgilrovigo.it",
  note: "Si riceve su appuntamento.",
};

export const people: SitePerson[] = [
  {
    name: "Riccardo Mantovan",
    role: "Segretario Generale",
    areas: "Sanità Pubblica, Sanità Privata, Funzioni Locali, Funzioni Centrali",
    sectors: "Azienda ULSS5 Polesana, Comuni di Rovigo e Adria, Provincia, Ministeri, Agenzia Entrate, INPS, ACI",
    phone: "3428004474",
    email: "fp.ro.mantovan@veneto.cgil.it",
  },
  {
    name: "Pasquale Brenga",
    role: "Segretario Organizzativo",
    areas: "Sanità Pubblica, Sanità Privata, Funzioni Locali",
    sectors: "ULSS5 Polesana, dirigenza sanitaria e medica, case di cura private, Comuni, Camera di Commercio, CUR, Accademia dei Concordi",
    phone: "3405614635",
    email: "fp.ro.brenga@veneto.cgil.it",
  },
  {
    name: "Roberta Denanni",
    role: "Segretario",
    areas: "Igiene Ambientale, IPAB socio-sanitario, Socio-sanitario privato, Previdenza Complementare, Formazione",
    sectors: "Ecoambiente, case di riposo pubbliche e private, cooperative sociali, Perseo, Previdenza Cooperativa, Previambiente",
    phone: "3450623870",
    email: "fp.ro.denanni@veneto.cgil.it",
  },
  {
    name: "Sabrina Venzo",
    role: "Segretario",
    areas: "Sanità Privata, Enti Locali",
    sectors: "IPAB, case di cura private",
    phone: "3427819334",
    email: "fp.ro.venzo@veneto.cgil.it",
  },
  {
    name: "Silvia Saccardin",
    role: "Segretario",
    areas: "Sanità Pubblica, Previdenza Complementare, Formazione, Convenzioni",
    sectors: "ULSS5 Polesana, Perseo, Previdenza Cooperativa, Previambiente, formazione concorsi, formazione delegati",
    email: "fp.ro.saccardin@veneto.cgil.it",
  },
];

export const localConventions: LocalConvention[] = [
  {
    name: "Happy Days - Rosolina Mare",
    offer: "Ombrellone e due lettini a 15 euro dal lunedi al sabato, solo sabato su prenotazione, escluso 2-24 agosto. Due caffe di benvenuto in omaggio.",
    tags: ["mare", "spiaggia", "ombrellone", "lettini", "Rosolina Mare"],
    page: "/convenzioni/locali",
  },
  {
    name: "Scano Palo - Ristobeach",
    offer: "Sconti settimanali: 30% lun-ven su lettino e/o ombrellone, 10% sabato e domenica. Abbonamenti stagionale e mensile lun-ven.",
    tags: ["mare", "spiaggia", "ristobeach", "ombrellone", "lettino"],
    page: "/convenzioni/locali",
  },
  {
    name: "Borgo Levante - Camere",
    offer: "Sconto 15% dal lunedi al venerdi, minimo 2 notti. Sconto 10% sabato e domenica, minimo 2 notti.",
    tags: ["mare", "camere", "soggiorno", "vacanze", "ospitalita"],
    page: "/convenzioni/locali",
  },
  {
    name: "Racconti di Cucina",
    offer: "10% di sconto a cena dal giovedi alla domenica, escluso il sabato. Pranzi aziendali su richiesta, minimo 30 persone.",
    tags: ["ristorazione", "cena", "pranzo", "Rovigo"],
    page: "/convenzioni/locali",
  },
  {
    name: "Casetta Rossoblu",
    offer: "Sconto del 10% sul menu cena tutte le sere.",
    tags: ["ristorazione", "cena"],
    page: "/convenzioni/locali",
  },
  {
    name: "Tavernetta Dante",
    offer: "Sconto del 10% sul totale per i servizi di ristorazione.",
    tags: ["ristorazione", "cena", "pranzo"],
    page: "/convenzioni/locali",
  },
  {
    name: "Ideacasin SRL",
    offer: "Sconto del 20% su progettazione e acquisto arredi per interni ed esterni.",
    tags: ["casa", "arredi", "interni", "esterni"],
    page: "/convenzioni/locali",
  },
  {
    name: "Sin-E'",
    offer: "Con consumazione minima di 15 euro: un caffe e un amaro gratuiti.",
    tags: ["bar", "ristorazione", "caffe"],
    page: "/convenzioni/locali",
  },
  {
    name: "Nossolar - Centro per la Persona",
    offer: "Sconto del 15% su benessere, yoga e trattamenti individuali, shiatsu e consulenze psico-educative.",
    tags: ["benessere", "yoga", "shiatsu", "persona"],
    page: "/convenzioni/locali",
  },
  {
    name: "Studio Psicologia Tozzi",
    offer: "Sconto del 10% per colloqui di sostegno e supporto psicologico.",
    tags: ["psicologia", "salute", "supporto"],
    page: "/convenzioni/locali",
  },
  {
    name: "Massaggi Olistici",
    offer: "Sconto del 20% su tutti i massaggi da minimo 60 minuti. Prenotazione richiesta. Info e prenotazioni: Mirka Doati.",
    tags: ["benessere", "massaggi", "olistico"],
    phone: "3779952679",
    page: "/convenzioni/locali",
  },
  {
    name: "Studio Dentistico Guido Crepaldi",
    offer: "Sconto del 20% su ogni prestazione odontoiatrica.",
    tags: ["dentista", "salute", "odontoiatria"],
    page: "/convenzioni/locali",
  },
  {
    name: "Studio Dentistico Quadretti",
    offer: "Sconto del 10% su implantologia. Sconto del 20% su protesica.",
    tags: ["dentista", "salute", "implantologia", "protesica"],
    page: "/convenzioni/locali",
  },
  {
    name: "Black Art Tattoo Shop",
    offer: "Con spesa minima di 150 euro per tatuaggio: sconto pari a 40 euro.",
    tags: ["tatuaggi", "tattoo"],
    page: "/convenzioni/locali",
  },
];

export function buildStaticKnowledge() {
  const pageText = sitePages.map((page) => `- ${page.title} (${page.path}): ${page.summary}`).join("\n");
  const peopleText = people
    .map((person) => `- ${person.name}: ${person.role}. Deleghe: ${person.areas}. Settori: ${person.sectors}. Telefono: ${person.phone || "non indicato"}. Email: ${person.email || "non indicata"}.`)
    .join("\n");
  const conventionsText = localConventions
    .map((conv) => `- ${conv.name}: ${conv.offer} Tag: ${conv.tags.join(", ")}. Pagina: ${conv.page}. ${conv.phone ? `Telefono: ${conv.phone}.` : ""}`)
    .join("\n");

  return `
Contatti ufficiali:
- Sede: ${officialContacts.address}
- Telefono: ${officialContacts.phone}
- Email: ${officialContacts.email}
- PEC: ${officialContacts.pec}
- Nota: ${officialContacts.note}

Pagine del sito:
${pageText}

Persone e referenti:
${peopleText}

Convenzioni locali:
${conventionsText}

Formazione:
- Portale esterno: https://formazionepartecipazione.fpcgil.it/

Regola: le convenzioni sono riservate agli iscritti; per dubbi rimandare a /convenzioni/locali o ai contatti ufficiali.
`;
}
