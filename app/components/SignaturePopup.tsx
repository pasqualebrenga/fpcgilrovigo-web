"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, PenLine, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { signatureCampaigns } from "../../lib/signatureCampaigns";

const STORAGE_KEY = "fp-cgil-rovigo-firme-popup-session-v1";

export default function SignaturePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) !== "1") {
      const timer = window.setTimeout(() => setOpen(true), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const closePopup = useCallback(() => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePopup();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePopup, open]);

  if (!open) return null;

  return (
    <div className="signaturePopupOverlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) closePopup();
    }}>
      <section className="signaturePopupDialog" role="dialog" aria-modal="true" aria-labelledby="signature-popup-title">
        <button className="signaturePopupClose" type="button" aria-label="Chiudi finestra" onClick={closePopup}>
          <X size={24} />
        </button>

        <div className="signaturePopupTop">
          <div className="signaturePopupBadge">
            <PenLine size={18} /> Raccolta firme
          </div>
          <h2 id="signature-popup-title">Due firme per difendere diritti e salute</h2>
          <p>
            CGIL promuove due proposte di legge di iniziativa popolare. Puoi approfondire dal nostro sito o firmare
            online sul portale ufficiale.
          </p>
        </div>

        <div className="signaturePopupCards">
          {signatureCampaigns.map((campaign) => (
            <article className="signaturePopupCard" key={campaign.id}>
              <div className="signaturePopupLogoWrap">
                <Image src={campaign.logo} alt="" width={132} height={132} className="signaturePopupLogo" />
              </div>
              <div className="signaturePopupCardBody">
                <div className="signaturePopupLabel">{campaign.label}</div>
                <h3>{campaign.title}</h3>
                <p>{campaign.summary}</p>
                <div className="signaturePopupActions">
                  <Link className="signaturePopupButton signaturePopupButtonLight" href="/leggi-iniziativa-popolare">
                    Approfondisci <ArrowRight size={17} />
                  </Link>
                  <a
                    className="signaturePopupButton signaturePopupButtonRed"
                    href={campaign.signUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Firma online <ExternalLink size={17} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="signaturePopupFooter">
          <button className="signaturePopupPlain" type="button" onClick={closePopup}>
            Continua sul sito
          </button>
          <Link className="signaturePopupFooterLink" href="/leggi-iniziativa-popolare">
            Vedi le proposte <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
