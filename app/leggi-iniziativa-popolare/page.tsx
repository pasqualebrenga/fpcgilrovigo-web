import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, PenLine } from "lucide-react";

import { signatureCampaigns } from "../../lib/signatureCampaigns";

export const metadata: Metadata = {
  title: "Leggi di iniziativa popolare - FP CGIL Rovigo",
  description:
    "Le due raccolte firme promosse dalla CGIL: Diritto alla Salute e I diritti non si appaltano, con link per approfondire e firmare online.",
  alternates: {
    canonical: "/leggi-iniziativa-popolare",
  },
};

export default function PopularLawsPage() {
  return (
    <div className="signaturePage">
      <section className="signaturePageHero">
        <div>
          <div className="signaturePageBadge">
            <PenLine size={18} /> Leggi di iniziativa popolare
          </div>
          <h1>Firma per diritti, salute e lavoro dignitoso.</h1>
          <p>
            Abbiamo raccolto qui le due campagne CGIL con una scheda semplice per orientarsi: cosa chiedono, dove
            leggere la proposta e dove firmare online.
          </p>
        </div>
      </section>

      <section className="signaturePageGrid" aria-label="Proposte di legge">
        {signatureCampaigns.map((campaign) => (
          <article className="signaturePageCard" key={campaign.id}>
            <div className="signaturePageCardIntro">
              <Image src={campaign.logo} alt="" width={168} height={168} className="signaturePageLogo" />
              <div>
                <div className="signaturePageLabel">{campaign.label}</div>
                <h2>{campaign.title}</h2>
                <p>{campaign.summary}</p>
              </div>
            </div>

            <div className="signaturePageClaim">{campaign.claim}</div>

            <ul className="signaturePagePoints">
              {campaign.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="signaturePageActions">
              <a className="signaturePageButton signaturePageButtonLight" href={campaign.detailUrl} target="_blank" rel="noreferrer">
                Leggi la proposta <ExternalLink size={18} />
              </a>
              <a className="signaturePageButton signaturePageButtonRed" href={campaign.signUrl} target="_blank" rel="noreferrer">
                Firma online <ExternalLink size={18} />
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
