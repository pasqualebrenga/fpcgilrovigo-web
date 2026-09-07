import type { Metadata } from "next";

const title = "Calcolo aumenti e arretrati Funzioni Locali CCNL 2025-2027";
const description =
  "Simula aumenti, arretrati, indennità di comparto, differenziali e nuovi valori dello straordinario per Enti locali, Comuni, Province e IPAB.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calcolo arretrati Funzioni Locali",
    "aumenti CCNL Enti Locali 2025 2027",
    "straordinario Enti Locali nuovo contratto",
    "indennità di comparto Funzioni Locali",
    "differenziali stipendiali Enti Locali",
    "calcolatore Comuni CCNL",
    "FP CGIL Rovigo Enti Locali",
  ],
  alternates: {
    canonical: "/dentro-il-quadrato/funzioni-locali",
  },
  openGraph: {
    title,
    description,
    url: "/dentro-il-quadrato/funzioni-locali",
  },
};

export default function FunzioniLocaliLayout({ children }: { children: React.ReactNode }) {
  return children;
}
