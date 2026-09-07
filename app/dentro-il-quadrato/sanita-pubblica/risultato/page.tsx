import { Suspense } from "react";
import type { Metadata } from "next";
import HealthResultClient from "./HealthResultClient";

export const metadata: Metadata = {
  title: "Risultato simulazione Sanità Pubblica | Dentro il Quadrato",
  robots: {
    index: false,
    follow: true,
  },
};

export default function HealthResultPage() {
  return (
    <Suspense fallback={<div className="dentroQuadratoShell result-page" style={{ padding: 24 }}>Caricamento risultato…</div>}>
      <HealthResultClient />
    </Suspense>
  );
}
