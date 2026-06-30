import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Newspaper,
  PhoneCall,
  Mail,
  ShieldCheck,
  MapPin,
  Sparkles,
  Dot,
  Smartphone,
  HeartPulse,
  Landmark,
} from "lucide-react";
import { getFpHomepageNews, fpSources } from "../lib/fpnews";

// 1 volta al giorno (24h)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "FP CGIL Rovigo - Sindacato pubblico impiego, sanità, enti locali e IPAB",
  description:
    "FP CGIL Rovigo tutela lavoratrici e lavoratori del pubblico impiego a Rovigo e provincia: sanità pubblica e ULSS5, enti locali, IPAB, funzioni centrali, iscrizione, convenzioni e RSU.",
  alternates: {
    canonical: "/",
  },
};

const FP_RED = "#d40000";
const DIGITA_APP_STORE_URL = "https://apps.apple.com/it/app/digita-cgil/id1457216187";
const DIGITA_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=it.digitacgil.app&hl=it";
const DIGITA_SITE_URL = "https://www.digitacgil.it/";

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

function DigitaCgilCard() {
  return (
    <section
      aria-label="DIGITA CGIL"
      style={{
        borderRadius: 14,
        border: "1px solid rgba(212,0,0,0.18)",
        background: "linear-gradient(135deg, rgba(212,0,0,0.08) 0%, #fff 42%, rgba(0,0,0,0.035) 100%)",
        padding: 14,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 14,
        alignItems: "center",
        boxShadow: "0 14px 36px rgba(0,0,0,0.05)",
      }}
    >
      <a
        href={DIGITA_SITE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Apri DIGITA CGIL"
        style={{
          width: 62,
          height: 62,
          borderRadius: 18,
          background: "#d70a2e",
          border: "1px solid rgba(212,0,0,0.22)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 28px rgba(212,0,0,0.16)",
          overflow: "hidden",
        }}
      >
        <Image src="/images/brand/digita-cgil-icon.png" alt="" width={62} height={62} sizes="62px" />
      </a>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Pill>
            <Smartphone size={15} /> App CGIL
          </Pill>
          <span className="muted" style={{ fontSize: 13, fontWeight: 850 }}>
            Tessera e servizi sempre a portata di mano
          </span>
        </div>

        <h2 style={{ margin: "8px 0 0", fontSize: 24, lineHeight: 1.08, letterSpacing: 0, fontWeight: 950 }}>
          Hai già DIGITA CGIL?
        </h2>

        <p style={{ margin: "8px 0 0", color: "rgba(0,0,0,0.72)", lineHeight: 1.45, maxWidth: 900 }}>
          Tessera CGIL, appuntamenti, pratiche, documenti e servizi collegati sempre sul telefono.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 13 }}>
          <a
            className="btn"
            href={DIGITA_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            style={{ borderRadius: 999, padding: "10px 12px", fontWeight: 950, background: "#111", color: "#fff", borderColor: "#111" }}
          >
            App Store <ArrowRight size={17} />
          </a>
          <a
            className="btn"
            href={DIGITA_PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            style={{ borderRadius: 999, padding: "10px 12px", fontWeight: 950, background: FP_RED, color: "#fff", borderColor: FP_RED }}
          >
            Google Play <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function telUrl(numero: string) {
  const digits = numero.replace(/\D/g, "");
  return `tel:${digits}`;
}

function BgImg({ src, alt }: { src?: string; alt: string }) {
  // <img> per evitare blocchi di hostname (come nella pagina news)
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

function HomeNewsHero({ n }: { n: NewsItem }) {
  return (
    <a
      href={n.url}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 18,
        border: "1px solid rgba(0,0,0,0.10)",
        background: "#111",
        minHeight: 240,
        textDecoration: "none",
        color: "white",
        display: "block",
        marginTop: 12,
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.9 }}>
        <BgImg src={n.image} alt={n.title} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.40) 70%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      <div style={{ position: "relative", padding: 18, maxWidth: 920 }}>
        <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <span
            style={{
              background: FP_RED,
              padding: "6px 10px",
              borderRadius: 999,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: 0.4,
              fontSize: 12,
            }}
          >
            Ultima news
          </span>
          {n.date ? <span style={{ opacity: 0.9, fontWeight: 800 }}>{n.date}</span> : null}
        </div>

        <div style={{ fontWeight: 950, fontSize: 24, lineHeight: 1.12 }}>{n.title}</div>

        {n.excerpt ? (
          <div style={{ marginTop: 10, opacity: 0.92, maxWidth: 760, lineHeight: 1.45 }}>
            {n.excerpt}
          </div>
        ) : null}

        <div style={{ marginTop: 14, display: "inline-flex" }}>
          <span className="btn" style={{ background: FP_RED, borderColor: FP_RED, color: "white" }}>
            Leggi su fpcgil.it
          </span>
        </div>
      </div>
    </a>
  );
}

function HomeNewsCard({ n }: { n: NewsItem }) {
  return (
    <a
      href={n.url}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.10)",
        background: "#111",
        minHeight: 170,
        textDecoration: "none",
        color: "white",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.9 }}>
        <BgImg src={n.image} alt={n.title} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      <div style={{ position: "relative", padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              background: "rgba(212,0,0,0.95)",
              color: "white",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: 0.35,
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 999,
            }}
          >
            News
          </span>
          {n.date ? <span style={{ opacity: 0.9, fontWeight: 800 }}>{n.date}</span> : null}
        </div>

        <div style={{ marginTop: 10, fontWeight: 950, fontSize: 16, lineHeight: 1.2 }}>
          {n.title}
        </div>

        <div style={{ marginTop: 12, display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 950 }}>
          Leggi <ArrowRight size={18} />
        </div>
      </div>
    </a>
  );
}

