"use client";

import { useEffect, useRef, useState } from "react";

type Tag = "h1" | "h2" | "h3";

/** Heading that rises once from a clip mask when it scrolls into view. Visible without JS and for reduced motion. */
export function Rise({ as: Tag = "h2", className = "", children, id }: { as?: Tag; className?: string; children: React.ReactNode; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * 0.9 && r.bottom > 0) return; // already on screen: leave it
    const raf = requestAnimationFrame(() => setState("armed"));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const cls = state === "idle" ? "" : state === "armed" ? "rise-armed" : "rise-armed rise-in";
  return (
    <Tag ref={ref} id={id} className={`${className} ${cls}`}>
      <span className="rise-mask">
        <span className="rise-inner">{children}</span>
      </span>
    </Tag>
  );
}
