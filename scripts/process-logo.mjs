// One-off asset prep: transparent badge PNG + traced Baybayin SVG from the source logo.
// Usage: node scripts/process-logo.mjs <path-to-logo.jpg>
import sharp from "sharp";
import potrace from "potrace";
import { writeFileSync } from "node:fs";

const src = process.argv[2];
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = (x, y) => (y * W + x) * 4;
const isWhite = (i) => Math.min(data[i], data[i + 1], data[i + 2]) > 238;

// flood fill white from borders -> transparent (keeps white lettering inside the badge)
const seen = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) { stack.push(x, 0, x, H - 1); }
for (let y = 0; y < H; y++) { stack.push(0, y, W - 1, y); }
while (stack.length) {
  const y = stack.pop(), x = stack.pop();
  if (x < 0 || y < 0 || x >= W || y >= H || seen[y * W + x]) continue;
  if (!isWhite(px(x, y))) continue;
  seen[y * W + x] = 1;
  stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
}
// soften the edge: opaque pixels touching the background get alpha by how light they are
const out = Buffer.from(data);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = px(x, y);
  if (seen[y * W + x]) { out[i + 3] = 0; continue; }
  let edge = false;
  for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < W && ny < H && seen[ny * W + nx]) edge = true;
  }
  if (edge) {
    const lum = Math.min(data[i], data[i + 1], data[i + 2]);
    out[i + 3] = Math.round(255 * Math.min(1, Math.max(0.25, (250 - lum) / 40)));
  }
}
const full = sharp(out, { raw: { width: W, height: H, channels: 4 } });
const t0 = await full.clone().trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
const trimmed = { info: t0.info, data: await sharp(t0.data, { raw: { width: t0.info.width, height: t0.info.height, channels: t0.info.channels } }).png().toBuffer() };
console.log("badge", trimmed.info.width, trimmed.info.height);
await sharp(trimmed.data).resize({ height: 640 }).png({ compressionLevel: 9, palette: false }).toFile("public/brand/badge.png");
await sharp(trimmed.data).resize({ height: 640 }).webp({ quality: 92, alphaQuality: 100 }).toFile("public/brand/badge.webp");

// Baybayin: amber glyphs in the top band
const crop = { left: 185, top: 115, width: 360, height: 110 };
const reg = await sharp(src).extract(crop).raw().toBuffer({ resolveWithObject: true });
const bw = Buffer.alloc(crop.width * crop.height * 3, 255);
for (let p = 0; p < crop.width * crop.height; p++) {
  const r = reg.data[p * reg.info.channels], g = reg.data[p * reg.info.channels + 1], b = reg.data[p * reg.info.channels + 2];
  const amber = r > 170 && g > 90 && g < 200 && b < 90;
  if (amber) { bw[p * 3] = bw[p * 3 + 1] = bw[p * 3 + 2] = 0; }
}
const png = await sharp(bw, { raw: { width: crop.width, height: crop.height, channels: 3 } }).resize({ width: crop.width * 4, kernel: "lanczos3" }).blur(1.2).png().toBuffer();
await new Promise((res, rej) => {
  potrace.trace(png, { threshold: 140, turdSize: 20, optTolerance: 0.4, color: "currentColor", background: "transparent" }, (err, svg) => {
    if (err) return rej(err);
    writeFileSync("public/brand/baybayin.svg", svg);
    res();
  });
});
