"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyInviteLinkProps = {
  inviteLink: string;
  label?: string;
};

export function CopyInviteLink({ inviteLink, label = "Copia link invito" }: CopyInviteLinkProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="healthDelegatesCopyLink" onClick={copyLink} type="button">
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copiato" : label}
    </button>
  );
}
