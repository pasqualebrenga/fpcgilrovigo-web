import type { Metadata } from "next";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata({
  path: "/iscrizione",
  title: "Iscriviti",
  description:
    "Iscriviti alla FP CGIL Rovigo: rispondi a due domande e ti mettiamo in contatto su WhatsApp con il referente del tuo settore.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
