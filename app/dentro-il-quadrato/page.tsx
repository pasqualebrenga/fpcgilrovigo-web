import Image from "next/image";
import Link from "next/link";

export default function ChooseContractPage() {
  return (
    <main className="dentroQuadratoShell choice-page">
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
          <p>Scegli il comparto in cui lavori. Troverai aumenti, arretrati e novità del CCNL 2025–2027 spiegati senza giri di parole.</p>
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
