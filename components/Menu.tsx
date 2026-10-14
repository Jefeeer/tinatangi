import { askInStore, menuCategories, menuColumns } from "@/content/menu";
import { galleryLayout } from "@/content/gallery";
import { copy } from "@/content/site";
import { DragScroll } from "./DragScroll";
import { MenuChips } from "./MenuChips";
import { Photo } from "./Photo";
import { Rise } from "./Rise";

export function Menu() {
  const byId = new Map(menuCategories.map((c) => [c.id, c]));
  const cats = [...menuCategories].sort((a, b) => a.sort - b.sort);
  const [cardTitle, ...rest] = copy.menu.cardHeader.split(". ");
  const cardNote = rest.join(". ");

  return (
    <section
      id="menu"
      aria-labelledby="menu-h"
      className="seam on-light bg-plate pb-12 pt-24 text-espresso md:pb-28 md:pt-40"
      style={{ ["--from" as string]: "var(--color-sunwash)", ["--to" as string]: "var(--color-plate)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p data-reveal className="time-tag text-delft">{copy.menu.time}</p>
        <Rise id="menu-h" className="t-h2">
          {copy.menu.h2}
        </Rise>
        <p data-reveal className="t-lead measure mt-5">{copy.menu.intro}</p>

        {/* chips and card share a wrapper so the sticky chip bar lets go when the card ends */}
        <div className="mt-8 md:mt-12">
        <MenuChips cats={cats.map((c) => ({ id: c.id, name: c.name }))} />

        <div className="mt-4 overflow-hidden rounded-card bg-white shadow-paper md:mt-0">
          <div className="plate-band" aria-hidden="true" />
          <div className="px-5 py-8 md:px-12 md:py-12">
            <div data-reveal className="mb-8 flex items-baseline justify-between gap-4 border-b border-delft/25 pb-4">
              <p className="t-h3 text-delft">{cardTitle}</p>
              <p className="t-small font-semibold text-espresso/80">{cardNote}</p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-12">
              {menuColumns.map((col, ci) => (
                <div key={ci} className={`flex flex-col gap-10 ${ci === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  {col.map((id) => {
                    const c = byId.get(id);
                    if (!c) return null;
                    return (
                      <div key={c.id} id={`cat-${c.id}`} className="scroll-mt-20">
                        <h3 data-reveal className="t-h3 mb-5 inline-block border-b-2 border-delft pb-1">{c.name}</h3>
                        <ul className={ci === 2 ? "flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-x-10 lg:flex" : "flex flex-col gap-1"}>
                          {c.items.map((it) => (
                            <li key={it.id} data-reveal className="menu-row">
                              <div className="flex items-baseline gap-2">
                                <span className="font-semibold">{it.name}</span>
                                <span className="min-w-6 flex-1 border-b-2 border-dotted border-espresso/35" aria-hidden="true" />
                                <span className="tabular font-bold">{it.price}</span>
                              </div>
                              {it.description ? <p className="t-small mt-1 max-w-[40ch] text-espresso/80">{it.description}</p> : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <p data-reveal className="t-small mt-10 text-espresso/80">{copy.menu.footnote}</p>
          </div>
          <div className="plate-band" aria-hidden="true" />
        </div>
        </div>

        <div data-reveal className="mt-10 grid gap-6 rounded-card bg-latte/45 p-6 md:grid-cols-2 md:gap-12 md:p-10">
          <div>
            <h3 className="t-h3">{copy.menu.askTitle}</h3>
            <p className="t-small mt-3 text-espresso/85">{copy.menu.askLine}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {askInStore.map((i) => (
              <li key={i.id} data-reveal className="rounded-full bg-plate px-4 py-2 text-[0.9375rem] font-semibold ring-1 ring-espresso/20">
                {i.name}
              </li>
            ))}
          </ul>
        </div>

        <DragScroll role="region" aria-label={copy.menu.railLabel} tabIndex={0} className="rail rail-fade -mx-4 mt-14 px-4 pb-6 md:-mx-8 md:gap-10 md:px-8">
          {galleryLayout.plateRail.map((p) => (
            <figure key={p.id} data-reveal="pop" className="plate-fig w-[200px] md:w-[230px] xl:w-[240px]">
              <div className="plate-rim">
                <div className="relative aspect-square overflow-hidden rounded-full bg-latte">
                  <Photo photo={p} sizes="(min-width:768px) 210px, 172px" />
                </div>
              </div>
              <figcaption data-reveal className="t-small mt-4 max-w-[26ch] text-espresso/85">{p.caption}</figcaption>
            </figure>
          ))}
        </DragScroll>
      </div>
    </section>
  );
}
