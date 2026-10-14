"use client";

import { useRef, useState } from "react";
import { galleryLayout, photos } from "@/content/gallery";
import { copy } from "@/content/site";
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
        onClick={toggle}
        aria-label={shown ? pb.buttonAgain : pb.button}
        className="relative block aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[6px] bg-roast text-left"
      >
        {shown ? (
          <div className="absolute inset-0 grid place-items-center bg-latte">
            <div className="flex h-[92%] -rotate-2 flex-col gap-2 bg-plate p-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
              {galleryLayout.photoStrip.map((p) => (
                <div key={p.id} className="relative aspect-square flex-1 overflow-hidden bg-roast">
                  <Photo photo={p} alt="" sizes="160px" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Photo photo={photos.facadeDay} alt={pb.signAlt} sizes="(min-width:768px) 460px, 100vw" style={{ objectPosition: "55% 47%", transform: "scale(2.1)", transformOrigin: "55% 47%" }} />
        )}
        <span className="flash" data-fire={fire} aria-hidden="true" />
      </button>

      <div>
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
