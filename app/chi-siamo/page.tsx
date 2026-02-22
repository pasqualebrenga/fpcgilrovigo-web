"use client";

import Link from "next/link";
import { MessageCircle, PhoneCall, Mail, ChevronRight } from "lucide-react";

const FP_RED = "#d40000";
const WA_GREEN = "#25D366";

type Persona = {
  slug: string;
  nome: string;
  ruolo: string;
  deleghe: string;
  settori: string;
  telefono?: string; // solo cifre
  email?: string;
  foto?: string; // path da /public
};

function waUrl(numero: string, text: string) {
  return `https://wa.me/39${numero}?text=${encodeURIComponent(text)}`;
}

function telUrl(numero: string) {
  return `tel:+39${numero}`;
}

function mailUrl(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
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

function ButtonLink({
  href,
  children,
  icon,
  variant,
  external,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "whatsapp" | "call" | "email" | "default";
  external?: boolean;
}) {
  const base: React.CSSProperties = {
    borderRadius: 999,
    padding: "12px 16px",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 950,
  };

  const style =
    variant === "whatsapp"
      ? ({ ...base, background: WA_GREEN, borderColor: WA_GREEN, color: "#fff" } as const)
      : variant === "call"
        ? ({ ...base, background: "rgba(212,0,0,0.08)", borderColor: "rgba(212,0,0,0.25)", color: "#111" } as const)
        : variant === "email"
          ? ({ ...base, background: "#111", borderColor: "#111", color: "#fff" } as const)
          : ({ ...base } as const);

  return (
    <a
      className="btn"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={style}
    >
      {icon}
      {children}
      <ChevronRight size={18} />
    </a>
  );
}

const PERSONE: Persona[] = [
  {
    slug: "mantovan",
    nome: "Riccardo Mantovan",
    ruolo: "Segretario Generale",
    deleghe: "Sanità Pubblica, Sanità Privata, Funzioni Locali, Funzioni Centrali",
    settori: "Azienda ULSS5 Polesana, Comuni di Rovigo e Adria, Provincia, Ministeri, Agenzia Entrate, INPS, ACI",
    telefono: "3428004474",
    email: "fp.ro.mantovan@veneto.cgil.it",
    foto: "/segreteria/mantovan.jpg",
  },
  {
    slug: "brenga",
    nome: "Pasquale Brenga",
    ruolo: "Segretario Organizzativo",
    deleghe: "Sanità Pubblica, Sanità Privata, Funzioni Locali",
    settori:
      "ULSS5 Polesana (Dirigenza sanitaria e medica), Case di Cura Private, Comuni, Camera di Commercio, CUR, Accademia dei Concordi",
    telefono: "3405614635",
    email: "fp.ro.brenga@veneto.cgil.it",
    foto: "/segreteria/brenga.jpg",
  },
  {
    slug: "denanni",
    nome: "Roberta Denanni",
    ruolo: "Segretario",
    deleghe: "Igiene Ambientale, IPAB socio-sanitario, Socio-sanitario privato, Previdenza Complementare, Formazione",
    settori:
      "Ecoambiente, Case di riposo pubbliche e private, Cooperative sociali, Perseo / Previdenza Cooperativa / Previambiente",
    telefono: "3450623870",
    email: "fp.ro.denanni@veneto.cgil.it",
    foto: "/segreteria/denanni.jpg",
  },
  {
    slug: "venzo",
    nome: "Sabrina Venzo",
    ruolo: "Segretario",
    deleghe: "Sanità Privata, Enti Locali",
    settori: "IPAB, Case di Cura Private",
    telefono: "3427819334",
    email: "fp.ro.venzo@veneto.cgil.it",
    foto: "/segreteria/venzo.jpg",
  },
  {
    slug: "saccardin",
    nome: "Silvia Saccardin",
    ruolo: "Segretario",
    deleghe: "Sanità Pubblica, Previdenza Complementare, Formazione, Convenzioni",
    settori: "ULSS5 Polesana, Perseo, Previdenza Cooperativa, Previambiente, Formazione concorsi, Formazione delegati",
    email: "fp.ro.saccardin@veneto.cgil.it",
    foto: "/segreteria/saccardin.jpg",
  },
];

export default function ChiSiamoPage() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Intro stile FP */}
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
          <Pill>Chi siamo</Pill>
          <div className="muted" style={{ fontWeight: 900 }}>
            Si riceve su appuntamento
          </div>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.4, lineHeight: 1.05, margin: "10px 0 0" }}>
          La segreteria FP CGIL Rovigo
        </h1>

        <div style={{ marginTop: 10, color: "rgba(0,0,0,0.75)", lineHeight: 1.45, fontSize: 15 }}>
          Qui trovi i riferimenti della segreteria. Per parlare con noi: <strong>si riceve su appuntamento</strong> (vedi
          pagina Contatti).
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/contatti" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Contatti
          </Link>
          <Link className="btn" href="/iscrizione" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Iscrizione
          </Link>
        </div>
      </div>

      {/* ELENCO VERTICALE */}
      <div style={{ display: "grid", gap: 12, maxWidth: 980, margin: "0 auto" }}>
        {PERSONE.map((p) => {
          const msg = `Ciao, arrivo dal sito FP CGIL Rovigo. Vorrei parlare con ${p.nome}. Grazie.`;

          return (
            <div
              key={p.slug}
              style={{
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.10)",
                background: "#fff",
                overflow: "hidden",
                transition: "transform 120ms ease, box-shadow 120ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div style={{ padding: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  {/* Foto quadrata */}
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "#f2f2f2",
                      border: "1px solid rgba(0,0,0,0.08)",
                      flex: "0 0 auto",
                    }}
                  >
                    {p.foto ? (
                      <img
                        src={p.foto}
                        alt={p.nome}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : null}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 950, fontSize: 18, lineHeight: 1.2 }}>{p.nome}</div>
                        {/* micro-ritocco: underline editoriale */}
                        <div style={{ height: 3, width: 56, background: FP_RED, borderRadius: 999, marginTop: 8 }} />

                        <div className="muted" style={{ marginTop: 8, fontWeight: 900 }}>
                          {p.ruolo}
                        </div>
                      </div>

                      {/* Bottoni contatto */}
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
                        {p.telefono ? (
                          <>
                            <ButtonLink
                              href={waUrl(p.telefono, msg)}
                              variant="whatsapp"
                              icon={<MessageCircle size={18} />}
                              external
                            >
                              WhatsApp
                            </ButtonLink>
                            <ButtonLink href={telUrl(p.telefono)} variant="call" icon={<PhoneCall size={18} />}>
                              Chiama
                            </ButtonLink>
                          </>
                        ) : null}

                        {p.email ? (
                          <ButtonLink
                            href={mailUrl(p.email, "Contatto dal sito FP CGIL Rovigo")}
                            variant="email"
                            icon={<Mail size={18} />}
                          >
                            Email
                          </ButtonLink>
                        ) : null}
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: 12,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 950, marginBottom: 6 }}>Deleghe</div>
                        <div className="muted" style={{ lineHeight: 1.45 }}>
                          {p.deleghe}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontWeight: 950, marginBottom: 6 }}>Settori</div>
                        <div className="muted" style={{ lineHeight: 1.45 }}>
                          {p.settori}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2 className="h2">Nota</h2>
        <div className="muted">I pulsanti WhatsApp aprono una chat con messaggio precompilato (modificabile prima dell’invio).</div>
      </div>
    </div>
  );
}
