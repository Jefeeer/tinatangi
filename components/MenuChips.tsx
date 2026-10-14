"use client";

import { useEffect, useState } from "react";

type Cat = { id: string; name: string };

/** Mobile sticky chip bar with scroll-spy. Active state is a fill plus aria-current, not colour alone. */
export function MenuChips({ cats }: { cats: Cat[] }) {
  const [active, setActive] = useState(cats[0]?.id);

  useEffect(() => {
    const els = cats.map((c) => document.getElementById(`cat-${c.id}`)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("cat-", ""));
      },
      { rootMargin: "-130px 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cats]);

  return (
    <nav aria-label="Menu categories" className="sticky top-16 z-30 -mx-4 bg-plate px-4 py-3 md:hidden">
      <ul className="rail scroll-px-0 gap-2 py-1">
        {cats.map((c) => (
          <li key={c.id}>
            <a
              href={`#cat-${c.id}`}
              aria-current={active === c.id ? "true" : undefined}
              className={`inline-flex min-h-12 items-center rounded-full px-5 text-base font-semibold ring-1 ring-delft/40 ${
                active === c.id ? "bg-delft text-plate" : "bg-plate text-espresso"
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
