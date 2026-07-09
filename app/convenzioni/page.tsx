import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, ShieldCheck } from "lucide-react";

const insuranceGroups = [
  {
    label: "Incluse nella tessera FP CGIL",
    tone: "#d40000",
    items: [
      {
        title: "RC Colpa Grave Sanitaria",
        audience: "Comparto pubblico e privato",
        summary:
          "Per personale non dirigente e non medico dei comparti pubblici e privati soggetti alla Legge Gelli.",
        highlight: "Massimale 750.000 euro, retroattività e ultrattività 10 anni.",
        page: "https://www.fpcgil.it/pagina-fpperte/personale-sanitario-pubblico-e-privato/",
        docs: [
          ["Polizza assicurativa", "https://www.fpcgil.it/wp-content/uploads/2026/07/Polizza-Sanitari.pdf"],
          [
            "Manuale procedure sinistri",
            "https://www.fpcgil.it/wp-content/uploads/2026/07/Procedura-Gestione-Sinistri-Colpa-Grave-CGIL-2.pdf",
          ],
          [
            "Volantino polizze incluse",
            "https://www.fpcgil.it/wp-content/uploads/2025/07/FPCGIL-Assicurazioni-per-gli-iscritti.pdf",
          ],
          [
            "Volantino RC sanitaria",
            "https://www.fpcgil.it/wp-content/uploads/2025/07/FPCGIL-Colpa-grave-sanitaria.pdf",
          ],
        ],
      },
      {
        title: "Tutela Legale",
        audience: "Aree dirigenza",
        summary:
          "Per medici, specializzandi, veterinari, dirigenti sanitari e dirigenti della pubblica amministrazione iscritti FP CGIL.",
        highlight: "Anticipo spese legali fino a 50.000 euro per sinistro.",
        page: "https://www.fpcgil.it/pagina-fpperte/tutela-legale/",
        docs: [
          [
            "Volantino tutela legale",
            "https://www.fpcgil.it/wp-content/uploads/2025/07/FPCGIL-Tutela-Legale-gratuita.pdf",
          ],
        ],
      },
      {
        title: "Responsabilità amministrativa e contabile",
        audience: "Comparti pubblici",
        summary:
          "Per personale non dirigente della pubblica amministrazione, con coperture collegate alla responsabilità amministrativa e contabile.",
        highlight: "Massimale 1.500.000 euro, retroattività e ultrattività 10 anni.",
        page: "https://www.fpcgil.it/pagina-fpperte/responsabilita-amministrativa-e-amministrativo-contabile/",
        docs: [
          ["Polizza assicurativa", "https://www.fpcgil.it/wp-content/uploads/2026/07/Polizza-Pubblici.pdf"],
          [
            "Manuale procedure sinistri",
            "https://www.fpcgil.it/wp-content/uploads/2026/07/Procedura-Gestione-Sinistri-Colpa-Grave-CGIL-2.pdf",
          ],
          [
            "Volantino polizze incluse",
            "https://www.fpcgil.it/wp-content/uploads/2025/07/FPCGIL-Assicurazioni-per-gli-iscritti.pdf",
          ],
          [
            "Volantino tecnico-amministrativi",
            "https://www.fpcgil.it/wp-content/uploads/2021/09/FPCGIL-Colpa-grave-Tecnico-Amministrativi.pdf",
          ],
        ],
      },
    ],
  },
  {
    label: "Ad adesione individuale",
    tone: "#d40000",
    items: [
      {
        title: "RC Colpa Grave",
        audience: "Dirigenza FFLL, FFCC e professionisti",
        summary:
          "Soluzione individuale per dirigenti amministrativi, tecnici e area professionisti della pubblica amministrazione.",
        highlight: "Massimali personalizzabili da 500.000 a 5.000.000 euro.",
        page: "https://www.fpcgil.it/pagina-fpperte/sei-un-dirigente-della-pa-area-funzioni-locali-e-funzioni-centrali/",
        docs: [
          [
            "Volantino dirigenti PA",
            "https://www.fpcgil.it/wp-content/uploads/2025/11/Fp-Assicurazione-Colpa-Grave-Dirigenti-PA.pdf",
          ],
        ],
      },
      {
        title: "RC Colpa Grave + Responsabilità Patrimoniale",
        audience: "Medici e dirigenti SSN pubblici e privati",
        summary:
          "Per medici, specializzandi, veterinari, dirigenti sanitari e professioni sanitarie, anche convenzionati.",
        highlight: "Massimale 1.000.000 euro con possibilità di personalizzazione.",
        page: "https://www.fpcgil.it/pagina-fpperte/sei-un-medico-della-sanita-pubblica-o-privata-o-un-dirigente-del-ssn-iscritto-alla-fp-cgil/",
        docs: [
          [
            "Volantino nazionale",
            "https://www.fpcgil.it/wp-content/uploads/2017/05/IALE_Pagina_1.png",
          ],
        ],
      },
      {
        title: "Tutela Legale",
        audience: "Comparti pubblici",
        summary:
          "Polizza individuale per dipendenti pubblici: procedimenti davanti alla Corte dei Conti e, nell'opzione completa, procedimenti penali.",
        highlight: "Massimali da 25.000 a 100.000 euro.",
        page: "https://www.fpcgil.it/pagina-fpperte/prodotti-a-integrazione/",
        docs: [
          [
            "Volantino tutela legale dipendenti pubblici",
            "https://www.fpcgil.it/wp-content/uploads/2021/09/Tutela_Legale-dipendenti-pubblici.pdf",
          ],
        ],
      },
    ],
  },
];

