import type { Metadata } from "next";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata({
  path: "/chi-siamo",
  title: "Chi siamo: la segreteria",
  description:
    "La segreteria FP CGIL Rovigo: referenti per sanità, enti locali, IPAB e funzioni centrali, con contatti diretti via telefono, email e WhatsApp.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
