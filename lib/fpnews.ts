export type FpNewsItem = {
  title: string;
  url: string;
  date?: string;
  excerpt?: string;
  image?: string; // featured / og:image
  source: "rss" | "html";
};

const CATEGORY_URL = "https://www.fpcgil.it/category/_in_homepage/";
const FEED_URL = "https://www.fpcgil.it/category/_in_homepage/feed/";

function stripTags(input: string) {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function pickImageFromRssItem(it: any): string | undefined {
  const mc = it?.["media:content"];
  if (Array.isArray(mc)) {
    const url = mc[0]?.["@_url"] || mc[0]?.url;
    if (typeof url === "string" && url.startsWith("http")) return decodeEntities(url);
  } else if (mc) {
    const url = mc?.["@_url"] || mc?.url;
    if (typeof url === "string" && url.startsWith("http")) return decodeEntities(url);
  }

  const enc = it?.enclosure;
  if (enc) {
    const url = enc?.["@_url"] || enc?.url;
    if (typeof url === "string" && url.startsWith("http")) return decodeEntities(url);
  }

  const html = (it?.["content:encoded"] ?? it?.description ?? "") as string;
  if (typeof html === "string") {
    const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m?.[1]?.startsWith("http")) return decodeEntities(m[1]);
  }

  return undefined;
}

function pickOgImageFromHtml(html: string): string | undefined {
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  if (og?.[1]?.startsWith("http")) return decodeEntities(og[1]);

  const tw = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  if (tw?.[1]?.startsWith("http")) return decodeEntities(tw[1]);

  const img = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (img?.[1]?.startsWith("http")) return decodeEntities(img[1]);

  return undefined;
}

async function enrichWithImages(items: FpNewsItem[], maxToEnrich = 10): Promise<FpNewsItem[]> {
  const out = [...items];
  await Promise.all(
    out.slice(0, maxToEnrich).map(async (it, idx) => {
      if (it.image) return;
      try {
        const res = await fetch(it.url, { next: { revalidate: 86400 } });
        if (!res.ok) return;
        const html = await res.text();
        const img = pickOgImageFromHtml(html);
        if (img) out[idx] = { ...out[idx], image: img };
      } catch {
        // ignore
      }
    })
  );
  return out;
}

async function fetchRss(limit: number): Promise<FpNewsItem[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const { XMLParser } = await import("fast-xml-parser");
    const parser = new XMLParser({ ignoreAttributes: false });

    const parsed = parser.parse(xml);
    const items = parsed?.rss?.channel?.item;
    const arr = Array.isArray(items) ? items : items ? [items] : [];

    let mapped: FpNewsItem[] = arr
      .map((it: any) => {
        const title = decodeEntities(String(it?.title ?? "")).trim();
        const url = String(it?.link ?? "").trim();
        const date = it?.pubDate ? String(it.pubDate) : undefined;
        const excerptRaw = it?.description ? String(it.description) : undefined;
        const excerpt = excerptRaw ? stripTags(decodeEntities(excerptRaw)).slice(0, 240) : undefined;
        const image = pickImageFromRssItem(it);
        if (!title || !url) return null;
        return { title, url, date, excerpt, image, source: "rss" as const };
      })
      .filter(Boolean)
      .slice(0, limit) as FpNewsItem[];

    if (mapped.some((x) => !x.image)) {
      mapped = await enrichWithImages(mapped, Math.min(10, mapped.length));
    }

    return mapped;
  } catch {
    return [];
  }
}

async function fetchHtml(limit: number): Promise<FpNewsItem[]> {
  try {
    const res = await fetch(CATEGORY_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return [];

    const html = await res.text();
    const results: FpNewsItem[] = [];

    const h3LinkRegex = /<h3[^>]*>\s*<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/gi;
    let m: RegExpExecArray | null;

    while ((m = h3LinkRegex.exec(html)) && results.length < limit) {
      const url = decodeEntities(m[1]).trim();
      const title = stripTags(decodeEntities(m[2] ?? "")).trim();
      if (!url || !title) continue;

      const windowStart = Math.max(0, m.index - 400);
      const windowText = stripTags(html.slice(windowStart, m.index));
      const dateMatch = windowText.match(/\b\d{1,2}\s+[A-Za-zÀ-ÿ]+\s+\d{4}\b/);

      results.push({ title, url, date: dateMatch?.[0], source: "html" });
    }

    const seen = new Set<string>();
    const deduped = results.filter((x) => {
      if (seen.has(x.url)) return false;
      seen.add(x.url);
      return true;
    });

    return await enrichWithImages(deduped, Math.min(10, deduped.length));
  } catch {
    return [];
  }
}

function dedupMerge(a: FpNewsItem[], b: FpNewsItem[]): FpNewsItem[] {
  const out: FpNewsItem[] = [];
  const seen = new Set<string>();

  for (const it of [...a, ...b]) {
    if (!it?.url) continue;
    if (seen.has(it.url)) continue;
    seen.add(it.url);
    out.push(it);
  }

  return out;
}

export async function getFpHomepageNews(limit = 12): Promise<FpNewsItem[]> {
  // RSS è la prima scelta, ma a volte torna 1 solo item o è “strano”.
  // Quindi: prendiamo RSS + HTML e uniamo.
  const [rss, html] = await Promise.all([fetchRss(limit), fetchHtml(limit)]);
  const merged = dedupMerge(rss, html);
  return merged.slice(0, limit);
}

export const fpSources = {
  CATEGORY_URL,
  FEED_URL,
};
