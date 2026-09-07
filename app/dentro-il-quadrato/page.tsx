import Image from "next/image";
import Link from "next/link";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dentro il Quadrato",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://www.fpcgilrovigo.it/dentro-il-quadrato",
  description:
    "Calcolatori lordi orientativi per aumenti, arretrati, indennità, differenziali e straordinari dei CCNL pubblici 2025-2027.",
  provider: {
    "@type": "Organization",
    name: "FP CGIL Rovigo",
    url: "https://www.fpcgilrovigo.it",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  hasPart: [
    {
      "@type": "WebApplication",
      name: "Calcolatore Funzioni Locali CCNL 2025-2027",
      url: "https://www.fpcgilrovigo.it/dentro-il-quadrato/funzioni-locali",
      description: "Calcolo aumenti, arretrati, indennità di comparto, differenziali e straordinari per Enti Locali.",
    },
    {
      "@type": "WebApplication",
      name: "Calcolatore Sanità Pubblica CCNL 2025-2027",
      url: "https://www.fpcgilrovigo.it/dentro-il-quadrato/sanita-pubblica",
      description: "Calcolo aumenti, arretrati, indennità specifiche, DEP e straordinari per Sanità pubblica.",
    },
    {
      "@type": "WebApplication",
      name: "Calcolatore Funzioni Centrali CCNL 2025-2027",
      url: "https://www.fpcgilrovigo.it/dentro-il-quadrato/funzioni-centrali",
      description: "Calcolo aumenti, arretrati e differenziali per Ministeri, Agenzie, INPS, ACI e Funzioni Centrali.",
    },
  ],
};

export default function ChooseContractPage() {
  return (
    <main className="dentroQuadratoShell choice-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="choice-intro">
        <span className="eyebrow"><i /> Dentro il Quadrato</span>
        <h1>Il tuo contratto.<br /><em>I tuoi numeri.</em></h1>
        <div className="dqChoiceAside">
          <div className="dqChoiceLogo">
            <Image
              src="/images/dentro-il-quadrato/logo-rovigo.webp"
              alt=""
              width={220}
              height={220}
              priority
              className="dqLogoImage"
            />
          </div>
          <p>Scegli il comparto in cui lavori. Troverai calcolo aumenti, arretrati, busta paga e novità del CCNL 2025–2027 spiegati senza giri di parole.</p>
        </div>
      </section>
      <section className="sector-choice">
        <Link href="/dentro-il-quadrato/funzioni-locali" className="sector-card local-sector">
          <div className="sector-top"><span>01</span><b>Comuni · Province · Enti</b></div>
          <div>
            <span className="sector-icon" aria-hidden="true">⌂</span>
            <h2>Enti<br />locali</h2>
            <p>Calcola tabellare, indennità di comparto, arretrati e straordinari.</p>
          </div>
          <strong>Entra nel calcolatore <span>→</span></strong>
        </Link>
        <Link href="/dentro-il-quadrato/sanita-pubblica" className="sector-card health-sector">
          <div className="sector-top"><span>02</span><b>Servizio sanitario nazionale</b></div>
          <div>
            <span className="sector-icon" aria-hidden="true">✚</span>
            <h2>Sanità<br />pubblica</h2>
            <p>Calcola tabellare, indennità specifiche e arretrati.</p>
          </div>
          <strong>Entra nel calcolatore <span>→</span></strong>
        </Link>
        <Link href="/dentro-il-quadrato/funzioni-centrali" className="sector-card central-sector">
          <div className="sector-top"><span>03</span><b>Ministeri · Agenzie · Enti pubblici</b></div>
          <div>
            <span className="sector-icon" aria-hidden="true">◆</span>
            <h2>Funzioni<br />centrali</h2>
            <p>Calcola aumenti tabellari, differenziali e arretrati.</p>
          </div>
          <strong>Entra nel calcolatore <span>→</span></strong>
        </Link>
      </section>
      <div className="choice-note">CCNL 2025–2027 · importi lordi indicativi · FP CGIL Rovigo</div>
    </main>
  );
}
