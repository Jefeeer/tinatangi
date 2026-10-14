"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { photos } from "@/content/gallery";
import { copy, site } from "@/content/site";
import { clamp } from "@/lib/day";
import { nb } from "@/lib/text";
import { Baybayin } from "./Baybayin";
import { Photo } from "./Photo";

const WIPE_END = 0.9; // fraction of the sticky travel at which the circle has covered the stage

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reach = useRef(1400);
  const reduce = useRef(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const apply = (p: number) => {
    const el = ref.current;
    if (!el || reduce.current) return;
    const t = clamp(p / WIPE_END);
    const ring = clamp(Math.min(p / 0.08, (WIPE_END - p) / 0.15));
    el.style.setProperty("--r", `${(reach.current * t).toFixed(1)}px`);
    el.style.setProperty("--t", t.toFixed(3));
    el.style.setProperty("--ring", ring.toFixed(3));
    el.style.setProperty("--chip-night", clamp((p - 0.3) / 0.3).toFixed(3));
  };

  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => {
      // farthest corner from the bottom-centre, plus the soft edge
      reach.current = Math.hypot(innerWidth / 2, innerHeight) + 100;
      apply(scrollYProgress.get());
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- apply only reads refs
  }, []);

  return (
    <section id="hero" ref={ref} className="hero on-dark relative" aria-label="Welcome">
      <div className="sticky top-0 h-svh overflow-hidden bg-night text-ink-on-dark">
        <div className="hero-in absolute inset-0">
          <div className="hero-a absolute inset-0">
            <Photo photo={photos.facadeDay} alt={copy.hero.morningAlt} sizes="100vw" preload className="object-[62%_45%] md:object-[50%_40%]" />
          </div>
          <div className="hero-dim absolute inset-0" aria-hidden="true" />
        </div>
        <div className="hero-mask absolute inset-0">
          <div className="hero-b absolute inset-0">
            <Photo photo={photos.duskCounter} alt={copy.hero.nightAlt} sizes="100vw" preload className="object-[50%_55%]" />
          </div>
        </div>
        <div className="hero-ring absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/45 to-transparent to-55%" aria-hidden="true" />
        <Baybayin className="absolute -right-6 top-20 w-[62vw] max-w-[620px] text-marigold opacity-[0.06] md:right-6 md:top-24" />

        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-8 md:px-8 md:pb-12">
          <h1 className="t-h1">
            {copy.hero.h1.map((line) => (
              <span key={line} className="rise-mask rise-load">
                <span className="rise-inner">{line}</span>
              </span>
            ))}
          </h1>
          <p className="t-lead max-w-[46ch] text-ink-on-dark">{nb(copy.hero.lead)}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-lg">
              {copy.buttons.directions}
            </a>
            <a href="#menu" className="link text-ink-on-dark">
              {copy.buttons.seeMenu}
            </a>
          </div>
          <div className="flex items-end justify-between gap-3 pt-2">
            <span className="rounded-full bg-night/70 px-4 py-2 text-[0.9375rem] font-semibold text-ink-on-dark ring-1 ring-ink-on-dark/25 backdrop-blur-sm">
              {copy.hero.chipMorning}
            </span>
            <span className="hidden items-center gap-3 text-[0.9375rem] text-ink-on-dark/90 md:flex" aria-hidden="true">
              <span className="block h-px w-12 bg-ink-on-dark/60" />
              {copy.hero.cue}
            </span>
            <span className="hero-chip-night rounded-full bg-night/70 px-4 py-2 text-[0.9375rem] font-semibold text-ink-on-dark ring-1 ring-ink-on-dark/25 backdrop-blur-sm">
              {copy.hero.chipNight}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
