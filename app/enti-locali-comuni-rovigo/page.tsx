import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, MessageCircle } from "lucide-react";

const FP_RED = "#d40000";

export const metadata: Metadata = {
  title: "Enti locali e Comuni della provincia di Rovigo",
  description:
    "FP CGIL Rovigo segue lavoratrici e lavoratori di Comuni, Provincia ed enti locali del territorio. Orientamento per Comune di Rovigo, Comune di Adria e altri Comuni della provincia.",
  alternates: {
    canonical: "/enti-locali-comuni-rovigo",
  },
};

function AreaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="btn" href={href} style={{ borderRadius: 999, padding: "10px 14px", fontWeight: 900 }}>
      {children} <ArrowRight size={17} />
    </Link>
  );
}

export default function EntiLocaliPage() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <section
        style={{
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.10)",
          background: "linear-gradient(135deg, rgba(212,0,0,0.09), #fff 44%, rgba(0,0,0,0.035))",
          padding: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: FP_RED }} />
        <div style={{ display: "inline-flex", gap: 8, alignItems: "center", color: FP_RED, fontWeight: 950, textTransform: "uppercase", fontSize: 12 }}>
          <Building2 size={16} /> Enti locali
        </div>
        <h1 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.05, fontWeight: 950 }}>
          Enti locali e Comuni della provincia di Rovigo
        </h1>
        <p className="muted" style={{ margin: "10px 0 0", lineHeight: 1.55, maxWidth: 880 }}>
          FP CGIL Rovigo tutela lavoratrici e lavoratori degli enti locali: Comuni, Provincia e altri enti
          pubblici del territorio polesano.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <AreaLink href="/iscrizione">Trova il referente</AreaLink>
          <AreaLink href="/contatti">Contatta la sede</AreaLink>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Chi segue il tuo Comune?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Comune di Rovigo e Comune di Adria</h3>
            <p className="muted" style={{ lineHeight: 1.5 }}>
              Per Comune di Rovigo e Comune di Adria il riferimento indicato è Riccardo Mantovan.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Altri Comuni della provincia</h3>
            <p className="muted" style={{ lineHeight: 1.5 }}>
              Per gli altri Comuni della provincia di Rovigo il riferimento indicato è Pasquale Brenga.
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Altri enti del territorio
        </h2>
        <p className="muted" style={{ lineHeight: 1.55 }}>
          Questa pagina è utile anche per chi cerca sindacato enti locali Rovigo, dipendenti comunali Rovigo,
          FP CGIL Comuni Rovigo, Provincia di Rovigo, Camera di Commercio, CUR o altri enti locali.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <AreaLink href="/sanita-pubblica-ulss5-rovigo">Sanità pubblica</AreaLink>
          <AreaLink href="/ipab-case-riposo-rovigo">IPAB e case di riposo</AreaLink>
          <AreaLink href="/funzioni-centrali-rovigo">Funzioni centrali</AreaLink>
        </div>
      </section>

      <section
        style={{
          borderRadius: 16,
          background: "#111",
          color: "#fff",
          padding: 18,
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 950 }}>
            <MapPin size={19} /> Non trovi il tuo ente?
          </div>
          <p style={{ margin: "8px 0 0", opacity: 0.82, lineHeight: 1.5 }}>
            Scrivici o usa il percorso guidato: ti indirizziamo al referente corretto.
          </p>
        </div>
        <Link className="btn" href="/iscrizione" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 950, background: FP_RED, borderColor: FP_RED, color: "#fff" }}>
          Percorso guidato <MessageCircle size={18} />
        </Link>
      </section>
    </div>
  );
}
