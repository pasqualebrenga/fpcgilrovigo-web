"use client";

import { useEffect, useState } from "react";

const CONSENT_COOKIE = "fp_consent";
const CONSENT_MAX_DAYS = 180;

type ConsentV2 = {
  v: 2;
  necessary: true;
  analytics: false;
  external: boolean;
  ts: number;
};

function getCookie(name: string): string | null {
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name + "="));
  if (!match) return null;
  const raw = match.substring(name.length + 1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function setCookie(name: string, value: string, maxDays: number) {
  const maxAge = maxDays * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const consent = getCookie(CONSENT_COOKIE);
      if (!consent) setOpen(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!open) return null;

  const box: React.CSSProperties = {
    position: "fixed",
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 9999,
    background: "#111",
    color: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    maxWidth: 980,
    margin: "0 auto",
  };

  const btnPrimary: React.CSSProperties = {
    border: "1px solid #fff",
    borderRadius: 10,
    padding: "10px 12px",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    fontWeight: 700,
  };

  const btnSecondary: React.CSSProperties = {
    ...btnPrimary,
    background: "transparent",
    color: "#fff",
  };

  const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  };

  const saveConsent = (external: boolean) => {
    const consent: ConsentV2 = {
      v: 2,
      necessary: true,
      analytics: false,
      external,
      ts: Date.now(),
    };
    setCookie(CONSENT_COOKIE, JSON.stringify(consent), CONSENT_MAX_DAYS);
    window.dispatchEvent(new Event("fp-consent-changed"));
    setOpen(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Informativa cookie" style={box}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>
            Cookie
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.88)" }}>
            Usiamo cookie tecnici necessari. I contenuti esterni, come la mappa Google, vengono caricati
            solo se li abiliti; in quel caso il servizio esterno applica la propria informativa.
          </div>

          <div style={{ fontSize: 13, marginTop: 8, color: "rgba(255,255,255,0.78)" }}>
            Leggi:{" "}
            <a href="/privacy" style={linkStyle}>
              Privacy Policy
            </a>{" "}
            •{" "}
            <a href="/cookie-policy" style={linkStyle}>
              Cookie Policy
            </a>
          </div>
        </div>

        <button
          onClick={() => saveConsent(false)}
          aria-label="Chiudi"
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.75)",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            padding: 6,
          }}
          title="Chiudi"
        >
          ×
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => saveConsent(false)} style={btnSecondary}>
          Solo cookie tecnici
        </button>
        <button onClick={() => saveConsent(true)} style={btnPrimary}>
          Abilita contenuti esterni
        </button>
      </div>
    </div>
  );
}
