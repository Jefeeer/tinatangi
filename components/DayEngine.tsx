"use client";

import { useEffect } from "react";
import { SECTION_ANCHORS, clamp, dayStore, minutesAt } from "@/lib/day";

const IDS = ["hero", "kape", "menu", "hardin", "gabi", "bisita"] as const;

/**
 * One scroll listener for the whole day cycle. It writes plain DOM state (no React renders):
 *  - html[data-section]  which section is under the reading line (header colour, bottom bar, clock chip)
 *  - --lights            fairy-light brightness (rises through Hardin, full in Gabi, dims to 35% by the end of Bisita)
 *  - dayStore            clock minutes for the header chip (5-minute steps; jumps by section for reduced motion)
 */
export default function DayEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let tops: number[] = [];
    let bottoms: number[] = [];
    let raf = 0;

    const measure = () => {
      const y = window.scrollY;
      const els = IDS.map((id) => document.getElementById(id));
      tops = els.map((el) => (el ? el.getBoundingClientRect().top + y : Infinity));
      bottoms = els.map((el) => (el ? el.getBoundingClientRect().bottom + y : Infinity));
    };

    const update = () => {
      raf = 0;
      if (!tops.length || tops.some((t) => !Number.isFinite(t))) return;
      const y = window.scrollY;
      const probe = y + innerHeight * 0.4;

      let idx = 0;
      for (let i = 0; i < IDS.length; i++) if (tops[i] <= probe) idx = i;
      const section = IDS[idx];
      if (root.dataset.section !== section) root.dataset.section = section;

      // clock
      const anchorTops = tops.slice(1); // kape..bisita
      const raw = reduce.matches ? (idx === 0 ? SECTION_ANCHORS[0].minutes : SECTION_ANCHORS[idx - 1].minutes) : minutesAt(probe, anchorTops);
      dayStore.set(Math.round(raw / 5) * 5);

      // lights
      if (!reduce.matches) {
        const [, , , hTop, gTop, bTop] = tops;
        const hH = bottoms[3] - hTop;
        const gH = bottoms[4] - gTop;
        const bH = bottoms[5] - bTop;
        let v = 0;
        if (probe >= hTop + hH * 0.5 && probe < gTop) v = 0.7 * clamp((probe - (hTop + hH * 0.5)) / (gTop - (hTop + hH * 0.5)));
        else if (probe >= gTop && probe < bTop) v = 0.7 + 0.3 * clamp((probe - gTop) / (gH * 0.3));
        else if (probe >= bTop) v = 1 - 0.65 * clamp((probe - bTop) / bH);
        root.style.setProperty("--lights", v.toFixed(3));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    root.dataset.js = "1";
    remeasure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    // images and fonts shift layout after first paint
    window.addEventListener("load", remeasure);
    const t = window.setTimeout(remeasure, 800);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      ro.disconnect();
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
