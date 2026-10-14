// Shared "time of day" state. DayEngine writes it while scrolling; the header clock reads it.
// An external store keeps scroll work out of React renders (it only notifies when the shown minute changes).

export const SECTION_ANCHORS = [
  { id: "kape", minutes: 7 * 60 },
  { id: "menu", minutes: 12 * 60 },
  { id: "hardin", minutes: 17 * 60 + 30 },
  { id: "gabi", minutes: 20 * 60 },
  { id: "bisita", minutes: 24 * 60 },
] as const;

type Listener = () => void;
let minutes: number = SECTION_ANCHORS[0].minutes;
const listeners = new Set<Listener>();

export const dayStore = {
  get: () => minutes,
  getServer: () => SECTION_ANCHORS[0].minutes as number,
  set(next: number) {
    if (next === minutes) return;
    minutes = next;
    listeners.forEach((l) => l());
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

/** Piecewise-linear clock minutes for a scroll probe, given section tops (same order as SECTION_ANCHORS). */
export function minutesAt(probe: number, tops: number[]): number {
  if (probe <= tops[0]) return SECTION_ANCHORS[0].minutes;
  for (let i = 1; i < tops.length; i++) {
    if (probe <= tops[i]) {
      const a = SECTION_ANCHORS[i - 1].minutes;
      const b = SECTION_ANCHORS[i].minutes;
      const t = (probe - tops[i - 1]) / Math.max(1, tops[i] - tops[i - 1]);
      return a + (b - a) * t;
    }
  }
  return SECTION_ANCHORS[SECTION_ANCHORS.length - 1].minutes;
}

export const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

/** "7:05 AM" ... "12:00 MN" for the header clock. */
export function formatDayMinutes(m: number): string {
  if (m >= 1440) return "12:00 MN";
  const H = Math.floor(m / 60);
  const mm = Math.floor(m % 60);
  const h = H % 12 || 12;
  return `${h}:${String(mm).padStart(2, "0")} ${H >= 12 ? "PM" : "AM"}`;
}
