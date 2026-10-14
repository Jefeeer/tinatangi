import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { copy, site } from "@/content/site";
import "./globals.css";

// One family for the whole site; hierarchy comes from weight, size and tracking.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Concept previews stay out of search until the owner approves (set NEXT_PUBLIC_ALLOW_INDEXING=true at launch).
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: copy.meta.title, template: `%s | ${site.name}` },
  description: copy.meta.description,
  alternates: { canonical: "/" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: site.name,
    title: copy.meta.title,
    description: copy.meta.description,
    url: "/",
    // og:image / twitter:image come from app/opengraph-image.jpg and app/twitter-image.jpg (file convention wins over
    // an `images` field here), and their alt text from the matching *.alt.txt files.
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#170d08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <noscript>
          <style>{".hero{height:100svh;--r:3000px}.hero-chip-night{opacity:1}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
