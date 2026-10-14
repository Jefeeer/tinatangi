// Photo registry, shaped like a future `gallery_photos` table (id, storage path, size, alt, caption).
// menu-board.jpg is intentionally absent: it is never shown as a photo.
// All photos come from public listings; replace with owner originals before launch (TO CONFIRM).

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** CSS object-position for this placement (art direction). */
  focus?: string;
};

export const photos = {
  duskCounter: { id: "dusk-counter", src: "/photos/dusk-counter.jpg", width: 1440, height: 1080, alt: "Tinatangi Cafe's two-storey open counter and rooftop deck under trees wrapped in fairy lights at dusk", caption: "Counter and rooftop deck under the lights" },
  facadeDay: { id: "facade-day", src: "/photos/facade-day.jpg", width: 1080, height: 1080, alt: "Ribbed-wood facade of Tinatangi Cafe in daylight with the photobooth sign", caption: "The facade by day" },
  garden: { id: "garden", src: "/photos/garden.jpg", width: 810, height: 1080, alt: "Alfresco garden at Tinatangi Cafe at night with royal-blue umbrellas, bamboo with fairy lights and checkered paving", caption: "Bamboo, blue umbrellas and checkered floor" },
  icedCoffee: { id: "iced-coffee", src: "/photos/iced-coffee.jpg", width: 810, height: 1080, alt: "Iced caramel coffee held in front of black trusses and chandeliers", caption: "Indoors: black trusses and chandeliers" },
  frappe: { id: "frappe", src: "/photos/frappe.jpg", width: 810, height: 1080, alt: "Four frappes in Tinatangi Cafe cups, being cheered together", caption: "Frappes in our cups" },
  cheesecake: { id: "cheesecake", src: "/photos/cheesecake.jpg", width: 810, height: 1080, alt: "Oreo cheesecake and a frappe in front of a bookshelf", caption: "Cheesecake by the bookshelf" },
  milkTea: { id: "milk-tea", src: "/photos/milk-tea.jpg", width: 1440, height: 1080, alt: "Milk tea with pork tapa and rice, the alfresco area glowing behind", caption: "Alfresco after dark" },
  riceBowl: { id: "rice-bowl", src: "/photos/rice-bowl.jpg", width: 1025, height: 1080, alt: "Glazed meat rice bowl with slaw and sesame on a blue-and-white plate", caption: "Rice bowl with slaw and sesame" },
  mushroomSteak: { id: "mushroom-sauce", src: "/photos/mushroom-sauce.jpg", width: 1080, height: 1080, alt: "Steak with mushroom sauce and garlic rice on a blue-and-white plate", caption: "Steak, mushroom sauce and garlic rice" },
  salad: { id: "greek-salad", src: "/photos/greek-salad.jpg", width: 810, height: 1080, alt: "Salad with dressing and fries on a blue-and-white plate", caption: "Salad and fries" },
  nachos: { id: "nachos", src: "/photos/nachos.jpg", width: 810, height: 1080, alt: "Nachos on a blue-and-white plate", caption: "Nachos" },
} satisfies Record<string, Photo>;

// The dusk photo appears in the hero, in Hardin and in the night rail. Each placement crops a different part of it.
const deckCrop: Photo = { ...photos.duskCounter, id: "dusk-deck", focus: "86% 38%", caption: "The rooftop deck under the lights" };
const counterSquare: Photo = { ...photos.duskCounter, id: "dusk-counter-square", focus: "46% 62%" };
const frappeStrip: Photo = { ...photos.frappe, id: "frappe-strip", focus: "50% 70%" };

/** Which photos appear in which block (ordered). */
export const galleryLayout = {
  kape: [photos.frappe, photos.cheesecake],
  plateRail: [photos.riceBowl, photos.mushroomSteak, photos.salad, photos.nachos, photos.milkTea],
  nightRail: [photos.garden, photos.icedCoffee, deckCrop, photos.milkTea],
  photoStrip: [frappeStrip, photos.garden, counterSquare],
} as const;
