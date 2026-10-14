import { drinks, sweets, type PricelessItem } from "@/content/menu";
import { galleryLayout } from "@/content/gallery";
import { copy } from "@/content/site";
import { ParallaxPhoto } from "./ParallaxPhoto";
import { Photo } from "./Photo";
import { Rise } from "./Rise";

function List({ title, items }: { title: string; items: PricelessItem[] }) {
  return (
    <div>
      <h3 data-reveal className="t-h3 mb-3 border-b border-espresso/25 pb-2">{title}</h3>
      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.id} data-reveal className="py-1 text-[1.125rem] font-semibold leading-snug">
            {i.name}
            {i.note ? <span className="block text-[0.9375rem] font-normal text-espresso/75">{i.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Kape() {
  const [frappe, cheesecake] = galleryLayout.kape;
  return (
    <section
      id="kape"
      aria-labelledby="kape-h"
      className="seam on-light bg-sunwash pb-10 pt-24 text-espresso md:pb-24 md:pt-40"
      style={{ ["--from" as string]: "var(--color-night)", ["--to" as string]: "var(--color-sunwash)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-4 md:px-8 lg:grid-cols-[minmax(0,460px)_1fr]">
        <div className="order-1 lg:col-start-2 lg:row-start-1">
          <p data-reveal className="time-tag text-marigold-deep">{copy.kape.time}</p>
          <Rise id="kape-h" className="t-h2">
            {copy.kape.h2}
          </Rise>
          <p data-reveal className="t-lead measure mt-5">{copy.kape.body}</p>
        </div>

        <figure className="order-2 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <ParallaxPhoto photo={frappe} sizes="(min-width:1024px) 460px, 100vw" className="aspect-[3/4] rounded-card bg-latte" />
          <figcaption data-reveal className="t-small mt-3 text-espresso/80">{frappe.caption}</figcaption>
        </figure>

        <div className="order-3 flex flex-col gap-10 lg:col-start-2 lg:row-start-2 lg:flex-row-reverse lg:items-start">
          <figure className="ml-auto w-[70%] lg:mt-20 lg:w-[230px] lg:shrink-0">
            <div data-reveal="photo" className="relative aspect-[3/4] overflow-hidden rounded-card bg-latte">
              <Photo photo={cheesecake} sizes="(min-width:1024px) 230px, 70vw" />
            </div>
            <figcaption data-reveal className="t-small mt-3 text-espresso/80">{cheesecake.caption}</figcaption>
          </figure>
          <div className="flex flex-1 flex-col gap-8">
            <List title={copy.kape.drinksTitle} items={drinks} />
            <List title={copy.kape.sweetsTitle} items={sweets} />
            <p data-reveal className="t-small font-semibold text-marigold-deep">{copy.kape.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
