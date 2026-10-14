"use client";

import { useEffect, useRef, useState } from "react";

type Cat = { id: string; name: string };

/** Mobile sticky chip bar with scroll-spy. Active state is a fill plus aria-current, not colour alone. */
export function MenuChips({ cats }: { cats: Cat[] }) {
  const [active, setActive] = useState(cats[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  // The active category is the last one whose top has passed the reading line under the sticky bars.
  useEffect(() => {
    const els = cats.map((c) => [c.id, document.getElementById(`cat-${c.id}`)] as const).filter((e): e is readonly [string, HTMLElement] => !!e[1]);
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = els[0]?.[0];
      for (const [id, el] of els) if (el.getBoundingClientRect().top <= 190) current = id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cats]);

  // Keep the active chip in view inside the bar (horizontal only, never moves the page).
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !chip) return;
    const left = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
    list.scrollTo({ left, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav aria-label="Menu categories" className="sticky top-16 z-30 -mx-4 bg-plate/95 px-4 py-3 backdrop-blur md:hidden">
      <ul ref={listRef} className="rail scroll-px-0 gap-2 py-1">
        {cats.map((c) => (
          <li key={c.id}>
            <a
              href={`#cat-${c.id}`}
              aria-current={active === c.id ? "true" : undefined}
              className={`inline-flex min-h-12 items-center rounded-full px-5 text-base font-semibold ring-1 transition-colors duration-200 ${
                active === c.id ? "bg-delft text-plate ring-delft" : "bg-plate text-espresso ring-delft/40"
              }`}
            >
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
