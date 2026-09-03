import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dentro il Quadrato - Calcolatori contratto FP CGIL Rovigo",
  description:
    "Calcolatori lordi orientativi per aumenti, arretrati e novità dei CCNL 2025-2027: Sanità pubblica, Funzioni locali e Funzioni centrali.",
  alternates: {
    canonical: "/dentro-il-quadrato",
  },
};

export default function DentroIlQuadratoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
