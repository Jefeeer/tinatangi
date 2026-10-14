"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";
import { scrollToId, setLenis } from "@/lib/lenis";

/** Eased wheel scrolling and anchor glides. Native touch scroll stays. Off for reduced motion. */
export function setScrollLock(locked: boolean) {
  const d = document.documentElement.dataset;
  if (locked) d.lock = "1";
  else delete d.lock;
}

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: false, lerp: 0.09, smoothWheel: true, syncTouch: false });
    setLenis(lenis);

    // One clock: Lenis ticks inside Motion's frame loop, so useScroll reads the position Lenis just wrote.
    const tick = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(tick, true);

    const sync = () => (document.documentElement.dataset.lock ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lock"] });

    // In-page links (header, mobile menu, footer, chips): glide with the header offset.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.target === "_blank") return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      if (!id) return;
      if (id !== "top" && !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      mo.disconnect();
      cancelFrame(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);
  return null;
}
