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
  title: copy.meta.title,
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
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Tinatangi Cafe garden at dusk under fairy lights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
    images: ["/opengraph-image.jpg"],
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
