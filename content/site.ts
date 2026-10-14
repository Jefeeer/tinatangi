// Everything the owner may edit about the business lives in /content.
// Shapes mirror future Supabase tables: site_settings (this file), menu_*, opening_hours, gallery_photos.

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  url: string;
  address: { street: string; locality: string; region: string; postalCode: string; country: string; display: string };
  geo: { lat: number; lng: number; placeId: string };
  links: { facebook: string; instagram: string; instagramHandle: string; maps: string; directions: string };
  /** Unknown contact details stay null; the UI hides the matching buttons. */
  contact: { phone: string | null; messenger: string | null; email: string | null };
  social: { facebookFollowers: string };
  rating: { value: number; count: number; source: string };
  credit: { label: string; url: string };
};

const lat = 14.349625;
const lng = 120.973709;
const placeId = "ChIJceCJjALVlzMR9YMT7sRO89I";

export const site: SiteSettings = {
  name: "Tinatangi Cafe",
  shortName: "Tinatangi",
  tagline: "Garden cafe in Salawag, Dasmariñas, Cavite",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    street: "Brgy. 13, Jose Abad Santos Ave., Salawag",
    locality: "Dasmariñas",
    region: "Cavite",
    postalCode: "4114",
    country: "PH",
    display: "Brgy. 13, Jose Abad Santos Ave., Salawag, Dasmariñas, Cavite 4114",
  },
  geo: { lat, lng, placeId },
  links: {
    facebook: "https://www.facebook.com/TinatangiCafe",
    instagram: "https://www.instagram.com/tinatangi_cafe/",
    instagramHandle: "@tinatangi_cafe",
    maps: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${placeId}`,
  },
  contact: { phone: null, messenger: null, email: null }, // TO CONFIRM with the owner
  social: { facebookFollowers: "56K" },
  rating: { value: 4.5, count: 780, source: "Google" },
  credit: { label: "Powered by Aurevixa", url: "https://aurevixa.vercel.app" },
};

/** Where "Message us" / "Ask about events" go: Messenger when known, otherwise the Facebook page. */
export const messageUrl = site.contact.messenger ?? site.links.facebook;
export const messageLabel = site.contact.messenger ? "Message us" : "Message us on Facebook";

export const ratingLine = `${site.rating.value} on ${site.rating.source} · ${site.rating.count} ratings`;

/** Section copy (English, light Tagalog). One row per key in a future `copy` table. */
export const copy = {
  meta: {
    title: "Tinatangi Cafe | Garden cafe in Salawag, Dasmariñas, Cavite",
    description:
      "Pet-friendly garden cafe in Salawag, Dasmariñas, Cavite. Coffee, food and fairy lights. Open daily 7 AM to 12 MN. Big parking, photobooth, bakery.",
  },
  nav: [
    { id: "kape", label: "Kape" },
    { id: "menu", label: "Menu" },
    { id: "hardin", label: "Hardin" },
    { id: "gabi", label: "Gabi" },
    { id: "bisita", label: "Bisita" },
  ],
  hero: {
    h1: ["Kape sa", "hardin."],
    lead: "Coffee, good food and fairy lights under the trees. Open daily, 7 AM to midnight.",
    chipMorning: "7:00 AM, bukas na",
    chipNight: "Hanggang 12:00 MN",
    cue: "Mag-scroll para gumabi",
    morningAlt: "Ribbed-wood facade of Tinatangi Cafe in morning sun, with palms and potted plants",
    nightAlt: "Tinatangi Cafe's two-storey open counter and rooftop deck under trees wrapped in fairy lights at dusk",
  },
  kape: {
    time: "7:00 AM",
    h2: "Unang kape ng umaga.",
    body: "We open at 7, so the after-jog crowd gets first pick of the tables. Cold coffee, matcha, milk tea and frappes, with something sweet from the bakery.",
    drinksTitle: "To drink",
    sweetsTitle: "Something sweet",
    note: "Ask the barista for today's prices.",
  },
  menu: {
    time: "12:00 PM",
    h2: "Tanghalian sa hardin.",
    intro: "From soup to bagnet, plated on our blue-and-white dishes.",
    cardHeader: "Menu. Prices in pesos.",
    footnote: "Prices may change. Last checked: TO CONFIRM.",
    askTitle: "Also on our table, ask for today's price",
    askLine: "Wala pa rito ang presyo? Tanungin si barista sa counter.",
    railLabel: "Photos of dishes",
  },
  hardin: {
    time: "5:30 PM",
    h2: "May malaking puno sa gitna.",
    body: "Sit under the big tree in the middle of the garden, with birds above and shade all around. Bring your dog. There's room outside, inside, and on the rooftop deck.",
    facts: ["Pet-friendly", "Alfresco, indoor and rooftop", "Huge parking"],
    alt: "Trees wrapped in fairy lights beside the open counter at dusk",
  },
  gabi: {
    time: "8:00 PM",
    h2: "Pag gumabi, bubuhay ang mga ilaw.",
    body: "Strings of lights come on in the bamboo and the trees. The umbrellas turn blue, and the garden turns golden.",
    railLabel: "Photos of the cafe at night",
    photobooth: {
      h3: "May photobooth kami.",
      body: "Grab the props and take a strip home.",
      button: "Take a photo strip",
      buttonAgain: "Another one",
      announce: "Photo strip shown",
      signAlt: "The Tinatangi Cafe photobooth sign on the ribbed-wood facade",
    },
    events: {
      h3: "Handa sa handaan.",
      body: "Event halls for birthdays and gatherings. Ask about dates and sizes.",
      button: "Ask about events",
    },
  },
  bisita: {
    time: "12:00 MN",
    h2: "Hanggang hatinggabi.",
    body: "Come for sunrise coffee or a late dinner. We stay open until midnight, every day.",
    hoursLine: "Daily, 7:00 AM to 12:00 MN.",
    stepsTitle: "How to find us",
    steps: [
      "Head along Jose Abad Santos Avenue in Salawag.",
      "Turn into the small inner road.",
      "Our entrance is about 150 m on your left.",
    ],
    parking: "Plenty of parking inside.",
    mapNote: "Illustration, not to scale.",
  },
  footer: { hours: "Open daily, 7 AM to 12 MN" },
  buttons: { directions: "Get directions", seeMenu: "See the menu" },
} as const;
