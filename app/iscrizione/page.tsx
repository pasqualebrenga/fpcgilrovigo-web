"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MessageCircle, PhoneCall, ArrowRight, RotateCcw, ChevronRight } from "lucide-react";

type ReferenteKey = "mantovan" | "brenga" | "denanni";

type Referente = {
  key: ReferenteKey;
  nome: string;
  ruolo: string;
  telefono: string; // solo cifre, senza spazi
  whatsapp: string; // solo cifre, senza spazi
};

type SceltaStep1 =
  | "sanita_pubblica"
  | "dirigenza_sanitaria"
  | "sanita_privata"
  | "funzioni_centrali"
  | "igiene_ambientale"
  | "ipab_socio_sanitario"
  | "enti_locali"
  | "non_so";

type SceltaEntiLocali = "rovigo" | "adria" | "altro";

const FP_RED = "#d40000";
const WA_GREEN = "#25D366";

const REFERENTI: Record<ReferenteKey, Referente> = {
  mantovan: {
    key: "mantovan",
    nome: "Riccardo Mantovan",
    ruolo: "Segretario Generale",
    telefono: "3428004474",
    whatsapp: "3428004474",
  },
  brenga: {
    key: "brenga",
    nome: "Pasquale Brenga",
    ruolo: "Segretario Organizzativo",
    telefono: "3405614635",
    whatsapp: "3405614635",
  },
  denanni: {
    key: "denanni",
    nome: "Roberta Denanni",
    ruolo: "Segretario",
    telefono: "3450623870",
    whatsapp: "3450623870",
  },
};

function waUrl(numero: string, text: string) {
  const msg = encodeURIComponent(text);
  return `https://wa.me/39${numero}?text=${msg}`;
}

function telUrl(numero: string) {
  return `tel:+39${numero}`;
}

function labelStep1(v: SceltaStep1) {
  switch (v) {
    case "sanita_pubblica":
      return "Sanità pubblica (ULSS, ospedale, distretti)";
    case "dirigenza_sanitaria":
      return "Dirigenza sanitaria / medica";
    case "sanita_privata":
      return "Sanità privata / case di cura";
    case "funzioni_centrali":
      return "Funzioni centrali (INPS, Agenzia Entrate, Ministeri, ACI…)";
    case "igiene_ambientale":
      return "Igiene ambientale";
    case "ipab_socio_sanitario":
      return "IPAB / socio-sanitario / case di riposo";
    case "enti_locali":
      return "Enti locali (Comuni, Provincia, altri enti)";
    case "non_so":
      return "Non so / voglio essere indirizzato";
  }
}

function resolveReferente(step1?: SceltaStep1, enti?: SceltaEntiLocali): ReferenteKey | null {
  if (!step1) return null;

  if (step1 === "enti_locali") {
    if (!enti) return null;
    if (enti === "rovigo" || enti === "adria") return "mantovan";
    return "brenga";
  }

  if (step1 === "igiene_ambientale" || step1 === "ipab_socio_sanitario") return "denanni";
  if (step1 === "sanita_pubblica" || step1 === "funzioni_centrali") return "mantovan";
  if (step1 === "dirigenza_sanitaria" || step1 === "sanita_privata" || step1 === "non_so") return "brenga";

  return "brenga";
}

