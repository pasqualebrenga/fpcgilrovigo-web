import type { Metadata } from "next";

const title = "Calcolo aumenti e arretrati Sanità Pubblica CCNL 2025-2027";
const description =
  "Simula aumenti, arretrati, indennità specifiche, DEP e valori orari dello straordinario per il personale della Sanità pubblica e ULSS.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calcolo arretrati Sanità pubblica",
    "aumenti CCNL Sanità 2025 2027",
    "indennità infermieristica nuovo contratto",
    "DEP Sanità pubblica",
    "straordinario Sanità pubblica",
    "calcolatore ULSS CCNL",
    "FP CGIL Rovigo Sanità",
  ],
  alternates: {
    canonical: "/dentro-il-quadrato/sanita-pubblica",
  },
  openGraph: {
    title,
    description,
    url: "/dentro-il-quadrato/sanita-pubblica",
  },
};

export default function SanitaPubblicaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
