import Image from "next/image";
import Link from "next/link";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="fpNavLink">
      {label}
      <span className="fpCaret" aria-hidden="true" />
    </Link>
  );
}

function ExternalNavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="fpNavLink">
      {label}
      <span className="fpCaret" aria-hidden="true" />
    </a>
  );
}

export default function SiteHeader() {
  // cambia qui se il file si chiama diversamente
  const logoSrc = "/images/brand/logo-fp-cgil-rovigo.jpg";

  return (
    <header className="fpHeader">
      <div className="fpTopStrip" />

      <div className="fpNavBar">
        <div className="fpContainer fpNavInner">
          <Link href="/" className="fpBrandLink" aria-label="Home">
            <div className="fpLogoBox" aria-hidden="true">
              <Image
                src={logoSrc}
                alt="FP CGIL Rovigo"
                width={120}
                height={120}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                priority
              />
            </div>
          </Link>

          <nav aria-label="Navigazione principale" className="fpNav">
            {/* ordine richiesto: News, Formazione, Iscrizione, Chi siamo, Contatti, Convenzioni */}
            <NavLink href="/news" label="News" />
            <ExternalNavLink href="https://formazionepartecipazione.fpcgil.it/" label="Formazione" />
            <NavLink href="/iscrizione" label="Iscrizione" />
            <NavLink href="/chi-siamo" label="Chi siamo" />
            <NavLink href="/contatti" label="Contatti" />
            <NavLink href="/convenzioni" label="Convenzioni" />
          </nav>
        </div>
      </div>
    </header>
  );
}
