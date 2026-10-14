import { galleryLayout } from "@/content/gallery";
import { copy, messageUrl } from "@/content/site";
import { FairyLights } from "./FairyLights";
import { NightRail } from "./NightRail";
import { Photobooth } from "./Photobooth";
import { Rise } from "./Rise";

export function Gabi() {
  const ev = copy.gabi.events;
  return (
    <section
      id="gabi"
      aria-labelledby="gabi-h"
      className="seam on-dark relative bg-gradient-to-b from-fern to-night pb-20 pt-28 text-ink-on-dark md:pb-32 md:pt-44"
      style={{ ["--from" as string]: "var(--color-golden)", ["--to" as string]: "var(--color-fern)" }}
    >
      <FairyLights count={36} strings={3} seed={3} className="z-0" />
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="time-tag text-glow">{copy.gabi.time}</p>
          <Rise id="gabi-h" className="t-h2">
            {copy.gabi.h2}
          </Rise>
          <p className="t-lead measure mt-5 text-ink-on-dark">{copy.gabi.body}</p>
        </div>

        <div className="mt-12 md:mt-16">
          <NightRail items={galleryLayout.nightRail} label={copy.gabi.railLabel} />
        </div>

        <div className="mx-auto mt-20 max-w-7xl px-4 md:mt-28 md:px-8">
          <Photobooth />
        </div>

        <div className="mx-auto mt-20 max-w-7xl px-4 md:mt-28 md:px-8">
          <div className="bg-roast">
            <div className="plate-band" aria-hidden="true" />
            <div className="flex flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
              <div>
                <h3 className="t-h3">{ev.h3}</h3>
                <p className="mt-3 max-w-[44ch] text-ink-on-dark/90">{ev.body}</p>
              </div>
              <a href={messageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-lg shrink-0 self-start md:self-auto">
                {ev.button}
              </a>
            </div>
            <div className="plate-band" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
