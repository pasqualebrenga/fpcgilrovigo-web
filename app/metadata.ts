import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fpcgilrovigo.it";
const SITE_NAME = "FP CGIL Rovigo";
const DESCRIPTION =
  "FP CGIL Rovigo: sindacato del pubblico impiego a Rovigo e provincia. Tutele, contrattazione, iscrizione, sanità pubblica, enti locali, IPAB, funzioni centrali, convenzioni e contatti.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,

  title: {
    default: "FP CGIL Rovigo | Sindacato pubblico impiego, sanità, enti locali e IPAB",
    template: "%s | FP CGIL Rovigo",
  },

  description: DESCRIPTION,
  keywords: [
    "FP CGIL Rovigo",
    "Funzione Pubblica CGIL Rovigo",
    "sindacato pubblico impiego Rovigo",
    "sindacato sanità Rovigo",
    "ULSS5 Polesana",
    "sindacato enti locali Rovigo",
    "IPAB Rovigo",
    "case di riposo Rovigo",
    "funzioni centrali Rovigo",
    "iscrizione CGIL Rovigo",
    "convenzioni CGIL Rovigo",
    "RSU Rovigo",
  ],
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },

  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icons/maskable-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/maskable-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },

  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: SITE_NAME,
    title: "FP CGIL Rovigo",
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FP CGIL Rovigo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FP CGIL Rovigo",
    description: DESCRIPTION,
    images: ["/twitter-image.png"],
  },
};
