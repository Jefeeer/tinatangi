"use client";

import { useEffect, useRef } from "react";
import type { Photo as PhotoData } from "@/content/gallery";
import { Photo } from "./Photo";

const SPEED = 40; // px per second of auto-glide

/**
 * Full-bleed photo marquee. It glides on its own and can be dragged with a mouse or a finger.
 * The set is rendered twice and the offset wraps by one set width, so the loop is seamless.
 * Hover pauses the glide; reduced motion turns the glide off but keeps dragging.
 */
export function NightRail({ items, label }: { items: readonly PhotoData[]; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const tr = track.current;
    if (!el || !tr) return;
    const auto = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let vel = 0;
    let last = performance.now();
    let raf = 0;
    let visible = false;
    let hovering = false;
    let dragging = false;
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let moved = 0;
    let id = -1;

    const wrap = () => {
      const w = tr.scrollWidth / 2;
      if (w <= 0) return;
      x %= w;
      if (x > 0) x -= w;
    };
    const paint = () => {
      tr.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) {
        if (Math.abs(vel) > 5) {
          x += vel * dt; // a throw carries on and settles
          vel *= Math.pow(0.04, dt);
        } else {
          vel = 0;
          if (auto && !hovering) x -= SPEED * dt;
        }
      }
      wrap();
      paint();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      moved = 0;
      id = e.pointerId;
      vel = 0;
      startX = lastX = e.clientX;
      startOffset = x;
      lastT = performance.now();
    };
    const move = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== id) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 4 && !el.hasPointerCapture(id)) {
        el.setPointerCapture(id);
        el.dataset.dragging = "1";
      }
      const now = performance.now();
      if (now > lastT) vel = ((e.clientX - lastX) / (now - lastT)) * 1000;
      lastX = e.clientX;
      lastT = now;
      x = startOffset + dx;
    };
    const up = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== id) return;
      dragging = false;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(id)) el.releasePointerCapture(id);
      if (performance.now() - lastT > 80) vel = 0;
    };
    const click = (e: MouseEvent) => {
      if (moved > 4) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };
    const noGhost = (e: DragEvent) => e.preventDefault();
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const leave = () => {
      hovering = false;
    };

    // only animate while the rail is on screen
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("click", click, true);
    el.addEventListener("dragstart", noGhost);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("click", click, true);
      el.removeEventListener("dragstart", noGhost);
    };
  }, []);

  const set = (clone: boolean) =>
    items.map((p) => (
      <figure key={(clone ? "c-" : "") + p.id} aria-hidden={clone || undefined} className="marquee-item w-[72vw] max-w-[440px] md:w-[34vw]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-roast">
          <Photo photo={p} sizes="(min-width:768px) 34vw, 72vw" />
        </div>
        <figcaption className="t-small mt-3 text-ink-on-dark/90">{p.caption}</figcaption>
      </figure>
    ));

  return (
    <div ref={box} role="region" aria-label={label} data-reveal className="marquee drag-scroll pb-4">
      <div ref={track} className="marquee-track">
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}
