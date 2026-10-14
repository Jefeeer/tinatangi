// Opening hours. Shaped like a future `opening_hours` table: one row per weekday.
// Times are 24h "HH:MM" in the cafe's timezone; "24:00" means midnight at the end of that day.
export type DayHours = {
  /** 0 = Sunday */
  weekday: number;
  label: string;
  open: string | null;
  close: string | null;
};

export const TIMEZONE = "Asia/Manila";

export const hours: DayHours[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
  (label, weekday) => ({ weekday, label, open: "07:00", close: "24:00" }),
);

/** Shown before the live badge mounts, and whenever the live status cannot be computed. */
export const hoursSummary = "Open daily, 7 AM to 12 MN";
