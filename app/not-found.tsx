import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <main id="main" className="on-dark grid min-h-svh place-items-center bg-night px-6 py-16 text-center text-ink-on-dark">
      <div className="flex max-w-md flex-col items-center gap-5">
        <Image src="/brand/badge.png" alt="" width={480} height={612} sizes="96px" className="h-24 w-auto" />
        <h1 className="t-h2">Wala rito ang hinahanap mo.</h1>
        <p className="t-lead">We could not find that page. The garden is open daily, 7 AM to midnight.</p>
        <Link href="/" className="btn btn-lg">
          Back to {site.name}
        </Link>
      </div>
    </main>
  );
}
