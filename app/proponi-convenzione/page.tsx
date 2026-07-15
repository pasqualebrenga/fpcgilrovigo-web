import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, FileCheck2, MailCheck, ShieldCheck } from "lucide-react";

import ProponiConvenzioneForm from "./ProponiConvenzioneForm";

export const metadata: Metadata = {
  title: "Proponi una convenzione - FP CGIL Rovigo",
  description:
    "Modulo per aziende, attività e strutture che vogliono proporre una convenzione dedicata agli iscritti FP CGIL Rovigo.",
  alternates: {
    canonical: "/proponi-convenzione",
  },
};

export default function ProponiConvenzionePage() {
  return (
    <div className="proposalPage">
      <Link className="proposalBack" href="/convenzioni">
        <ArrowLeft size={18} /> Torna alle convenzioni
      </Link>

      <section className="proposalHero">
        <div>
          <div className="proposalBadge">
            <Building2 size={18} /> Convenzioni territoriali
          </div>
          <h1>Proponi una convenzione agli iscritti FP CGIL Rovigo.</h1>
          <p>
            Hai un’attività, uno studio, una struttura o un servizio utile a lavoratrici e lavoratori dei servizi
            pubblici? Inviaci una proposta: la valuteremo e ti ricontatteremo.
          </p>
        </div>
      </section>

      <section className="proposalIntroGrid" aria-label="Come funziona">
        <article>
          <FileCheck2 size={22} />
          <h2>Compili la proposta</h2>
          <p>Dati aziendali, referente, tipo di vantaggio e condizioni della convenzione.</p>
        </article>
        <article>
          <MailCheck size={22} />
          <h2>Arriva alla sede</h2>
          <p>La versione finale invierà un PDF riepilogativo a FP CGIL Rovigo con gli allegati separati.</p>
        </article>
        <article>
          <ShieldCheck size={22} />
          <h2>Valutazione non automatica</h2>
          <p>L’invio non comporta approvazione automatica: la convenzione viene valutata dalla struttura.</p>
        </article>
      </section>

      <ProponiConvenzioneForm />
    </div>
  );
}
