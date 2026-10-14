// Menu data, shaped like future `menu_categories` + `menu_items` tables.
// TO CONFIRM: menu freshness ("last checked" date) with the owner before launch; it is not shown on the page.
// Prices (PHP) come from the menu page in research.md. Drinks and desserts have no known prices, so none are shown.

export type MenuItem = { id: string; name: string; price: number; description: string };
export type MenuCategory = { id: string; name: string; sort: number; items: MenuItem[] };
export type PricelessItem = { id: string; name: string; note?: string };

export const menuCategories: MenuCategory[] = [
  {
    id: "appetizer",
    name: "Appetizer",
    sort: 1,
    items: [{ id: "mozzarella-sticks", name: "Mozzarella Sticks", price: 225, description: "" }],
  },
  {
    id: "pasta",
    name: "Pasta",
    sort: 2,
    items: [
      {
        id: "chicken-truffle-pasta",
        name: "Chicken Truffle Pasta",
        price: 255,
        description: "Linguine, cheese base sauce, truffle oil, roasted chicken breast fillet.",
      },
    ],
  },
  {
    id: "soup",
    name: "Soup",
    sort: 3,
    items: [
      { id: "pumpkin-soup", name: "Pumpkin Soup", price: 150, description: "Creamy squash, herbs, nuts, pesto bread." },
      { id: "pomodoro", name: "Pomodoro", price: 180, description: "Garden tomato, herbs, garlic bread." },
    ],
  },
  {
    id: "salad",
    name: "Salad",
    sort: 4,
    items: [
      {
        id: "caesar-salad",
        name: "Caesar Salad",
        price: 255,
        description: "Iceberg, romaine, lollo rossa, Caesar dressing, croutons, feta.",
      },
      {
        id: "garden-salad",
        name: "Tinatangi Garden Salad",
        price: 275,
        description: "Fresh lettuce and vegetables, house honey mustard.",
      },
    ],
  },
  {
    id: "entree",
    name: "Entrée",
    sort: 5,
    items: [
      { id: "grilled-pork-steak", name: "Grilled Pork Steak", price: 355, description: "With rice and salad." },
      {
        id: "crispy-bagnet",
        name: "Crispy Tinatangi Bagnet",
        price: 360,
        description: "Crispy pork liempo, manong sauce, pinoy pebre.",
      },
      {
        id: "baked-fish",
        name: "Baked Fish",
        price: 390,
        description: "Salmon fillet, melted mozzarella, lemon caper sauce.",
      },
    ],
  },
];

/** Card columns on desktop: category ids per column. */
export const menuColumns: string[][] = [["appetizer", "pasta"], ["soup", "salad"], ["entree"]];

export const drinks: PricelessItem[] = [
  { id: "iced-coffee", name: "Iced coffee" },
  { id: "cappuccino", name: "Cappuccino" },
  { id: "latte", name: "Latte" },
  { id: "frappes", name: "Frappes", note: "chocolate, matcha" },
  { id: "matcha", name: "Matcha" },
  { id: "milk-tea", name: "Milk tea" },
  { id: "lemon-lychee", name: "Lemon lychee" },
];

export const sweets: PricelessItem[] = [
  { id: "triple-chocolate", name: "Triple chocolate cake" },
  { id: "strawberry-cheesecake", name: "Strawberry cheesecake" },
  { id: "oreo-cheesecake", name: "Oreo cheesecake" },
  { id: "creme-brulee-bread", name: "Crème brûlée bread", note: "from the bakery" },
];

/** On the table but no known price: shown as "ask in store". */
export const askInStore: PricelessItem[] = [
  { id: "chicken-alfredo", name: "Chicken alfredo" },
  { id: "pesto-pasta", name: "Pesto pasta" },
  { id: "nachos", name: "Nachos" },
  { id: "fries", name: "Fries" },
  { id: "daing-na-bangus", name: "Daing na bangus" },
  { id: "sizzling-sisig", name: "Sizzling sisig" },
];
