import { copy, messageUrl, site } from "@/content/site";

/** Mobile action bar. Slides in after the hero, hides in Bisita (CSS keyed to html[data-section]). */
export function BottomBar() {
  return (
    <div
      className="bottom-bar on-dark fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t min-[400px]:gap-3 border-ink-on-dark/10 bg-night/95 px-4 pt-3 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] backdrop-blur md:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-lg flex-auto whitespace-nowrap max-[399px]:px-3 max-[359px]:text-[0.9375rem]">
        <span className="min-[400px]:hidden">Directions</span>
        <span className="hidden min-[400px]:inline">{copy.buttons.directions}</span>
      </a>
      <a href={messageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-ghost flex-auto whitespace-nowrap text-ink-on-dark max-[399px]:px-3 max-[359px]:text-[0.9375rem]">
        <span className="min-[400px]:hidden">Message</span>
        <span className="hidden min-[400px]:inline">Message us</span>
      </a>
      {site.contact.phone ? (
        <a href={`tel:${site.contact.phone}`} className="btn btn-lg btn-ghost flex-auto whitespace-nowrap text-ink-on-dark max-[399px]:px-3 max-[359px]:text-[0.9375rem]">
          Call
        </a>
      ) : null}
    </div>
  );
}
