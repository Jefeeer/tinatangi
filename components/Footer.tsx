import Image from "next/image";
import { copy, site } from "@/content/site";
import { Baybayin } from "./Baybayin";

export function Footer() {
  return (
    <footer className="on-dark bg-night pb-28 pt-4 text-ink-on-dark md:pb-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-6 border-t border-ink-on-dark/15 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Image src="/brand/badge.png" alt={site.name} width={480} height={612} sizes="56px" className="h-16 w-auto" />
            <Baybayin className="w-24 text-marigold opacity-70" />
          </div>
          <p className="font-semibold">{copy.footer.hours}</p>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-[0.9375rem] text-latte md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            <a href={site.credit.url} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-glow">
              {site.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
