import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FP CGIL Rovigo",
    short_name: "FP CGIL",
    description: "FP CGIL Rovigo – Funzione Pubblica, territorio di Rovigo",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ff3333",
    theme_color: "#ff3333",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}