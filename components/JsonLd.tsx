import { hours } from "@/content/hours";
import { site } from "@/content/site";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** CafeOrCoffeeShop structured data. No review text, and no aggregateRating (self-serving ratings are not eligible). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}/#cafe`,
    name: site.name,
    url: site.url,
    image: [`${site.url}/opengraph-image.jpg`, `${site.url}/brand/badge.png`],
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
    openingHoursSpecification: hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS[h.weekday],
        opens: h.open,
        closes: h.close === "24:00" ? "00:00" : h.close,
      })),
    sameAs: [site.links.facebook, site.links.instagram],
    petsAllowed: true,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
