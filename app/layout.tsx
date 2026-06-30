import type { Viewport } from "next";
import "./globals.css";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import CookieBanner from "./components/CookieBanner";
import ChatAssistant from "./components/ChatAssistant";

export { metadata } from "./metadata";

// Next consiglia themeColor qui (viewport) per l'App Router
export const viewport: Viewport = {
  themeColor: "#ff3333",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FP CGIL Rovigo",
  alternateName: ["Funzione Pubblica CGIL Rovigo", "FP CGIL Rovigo"],
  url: "https://www.fpcgilrovigo.it",
  logo: "https://www.fpcgilrovigo.it/images/brand/logo-fp-cgil-rovigo.jpg",
  image: "https://www.fpcgilrovigo.it/opengraph-image.png",
  description:
    "FP CGIL Rovigo è il punto di riferimento per lavoratrici e lavoratori dei servizi pubblici, sanità, enti locali, funzioni centrali, IPAB e pubblico impiego nel territorio di Rovigo e provincia.",
  telephone: "+390425377311",
  email: "fp.rovigo@veneto.cgil.it",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Calatafimi 1/B",
    postalCode: "45100",
    addressLocality: "Rovigo",
    addressRegion: "Veneto",
    addressCountry: "IT",
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Provincia di Rovigo",
    },
    {
      "@type": "City",
      name: "Rovigo",
    },
  ],
  sameAs: [
    "https://www.facebook.com/funzionepubblicacgil.rovigo",
    "https://www.instagram.com/fpcgilrovigo/",
    "https://www.linkedin.com/in/funzione-pubblica-cgil-rovigo-0a75543b5/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+390425377311",
    email: "fp.rovigo@veneto.cgil.it",
    contactType: "customer support",
    areaServed: "Provincia di Rovigo",
    availableLanguage: "Italian",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body style={{ margin: 0, background: "#fff" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <SiteHeader />

        <main
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "16px",
            minHeight: "70vh",
          }}
        >
          {children}
        </main>

        <SiteFooter />

        {/* Banner cookie informativo */}
        <CookieBanner />

        <ChatAssistant />
      </body>
    </html>
  );
}
