"use client";
import Link from "next/link";

import { ArrowRight, MapPin, PhoneCall, Globe, BadgePercent } from "lucide-react";

const FP_RED = "#d40000";

type Conv = {
  name: string;
  offer: string;
  note?: string;
  phone?: string; // solo cifre
  website?: string;
  mapsQuery: string;
  image: string; // path da /public
};

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function telUrl(numero: string) {
  const digits = numero.replace(/\D/g, "");
  return `tel:+39${digits}`;
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

function Btn({
  href,
  children,
  icon,
  variant,
  external,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  variant?: "primary" | "soft" | "dark";
  external?: boolean;
}) {
  const base: React.CSSProperties = {
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 950,
    display: "inline-flex",
    gap: 10,
    alignItems: "center",
    textDecoration: "none",
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#fff",
    color: "inherit",
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? { ...base, background: FP_RED, borderColor: FP_RED, color: "#fff" }
      : variant === "dark"
        ? { ...base, background: "#111", borderColor: "#111", color: "#fff" }
        : { ...base, background: "rgba(212,0,0,0.06)", borderColor: "rgba(212,0,0,0.18)" };

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} style={style} className="btn">
      {icon}
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

const CONVENZIONI: Conv[] = [
  {
    name: "Happy Days – Rosolina Mare",
    offer:
      "Ombrellone e due lettini a €15,00 dal lunedì al sabato (solo sabato su prenotazione), escluso il periodo 2–24 agosto. 2 caffè di benvenuto in omaggio.",
    mapsQuery: "Happy Days Rosolina Mare",
    image: "/images/convenzioni/happy-days-rosolina-mare.jpg",
  },
  {
    name: "Racconti di Cucina",
    offer:
      "10% di sconto a cena dal giovedì alla domenica (escluso il sabato). Pranzi aziendali su richiesta (minimo 30 persone). Chiuso martedì e mercoledì.",
    mapsQuery: "Racconti di Cucina Rovigo",
    image: "/images/convenzioni/racconti-di-cucina.jpg",
  },
  {
    name: "Scano Palo – Ristobeach",
    offer:
      "Sconti settimanali: 30% lun–ven su lettino e/o ombrellone, 10% sabato e domenica. Abbonamenti: stagionale (lun–ven) 1 ombrellone + 1 lettino €300; mensile (lun–ven) €100.",
    mapsQuery: "Scano Palo Ristobeach",
    image: "/images/convenzioni/scano-palo-ristobeach.jpg",
  },
  {
    name: "Borgo Levante – Camere",
    offer:
      "Sconto 15% dal lunedì al venerdì (minimo 2 notti). Sconto 10% dal sabato alla domenica (minimo 2 notti).",
    mapsQuery: "Borgo Levante Camere",
    image: "/images/convenzioni/borgo-levante-camere.jpg",
  },
  {
    name: "Casetta Rossoblu",
    offer: "Sconto del 10% sul menù cena tutte le sere.",
    mapsQuery: "Casetta Rossoblu",
    image: "/images/convenzioni/casetta-rossoblu.jpg",
  },
  {
    name: "Ideacasin SRL",
    offer: "Sconto del 20% su progettazione ed acquisto arredi per interni ed esterni.",
    mapsQuery: "Ideacasin srl Rovigo",
    image: "/images/convenzioni/ideacasin-srl.jpg",
  },
  {
    name: "Sin-E'",
    offer: "Con consumazione minima di €15,00: un caffè ed un amaro gratuiti.",
    mapsQuery: "Sin-E Rovigo",
    image: "/images/convenzioni/sin-e.jpg",
  },
  {
    name: "Nossolar – Centro per la Persona",
    offer: "Sconto del 15% su benessere, yoga e trattamenti individuali (shiatsu e consulenze psico-educative).",
    mapsQuery: "Nossolar Centro per la Persona Rovigo",
    image: "/images/convenzioni/Nossolar-centro-per-la-persona.jpg",
  },
  {
    name: "Studio Psicologia Tozzi",
    offer: "Sconto del 10% per colloqui di sostegno e supporto psicologico.",
    mapsQuery: "Studio Psicologia Tozzi Rovigo",
    image: "/images/convenzioni/studio-psicologia-tozzi.jpg",
  },
  {
    name: "Black Art Tattoo Shop",
    offer: "Con spesa minima di €150,00 per tatuaggio: sconto pari a €40,00.",
    mapsQuery: "Black Art Tattoo Shop Rovigo",
    image: "/images/convenzioni/black-art-tattoo-shop.jpg",
  },
  {
    name: "Massaggi Olistici",
    offer: "Sconto del 20% su tutti i massaggi da minimo 60 minuti. Prenotazione richiesta.",
    note: "Info e prenotazioni: Mirka Doati",
    phone: "3779952679",
    mapsQuery: "Massaggi olistici Mirka Doati",
    image: "/images/convenzioni/massaggi-olistici.jpg",
  },
  {
    name: "Studio Dentistico Guido Crepaldi",
    offer: "Sconto del 20% su ogni prestazione odontoiatrica.",
    mapsQuery: "Studio Dentistico Guido Crepaldi",
    image: "/images/convenzioni/studio-dentistico-guido-crepaldi.jpg",
  },
  {
    name: "Tavernetta Dante",
    offer: "Sconto del 10% sul totale per i servizi di ristorazione.",
    mapsQuery: "Tavernetta Dante Rovigo",
    image: "/images/convenzioni/tavernetta-dante.jpg",
  },
  {
    name: "Studio Dentistico Quadretti",
    offer: "Sconto del 10% su implantologia. Sconto del 20% su protesica.",
    mapsQuery: "Studio Dentistico Quadretti",
    image: "/images/convenzioni/studio-dentistico-quadretti.jpg",
  },
];

export default function ConvenzioniLocaliPage() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <style>{`
        .fpCard {
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        .fpCard:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        }
      `}</style>

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
          <Pill>
            <BadgePercent size={16} /> Convenzioni
          </Pill>
          <div className="muted" style={{ fontWeight: 900 }}>
            Locali e nazionali
          </div>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.4, lineHeight: 1.05, margin: "10px 0 0" }}>
          Convenzioni locali
        </h1>

        <div style={{ marginTop: 10, color: "rgba(0,0,0,0.75)", lineHeight: 1.45, fontSize: 15, maxWidth: 980 }}>
          Qui trovi le convenzioni attive sul territorio. Per le convenzioni nazionali (assicurazioni e altre iniziative),
          vai alla sezione dedicata.
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            className="btn"
            href="/convenzioni"
            style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 950, background: FP_RED, borderColor: FP_RED, color: "#fff" }}
          >
            Vai a Convenzioni <ArrowRight size={18} />
          </Link>
          <Link className="btn" href="/convenzioni/nazionali" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Convenzioni nazionali
          </Link>
        </div>
      </div>

      {/* Lista */}
      <div style={{ display: "grid", gap: 12, maxWidth: 980, margin: "0 auto" }}>
        {CONVENZIONI.map((c) => (
          <div
            key={c.name}
            className="fpCard"
            style={{
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "#fff",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {/* Immagine */}
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "#f2f2f2",
                    border: "1px solid rgba(0,0,0,0.08)",
                    flex: "0 0 auto",
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      // fallback semplice se manca il file
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontWeight: 950, fontSize: 18, lineHeight: 1.2 }}>{c.name}</div>
                      <div style={{ height: 3, width: 56, background: FP_RED, borderRadius: 999, marginTop: 8 }} />
                    </div>
                  </div>

                  <div className="muted" style={{ marginTop: 10, lineHeight: 1.5 }}>
                    {c.offer}
                  </div>

                  {c.note ? (
                    <div className="muted" style={{ marginTop: 8, fontWeight: 900 }}>
                      {c.note}
                    </div>
                  ) : null}

                  <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Btn href={mapsUrl(c.mapsQuery)} icon={<MapPin size={18} />} variant="primary" external>
                      Apri mappa
                    </Btn>

                    {c.website ? (
                      <Btn href={c.website} icon={<Globe size={18} />} variant="soft" external>
                        Sito
                      </Btn>
                    ) : null}

                    {c.phone ? (
                      <Btn href={telUrl(c.phone)} icon={<PhoneCall size={18} />} variant="dark">
                        Chiama
                      </Btn>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="card">
        <h2 className="h2" style={{ marginTop: 0 }}>
          Nota
        </h2>
        <div className="muted" style={{ lineHeight: 1.5 }}>
          Le convenzioni sono riservate agli iscritti. Per informazioni o chiarimenti, contattaci oppure avvia il percorso
          di iscrizione.
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            className="btn"
            href="/iscrizione"
            style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 950, background: FP_RED, borderColor: FP_RED, color: "#fff" }}
          >
            Vai a Iscrizione <ArrowRight size={18} />
          </Link>
          <Link className="btn" href="/contatti" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
            Contatti
          </Link>
        </div>
      </div>
    </div>
  );
}
