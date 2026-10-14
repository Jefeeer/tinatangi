import Image from "next/image";
import { copy, site } from "@/content/site";
import { nb } from "@/lib/text";
import { Baybayin } from "./Baybayin";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-night pb-28 pt-4 text-ink-on-dark md:pb-10">
      <Baybayin className="pointer-events-none absolute -bottom-10 right-[-4%] w-[60vw] max-w-[560px] text-marigold opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="flex flex-col gap-8 border-t border-ink-on-dark/15 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Image src="/brand/badge.png" alt={site.name} width={480} height={612} sizes="56px" className="h-16 w-auto" />
            <div>
              <p className="t-h3">{site.name}</p>
              <p className="mt-1 text-[0.9375rem] text-latte">{nb(copy.footer.hours)}</p>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1">
            {copy.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="nav-link">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div data-reveal className="mt-10 flex flex-col gap-2 text-[0.9375rem] text-latte md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            <a href={site.credit.url} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-glow">
              {site.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
