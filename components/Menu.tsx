import { askInStore, menuCategories, menuColumns } from "@/content/menu";
import { galleryLayout } from "@/content/gallery";
import { copy } from "@/content/site";
import { MenuChips } from "./MenuChips";
import { Photo } from "./Photo";
import { Rise } from "./Rise";

export function Menu() {
  const byId = new Map(menuCategories.map((c) => [c.id, c]));
  const cats = [...menuCategories].sort((a, b) => a.sort - b.sort);

  return (
    <section
      id="menu"
      aria-labelledby="menu-h"
      className="seam on-light bg-plate pb-20 pt-32 text-espresso md:pb-32 md:pt-48"
      style={{ ["--from" as string]: "var(--color-sunwash)", ["--to" as string]: "var(--color-plate)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="time-tag text-delft">{copy.menu.time}</p>
        <Rise id="menu-h" className="t-h2">
          {copy.menu.h2}
        </Rise>
        <p className="t-lead measure mt-5">{copy.menu.intro}</p>

        <MenuChips cats={cats.map((c) => ({ id: c.id, name: c.name }))} />

        <div className="mt-8 bg-white shadow-[0_30px_80px_rgba(42,20,12,0.12)] md:mt-12">
          <div className="plate-band" aria-hidden="true" />
          <div className="px-5 py-8 md:px-12 md:py-12">
            <p className="t-small mb-8 font-bold text-delft">{copy.menu.cardHeader}</p>
            <div className="grid gap-10 md:grid-cols-3 md:gap-12">
              {menuColumns.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-10">
                  {col.map((id) => {
                    const c = byId.get(id);
                    if (!c) return null;
                    return (
                      <div key={c.id} id={`cat-${c.id}`} className="scroll-mt-36">
                        <h3 className="t-h3 mb-5 inline-block border-b-2 border-delft pb-1">{c.name}</h3>
                        <ul className="flex flex-col gap-5">
                          {c.items.map((it) => (
                            <li key={it.id}>
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
            <p className="t-small mt-10 text-espresso/80">{copy.menu.footnote}</p>
          </div>
          <div className="plate-band" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-6 rounded-[6px] bg-latte/45 p-6 md:grid-cols-2 md:gap-12 md:p-10">
          <div>
            <h3 className="t-h3">{copy.menu.askTitle}</h3>
            <p className="t-small mt-3 text-espresso/85">{copy.menu.askLine}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {askInStore.map((i) => (
              <li key={i.id} className="rounded-full bg-plate px-4 py-2 text-[0.9375rem] font-semibold ring-1 ring-espresso/20">
                {i.name}
              </li>
            ))}
          </ul>
        </div>

        <div role="region" aria-label={copy.menu.railLabel} tabIndex={0} className="rail -mx-4 mt-14 px-4 pb-6 md:-mx-8 md:gap-10 md:px-8">
          {galleryLayout.plateRail.map((p) => (
            <figure key={p.id} className="w-[200px] md:w-[270px]">
              <div className="plate-rim">
                <div className="relative aspect-square overflow-hidden rounded-full bg-latte">
                  <Photo photo={p} sizes="(min-width:768px) 240px, 172px" />
                </div>
              </div>
              <figcaption className="t-small mt-4 max-w-[26ch] text-espresso/85">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
