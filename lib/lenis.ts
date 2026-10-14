import type Lenis from "lenis";

let inst: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  inst = l;
};

/** Glide to a section id (or the top) with the same offset native anchors use (scroll-padding on html, scroll-margin on the target). */
export function scrollToId(id: string) {
  const el = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !el) return;
  if (!inst) {
    if (el) el.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
    return;
  }
  if (!el) {
    inst.scrollTo(0, { duration: 1.4, force: true });
    return;
  }
  // Lenis subtracts the html scroll-padding-top and the target's scroll-margin-top itself, so no extra offset.
  inst.scrollTo(el, { duration: 1.4, force: true });
}
