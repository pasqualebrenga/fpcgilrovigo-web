import Link from "next/link";

export default function ConvenzioniIndexPage() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Intro stile “FP” */}
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
              background: "rgba(212, 0, 0, 0.10)",
              color: "#d40000",
              border: "1px solid rgba(212, 0, 0, 0.25)",
              padding: "6px 10px",
              borderRadius: 999,
              fontWeight: 950,
              textTransform: "uppercase",
              letterSpacing: 0.3,
              fontSize: 12,
            }}
          >
            Convenzioni
          </span>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.4, lineHeight: 1.05, margin: 0 }}>
          Vantaggi per iscritte e iscritti
        </h1>

        <div style={{ marginTop: 10, color: "rgba(0,0,0,0.70)", lineHeight: 1.45, fontSize: 15 }}>
          Qui trovi sia le convenzioni locali (Rovigo e provincia) sia quelle nazionali. In molte realtà sindacali i
          vantaggi collegati all’iscrizione includono anche coperture e servizi assicurativi (dove previsti): per i
          dettagli fa sempre fede la documentazione ufficiale.
        </div>
      </div>

      {/* Scelte */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        <Link
          href="/convenzioni/locali"
          style={{
            textDecoration: "none",
            color: "inherit",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 16 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  background: "rgba(212,0,0,0.95)",
                  color: "#fff",
                  fontWeight: 950,
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                  fontSize: 12,
                  padding: "7px 10px",
                  borderRadius: 999,
                }}
              >
                Locali
              </span>
            </div>

            <div style={{ fontWeight: 950, fontSize: 20, lineHeight: 1.2 }}>
              Convenzioni di Rovigo e provincia
            </div>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.70)", lineHeight: 1.45 }}>
              Strutture, servizi e attività convenzionate sul territorio. Con mappe e indicazioni rapide.
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="btn" style={{ background: "#d40000", borderColor: "#d40000", color: "#fff" }}>
                Vai alle convenzioni locali
              </span>
            </div>
          </div>
        </Link>

        <Link
          href="/convenzioni/nazionali"
          style={{
            textDecoration: "none",
            color: "inherit",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 16 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
          style={{
                  background: "rgba(212,0,0,0.95)",
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

            <div style={{ fontWeight: 950, fontSize: 20, lineHeight: 1.2 }}>Convenzioni nazionali</div>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.70)", lineHeight: 1.45 }}>
              Elenco completo in PDF. 
              Apri o scarica il documento ufficiale.
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="btn" style={{ background: "#d40000", borderColor: "#d40000", color: "#fff" }}>
                Vai alle convenzioni nazionali
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="card">
        <h2 className="h2">Hai bisogno di chiarimenti?</h2>
        <div className="muted">Scrivici o chiamaci: ti indirizziamo alla documentazione corretta e aggiornata.</div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/contatti">
            Contatti
          </Link>
        </div>
      </div>
    </div>
  );
}
