"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { copy, messageUrl, site } from "@/content/site";
import { Baybayin } from "./Baybayin";
import { DayClock } from "./DayClock";
import { OpenBadge } from "./OpenBadge";
import { setScrollLock } from "./SmoothScroll";

/** The real time each section sits at on the day clock, read from the section copy. */
const navTime: Record<string, string> = {
  kape: copy.kape.time,
  menu: copy.menu.time,
  hardin: copy.hardin.time,
  gabi: copy.gabi.time,
  bisita: copy.bisita.time,
};

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    setScrollLock(open);
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      setScrollLock(false);
    };
  }, [open, close]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 60);
  };

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-8">
        <a href="#top" className="flex shrink-0 items-center" aria-label={`${site.name}, back to top`}>
          <Image src="/brand/badge.png" alt="" width={480} height={612} sizes="40px" className="h-12 w-auto" preload />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
          {copy.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="nav-link">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <DayClock />
          <OpenBadge compactLabel />
          <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn hidden lg:inline-flex">
            {copy.buttons.directions}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="menu-open on-dark fixed inset-0 z-[60] flex flex-col overflow-hidden bg-roast px-6 pb-8 pt-4 text-ink-on-dark"
        >
          <Baybayin className="pointer-events-none absolute -bottom-6 -right-10 w-[78vw] text-marigold opacity-[0.07]" />
          <div className="relative flex h-12 items-center justify-between">
            <Image src="/brand/badge.png" alt="" width={480} height={612} sizes="40px" className="h-12 w-auto" />
            <button type="button" className="grid h-12 w-12 place-items-center rounded-full" aria-label="Close menu" onClick={() => close()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Sections" className="relative mt-6 flex flex-col">
            {copy.nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                className="flex min-h-16 items-baseline justify-between gap-4 border-b border-ink-on-dark/15 py-4 active:bg-ink-on-dark/10"
              >
                <span className="t-h2">{n.label}</span>
                <span className="tabular text-[0.9375rem] font-semibold text-latte">{navTime[n.id]}</span>
              </a>
            ))}
          </nav>
          <div className="relative mt-auto flex flex-col gap-3 pt-8">
            <OpenBadge className="self-start" />
            <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-lg">
              {copy.buttons.directions}
            </a>
            <a href={messageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-ghost">
              Message us
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
