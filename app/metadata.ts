import type { Metadata } from "next";

/**
 * Puoi anche impostare su Vercel:
 * NEXT_PUBLIC_SITE_URL = https://fpcgilrovigo-web.vercel.app
 * (quando avrai il dominio definitivo, lo cambi lì e fine.)
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fpcgilrovigo-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "FP CGIL Rovigo",
    template: "%s | FP CGIL Rovigo",
  },

  description:
    "FP CGIL Rovigo – tutele, contrattazione, assistenza. Si riceve su appuntamento.",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    type: "website",
    siteName: "FP CGIL Rovigo",
    title: "FP CGIL Rovigo",
    description:
      "Tutele, contrattazione, assistenza. Si riceve su appuntamento.",
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
    description:
      "Tutele, contrattazione, assistenza. Si riceve su appuntamento.",
    images: ["/twitter-image.png"],
  },
};