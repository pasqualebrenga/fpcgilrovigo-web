import { Suspense } from "react";
import RisultatoClient from "./RisultatoClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="dentroQuadratoShell result-page" style={{ padding: 24 }}>Caricamento risultato…</div>}>
      <RisultatoClient />
    </Suspense>
  );
}
