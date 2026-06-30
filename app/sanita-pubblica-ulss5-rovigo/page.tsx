import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartPulse, MessageCircle, UsersRound } from "lucide-react";

const FP_RED = "#d40000";

export const metadata: Metadata = {
  title: "Sanità pubblica e ULSS5 Polesana a Rovigo",
  description:
    "FP CGIL Rovigo segue lavoratrici e lavoratori della sanità pubblica, ospedale e ULSS5 Polesana. Orientamento per comparto sanità pubblica e dirigenza medica o sanitaria.",
  alternates: {
    canonical: "/sanita-pubblica-ulss5-rovigo",
  },
};

function AreaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="btn" href={href} style={{ borderRadius: 999, padding: "10px 14px", fontWeight: 900 }}>
      {children} <ArrowRight size={17} />
    </Link>
  );
}

export default function SanitaPubblicaPage() {
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
        <div
          style={{
            display: "inline-flex",
            gap: 8,
            alignItems: "center",
            color: FP_RED,
            fontWeight: 950,
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          <HeartPulse size={16} /> Sanita pubblica
        </div>
        <h1 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.05, fontWeight: 950 }}>
          Sanità pubblica, ospedale e ULSS5 Polesana
        </h1>
        <p className="muted" style={{ margin: "10px 0 0", lineHeight: 1.55, maxWidth: 880 }}>
          FP CGIL Rovigo tutela lavoratrici e lavoratori della sanità pubblica nel territorio di Rovigo:
          ospedale, distretti, servizi territoriali e Azienda ULSS5 Polesana.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <AreaLink href="/iscrizione">Trova il referente</AreaLink>
          <AreaLink href="/contatti">Contatta la sede</AreaLink>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Prima distinzione: comparto o dirigenza?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Comparto sanità pubblica</h3>
            <p className="muted" style={{ lineHeight: 1.5 }}>
              Se lavori nel comparto sanità pubblica, il riferimento principale indicato è Riccardo Mantovan.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Dirigenza medica e sanitaria</h3>
            <p className="muted" style={{ lineHeight: 1.5 }}>
              Se sei medico, dirigente sanitario o altra figura della dirigenza sanitaria, il riferimento indicato è Pasquale Brenga.
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Quando usare questa pagina
        </h2>
        <p className="muted" style={{ lineHeight: 1.55 }}>
          Questa pagina serve se cerchi sindacato sanità Rovigo, FP CGIL ULSS5 Polesana, sindacato ospedale Rovigo,
          assistenza per lavoratrici e lavoratori della sanità pubblica o orientamento tra comparto e dirigenza.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <AreaLink href="/enti-locali-comuni-rovigo">Enti locali</AreaLink>
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
            <MessageCircle size={19} /> Non sai da dove partire?
          </div>
          <p style={{ margin: "8px 0 0", opacity: 0.82, lineHeight: 1.5 }}>
            Usa il percorso guidato: in pochi passaggi ti indirizza al referente corretto.
          </p>
        </div>
        <Link className="btn" href="/iscrizione" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 950, background: FP_RED, borderColor: FP_RED, color: "#fff" }}>
          Vai a Iscrizione <UsersRound size={18} />
        </Link>
      </section>
    </div>
  );
}
