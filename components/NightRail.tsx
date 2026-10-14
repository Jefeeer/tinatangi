import type { Photo as PhotoData } from "@/content/gallery";
import { Photo } from "./Photo";

/**
 * Full-bleed photo marquee that glides on its own. The set is rendered twice and the track
 * moves by exactly one set, so the loop is seamless. Pauses on hover/focus; with reduced
 * motion it falls back to a still, swipeable rail.
 */
export function NightRail({ items, label }: { items: readonly PhotoData[]; label: string }) {
  const set = (clone: boolean) =>
    items.map((p) => (
      <figure key={(clone ? "c-" : "") + p.id} aria-hidden={clone || undefined} className="marquee-item w-[72vw] max-w-[440px] md:w-[34vw]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-roast">
          <Photo photo={p} sizes="(min-width:768px) 34vw, 72vw" />
        </div>
        <figcaption className="t-small mt-3 text-ink-on-dark/90">{p.caption}</figcaption>
      </figure>
    ));

  return (
    <div role="region" aria-label={label} data-reveal className="marquee pb-4" style={{ ["--marquee-dur" as string]: `${items.length * 9}s` }}>
      <div className="marquee-track">
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}
