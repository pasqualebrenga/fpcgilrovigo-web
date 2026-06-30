import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fpcgilrovigo.it";

const routes = [
  "",
  "/chi-siamo",
  "/contatti",
  "/convenzioni",
  "/convenzioni/locali",
  "/convenzioni/nazionali",
  "/formazione",
  "/iscrizione",
  "/news",
  "/rsu",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/news" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/iscrizione" || route === "/contatti" ? 0.9 : 0.7,
  }));
}
