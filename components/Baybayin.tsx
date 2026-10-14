import { BAYBAYIN_PATH, BAYBAYIN_VIEWBOX } from "./baybayin-path";

/** Ghost mark traced from the logo's four Baybayin glyphs. Decorative; no transliteration is printed. */
export function Baybayin({ className }: { className?: string }) {
  return (
    <svg viewBox={BAYBAYIN_VIEWBOX} className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d={BAYBAYIN_PATH} />
    </svg>
  );
}
