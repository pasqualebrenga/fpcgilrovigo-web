import Image from "next/image";
import Link from "next/link";

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

function HeaderLink({ item }: { item: NavItem }) {
  if (item.external) {
    return (
      <a className="fpNavLink" href={item.href} target="_blank" rel="noreferrer">
        {item.label}
        <span className="fpCaret" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link className="fpNavLink" href={item.href}>
      {item.label}
      <span className="fpCaret" aria-hidden="true" />
    </Link>
  );
}

export default function SiteHeader() {
  // se il tuo logo ha un altro path, cambia qui
  const logoSrc = "/images/brand/logo-fp-cgil-rovigo.jpg";

  return (
    <header className="fpHeader">
      <div className="fpTopStrip" />

      {/* fascia grigia con righe diagonali (stacco) */}
      <div className="fpHeaderBackdrop">
        <div className="fpContainer fpHeaderInner">
          <Link href="/" className="fpBrandLink" aria-label="Home">
            <Image
              src={logoSrc}
              alt="FP CGIL Rovigo"
              width={360}
              height={140}
              priority
              className="fpLogoImg"
            />
          </Link>
        </div>
      </div>

      {/* navbar su bianco */}
      <div className="fpNavBar">
        <div className="fpContainer fpNavInner">
          <nav aria-label="Navigazione principale" className="fpNav">
            {NAV.map((item) => (
              <HeaderLink key={item.href} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}