function PracticalSearchSection() {
  const items = [
    {
      title: "Sanità pubblica e ULSS5 Polesana",
      text: "Ospedale, distretti, comparto sanità pubblica e dirigenza medica o sanitaria.",
      href: "/sanita-pubblica-ulss5-rovigo",
      icon: <HeartPulse size={20} />,
    },
    {
      title: "Enti locali e Comuni",
      text: "Comuni della provincia di Rovigo, Provincia, Camera di Commercio, CUR e altri enti.",
      href: "/enti-locali-comuni-rovigo",
      icon: <Building2 size={20} />,
    },
    {
      title: "IPAB e case di riposo",
      text: "Strutture socio-sanitarie, centri servizi anziani, case di riposo e assistenza territoriale.",
      href: "/ipab-case-riposo-rovigo",
      icon: <ShieldCheck size={20} />,
    },
    {
      title: "Funzioni centrali",
      text: "Ministeri, Agenzia delle Entrate, INPS, ACI e uffici pubblici statali.",
      href: "/funzioni-centrali-rovigo",
      icon: <Landmark size={20} />,
    },
  ];

  return (
    <section aria-labelledby="servizi-pratici-fp-cgil-rovigo">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <div>
          <Pill>
            <MapPin size={15} /> Rovigo e provincia
          </Pill>
          <h2 id="servizi-pratici-fp-cgil-rovigo" className="h2" style={{ margin: "10px 0 0" }}>
            Sindacato pubblico impiego a Rovigo
          </h2>
          <p className="muted" style={{ margin: "8px 0 0", lineHeight: 1.5, maxWidth: 820 }}>
            FP CGIL Rovigo segue lavoratrici e lavoratori dei servizi pubblici: sanità, enti locali,
            funzioni centrali, IPAB e socio-sanitario. Se non sai chi contattare, il percorso guidato ti
            indirizza al referente corretto.
          </p>
        </div>

        <Link
          className="btn"
          href="/iscrizione"
          style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 950, background: FP_RED, borderColor: FP_RED, color: "#fff" }}
        >
          Trova il referente <ArrowRight size={18} />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 14,
        }}
      >
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 14,
              background: "#fff",
              padding: 14,
              textDecoration: "none",
              color: "inherit",
              display: "block",
              minHeight: 150,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(212,0,0,0.10)",
                color: FP_RED,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>
            <h3 style={{ margin: "12px 0 0", fontSize: 18, lineHeight: 1.15, fontWeight: 950 }}>{item.title}</h3>
            <p className="muted" style={{ margin: "8px 0 0", lineHeight: 1.45 }}>
              {item.text}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
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

      {/* BANNER FP CGIL */}
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

      <DigitaCgilCard />

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
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,65) 50%, rgba(255,255,255,0) 100%)",
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
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
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
            Per iscrizione e richieste: usa il percorso guidato. In pochi secondi ti indirizziamo al referente corretto.
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

            <Link className="btn" href="/contatti" style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}>
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
              href="https://fpformazione.it/"
              target="_blank"
              rel="noreferrer"
              style={{ borderRadius: 999, padding: "12px 16px", fontWeight: 900 }}
            >
              Formazione
            </a>
          </div>
        </div>
      </div>

      <PracticalSearchSection />

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
                Per iscrizione: usa il percorso guidato → <span style={{ marginLeft: 10, fontWeight: 900 }}>Iscrizione</span>
              </span>
              <span>
                News aggiornate automaticamente da fpcgil.it → <span style={{ marginLeft: 10, fontWeight: 900 }}>News</span>
              </span>
              <span>
                Convenzioni locali + nazionali (PDF) → <span style={{ marginLeft: 10, fontWeight: 900 }}>Convenzioni</span>
              </span>
              <span>
                Per iscrizione: usa il percorso guidato → <span style={{ marginLeft: 10, fontWeight: 900 }}>Iscrizione</span>
              </span>
              <span>
                News aggiornate automaticamente da fpcgil.it → <span style={{ marginLeft: 10, fontWeight: 900 }}>News</span>
              </span>
              <span>
                Convenzioni locali + nazionali (PDF) → <span style={{ marginLeft: 10, fontWeight: 900 }}>Convenzioni</span>
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

        {hero ? <HomeNewsHero n={hero} /> : null}

        {rest.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
              marginTop: 12,
            }}
          >
            {rest.map((n) => (
              <HomeNewsCard key={n.url} n={n} />
            ))}
          </div>
        ) : null}

        {items.length === 0 ? <div className="muted">Nessuna notizia disponibile in questo momento.</div> : null}

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
