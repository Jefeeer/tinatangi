"use client";

import { useEffect, useRef } from "react";

/**
 * Native horizontal scroller that a mouse can also drag (touch already swipes natively).
 * A drag of more than a few pixels swallows the click that follows it.
 */
export function DragScroll({ className = "", children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    let active = false;
    let id = -1;

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      active = true;
      moved = 0;
      id = e.pointerId;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!active || e.pointerId !== id) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 4 && !el.hasPointerCapture(id)) {
        el.setPointerCapture(id);
        el.dataset.dragging = "1";
      }
      el.scrollLeft = startLeft - dx;
    };
    const up = (e: PointerEvent) => {
      if (!active || e.pointerId !== id) return;
      active = false;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(id)) el.releasePointerCapture(id);
    };
    const click = (e: MouseEvent) => {
      if (moved > 4) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };
    const noGhost = (e: DragEvent) => e.preventDefault(); // stop the browser's own image drag

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    el.addEventListener("dragstart", noGhost);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("dragstart", noGhost);
    };
  }, []);

  return (
    <div ref={ref} className={`drag-scroll ${className}`} {...rest}>
      {children}
    </div>
  );
}
