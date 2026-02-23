import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Newspaper,
  PhoneCall,
  Mail,
  ShieldCheck,
  MapPin,
  Sparkles,
  Dot,
} from "lucide-react";
import { getFpHomepageNews, fpSources } from "../lib/fpnews";

export const revalidate = 1800;

const FP_RED = "#d40000";

type NewsItem = {
  title: string;
  url: string;
  date?: string;
  excerpt?: string;
  image?: string;
};

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

function ChipLink({
  href,
  children,
  external,
  tone,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{
        borderRadius: 999,
        border: isDark
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(0,0,0,0.10)",
        background: isDark ? "rgba(255,255,255,0.12)" : "#fff",
        color: isDark ? "#fff" : "inherit",
        padding: "10px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontWeight: 950,
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
      className="btn"
    >
      {children}
      <ArrowRight size={18} />
    </a>
  );
}

function telUrl(numero: string) {
  const digits = numero.replace(/\D/g, "");
  return `tel:${digits}`;
}

export default async function HomePage() {
  const items = (await getFpHomepageNews(3)) as NewsItem[];
  const hero = items[0];
  const rest = items.slice(1);

  return (
    <div className="fpHomeGrid">
      <style>{`
        @keyframes fpFloat {
          0% { transform: translate3d(0,0,0); opacity: .85; }
          50% { transform: translate3d(0,-10px,0); opacity: 1; }
          100% { transform: translate3d(0,0,0); opacity: .85; }
        }
        @keyframes fpShine {
          0% { transform: translateX(-40%); opacity: .0; }
          30% { opacity: .45; }
          60% { opacity: .0; }
          100% { transform: translateX(140%); opacity: .0; }
        }
        @keyframes fpMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* BANNER FP CGIL: fascia rossa LARGA COME IL BANNER (no full-bleed), non cliccabile */}
      <section aria-label="FP CGIL — Il sindacato per davvero">
        <div className="fpContainer">
          <div className="fpHomeBannerBar">
            <Image
              src="/images/brand/FP_banner.png"
              alt="FP CGIL — Il sindacato per davvero"
              width={1600}
              height={360}
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* HERO */}
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
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: FP_RED,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(212,0,0,0.06) 0%, rgba(212,0,0,0.00) 42%), linear-gradient(0deg, rgba(0,0,0,0.02), rgba(0,0,0,0.00))",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-40%",
            width: "60%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.65) 50%, rgba(255,255,255,0) 100%)",
            filter: "blur(2px)",
            opacity: 0,
            animation: "fpShine 6.5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: -90,
            top: -90,
            width: 220,
            height: 220,
            borderRadius: 999,
            background: "rgba(212,0,0,0.10)",
            animation: "fpFloat 7s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Pill>
              <Sparkles size={16} /> FP CGIL Rovigo
            </Pill>
            <div className="muted" style={{ fontWeight: 900 }}>
              Si riceve su appuntamento
            </div>
          </div>

          <h1
            style={{
              fontSize: 42,
              fontWeight: 950,
              letterSpacing: -0.7,
              lineHeight: 1.02,
              margin: "10px 0 0",
              maxWidth: 980,
            }}
          >
            Tutele, contrattazione, assistenza.
          </h1>

          <div
            style={{
              marginTop: 10,
              color: "rgba(0,0,0,0.75)",
              lineHeight: 1.45,
              fontSize: 15,
              maxWidth: 860,
            }}
          >
            Per iscrizione e richieste: usa il percorso guidato. In pochi secondi
            ti indirizziamo al referente corretto.
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
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
              }}
            >
              Vai a Iscrizione <ArrowRight size={18} />
            </Link>

            <Link
              className="btn"
              href="/contatti"
              style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}
            >
              Contatti
            </Link>

            <Link
              className="btn"
              href="/convenzioni"
              style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}
            >
              Convenzioni
            </Link>

            <a
              className="btn"
              href="https://formazionepartecipazione.it"
              target="_blank"
              rel="noreferrer"
              style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}
            >
              Formazione
            </a>
          </div>
        </div>
      </div>

      {/* STRISCIA “IN EVIDENZA” */}
      <div
        style={{
          borderRadius: 14,
          border: "1px solid rgba(0,0,0,0.10)",
          background: "#111",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              fontWeight: 950,
              whiteSpace: "nowrap",
            }}
          >
            <Dot size={18} color={FP_RED} /> In evidenza
          </div>

          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                gap: 28,
                whiteSpace: "nowrap",
                animation: "fpMarquee 22s linear infinite",
                opacity: 0.9,
              }}
            >
              <span>
                Per iscrizione: usa il percorso guidato →
                <span style={{ marginLeft: 10, fontWeight: 900 }}>Iscrizione</span>
              </span>
              <span>
                News aggiornate automaticamente da fpcgil.it →
                <span style={{ marginLeft: 10, fontWeight: 900 }}>News</span>
              </span>
              <span>
                Convenzioni locali + nazionali (PDF) →
                <span style={{ marginLeft: 10, fontWeight: 900 }}>Convenzioni</span>
              </span>
              <span>
                Per iscrizione: usa il percorso guidato →
                <span style={{ marginLeft: 10, fontWeight: 900 }}>Iscrizione</span>
              </span>
              <span>
                News aggiornate automaticamente da fpcgil.it →
                <span style={{ marginLeft: 10, fontWeight: 900 }}>News</span>
              </span>
              <span>
                Convenzioni locali + nazionali (PDF) →
                <span style={{ marginLeft: 10, fontWeight: 900 }}>Convenzioni</span>
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <ChipLink href="/news" tone="dark">
              <Newspaper size={18} /> News
            </ChipLink>
          </div>
        </div>
      </div>

      {/* ULTIME NEWS */}
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <h2 className="h2" style={{ marginTop: 0 }}>
            Le nostre news da FpCgil.it
          </h2>
          <a
            className="btn"
            href={fpSources.CATEGORY_URL}
            target="_blank"
            rel="noreferrer"
            style={{ borderRadius: 999, padding: "10px 14px", fontWeight: 900 }}
          >
            Continua su FP nazionale <ArrowRight size={18} />
          </a>
        </div>

        {hero ? (
          <a
            href={hero.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              marginTop: 12,
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "#fff",
              textDecoration: "none",
              color: "inherit",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", padding: 16 }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: FP_RED }} />
              <div style={{ paddingLeft: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 950, fontSize: 18, lineHeight: 1.25 }}>
                    {hero.title}
                  </div>
                  {hero.date ? (
                    <div className="muted" style={{ fontWeight: 900 }}>
                      {hero.date}
                    </div>
                  ) : null}
                </div>
                {hero.excerpt ? (
                  <div className="muted" style={{ marginTop: 10, lineHeight: 1.5 }}>
                    {hero.excerpt}
                  </div>
                ) : null}
                <div style={{ marginTop: 12, display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 950, color: FP_RED }}>
                  Leggi <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </a>
        ) : null}

        <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
          {rest.map((n) => (
            <a
              key={n.url}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              style={{
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.10)",
                background: "#fff",
                padding: 12,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 950, fontSize: 16, lineHeight: 1.25 }}>{n.title}</div>
                {n.date ? (
                  <div className="muted" style={{ fontWeight: 900 }}>
                    {n.date}
                  </div>
                ) : null}
              </div>
              {n.excerpt ? (
                <div className="muted" style={{ marginTop: 8, lineHeight: 1.45 }}>
                  {n.excerpt}
                </div>
              ) : null}
              <div style={{ marginTop: 10, display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 950, color: FP_RED }}>
                Leggi <ArrowRight size={18} />
              </div>
            </a>
          ))}

          {items.length === 0 ? <div className="muted">Nessuna notizia disponibile in questo momento.</div> : null}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            className="btn"
            href="/news"
            style={{
              borderRadius: 999,
              padding: "12px 16px",
              fontWeight: 950,
              background: FP_RED,
              borderColor: FP_RED,
              color: "#fff",
            }}
          >
            Vai alle News <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* CONTATTI RAPIDI */}
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
            <div style={{ fontWeight: 950, fontSize: 18 }}>Contatti rapidi</div>
            <div className="muted" style={{ marginTop: 6, lineHeight: 1.45 }}>
              Via Calatafimi 1/B, 45100 Rovigo — si riceve su appuntamento.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
            <a
              className="btn"
              href={telUrl("0425377311")}
              style={{
                borderRadius: 999,
                padding: "12px 16px",
                fontWeight: 900,
                display: "inline-flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <PhoneCall size={18} /> 0425 377311
            </a>
            <a
              className="btn"
              href="mailto:fp.rovigo@veneto.cgil.it?subject=Contatto%20dal%20sito%20FP%20CGIL%20Rovigo"
              style={{
                borderRadius: 999,
                padding: "12px 16px",
                fontWeight: 900,
                display: "inline-flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Mail size={18} /> Email
            </a>
            <a
              className="btn"
              href="mailto:fp@pec.cgilrovigo.it?subject=PEC%20%E2%80%93%20Contatto%20dal%20sito%20FP%20CGIL%20Rovigo"
              style={{
                borderRadius: 999,
                padding: "12px 16px",
                fontWeight: 900,
                display: "inline-flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <ShieldCheck size={18} /> PEC
            </a>
            <a
              className="btn"
              href="https://www.google.com/maps/search/?api=1&query=Via%20Calatafimi%201%2FB%2045100%20Rovigo"
              target="_blank"
              rel="noreferrer"
              style={{
                borderRadius: 999,
                padding: "12px 16px",
                fontWeight: 900,
                display: "inline-flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <MapPin size={18} /> Mappa
            </a>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Link
            className="btn"
            href="/contatti"
            style={{
              borderRadius: 999,
              padding: "12px 16px",
              fontWeight: 950,
              background: FP_RED,
              borderColor: FP_RED,
              color: "#fff",
            }}
          >
            Vai a Contatti <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}