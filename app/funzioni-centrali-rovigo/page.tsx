import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Landmark, Mail, MessageCircle } from "lucide-react";

const FP_RED = "#d40000";

export const metadata: Metadata = {
  title: "Funzioni centrali a Rovigo",
  description:
    "FP CGIL Rovigo segue lavoratrici e lavoratori delle funzioni centrali: Ministeri, Agenzia delle Entrate, INPS, ACI e uffici pubblici statali nel territorio di Rovigo.",
  alternates: {
    canonical: "/funzioni-centrali-rovigo",
  },
};

function AreaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="btn" href={href} style={{ borderRadius: 999, padding: "10px 14px", fontWeight: 900 }}>
      {children} <ArrowRight size={17} />
    </Link>
  );
}

export default function FunzioniCentraliPage() {
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
          <Landmark size={16} /> Funzioni centrali
        </div>
        <h1 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.05, fontWeight: 950 }}>
          Funzioni centrali a Rovigo
        </h1>
        <p className="muted" style={{ margin: "10px 0 0", lineHeight: 1.55, maxWidth: 880 }}>
          FP CGIL Rovigo segue lavoratrici e lavoratori delle funzioni centrali: Ministeri, Agenzia delle
          Entrate, INPS, ACI e uffici pubblici statali presenti nel territorio.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <AreaLink href="/iscrizione">Trova il referente</AreaLink>
          <AreaLink href="/contatti">Contatta la sede</AreaLink>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Riferimento territoriale
        </h2>
        <p className="muted" style={{ lineHeight: 1.55 }}>
          Per funzioni centrali, Ministeri, Agenzia delle Entrate, INPS e ACI il riferimento indicato è Riccardo Mantovan.
          Se non sai se il tuo ufficio rientra in questa area, puoi usare il percorso guidato o contattare la sede.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <AreaLink href="/chi-siamo">Vedi la segreteria</AreaLink>
          <AreaLink href="/iscrizione">Percorso guidato</AreaLink>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Altre aree FP CGIL Rovigo
        </h2>
        <p className="muted" style={{ lineHeight: 1.55 }}>
          Questa pagina intercetta chi cerca sindacato funzioni centrali Rovigo, sindacato INPS Rovigo,
          sindacato Agenzia Entrate Rovigo, Ministeri Rovigo o FP CGIL funzioni centrali.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <AreaLink href="/sanita-pubblica-ulss5-rovigo">Sanità pubblica</AreaLink>
          <AreaLink href="/enti-locali-comuni-rovigo">Enti locali</AreaLink>
          <AreaLink href="/ipab-case-riposo-rovigo">IPAB e case di riposo</AreaLink>
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
            <MessageCircle size={19} /> Hai bisogno di parlare con la sede?
          </div>
          <p style={{ margin: "8px 0 0", opacity: 0.82, lineHeight: 1.5 }}>
            Scrivici o chiamaci: si riceve su appuntamento.
          </p>
        </div>
        <Link className="btn" href="/contatti" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 950, background: FP_RED, borderColor: FP_RED, color: "#fff" }}>
          Vai a Contatti <Mail size={18} />
        </Link>
      </section>
    </div>
  );
}
