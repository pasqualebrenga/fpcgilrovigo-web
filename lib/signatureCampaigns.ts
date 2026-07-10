export type SignatureCampaign = {
  id: "salute" | "appalti";
  title: string;
  claim: string;
  label: string;
  logo: string;
  summary: string;
  detailUrl: string;
  signUrl: string;
  points: string[];
};

export const signatureCampaigns: SignatureCampaign[] = [
  {
    id: "salute",
    title: "Diritto alla Salute",
    claim: "Prendiamocene cura",
    label: "Servizio Sanitario Nazionale",
    logo: "/images/campagne/logo-firma-sanita.webp",
    summary:
      "Una proposta di legge per rimettere al centro il diritto universale alla cura, il rilancio della sanità pubblica e servizi più vicini alle persone.",
    detailUrl: "https://www.cgil.it/proposte-di-legge-di-iniziativa-popolare/diritto-alla-salute",
    signUrl: "https://firmereferendum.giustizia.it/referendum/open/dettaglio-open/6500013",
    points: [
      "Finanziamento stabile e adeguato del Servizio Sanitario Nazionale.",
      "Più personale, assunzioni e condizioni di lavoro dignitose.",
      "Riduzione delle liste d'attesa e accesso reale alle cure.",
      "Rafforzamento della sanità territoriale e dei servizi di prossimità.",
      "Difesa del carattere pubblico e universale della salute.",
    ],
  },
  {
    id: "appalti",
    title: "I diritti non si appaltano",
    claim: "Stesso lavoro, stesso contratto",
    label: "Appalti e diritti",
    logo: "/images/campagne/logo-firma-appalti.webp",
    summary:
      "Una proposta per rafforzare diritti, salari, sicurezza e responsabilità negli appalti, contro catene di subappalti e lavoro povero.",
    detailUrl: "https://www.cgil.it/proposte-di-legge-di-iniziativa-popolare/i-diritti-non-si-appaltano",
    signUrl: "https://firmereferendum.giustizia.it/referendum/open/dettaglio-open/6500000",
    points: [
      "Stesso lavoro, stessi diritti: salario e tutele per chi lavora negli appalti.",
      "Basta false partite IVA e compensi non equi nel lavoro autonomo in appalto.",
      "Più responsabilità del committente su salute e sicurezza.",
      "Salari e contratti garantiti, con responsabilita su abusi e violazioni.",
      "Stop agli appalti finti e assunzione diretta se l'appalto è illecito.",
      "Limiti ai subappalti e alle catene che aumentano sfruttamento e incidenti.",
      "Trasparenza sugli appalti, con informazione e confronto sindacale.",
    ],
  },
];
