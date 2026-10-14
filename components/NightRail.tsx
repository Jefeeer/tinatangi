"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo as PhotoData } from "@/content/gallery";
import { Photo } from "./Photo";

/** Full-bleed horizontal rail. Native scroll-snap and swipe; prev/next buttons for keyboard and mouse. */
export function NightRail({ items, label }: { items: readonly PhotoData[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("figure");
    const w = (card?.offsetWidth ?? 320) + 16;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * w, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div>
      <div ref={ref} role="region" aria-label={label} tabIndex={0} data-lenis-prevent-wheel className="rail px-4 pb-4 md:px-8">
        {items.map((p) => (
          <figure key={p.id} className="w-[78vw] max-w-[460px] md:w-[38vw]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-roast">
              <Photo photo={p} sizes="(min-width:768px) 38vw, 78vw" />
            </div>
            <figcaption className="t-small mt-3 text-ink-on-dark/90">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mx-auto mt-4 flex max-w-7xl justify-end gap-3 px-4 md:px-8">
        <button type="button" onClick={() => !edge.start && step(-1)} aria-label="Previous photo" aria-disabled={edge.start} className="btn btn-ghost h-12 w-12 !min-h-12 !p-0 text-ink-on-dark aria-disabled:opacity-35">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button type="button" onClick={() => !edge.end && step(1)} aria-label="Next photo" aria-disabled={edge.end} className="btn btn-ghost h-12 w-12 !min-h-12 !p-0 text-ink-on-dark aria-disabled:opacity-35">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
