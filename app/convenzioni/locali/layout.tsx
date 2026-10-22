import type { Metadata } from "next";
import { pageMetadata } from "../../metadata";

export const metadata: Metadata = pageMetadata({
  path: "/convenzioni/locali",
  title: "Convenzioni locali",
  description:
    "Sconti e convenzioni con attività di Rovigo e provincia riservati alle iscritte e agli iscritti FP CGIL Rovigo.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
