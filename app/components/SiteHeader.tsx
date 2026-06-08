"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV: NavItem[] = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Convenzioni", href: "/convenzioni" },
  { label: "News", href: "/news" },
  { label: "Formazione", href: "https://formazionepartecipazione.fpcgil.it/", external: true },
  { label: "Iscrizione", href: "/iscrizione" },
  { label: "Contatti", href: "/contatti" },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const content = (
    <>
      <span className="rvNavLabel">{item.label}</span>
      <ChevronDown className="rvNavChevron" size={14} aria-hidden="true" />
    </>
  );

  if (item.external) {
    return (
      <a
        className="rvNavLink"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.label} - apre una nuova scheda`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={`rvNavLink${active ? " rvNavLinkActive" : ""}`} href={item.href} aria-current={active ? "page" : undefined}>
      {content}
    </Link>
  );
}

export default function SiteHeader() {
  const logoSrc = "/images/brand/logo-fp-cgil-rovigo.jpg";
  const pathname = usePathname();

  return (
    <header className="rvHeader">
      <style>{`
        .rvHeader { width: 100%; }
        .rvTopStrip { height: 6px; background: #d40000; }

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
          border-bottom: 1px solid rgba(0,0,0,0.12);
        }

        .rvInner {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 14px;
          padding: 12px 0 11px;
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
          max-height: 76px;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        .rvNav {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 2px;
          min-height: 52px;
        }

        .rvNavLink {
          text-decoration: none;
          color: rgb(72,72,72);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0;
          font-size: 19px;
          line-height: 1;
          padding: 12px 4px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }
        .rvNavLink:hover {
          background: rgba(212,0,0,0.08);
          color: #d40000;
        }
        .rvNavLinkActive {
          color: #d40000;
          background: rgba(212,0,0,0.08);
        }
        .rvNavLinkActive .rvNavChevron {
          color: #d40000;
        }

        .rvNavChevron {
          color: #d40000;
          opacity: 0.9;
          margin-top: 1px;
        }

        .rvSocial {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-self: end; /* segue sempre il bordo destro */
        }
        .rvSocialBtn {
          width: 36px;
          height: 36px;
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

        @media (max-width: 1180px) {
          .rvInner {
            gap: 10px;
          }
          .rvLogo {
            max-height: 70px;
          }
          .rvNavLink {
            font-size: 16px;
            padding: 11px 5px;
          }
        }

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
            min-height: 0;
          }
          .rvLogo {
            max-height: 70px;
          }
          .rvNavLink {
            font-size: 14px;
            padding: 10px 8px;
          }
        }

        @media (max-width: 420px) {
          .rvNavLink {
            font-size: 13px;
            padding: 9px 7px;
          }
          .rvSocialBtn {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>

      <div className="rvTopStrip" />

      <div className="rvBar">
        <div className="fpContainer rvInner">
          <Link href="/" className="rvBrand" aria-label="Home">
            <Image
              src={logoSrc}
              alt="FP CGIL Rovigo"
              width={240}
              height={80}
              priority
              className="rvLogo"
              sizes="(max-width: 760px) 190px, 240px"
            />
          </Link>

          <nav className="rvNav" aria-label="Navigazione principale">
            {NAV.map((item) => {
              const active = !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`));
              return <NavLink key={item.href} item={item} active={active} />;
            })}
          </nav>

          <div className="rvSocial" aria-label="Social">
            <a
              className="rvSocialBtn"
              href="https://www.facebook.com/funzionepubblicacgil.rovigo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook FP CGIL Rovigo"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>

            <a
              className="rvSocialBtn"
              href="https://www.instagram.com/fpcgilrovigo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram FP CGIL Rovigo"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              className="rvSocialBtn"
              href="https://www.linkedin.com/in/funzione-pubblica-cgil-rovigo-0a75543b5/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn FP CGIL Rovigo"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
