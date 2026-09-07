import type { Metadata } from "next";

const title = "Dentro il Quadrato - Calcolo aumenti e arretrati CCNL 2025-2027";
const description =
  "Calcolatori FP CGIL Rovigo per rinnovo CCNL 2025-2027: aumenti, arretrati, busta paga, straordinari e simulazioni lorde per Sanità, Funzioni locali e Funzioni centrali.";
const image = "/images/dentro-il-quadrato/social-card.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "calcolo arretrati CCNL 2025 2027",
    "calcolo aumenti contratto pubblico impiego",
    "rinnovo CCNL 2025 2027",
    "simulatore busta paga pubblico impiego",
    "calcolatore Funzioni Locali",
    "calcolatore Sanità pubblica",
    "calcolatore Funzioni Centrali",
    "FP CGIL Rovigo contratto",
    "Dentro il Quadrato",
  ],
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
