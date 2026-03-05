import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV: NavItem[] = [
  { label: "News", href: "/news" },
  {
    label: "Formazione",
    href: "https://formazionepartecipazione.fpcgil.it/",
    external: true,
  },
  { label: "Iscrizione", href: "/iscrizione" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
  { label: "Convenzioni", href: "/convenzioni" },
];

function NavLink({ item }: { item: NavItem }) {
  if (item.external) {
    return (
      <a className="rvNavLink" href={item.href} target="_blank" rel="noreferrer">
        {item.label}
      </a>
    );
  }
  return (
    <Link className="rvNavLink" href={item.href}>
      {item.label}
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

        /* Fascia unica (logo + nav + social) con pattern */
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

        .rvInner {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 10px 0; /* qui tagliamo lo “spazio morto” */
        }

        /* Logo: più compatto e allineato a sinistra */
        .rvBrand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .rvLogo {
          height: auto;
          width: auto;
          max-height: 68px;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        /* Nav orizzontale tipo fpCGIL */
        .rvNav {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          margin-left: 6px;
          border-left: 1px solid rgba(0,0,0,0.12);
          padding-left: 10px;
          flex: 1;
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
        }
        .rvNavLink:hover {
          background: rgba(212,0,0,0.08);
          color: #d40000;
        }

        /* Social a destra */
        .rvSocial {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .rvSocialBtn {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.12);
          background: rgba(255,255,255,0.9);
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

        /* Mobile: nav va sotto, social resta visibile */
        @media (max-width: 760px) {
          .rvInner { flex-wrap: wrap; gap: 12px; }
          .rvNav { flex-basis: 100%; margin-left: 0; border-left: 0; padding-left: 0; }
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