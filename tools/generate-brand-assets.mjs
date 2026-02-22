import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// root progetto (anche se lanci lo script da un'altra cartella)
const root = path.resolve(__dirname, "..");

// SORGENTE LOGO (come vuoi tu)
const src = path.join(root, "public", "images", "brand", "logo.png");

if (!fs.existsSync(src)) {
  console.error("Manca il file sorgente:", src);
  console.error(
    "Metti il logo qui e chiamalo esattamente logo.png -> public/images/brand/logo.png"
  );
  process.exit(1);
}

// output: nella cartella /app (Next App Router)
const outDir = path.join(root, "app");
fs.mkdirSync(outDir, { recursive: true });

const FP_RED = { r: 212, g: 0, b: 0, alpha: 1 };

async function run() {
  // 1) favicon / icon
  await sharp(src)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(path.join(outDir, "icon.png"));

  // 2) apple icon
  await sharp(src)
    .resize(180, 180, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(path.join(outDir, "apple-icon.png"));

  // 3) OpenGraph / Twitter images (1200x630)
  const ogW = 1200,
    ogH = 630;
  const bannerH = 92;

  const base = sharp({
    create: {
      width: ogW,
      height: ogH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  });

  const redBanner = await sharp({
    create: {
      width: ogW,
      height: bannerH,
      channels: 4,
      background: FP_RED,
    },
  })
    .png()
    .toBuffer();

  const logo = await sharp(src)
    .resize(520, 520, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  const composed = await base
    .composite([
      { input: redBanner, left: 0, top: 0 },
      { input: logo, left: Math.round((ogW - 520) / 2), top: Math.round((ogH - 520) / 2) + 20 },
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(outDir, "opengraph-image.png"), composed);
  fs.writeFileSync(path.join(outDir, "twitter-image.png"), composed);

  console.log("OK ✅ Generati in /app:");
  console.log("- icon.png");
  console.log("- apple-icon.png");
  console.log("- opengraph-image.png");
  console.log("- twitter-image.png");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});