import { Suspense } from "react";
import type { Metadata } from "next";
import CentralResultClient from "./CentralResultClient";

export const metadata: Metadata = {
  title: "Risultato simulazione Funzioni Centrali | Dentro il Quadrato",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CentralResultPage() {
  return (
    <Suspense fallback={<div className="dentroQuadratoShell result-page" style={{ padding: 24 }}>Caricamento risultato…</div>}>
      <CentralResultClient />
    </Suspense>
  );
}
