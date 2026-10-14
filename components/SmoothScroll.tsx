"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Eased wheel scrolling and anchor jumps. Native touch scroll stays. Off for reduced motion. */
export function setScrollLock(locked: boolean) {
  const d = document.documentElement.dataset;
  if (locked) d.lock = "1";
  else delete d.lock;
}

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -64, duration: 1.4 },
    });
    const sync = () => (document.documentElement.dataset.lock ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lock"] });
    return () => {
      mo.disconnect();
      lenis.destroy();
    };
  }, []);
  return null;
}
