// AA check for every text/background pair the design uses (WCAG 2.x relative luminance).
import { test } from "node:test";
import assert from "node:assert/strict";

const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [text, ground, minimum ratio, label]
const pairs: [string, string, number, string][] = [
  ["#2A140C", "#FBEBC8", 4.5, "espresso on sunwash"],
  ["#1F3FA8", "#FBEBC8", 4.5, "delft on sunwash"],
  ["#9A5B00", "#FBEBC8", 4.5, "marigold-deep on sunwash"],
  ["#2A140C", "#F7F9FC", 4.5, "espresso on plate"],
  ["#1F3FA8", "#F7F9FC", 4.5, "delft on plate"],
  ["#F7F9FC", "#1F3FA8", 4.5, "plate on delft (active chip)"],
  ["#2A140C", "#E8A03A", 4.5, "espresso on golden"],
  ["#F6EAD2", "#1E3A26", 4.5, "ink-on-dark on fern"],
  ["#F6EAD2", "#170D08", 4.5, "ink-on-dark on night"],
  ["#F6EAD2", "#3F1F13", 4.5, "ink-on-dark on roast"],
  ["#D8C7A6", "#170D08", 4.5, "latte on night"],
  ["#D8C7A6", "#3F1F13", 4.5, "latte on roast"],
  ["#F2A31B", "#170D08", 4.5, "marigold on night"],
  ["#2A140C", "#F2A31B", 4.5, "espresso on marigold (button)"],
  ["#FBEBC8", "#2A140C", 4.5, "sunwash on espresso (button on light)"],
];

for (const [fg, bg, min, label] of pairs) {
  test(`contrast ${label}`, () => {
    const r = ratio(fg, bg);
    assert.ok(r >= min, `${label}: ${r.toFixed(2)} < ${min}`);
  });
}
