// Generates the OG image and app icons from the photos and the transparent badge.
// Usage: node scripts/make-assets.mjs
import sharp from "sharp";

const badge = await sharp("public/brand/badge.png").resize({ height: 440 }).toBuffer();
const bm = await sharp(badge).metadata();

// OG 1200x630: dusk photo, espresso scrim on the left, badge + wordmark line
const scrim = Buffer.from(
  `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#170D08" stop-opacity=".92"/><stop offset=".55" stop-color="#170D08" stop-opacity=".45"/><stop offset="1" stop-color="#170D08" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`,
);
const text = Buffer.from(
  `<svg width="1200" height="630"><style>text{font-family:Arial,Helvetica,sans-serif;fill:#F6EAD2}</style>
   <text x="470" y="290" font-size="54" font-weight="800">Kape sa hardin.</text>
   <text x="470" y="345" font-size="28" fill="#D8C7A6" style="fill:#D8C7A6">Garden cafe in Salawag, Dasmariñas, Cavite</text>
   <text x="470" y="395" font-size="28" style="fill:#F2A31B">Open daily, 7 AM to 12 MN</text></svg>`,
);
await sharp("public/photos/dusk-counter.jpg")
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([
    { input: scrim },
    { input: badge, left: 70, top: Math.round((630 - bm.height) / 2) },
    { input: text },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("app/opengraph-image.jpg");
await sharp("app/opengraph-image.jpg").toFile("app/twitter-image.jpg");

// Icons: badge on transparent square
for (const [file, size] of [["app/icon.png", 512], ["app/apple-icon.png", 180]]) {
  const h = Math.round(size * 0.88);
  const b = await sharp("public/brand/badge.png").resize({ height: h }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: file.includes("apple") ? "#3F1F13" : { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: b, gravity: "centre" }])
    .png()
    .toFile(file);
}
console.log("assets ok");
