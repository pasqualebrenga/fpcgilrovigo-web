import type { Metadata, Viewport } from "next";
import "./globals.css";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import CookieBanner from "./components/CookieBanner";

// Next consiglia themeColor qui (viewport) per l'App Router
export const viewport: Viewport = {
  themeColor: "#ff3333",
};

export const metadata: Metadata = {
  title: "FP CGIL Rovigo",
  description: "FP CGIL Rovigo – Funzione Pubblica, territorio di Rovigo",

  // PWA
  manifest: "/manifest.webmanifest",
  applicationName: "FP CGIL Rovigo",

  appleWebApp: {
    capable: true,
    title: "FP CGIL Rovigo",
    statusBarStyle: "default",
  },

  // Icone (public/icons/* + public/favicon.ico)
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body style={{ margin: 0, background: "#fff" }}>
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
      </body>
    </html>
  );
}