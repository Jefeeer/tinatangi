import { copy, messageUrl, site } from "@/content/site";

/** Mobile action bar. Slides in after the hero, hides in Bisita (CSS keyed to html[data-section]). */
export function BottomBar() {
  return (
    <div
      className="bottom-bar on-dark fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-ink-on-dark/10 bg-night/95 px-4 pt-3 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] backdrop-blur md:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-lg flex-[1.4]">
        {copy.buttons.directions}
      </a>
      <a href={messageUrl} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-ghost flex-1 text-ink-on-dark">
        Message us
      </a>
      {site.contact.phone ? (
        <a href={`tel:${site.contact.phone}`} className="btn btn-lg btn-ghost flex-1 text-ink-on-dark">
          Call
        </a>
      ) : null}
    </div>
  );
}
