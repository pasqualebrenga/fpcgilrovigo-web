import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";

const FP_RED = "#d40000";

export const metadata: Metadata = {
  title: "IPAB, case di riposo e socio-sanitario a Rovigo",
  description:
    "FP CGIL Rovigo segue lavoratrici e lavoratori di IPAB, case di riposo, RSA, centri servizi anziani e socio-sanitario nel territorio di Rovigo e provincia.",
  alternates: {
    canonical: "/ipab-case-riposo-rovigo",
  },
};

function AreaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="btn" href={href} style={{ borderRadius: 999, padding: "10px 14px", fontWeight: 900 }}>
      {children} <ArrowRight size={17} />
    </Link>
  );
}

export default function IpabPage() {
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
          <ShieldCheck size={16} /> IPAB e socio-sanitario
        </div>
        <h1 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.05, fontWeight: 950 }}>
          IPAB, case di riposo e socio-sanitario a Rovigo
        </h1>
        <p className="muted" style={{ margin: "10px 0 0", lineHeight: 1.55, maxWidth: 880 }}>
          FP CGIL Rovigo tutela lavoratrici e lavoratori di IPAB, case di riposo, RSA, centri servizi
          anziani, cooperative sociali e strutture socio-sanitarie del territorio.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <AreaLink href="/iscrizione">Trova il referente</AreaLink>
          <AreaLink href="/contatti">Contatta la sede</AreaLink>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Orientamento rapido
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>IPAB e centri servizi anziani</h3>
            <p className="muted" style={{ lineHeight: 1.5 }}>
              Per IPAB della provincia di Rovigo, case di riposo e centri servizi anziani il riferimento indicato è Sabrina Venzo.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 14 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>Socio-sanitario e strutture private</h3>
            <p className="muted" style={{ lineHeight: 1.5 }}>
              Per strutture socio-sanitarie, case di cura private e cooperative sociali possiamo indirizzarti al referente più adatto.
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Ricerche pratiche che questa pagina copre
        </h2>
        <p className="muted" style={{ lineHeight: 1.55 }}>
          Se cerchi sindacato IPAB Rovigo, sindacato case di riposo Rovigo, lavoratori RSA Rovigo,
          centri servizi anziani Rovigo o socio-sanitario Rovigo, questa è la pagina giusta per orientarti.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <AreaLink href="/sanita-pubblica-ulss5-rovigo">Sanità pubblica</AreaLink>
          <AreaLink href="/enti-locali-comuni-rovigo">Enti locali</AreaLink>
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
            <UsersRound size={19} /> Hai il nome della struttura?
          </div>
          <p style={{ margin: "8px 0 0", opacity: 0.82, lineHeight: 1.5 }}>
            Puoi indicarla nel percorso guidato o scriverci: ti aiutiamo a capire chi segue il tuo ente.
          </p>
        </div>
        <Link className="btn" href="/iscrizione" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 950, background: FP_RED, borderColor: FP_RED, color: "#fff" }}>
          Vai a Iscrizione <MessageCircle size={18} />
        </Link>
      </section>
    </div>
  );
}
