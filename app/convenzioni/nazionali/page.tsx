import Link from "next/link";

const PDF_PATH = "/docs/convenzioni-nazionali.pdf";

export default function ConvenzioniNazionaliPage() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        style={{
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 14,
          background: "#fff",
          padding: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "#d40000" }} />

        <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <span
            style={{
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontWeight: 950,
              textTransform: "uppercase",
              letterSpacing: 0.3,
              fontSize: 12,
              padding: "7px 10px",
              borderRadius: 999,
            }}
          >
            Nazionali
          </span>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.4, lineHeight: 1.05, margin: 0 }}>
          Convenzioni nazionali
        </h1>

        <div style={{ marginTop: 10, color: "rgba(0,0,0,0.70)", lineHeight: 1.45, fontSize: 15 }}>
          Le convenzioni nazionali sono raccolte in un documento unico. Puoi aprirlo online oppure scaricarlo.
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            className="btn"
            href={PDF_PATH}
            target="_blank"
            rel="noreferrer"
            style={{ background: "#d40000", borderColor: "#d40000", color: "#fff", fontWeight: 950, borderRadius: 999, padding: "12px 16px" }}
          >
            Apri PDF
          </a>
          <a className="btn" href={PDF_PATH} download>
            Scarica PDF
          </a>
          <Link className="btn" href="/convenzioni">
            Torna a Convenzioni
          </Link>
        </div>
      </div>

      {/* Preview (facoltativa): su mobile può essere scomoda, ma non dà fastidio */}
      <div className="card">
        <h2 className="h2">Anteprima</h2>
        <div className="muted">Se l’anteprima non si vede bene, usa “Apri PDF”.</div>
        <div style={{ marginTop: 12, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 12, overflow: "hidden" }}>
          <iframe
            src={PDF_PATH}
            title="Convenzioni nazionali"
            style={{ width: "100%", height: 900, border: 0 }}
          />
        </div>
      </div>

      <div className="card">
        <h2 className="h2">Chiarimenti</h2>
        <div className="muted">Per informazioni o supporto sull’iscrizione e sui servizi collegati, contattaci.</div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/contatti">
            Contatti
          </Link>
          <Link className="btn" href="/iscrizione">
            Iscrizione
          </Link>
        </div>
      </div>
    </div>
  );
}
