import type { Metadata } from "next";

const title = "Dentro il Quadrato - Calcolatori contratto FP CGIL Rovigo";
const description =
  "Calcola aumenti, arretrati e simulazioni lorde orientative dei CCNL 2025-2027 per Sanità pubblica, Funzioni locali e Funzioni centrali.";
const image = "/images/dentro-il-quadrato/social-card.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/dentro-il-quadrato",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "FP CGIL Rovigo",
    title,
    description,
    url: "/dentro-il-quadrato",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Dentro il Quadrato - calcolatori contratto FP CGIL Rovigo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function DentroIlQuadratoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
