"use client";

import { useRef, useState } from "react";
import { galleryLayout, photos } from "@/content/gallery";
import { copy, site } from "@/content/site";
import { Photo } from "./Photo";

/** Tap the button or the photo: white flash, then the sign swaps to a 3-frame photo strip. Second tap resets. */
export function Photobooth() {
  const [shown, setShown] = useState(false);
  const [fire, setFire] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const pb = copy.gabi.photobooth;

  const toggle = () => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      setFire(false);
      requestAnimationFrame(() => setFire(true));
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setFire(false), 320);
    }
    setShown((s) => !s);
  };

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <button
        type="button"
        data-reveal="photo"
        onClick={toggle}
        aria-label={shown ? pb.buttonAgain : pb.button}
        className="relative block aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-card bg-roast text-left active:brightness-90"
      >
        {shown ? (
          <div className="absolute inset-0 grid place-items-center bg-latte">
            <div className="strip-drop flex h-[92%] flex-col gap-2 bg-plate p-2.5 shadow-lift">
              {galleryLayout.photoStrip.map((p) => (
                <div key={p.id} className="relative aspect-square flex-1 overflow-hidden bg-roast">
                  <Photo photo={p} alt="" sizes="160px" />
                </div>
              ))}
              <p className="pt-0.5 text-center text-[0.9375rem] font-bold leading-none text-espresso whitespace-nowrap">{site.name}</p>
            </div>
          </div>
        ) : (
          <Photo photo={photos.facadeDay} alt={pb.signAlt} sizes="(min-width:768px) 460px, 100vw" style={{ objectPosition: "55% 47%", transform: "scale(2.1)", transformOrigin: "55% 47%" }} />
        )}
        <span className="flash" data-fire={fire} aria-hidden="true" />
      </button>

      <div data-reveal>
        <h3 className="t-h3">{pb.h3}</h3>
        <p className="mt-3 max-w-[40ch] text-ink-on-dark/90">{pb.body}</p>
        <button type="button" onClick={toggle} className="btn btn-lg mt-6">
          {shown ? pb.buttonAgain : pb.button}
        </button>
        <p className="sr-only-live" aria-live="polite">
          {shown ? pb.announce : ""}
        </p>
      </div>
    </div>
  );
}
