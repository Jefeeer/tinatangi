import { nb } from "@/lib/text";
import { copy, messageUrl, ratingLine, site } from "@/content/site";
import { FairyLights } from "./FairyLights";
import { MapCard } from "./MapCard";
import { OpenBadge } from "./OpenBadge";
import { Rise } from "./Rise";

export function Bisita() {
  const b = copy.bisita;
  return (
    <section
      id="bisita"
      aria-labelledby="bisita-h"
      className="seam on-dark relative bg-night pb-20 pt-32 text-ink-on-dark md:pb-28 md:pt-36"
      style={{ ["--from" as string]: "var(--color-night)", ["--to" as string]: "var(--color-night)" }}
    >
      <FairyLights count={24} strings={2} seed={19} className="z-0 h-[150px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <p data-reveal className="time-tag text-glow">{b.time}</p>
        <Rise id="bisita-h" className="t-h2">
          {b.h2}
        </Rise>
        <p data-reveal className="t-lead measure mt-5">{b.body}</p>
        <div data-reveal className="mt-6">
          <OpenBadge size="lg" />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-10">
            <div data-reveal>
              <h3 className="t-h3">Hours</h3>
              <p className="mt-2">{nb(b.hoursLine)}</p>
            </div>
            <div data-reveal>
              <h3 className="t-h3">Address</h3>
              <p className="mt-2 max-w-[36ch]">{site.address.display}</p>
            </div>
            <div data-reveal>
              <h3 className="t-h3">{b.stepsTitle}</h3>
              <ol className="mt-3 flex flex-col gap-3">
                {b.steps.map((s, i) => (
                  <li key={s} data-reveal className="flex gap-4">
                    <span className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-full bg-marigold font-bold text-espresso" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 font-semibold text-glow">{b.parking}</p>
            </div>
            <div className="flex flex-col gap-4">
              <ul className="flex flex-wrap gap-3">
                <li data-reveal>
                  <a href={site.links.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-ink-on-dark">
                    Facebook · {site.social.facebookFollowers} followers
                  </a>
                </li>
                <li data-reveal>
                  <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-ink-on-dark">
                    Instagram · {site.links.instagramHandle}
                  </a>
                </li>
                {site.contact.phone ? (
                  <li data-reveal>
                    <a href={`tel:${site.contact.phone}`} className="btn btn-ghost text-ink-on-dark">
                      Call us
                    </a>
                  </li>
                ) : null}
                <li data-reveal>
                  <a href={messageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-ink-on-dark">
                    {site.contact.messenger ? "Message us" : "Message us on Facebook"}
                  </a>
                </li>
              </ul>
              <p data-reveal className="t-small text-latte">{ratingLine}</p>
            </div>
          </div>
          <div data-reveal>
            <MapCard />
          </div>
        </div>
      </div>
    </section>
  );
}
