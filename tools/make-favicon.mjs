import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// sorgente: il tuo PNG (può essere anche 512, ci pensa sharp)
const src = path.join(root, "public", "icon.png");
const out = path.join(root, "public", "favicon.ico");

if (!fs.existsSync(src)) {
  console.error("ERRORE: manca il file sorgente:", src);
  console.error("Metti il logo qui: public/icon.png");
  process.exit(1);
}

async function pngBuffer(size) {
  // ICO supporta 256 come max (256 nel formato è speciale, ma to-ico lo gestisce)
  return sharp(src)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function run() {
  // set classico multi-size
  const sizes = [256, 128, 64, 32, 16];
  const buffers = [];

  for (const s of sizes) {
    buffers.push(await pngBuffer(s));
  }

  const ico = await toIco(buffers);
  fs.writeFileSync(out, ico);

  console.log("OK ✅ favicon creata:", out);
  console.log("Usati sizes:", sizes.join(", "));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});