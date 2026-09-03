import { Suspense } from "react";
import CentralResultClient from "./CentralResultClient";

export default function CentralResultPage() {
  return (
    <Suspense fallback={<div className="dentroQuadratoShell result-page" style={{ padding: 24 }}>Caricamento risultato…</div>}>
      <CentralResultClient />
    </Suspense>
  );
}