function buildMessage(step1?: SceltaStep1, enti?: SceltaEntiLocali) {
  const base = "Ciao, arrivo dal sito FP CGIL Rovigo.";

  if (!step1) return `${base}
Vorrei informazioni per ISCRIZIONE. Grazie.`;

  if (step1 === "non_so") {
    return `${base}
Ho bisogno di essere indirizzato per l’iscrizione / informazioni. Grazie.`;
  }

  const area = labelStep1(step1);

  if (step1 === "enti_locali") {
    const ente =
      enti === "rovigo"
        ? "Comune di Rovigo"
        : enti === "adria"
          ? "Comune di Adria"
          : enti === "altro"
            ? "Altro Comune / ente locale"
            : "";

    return `${base}
Vorrei informazioni per ISCRIZIONE.
Area: ${area}.
Ente: ${ente}.
Grazie.`;
  }

  return `${base}
Vorrei informazioni per ISCRIZIONE.
Area: ${area}.
Grazie.`;
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

function PrimaryButton({
  children,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="btn"
      onClick={onClick}
      style={{
        background: FP_RED,
        borderColor: FP_RED,
        color: "#fff",
        fontWeight: 950,
        borderRadius: 999,
        padding: "12px 16px",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {icon}
      {children}
      <ArrowRight size={18} />
    </button>
  );
}

function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      className="btn"
      onClick={onClick}
      style={{
        borderRadius: 999,
        padding: "10px 14px",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
    </button>
  );
}

function ButtonLink({
  href,
  children,
  icon,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "whatsapp" | "call" | "default";
}) {
  const styleBase: React.CSSProperties = {
    borderRadius: 999,
    padding: "12px 16px",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 950,
  };

  const style =
    variant === "whatsapp"
      ? ({ ...styleBase, background: WA_GREEN, borderColor: WA_GREEN, color: "#fff" } as const)
      : variant === "call"
        ? ({ ...styleBase, background: "rgba(212,0,0,0.08)", borderColor: "rgba(212,0,0,0.25)", color: "#111" } as const)
        : ({ ...styleBase } as const);

  return (
    <a className="btn" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} style={style}>
      {icon}
      {children}
      <ChevronRight size={18} />
    </a>
  );
}

function ChoiceCard({
  title,
  subtitle,
  onClick,
  selected,
}: {
  title: string;
  subtitle?: string;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        width: "100%",
        borderRadius: 14,
        border: selected ? `2px solid ${FP_RED}` : "1px solid rgba(0,0,0,0.10)",
        background: "#fff",
        padding: 14,
        cursor: "pointer",
        transition: "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
        boxShadow: selected ? "0 6px 18px rgba(0,0,0,0.08)" : "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = selected ? "0 6px 18px rgba(0,0,0,0.08)" : "none";
      }}
    >
      <div style={{ fontWeight: 950, fontSize: 16, lineHeight: 1.2 }}>{title}</div>
      {subtitle ? (
        <div className="muted" style={{ marginTop: 6 }}>
          {subtitle}
        </div>
      ) : null}
    </button>
  );
}

