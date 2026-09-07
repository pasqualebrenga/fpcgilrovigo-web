import { Suspense } from "react";
import type { Metadata } from "next";
import RisultatoClient from "./RisultatoClient";

export const metadata: Metadata = {
  title: "Risultato simulazione Funzioni Locali | Dentro il Quadrato",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="dentroQuadratoShell result-page" style={{ padding: 24 }}>Caricamento risultato…</div>}>
      <RisultatoClient />
    </Suspense>
  );
}
