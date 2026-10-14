"use client";

import { useEffect } from "react";

const STEP = 70; // ms between siblings entering together
const MAX_STEPS = 9;

/**
 * Scroll reveals for every [data-reveal] element, driven by one IntersectionObserver.
 * Server HTML is fully visible; elements below the fold are armed (data-rv="armed") after hydration,
 * released with data-rv="in", then the attribute is removed so normal styles take over.
 * Skipped entirely for reduced motion.
 */
export default function RevealEngine() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const pending = new Set<HTMLElement>();
    const timers = new Set<number>();

    const settle = (el: HTMLElement, delay: number) => {
      const t = window.setTimeout(() => {
        el.removeAttribute("data-rv");
        el.style.removeProperty("--rv-delay");
        timers.delete(t);
      }, delay + 1700);
      timers.add(t);
    };

    const release = (el: HTMLElement, delay: number) => {
      if (!pending.delete(el)) return;
      io.unobserve(el);
      if (delay < 0) {
        el.removeAttribute("data-rv"); // already scrolled past: no animation, just visible
        return;
      }
      el.style.setProperty("--rv-delay", `${delay}ms`);
      el.dataset.rv = "in";
      settle(el, delay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        entering.forEach((e, i) => release(e.target as HTMLElement, Math.min(i, MAX_STEPS) * STEP));
        for (const e of entries) if (!e.isIntersecting && e.boundingClientRect.bottom < 0) release(e.target as HTMLElement, -1);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92) continue; // on screen at load or above: leave visible
      el.dataset.rv = "armed";
      pending.add(el);
      io.observe(el);
    }

    // Keyboard focus inside a hidden element reveals it; page bottom reveals the rest (the last 8% never "intersects").
    const onFocus = (e: FocusEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-rv="armed"]');
      if (el) release(el, 0);
    };
    let raf = 0;
    const onScroll = () => {
      if (raf || !pending.size) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (scrollY + innerHeight < document.documentElement.scrollHeight - 4) return;
        let i = 0;
        for (const el of Array.from(pending)) if (el.getBoundingClientRect().top < innerHeight) release(el, Math.min(i++, MAX_STEPS) * STEP);
      });
    };
    document.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
      timers.forEach(clearTimeout);
      for (const el of els) {
        el.removeAttribute("data-rv");
        el.style.removeProperty("--rv-delay");
      }
    };
  }, []);
  return null;
}