export default function IscrizionePage() {
  const [started, setStarted] = useState(false);
  const [step1, setStep1] = useState<SceltaStep1 | null>(null);
  const [enti, setEnti] = useState<SceltaEntiLocali | null>(null);

  const referenteKey = useMemo(() => resolveReferente(step1 ?? undefined, enti ?? undefined), [step1, enti]);
  const referente = referenteKey ? REFERENTI[referenteKey] : null;

  const message = useMemo(() => buildMessage(step1 ?? undefined, enti ?? undefined), [step1, enti]);

  const waLink = referente ? waUrl(referente.whatsapp, message) : "#";
  const telLink = referente ? telUrl(referente.telefono) : "#";

  function reset() {
    setStarted(false);
    setStep1(null);
    setEnti(null);
  }

  function backToStep1() {
    setStep1(null);
    setEnti(null);
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Intro */}
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
          <Pill>Iscrizione</Pill>
          <div className="muted" style={{ fontWeight: 900 }}>
            In 30 secondi
          </div>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.4, lineHeight: 1.05, margin: "10px 0 0" }}>
          Iscriviti alla FP CGIL Rovigo
        </h1>

        <div style={{ marginTop: 10, color: "rgba(0,0,0,0.75)", lineHeight: 1.45, fontSize: 15 }}>
          Rispondi a due domande e ti mettiamo in contatto su WhatsApp con il referente giusto.
        </div>

        <div className="muted" style={{ marginTop: 10 }}>
          Nota: non inserire dati sensibili. Il messaggio su WhatsApp è precompilato e puoi modificarlo prima di inviare.
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {!started ? (
            <PrimaryButton onClick={() => setStarted(true)} icon={<MessageCircle size={18} />}>
              Inizia
            </PrimaryButton>
          ) : (
            <GhostButton onClick={reset}>
              <RotateCcw size={18} />
              Ricomincia
            </GhostButton>
          )}

          <Link className="btn" href="/contatti" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Contatti
          </Link>
        </div>
      </div>

      {/* Stepper */}
      {started ? (
        <div className="card">
          {/* STEP 1 */}
          {!step1 ? (
            <>
              <h2 className="h2" style={{ marginTop: 0 }}>
                1) In quale area rientra la tua richiesta?
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <ChoiceCard title="Sanità pubblica" subtitle="ULSS, ospedale, distretti" onClick={() => setStep1("sanita_pubblica")} />
                <ChoiceCard title="Dirigenza sanitaria / medica" onClick={() => setStep1("dirigenza_sanitaria")} />
                <ChoiceCard title="Sanità privata / case di cura" onClick={() => setStep1("sanita_privata")} />
                <ChoiceCard title="Funzioni centrali" subtitle="INPS, Agenzia Entrate, Ministeri, ACI…" onClick={() => setStep1("funzioni_centrali")} />
                <ChoiceCard title="Igiene ambientale" onClick={() => setStep1("igiene_ambientale")} />
                <ChoiceCard title="IPAB / socio-sanitario" subtitle="Case di riposo, servizi, cooperative" onClick={() => setStep1("ipab_socio_sanitario")} />
                <ChoiceCard title="Enti locali" subtitle="Comuni, Provincia, altri enti" onClick={() => setStep1("enti_locali")} />
                <ChoiceCard title="Non so" subtitle="Voglio essere indirizzato" onClick={() => setStep1("non_so")} />
              </div>
            </>
          ) : null}

          {/* STEP 2 (solo Enti locali) */}
          {step1 === "enti_locali" && !enti ? (
            <>
              <div className="muted" style={{ fontWeight: 900 }}>
                Area selezionata: {labelStep1(step1)}
              </div>
              <h2 className="h2" style={{ marginTop: 10 }}>
                2) In quale ente lavori?
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <ChoiceCard title="Comune di Rovigo" onClick={() => setEnti("rovigo")} />
                <ChoiceCard title="Comune di Adria" onClick={() => setEnti("adria")} />
                <ChoiceCard title="Altro Comune / altro ente locale" onClick={() => setEnti("altro")} />
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <GhostButton onClick={backToStep1}>Indietro</GhostButton>
              </div>
            </>
          ) : null}

          {/* RISULTATO */}
          {step1 && (step1 !== "enti_locali" || Boolean(enti)) ? (
            <>
              <div className="muted" style={{ fontWeight: 900 }}>
                Area selezionata: {labelStep1(step1)}
                {step1 === "enti_locali" && enti ? (
                  <> — Ente: {enti === "rovigo" ? "Comune di Rovigo" : enti === "adria" ? "Comune di Adria" : "Altro Comune / ente locale"}</>
                ) : null}
              </div>

              <h2 className="h2" style={{ marginTop: 10 }}>
                Perfetto. Ti mettiamo in contatto con:
              </h2>

              {referente ? (
                <div
                  style={{
                    borderRadius: 16,
                    border: "1px solid rgba(0,0,0,0.10)",
                    background: "#fff",
                    padding: 14,
                    marginTop: 12,
                  }}
                >
                  <div style={{ fontWeight: 950, fontSize: 18 }}>{referente.nome}</div>
                  <div className="muted" style={{ marginTop: 4 }}>
                    {referente.ruolo}
                  </div>

                  <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <ButtonLink href={waLink} variant="whatsapp" icon={<MessageCircle size={18} />}>
                      Apri WhatsApp
                    </ButtonLink>
                    <ButtonLink href={telLink} variant="call" icon={<PhoneCall size={18} />}>
                      Chiama
                    </ButtonLink>
                    <GhostButton onClick={backToStep1}>Cambia scelta</GhostButton>
                  </div>

                  <div className="muted" style={{ marginTop: 12 }}>
                    Messaggio precompilato:
                    <div
                      style={{
                        marginTop: 8,
                        whiteSpace: "pre-wrap",
                        padding: 12,
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.10)",
                        background: "#fafafa",
                      }}
                    >
                      {message}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="muted" style={{ marginTop: 12 }}>
                  Non riesco a determinare il referente. Premi “Cambia scelta” e riprova.
                </div>
              )}

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="btn" href="/contatti" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
                  Contatti
                </Link>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {/* Nota “assicurazione” (soft) */}
      <div className="card">
        <h2 className="h2">Vantaggi e tutele</h2>
        <div className="muted">
          Tra i vantaggi collegati all’iscrizione possono esserci servizi e coperture (dove previsti). Per condizioni e
          modalità fa sempre fede la documentazione ufficiale.
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/convenzioni" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Convenzioni
          </Link>
          <Link className="btn" href="/contatti" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Contatti
          </Link>
        </div>
      </div>
    </div>
  );
}
