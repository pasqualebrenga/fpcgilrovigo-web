"use client";

import React, { useSyncExternalStore } from "react";

type ConsentV2 = {
  v: 2;
  necessary: true;
  analytics: boolean;
  external: boolean;
  ts: number;
};

const CONSENT_COOKIE = "fp_consent";
const CONSENT_EVENT = "fp-consent-changed";

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

function parseConsent(raw: string | null): ConsentV2 | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (
      obj?.v === 2 &&
      obj?.necessary === true &&
      typeof obj.external === "boolean" &&
      typeof obj.analytics === "boolean"
    ) {
      return obj as ConsentV2;
    }
    return null;
  } catch {
    return null;
  }
}

function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

function getConsentSnapshot() {
  return getCookie(CONSENT_COOKIE) ?? "";
}

function getServerConsentSnapshot() {
  return "";
}

export default function ExternalEmbedGate({
  title = "Contenuto esterno",
  description = "Per visualizzare questo contenuto è necessario abilitare i contenuti esterni.",
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const consentRaw = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot
  );
  const consent = parseConsent(consentRaw);

  if (consent?.external) return <>{children}</>;

  // placeholder “safe”
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 16,
        background: "rgba(0,0,0,0.02)",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ opacity: 0.8, lineHeight: 1.5 }}>{description}</div>
      <div style={{ marginTop: 10, fontSize: 13, opacity: 0.8 }}>
        Apri “Gestisci cookie” nel footer e abilita <b>Contenuti esterni</b>.
      </div>
    </div>
  );
}