export default function ConvenzioniIndexPage() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {/* Intro stile “FP” */}
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
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "#d40000" }} />

        <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <span
            style={{
              background: "rgba(212, 0, 0, 0.10)",
              color: "#d40000",
              border: "1px solid rgba(212, 0, 0, 0.25)",
              padding: "6px 10px",
              borderRadius: 999,
              fontWeight: 950,
              textTransform: "uppercase",
              letterSpacing: 0.3,
              fontSize: 12,
            }}
          >
            Convenzioni
          </span>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 950, letterSpacing: -0.4, lineHeight: 1.05, margin: 0 }}>
          Vantaggi per iscritte e iscritti
        </h1>

        <div style={{ marginTop: 10, color: "rgba(0,0,0,0.70)", lineHeight: 1.45, fontSize: 15 }}>
          Qui trovi sia le convenzioni locali (Rovigo e provincia) sia quelle nazionali. In molte realtà sindacali i
          vantaggi collegati all’iscrizione includono anche coperture e servizi assicurativi (dove previsti): per i
          dettagli fa sempre fede la documentazione ufficiale.
        </div>
      </div>

      {/* Scelte */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        <Link
          href="/convenzioni/locali"
          style={{
            textDecoration: "none",
            color: "inherit",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 16 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  background: "rgba(212,0,0,0.95)",
                  color: "#fff",
                  fontWeight: 950,
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                  fontSize: 12,
                  padding: "7px 10px",
                  borderRadius: 999,
                }}
              >
                Locali
              </span>
            </div>

            <div style={{ fontWeight: 950, fontSize: 20, lineHeight: 1.2 }}>
              Convenzioni di Rovigo e provincia
            </div>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.70)", lineHeight: 1.45 }}>
              Strutture, servizi e attività convenzionate sul territorio. Con mappe e indicazioni rapide.
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="btn" style={{ background: "#d40000", borderColor: "#d40000", color: "#fff" }}>
                Vai alle convenzioni locali
              </span>
            </div>
          </div>
        </Link>

        <Link
          href="/convenzioni/nazionali"
          style={{
            textDecoration: "none",
            color: "inherit",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 16 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
          style={{
                  background: "rgba(212,0,0,0.95)",
                  color: "#fff",
                  fontWeight: 950,
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                  fontSize: 12,
                  padding: "7px 10px",
                  borderRadius: 999,
                }}
              >
                Nazionali
              </span>
            </div>

            <div style={{ fontWeight: 950, fontSize: 20, lineHeight: 1.2 }}>Convenzioni nazionali</div>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.70)", lineHeight: 1.45 }}>
              Elenco completo in PDF. 
              Apri o scarica il documento ufficiale.
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="btn" style={{ background: "#d40000", borderColor: "#d40000", color: "#fff" }}>
                Vai alle convenzioni nazionali
              </span>
            </div>
          </div>
        </Link>
      </div>

      <section
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(212,0,0,0.16)",
          background:
            "linear-gradient(135deg, rgba(212,0,0,0.96) 0%, rgba(179,0,0,0.96) 42%, rgba(12,12,12,0.98) 100%)",
          color: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 3px, transparent 3px, transparent 10px)",
            opacity: 0.55,
          }}
        />
        <div
          className="insuranceHeroGrid"
          style={{
            position: "relative",
            padding: 22,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 18,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid rgba(255,255,255,0.28)",
                background: "rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "8px 12px",
                fontWeight: 950,
                textTransform: "uppercase",
                fontSize: 12,
              }}
            >
              <ShieldCheck size={16} />
              Assicurazioni FP per te
            </div>
            <h2 style={{ fontSize: 34, lineHeight: 1.02, margin: "14px 0 0", fontWeight: 950 }}>
              Tutele assicurative per chi lavora nei servizi pubblici.
            </h2>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 16,
              minWidth: 170,
              display: "grid",
              justifyItems: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.24)",
            }}
          >
            <Image
              src="/images/brand/fp-per-te.png"
              alt="FP per te"
              width={100}
              height={51}
              style={{ width: 120, height: "auto" }}
            />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .insuranceHeroGrid {
            grid-template-columns: 1fr !important;
          }
        }
        .insuranceDocLink:hover {
          border-color: rgba(212,0,0,0.35) !important;
          background: rgba(212,0,0,0.06) !important;
        }
      `}</style>

      <section
        style={{
          display: "grid",
          gap: 14,
        }}
      >
        {insuranceGroups.map((group) => (
          <div key={group.label} className="card" style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              <div>
                <div
                  style={{
                    color: group.tone,
                    textTransform: "uppercase",
                    fontWeight: 950,
                    fontSize: 13,
                    letterSpacing: 0.3,
                  }}
                >
                  {group.label}
                </div>
                <h2 className="h2" style={{ marginTop: 4 }}>
                  {group.label === "Incluse nella tessera FP CGIL"
                    ? "Coperture già collegate all'iscrizione"
                    : "Coperture integrative attivabili su richiesta"}
                </h2>
              </div>
              <a
                className="btn"
                href="https://www.fpcgil.it/categoria-fpperte/assicurazioni/"
                target="_blank"
                rel="noreferrer"
              >
                Pagina nazionale <ExternalLink size={16} />
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
              {group.items.map((item) => (
                <article
                  key={item.title}
                  style={{
                    border: "1px solid rgba(0,0,0,0.10)",
                    borderRadius: 12,
                    padding: 14,
                    background: "#fff",
                    display: "grid",
                    gap: 10,
                    alignContent: "start",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      color: group.tone,
                      fontWeight: 950,
                      fontSize: 13,
                    }}
                  >
                    <FileText size={17} />
                    {item.audience}
                  </div>
                  <div style={{ fontSize: 21, lineHeight: 1.12, fontWeight: 950 }}>{item.title}</div>
                  <div className="muted" style={{ lineHeight: 1.42 }}>
                    {item.summary}
                  </div>
                  <div
                    style={{
                      borderLeft: `4px solid ${group.tone}`,
                      padding: "8px 10px",
                      background: "rgba(212,0,0,0.06)",
                      borderRadius: 8,
                      fontWeight: 850,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.highlight}
                  </div>

                  <div style={{ display: "grid", gap: 7, marginTop: 2 }}>
                    {item.docs.map(([label, href]) => (
                      <a
                        key={href + label}
                        className="insuranceDocLink"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                          textDecoration: "none",
                          color: "inherit",
                          border: "1px solid rgba(0,0,0,0.08)",
                          borderRadius: 10,
                          padding: "9px 10px",
                          fontWeight: 850,
                          background: "rgba(0,0,0,0.02)",
                        }}
                      >
                        <span>{label}</span>
                        <ExternalLink size={15} />
                      </a>
                    ))}
                  </div>

                  <a
                    href={item.page}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      color: group.tone,
                      fontWeight: 950,
                      textDecoration: "none",
                      marginTop: 2,
                    }}
                  >
                    Scheda completa FP nazionale <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="card">
        <h2 className="h2">Hai bisogno di chiarimenti?</h2>
        <div className="muted">
          Scrivici o chiamaci: ti aiutiamo a capire quale copertura riguarda il tuo profilo e dove trovare la
          documentazione ufficiale aggiornata.
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/contatti">
            Contatti
          </Link>
        </div>
      </div>
    </div>
  );
}
