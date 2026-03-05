import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Facebook, Instagram } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV: NavItem[] = [
  { label: "News", href: "/news" },
  { label: "Formazione", href: "https://formazionepartecipazione.fpcgil.it/", external: true },
  { label: "Iscrizione", href: "/iscrizione" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
  { label: "Convenzioni", href: "/convenzioni" },
];

function NavLink({ item }: { item: NavItem }) {
  const content = (
    <>
      <span className="rvNavLabel">{item.label}</span>
      <ChevronDown className="rvNavChevron" size={16} aria-hidden="true" />
    </>
  );

  if (item.external) {
    return (
      <a className="rvNavLink" href={item.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className="rvNavLink" href={item.href}>
      {content}
    </Link>
  );
}

export default function SiteHeader() {
  const logoSrc = "/images/brand/logo-fp-cgil-rovigo.jpg";

  return (
    <header className="rvHeader">
      <style>{`
        .rvHeader { width: 100%; }
        .rvTopStrip { height: 6px; background: #d40000; }

        /* Barra unica con righe diagonali rosse fitte */
        .rvBar {
          background:
            repeating-linear-gradient(
              135deg,
              rgba(212, 0, 0, 0.06) 0px,
              rgba(212, 0, 0, 0.06) 4px,
              rgba(255, 255, 255, 0) 4px,
              rgba(255, 255, 255, 0) 8px
            ),
            #ffffff;
          border-bottom: 1px solid rgba(0,0,0,0.10);
        }

        /* Layout: logo | nav | social (come fpCGIL) */
        .rvInner {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 10px 0;
        }

        .rvBrand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          justify-self: start;
        }
        .rvLogo {
          height: auto;
          width: auto;
          max-height: 68px;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        .rvNav {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          border-left: 1px solid rgba(0,0,0,0.12);
          padding-left: 10px;
          min-height: 44px;
        }

        .rvNavLink {
          text-decoration: none;
          color: rgba(0,0,0,0.86);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.25px;
          font-size: 13px;
          padding: 10px 12px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .rvNavLink:hover {
          background: rgba(212,0,0,0.08);
          color: #d40000;
        }

        .rvNavChevron {
          color: #d40000; /* freccia rossa */
          opacity: 0.95;
          margin-top: 1px;
        }

        .rvSocial {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          justify-self: end; /* segue sempre il bordo destro */
        }
        .rvSocialBtn {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.12);
          background: rgba(255,255,255,0.92);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(0,0,0,0.78);
          text-decoration: none;
        }
        .rvSocialBtn:hover {
          border-color: rgba(212,0,0,0.35);
          background: rgba(212,0,0,0.08);
          color: #d40000;
        }

        /* Mobile: prima riga brand + social, seconda riga nav */
        @media (max-width: 760px) {
          .rvInner {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            gap: 10px 12px;
            padding: 10px 0;
          }
          .rvBrand { grid-column: 1; grid-row: 1; }
          .rvSocial { grid-column: 2; grid-row: 1; }
          .rvNav {
            grid-column: 1 / -1;
            grid-row: 2;
            border-left: 0;
            padding-left: 0;
          }
          .rvNavLink { padding: 10px 10px; }
        }
      `}</style>

      <div className="rvTopStrip" />

      <div className="rvBar">
        <div className="fpContainer rvInner">
          <Link href="/" className="rvBrand" aria-label="Home">
            <Image
              src={logoSrc}
              alt="FP CGIL Rovigo"
              width={210}
              height={80}
              priority
              className="rvLogo"
              sizes="(max-width: 760px) 180px, 210px"
            />
          </Link>

          <nav className="rvNav" aria-label="Navigazione principale">
            {NAV.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          <div className="rvSocial" aria-label="Social">
            <a
              className="rvSocialBtn"
              href="https://www.facebook.com/funzionepubblicacgil.rovigo"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook FP CGIL Rovigo"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>

            <a
              className="rvSocialBtn"
              href="https://www.instagram.com/fpcgilrovigo/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram FP CGIL Rovigo"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}