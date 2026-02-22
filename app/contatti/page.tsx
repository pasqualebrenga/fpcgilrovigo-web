
"use client";
import Link from "next/link";
import { PhoneCall, Mail, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

const FP_RED = "#d40000";

const CONTATTI = {
  indirizzoRiga1: "Via Calatafimi 1/B",
  indirizzoRiga2: "45100 Rovigo",
  tel: "0425377311",
  email: "fp.rovigo@veneto.cgil.it",
  pec: "fp@pec.cgilrovigo.it",
};

function telUrl(numero: string) {
  // lasciare solo cifre nel link
  const digits = numero.replace(/\D/g, "");
  return `tel:${digits}`;
}

function mailUrl(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

function mapsSearchUrl() {
  const q = `${CONTATTI.indirizzoRiga1} ${CONTATTI.indirizzoRiga2}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "rgba(212, 0, 0, 0.10)",
        color: FP_RED,
        border: "1px solid rgba(212, 0, 0, 0.25)",
        padding: "6px 10px",
        borderRadius: 999,
        fontWeight: 950,
        textTransform: "uppercase",
        letterSpacing: 0.3,
        fontSize: 12,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {children}
    </span>
  );
}

function ActionButton({
  href,
  title,
  subtitle,
  icon,
  external,
  variant,
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  external?: boolean;
  variant?: "primary" | "soft" | "dark";
}) {
  const base: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    borderRadius: 16,
    padding: 14,
    textDecoration: "none",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#fff",
    transition: "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          background: FP_RED,
          borderColor: FP_RED,
          color: "#fff",
        }
      : variant === "dark"
        ? {
            ...base,
            background: "#111",
            borderColor: "#111",
            color: "#fff",
          }
        : {
            ...base,
            background: "rgba(212,0,0,0.06)",
            borderColor: "rgba(212,0,0,0.18)",
            color: "#111",
          };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={style}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            background: variant === "primary" || variant === "dark" ? "rgba(255,255,255,0.16)" : "rgba(212,0,0,0.12)",
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 950, fontSize: 16, lineHeight: 1.2 }}>{title}</div>
          <div style={{ opacity: 0.85, marginTop: 4, fontSize: 13, lineHeight: 1.25 }}>{subtitle}</div>
        </div>
      </div>
      <ArrowRight size={18} style={{ opacity: 0.9 }} />
    </a>
  );
}

export default function ContattiPage() {
  const mapsUrl = mapsSearchUrl();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Hero */}
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
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: FP_RED }} />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <Pill>Contatti</Pill>
          <div className="muted" style={{ fontWeight: 900 }}>
            Si riceve su appuntamento
          </div>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.4, lineHeight: 1.05, margin: "10px 0 0" }}>
          Contatti FP CGIL Rovigo
        </h1>

        <div style={{ marginTop: 10, color: "rgba(0,0,0,0.75)", lineHeight: 1.45, fontSize: 15 }}>
          Per incontrarci o parlare con noi, fissiamo sempre un appuntamento. Per iscrizione e richieste specifiche,
          usa la pagina Iscrizione: ti indirizziamo al referente corretto.
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            className="btn"
            href={telUrl(CONTATTI.tel)}
            style={{
              background: FP_RED,
              borderColor: FP_RED,
              color: "#fff",
              fontWeight: 950,
              borderRadius: 999,
              padding: "12px 16px",
              display: "inline-flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <PhoneCall size={18} />
            Chiama la sede
            <ArrowRight size={18} />
          </a>

          <Link className="btn" href="/iscrizione" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Vai a Iscrizione
          </Link>
        </div>
      </div>

      {/* Azioni rapide */}
      <div className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Azioni rapide
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
            marginTop: 12,
          }}
        >
          <ActionButton
            href={telUrl(CONTATTI.tel)}
            title={`Telefono: ${CONTATTI.tel}`}
            subtitle="Chiamaci per informazioni e appuntamenti"
            icon={<PhoneCall size={18} />}
            variant="primary"
          />

          <ActionButton
            href={mailUrl(CONTATTI.email, "Contatto dal sito FP CGIL Rovigo")}
            title={`Email: ${CONTATTI.email}`}
            subtitle="Scrivici per richieste e documenti"
            icon={<Mail size={18} />}
            variant="dark"
          />

          <ActionButton
            href={mailUrl(CONTATTI.pec, "PEC – Contatto dal sito FP CGIL Rovigo")}
            title={`PEC: ${CONTATTI.pec}`}
            subtitle="Canale ufficiale per comunicazioni formali"
            icon={<ShieldCheck size={18} />}
            variant="soft"
          />

          <ActionButton
            href={mapsUrl}
            title={`${CONTATTI.indirizzoRiga1} – ${CONTATTI.indirizzoRiga2}`}
            subtitle="Apri indicazioni su Google Maps"
            icon={<MapPin size={18} />}
            external
            variant="soft"
          />
        </div>
      </div>

      {/* Dove siamo */}
      <div className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Dove siamo
        </h2>

        <div className="muted" style={{ marginTop: 8 }}>
          {CONTATTI.indirizzoRiga1} — {CONTATTI.indirizzoRiga2}
        </div>

        <div
          style={{
            marginTop: 12,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#f2f2f2",
          }}
        >
          <iframe
            title="Mappa – FP CGIL Rovigo"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${CONTATTI.indirizzoRiga1} ${CONTATTI.indirizzoRiga2}`
            )}&output=embed`}
            width="100%"
            height="360"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, display: "block" }}
          />
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a className="btn" href={mapsUrl} target="_blank" rel="noreferrer" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Apri su Google Maps
          </a>
        </div>
      </div>

      {/* Ricevimento */}
      <div className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Ricevimento
        </h2>
        <div className="muted" style={{ lineHeight: 1.5 }}>
          <strong>Si riceve su appuntamento.</strong> Per concordare giorno e ora, chiamaci oppure scrivici via email.
        </div>
      </div>

      {/* CTA Iscrizione */}
      <div
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 16,
          background: "#fff",
          padding: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: FP_RED }} />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 950, fontSize: 18 }}>Iscrizione</div>
            <div className="muted" style={{ marginTop: 6, lineHeight: 1.45 }}>
              In pochi secondi ti indirizziamo al referente corretto (in base a settore e ente).
            </div>
          </div>

          <Link
            className="btn"
            href="/iscrizione"
            style={{
              background: FP_RED,
              borderColor: FP_RED,
              color: "#fff",
              fontWeight: 950,
              borderRadius: 999,
              padding: "12px 16px",
              display: "inline-flex",
              gap: 10,
              alignItems: "center",
              height: "fit-content",
            }}
          >
            Vai a Iscrizione
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
