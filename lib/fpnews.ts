export type FpNewsItem = {
  title: string;
  url: string;
  date?: string;
  excerpt?: string;
  image?: string; // featured / og:image
  source: "wp-json" | "rss" | "html";
};

type RssItem = Record<string, unknown>;
type WpPost = Record<string, unknown>;

const CATEGORY_URL = "https://www.fpcgil.it/category/_in_homepage/";
const FEED_URL = "https://www.fpcgil.it/category/_in_homepage/feed/";
const WP_JSON_URL =
  "https://www.fpcgil.it/wp-json/wp/v2/posts?categories=276&_fields=id,date,link,title,excerpt,yoast_head_json";

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
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function formatNewsDate(input?: string) {
  if (!input) return undefined;

  const parsed = new Date(input);
  if (!Number.isNaN(parsed.getTime())) {
    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsed);
  }

  return input.replace(/\s[+-]\d{4}\b/g, "").trim();
}

function pickImageFromRssItem(it: RssItem): string | undefined {
  const mc = it?.["media:content"];
  if (Array.isArray(mc)) {
    const first = mc[0] as RssItem | undefined;
    const url = first?.["@_url"] || first?.url;
    if (typeof url === "string" && url.startsWith("http")) return decodeEntities(url);
  } else if (mc && typeof mc === "object") {
    const media = mc as RssItem;
    const url = media?.["@_url"] || media?.url;
    if (typeof url === "string" && url.startsWith("http")) return decodeEntities(url);
  }

  const enc = it?.enclosure;
  if (enc && typeof enc === "object") {
    const enclosure = enc as RssItem;
    const url = enclosure?.["@_url"] || enclosure?.url;
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

function pickImageFromWpPost(post: WpPost): string | undefined {
  const yoast = post?.yoast_head_json;
  if (yoast && typeof yoast === "object") {
    const images = (yoast as RssItem)?.og_image;
    const first = Array.isArray(images) ? (images[0] as RssItem | undefined) : undefined;
    const url = first?.url;
    if (typeof url === "string" && url.startsWith("http")) return decodeEntities(url);
  }

  const embedded = post?._embedded;
  if (!embedded || typeof embedded !== "object") return undefined;

  const media = (embedded as RssItem)?.["wp:featuredmedia"];
  const first = Array.isArray(media) ? (media[0] as RssItem | undefined) : undefined;
  const sourceUrl = first?.source_url;
  if (typeof sourceUrl === "string" && sourceUrl.startsWith("http")) return decodeEntities(sourceUrl);

  const sizes = first?.media_details;
  if (!sizes || typeof sizes !== "object") return undefined;
  const full = (sizes as RssItem)?.sizes;
  if (!full || typeof full !== "object") return undefined;

  const preferred = ["large", "medium_large", "full", "post-thumbnail"];
  for (const key of preferred) {
    const candidate = ((full as RssItem)?.[key] as RssItem | undefined)?.source_url;
    if (typeof candidate === "string" && candidate.startsWith("http")) return decodeEntities(candidate);
  }

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

    let mapped: FpNewsItem[] = (arr as RssItem[])
      .map((it) => {
        const title = decodeEntities(String(it?.title ?? "")).trim();
        const url = String(it?.link ?? "").trim();
        const date = formatNewsDate(it?.pubDate ? String(it.pubDate) : undefined);
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

async function fetchWpJson(limit: number): Promise<FpNewsItem[]> {
  try {
    const url = `${WP_JSON_URL}&per_page=${Math.max(1, Math.min(30, limit))}`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return [];

    const posts = (await res.json()) as WpPost[];
    if (!Array.isArray(posts)) return [];

    let mapped = posts
      .map((post) => {
        const renderedTitle = (post?.title as RssItem | undefined)?.rendered;
        const renderedExcerpt = (post?.excerpt as RssItem | undefined)?.rendered;
        const title = stripTags(decodeEntities(String(renderedTitle ?? "")));
        const url = String(post?.link ?? "").trim();
        const date = formatNewsDate(post?.date ? String(post.date) : undefined);
        const excerpt = renderedExcerpt
          ? stripTags(decodeEntities(String(renderedExcerpt))).replace(/\[[^\]]+\]$/, "").trim().slice(0, 240)
          : undefined;
        const image = pickImageFromWpPost(post);
        if (!title || !url) return null;
        return { title, url, date, excerpt, image, source: "wp-json" as const };
      })
      .filter(Boolean)
      .slice(0, limit) as FpNewsItem[];

    if (mapped.some((x) => !x.image)) {
      mapped = await enrichWithImages(mapped, Math.min(6, mapped.length));
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
  // L'API WordPress è la fonte più stabile; RSS/HTML restano fallback se cambia qualcosa lato nazionale.
  const [wpJson, rss, html] = await Promise.all([fetchWpJson(limit), fetchRss(limit), fetchHtml(limit)]);
  const merged = dedupMerge(wpJson, dedupMerge(rss, html));
  return merged.slice(0, limit);
}

export const fpSources = {
  CATEGORY_URL,
  FEED_URL,
  WP_JSON_URL,
};
