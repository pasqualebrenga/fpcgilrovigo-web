import type { Metadata } from "next";

const title = "Calcolo aumenti e arretrati Funzioni Centrali CCNL 2025-2027";
const description =
  "Simula aumenti tabellari, arretrati e differenziali stipendiali per Ministeri, Agenzie fiscali, INPS, ACI e Funzioni Centrali.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calcolo arretrati Funzioni Centrali",
    "aumenti CCNL Funzioni Centrali 2025 2027",
    "differenziali stipendiali Funzioni Centrali",
    "calcolatore Ministeri CCNL",
    "calcolatore Agenzie fiscali CCNL",
    "calcolatore INPS ACI",
    "FP CGIL Rovigo Funzioni Centrali",
  ],
  alternates: {
    canonical: "/dentro-il-quadrato/funzioni-centrali",
  },
  openGraph: {
    title,
    description,
    url: "/dentro-il-quadrato/funzioni-centrali",
  },
};

export default function FunzioniCentraliLayout({ children }: { children: React.ReactNode }) {
  return children;
}
