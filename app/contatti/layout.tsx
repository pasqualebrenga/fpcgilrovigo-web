import type { Metadata } from "next";
import { pageMetadata } from "../metadata";

export const metadata: Metadata = pageMetadata({
  path: "/contatti",
  title: "Contatti",
  description:
    "Contatti FP CGIL Rovigo: sede in Via Calatafimi 1/B a Rovigo, telefono 0425 377311, email e PEC. Si riceve su appuntamento.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
