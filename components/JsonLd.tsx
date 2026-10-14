import { photos } from "@/content/gallery";
import { hours } from "@/content/hours";
import { menuCategories } from "@/content/menu";
import { copy, site } from "@/content/site";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** One spec per distinct open/close pair, listing every weekday that shares it. Same data as the open/closed badge. */
function openingHoursSpecification() {
  const groups = new Map<string, { opens: string; closes: string; days: string[] }>();
  for (const h of hours) {
    if (!h.open || !h.close) continue;
    const closes = h.close === "24:00" ? "00:00" : h.close;
    const key = `${h.open}-${closes}`;
    const group = groups.get(key) ?? { opens: h.open, closes, days: [] };
    group.days.push(DAYS[h.weekday]);
    groups.set(key, group);
  }
  return [...groups.values()].map((g) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: g.days,
    opens: g.opens,
    closes: g.closes,
  }));
}

/** Derived from the priced menu items only (food). Omitted when there are no prices. */
function priceRange() {
  const prices = menuCategories.flatMap((c) => c.items.map((i) => i.price)).filter((p) => p > 0);
  if (prices.length === 0) return {};
  return { priceRange: `₱${Math.min(...prices)}–₱${Math.max(...prices)}` };
}

/** CafeOrCoffeeShop structured data. No review text, and no aggregateRating (self-serving ratings are not eligible). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}/#cafe`,
    name: site.name,
    description: copy.meta.description,
    url: site.url,
    image: [`${site.url}/opengraph-image.jpg`, `${site.url}${photos.duskCounter.src}`, `${site.url}${photos.facadeDay.src}`],
    logo: `${site.url}/brand/badge.png`,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.links.maps,
    openingHoursSpecification: openingHoursSpecification(),
    servesCuisine: ["Coffee", "Filipino", "Western"],
    menu: `${site.url}/#menu`,
    ...priceRange(),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pet-friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking lot", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor seating", value: true },
    ],
    sameAs: [site.links.facebook, site.links.instagram, site.links.maps],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
