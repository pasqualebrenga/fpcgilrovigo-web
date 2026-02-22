import Link from "next/link";
import { getFpHomepageNews, fpSources } from "../../lib/fpnews";

export const revalidate = 1800;

function safeDate(d?: string) {
  return d ? d : "";
}

function Img({ src, alt }: { src?: string; alt: string }) {
  // Usiamo <img> (non next/image) per evitare blocchi di hostname.
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

function NewsCard({
  n,
  height = 160,
}: {
  n: { title: string; url: string; date?: string; excerpt?: string; image?: string };
  height?: number;
}) {
  return (
    <a
      href={n.url}
      target="_blank"
      rel="noreferrer"
      style={{
        textDecoration: "none",
        color: "inherit",
        borderRadius: 18,
        border: "1px solid rgba(0,0,0,0.10)",
        overflow: "hidden",
        background: "white",
      }}
    >
      <div style={{ position: "relative", height, background: "#f2f2f2" }}>
        <Img src={n.image} alt={n.title} />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            background: "rgba(212,0,0,0.95)",
            color: "white",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 0.4,
            fontSize: 12,
            padding: "8px 10px",
          }}
        >
          News
        </div>
      </div>

      <div style={{ padding: 12 }}>
        {n.date ? (
          <div className="muted" style={{ fontWeight: 900, marginBottom: 6 }}>
            {safeDate(n.date)}
          </div>
        ) : null}

        <div style={{ fontWeight: 950, fontSize: 18, lineHeight: 1.2 }}>{n.title}</div>

        {n.excerpt ? <div className="muted" style={{ marginTop: 8 }}>{n.excerpt}</div> : null}

        <div style={{ marginTop: 12 }}>
          <span className="btn">Apri</span>
        </div>
      </div>
    </a>
  );
}

export default async function NewsPage() {
  // prendiamo un po' di margine e poi scegliamo cosa mostrare
  const items = await getFpHomepageNews(18);

  const hero = items[0];
  const secondary = items.slice(1, 3); // almeno 2
  const rest = items.slice(3);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="card">
        <h1 className="h1" style={{ marginBottom: 6 }}>
          Le nostre news da FpCgil.it
        </h1>
        <div className="muted">
          Questa sezione si aggiorna automaticamente: selezioniamo le notizie “In Evidenza” dal portale FP CGIL nazionale e rimandiamo sempre alla fonte ufficiale.
        </div>
       
      </div>

      {/* HERO */}
      {hero ? (
        <a
          href={hero.url}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 18,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#111",
            minHeight: 260,
            textDecoration: "none",
            color: "white",
          }}
        >
          <div style={{ position: "absolute", inset: 0, opacity: 0.88 }}>
            <Img src={hero.image} alt={hero.title} />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          <div style={{ position: "relative", padding: 18, maxWidth: 860 }}>
            <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <span
                style={{
                  background: "#d40000",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                  fontSize: 12,
                }}
              >
                In evidenza
              </span>
              {hero.date ? <span style={{ opacity: 0.9, fontWeight: 800 }}>{safeDate(hero.date)}</span> : null}
            </div>

            <div style={{ fontWeight: 950, fontSize: 26, lineHeight: 1.12 }}>{hero.title}</div>

            {hero.excerpt ? (
              <div style={{ marginTop: 10, opacity: 0.92, maxWidth: 760 }}>{hero.excerpt}</div>
            ) : null}

            <div style={{ marginTop: 14, display: "inline-flex" }}>
              <span className="btn" style={{ background: "#d40000", borderColor: "#d40000", color: "white" }}>
                Leggi su fpcgil.it
              </span>
            </div>
          </div>
        </a>
      ) : null}

      {/* SECONDARY (almeno 2, se disponibili) */}
      {secondary.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
          }}
        >
          {secondary.map((n) => (
            <NewsCard key={n.url} n={n} height={180} />
          ))}
        </div>
      ) : null}

      {/* REST GRID */}
      {rest.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
          }}
        >
          {rest.map((n) => (
            <NewsCard key={n.url} n={n} />
          ))}
        </div>
      ) : null}

      {/* CTA forte */}
      <div className="card">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <a
            className="btn"
            href={fpSources.CATEGORY_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#d40000",
              borderColor: "#d40000",
              color: "white",
              fontWeight: 950,
              padding: "12px 16px",
              borderRadius: 999,
            }}
          >
            Continua sul sito FP
          </a>
          <Link className="btn" href="/contatti">
            Contatti
          </Link>
        </div>
        <div className="muted" style={{ marginTop: 10 }}>
          FpCgil.it Tutti i diritti riservati. 
        </div>
      </div>
    </div>
  );
}
