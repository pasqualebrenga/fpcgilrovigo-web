"use client";

import type { CSSProperties } from "react";

export default function SiteFooter() {
  const reopenCookieSettings = () => {
    document.cookie = `fp_cookie_info=; Path=/; Max-Age=0; SameSite=Lax`;
    document.cookie = `fp_consent=; Path=/; Max-Age=0; SameSite=Lax`;
    window.location.reload();
  };

  const linkStyle: CSSProperties = {
    color: "inherit",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  };

  const btnStyle: CSSProperties = {
    border: "1px solid var(--border)",
    background: "transparent",
    color: "inherit",
    padding: "6px 10px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
  };

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{ paddingTop: 18, paddingBottom: 18 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            marginBottom: 12,
            fontSize: 13,
          }}
        >
          <span className="muted" style={{ fontWeight: 800 }}>
            Aree di tutela:
          </span>
          <a href="/sanita-pubblica-ulss5-rovigo" style={linkStyle}>
            Sanità pubblica
          </a>
          <a href="/enti-locali-comuni-rovigo" style={linkStyle}>
            Enti locali
          </a>
          <a href="/ipab-case-riposo-rovigo" style={linkStyle}>
            IPAB e case di riposo
          </a>
          <a href="/funzioni-centrali-rovigo" style={linkStyle}>
            Funzioni centrali
          </a>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="muted" style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} FP CGIL Rovigo — Contenuti e contatti del territorio.
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              fontSize: 13,
            }}
          >
            <a href="/privacy" style={linkStyle}>
              Privacy
            </a>
            <a href="/cookie-policy" style={linkStyle}>
              Cookie
            </a>

            <button type="button" onClick={reopenCookieSettings} style={btnStyle}>
              Gestisci cookie
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
