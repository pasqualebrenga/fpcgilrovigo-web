import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import CookieBanner from "./components/CookieBanner";

export const metadata: Metadata = {
  title: "FP CGIL Rovigo",
  description: "FP CGIL Rovigo – Funzione Pubblica, territorio di Rovigo",
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

        {/* Banner cookie (client component) */}
        <CookieBanner />
      </body>
    </html>
  );
}