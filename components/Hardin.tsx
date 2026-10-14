import { photos } from "@/content/gallery";
import { copy } from "@/content/site";
import { FairyLights } from "./FairyLights";
import { ParallaxPhoto } from "./ParallaxPhoto";
import { Rise } from "./Rise";

export function Hardin() {
  return (
    <section
      id="hardin"
      aria-labelledby="hardin-h"
      className="seam on-light on-golden relative bg-golden pb-28 pt-32 text-espresso md:pb-40 md:pt-48"
      style={{ ["--from" as string]: "var(--color-plate)", ["--to" as string]: "var(--color-golden)" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-8 lg:grid-cols-12 lg:gap-16">
        <ParallaxPhoto
          photo={photos.duskCounter}
          sizes="(min-width:1024px) 700px, 100vw"
          position="6% 50%"
          className="aspect-[4/5] rounded-[6px] bg-roast lg:col-span-7 lg:aspect-[4/5]"
        />
        <div className="lg:col-span-5">
          <p className="time-tag">{copy.hardin.time}</p>
          <Rise id="hardin-h" className="t-h2">
            {copy.hardin.h2}
          </Rise>
          <p className="t-lead measure mt-5">{copy.hardin.body}</p>
          <ul className="mt-8 border-t border-delft/70">
            {copy.hardin.facts.map((f) => (
              <li key={f} className="border-b border-delft/70 py-4 text-[1.125rem] font-semibold">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <FairyLights flip count={18} strings={2} seed={11} className="h-[150px]" />
    </section>
  );
}
