import type { DayHours } from "../content/hours";

export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "07:00" -> "7:00 AM", "24:00" / "00:00" -> "12:00 MN", "12:00" -> "12:00 PM". */
export const fmtClock = (t: string) => {
  const mins = toMin(t);
  if (mins % 1440 === 0) return "12:00 MN";
  const H = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const h = H % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${H >= 12 ? "PM" : "AM"}`;
};

export type Status =
  | { open: true; closes: string; closingSoon: boolean }
  | { open: false; when?: "today" | "tomorrow" | string; at?: string };

/** Pure: given the week (0 = Sunday), a weekday and minutes since midnight, return open/closed. */
export function statusAt(week: DayHours[], day: number, mins: number): Status {
  const today = week[day];
  const yest = week[(day + 6) % 7];
  // still inside last night's after-midnight hours?
  if (yest.open && yest.close && toMin(yest.close) <= toMin(yest.open) && mins < toMin(yest.close)) {
    return { open: true, closes: yest.close, closingSoon: toMin(yest.close) - mins <= 60 };
  }
  if (today.open && today.close) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (mins >= o && (c <= o || mins < c)) {
      return { open: true, closes: today.close, closingSoon: c > o && c - mins <= 60 };
    }
    if (mins < o) return { open: false, when: "today", at: today.open };
  }
  for (let i = 1; i <= 7; i++) {
    const d = week[(day + i) % 7];
    if (d.open) return { open: false, when: i === 1 ? "tomorrow" : "on " + d.label, at: d.open };
  }
  return { open: false };
}

/** Current weekday + minutes in the cafe's timezone, regardless of the visitor's timezone. */
export function zonedNow(timeZone: string, now = new Date()) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" })
      .formatToParts(now)
      .map((x) => [x.type, x.value]),
  );
  return {
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday),
    mins: (Number(p.hour) % 24) * 60 + Number(p.minute),
  };
}

/** Badge text for a status. */
export function statusText(s: Status): string {
  if (s.open) {
    return s.closingSoon ? `Open now, closing at ${fmtClock(s.closes)}` : `Open now, until ${fmtClock(s.closes)}`;
  }
  if (s.at) return `Closed now, opens ${fmtClock(s.at)}`;
  return "Closed now";
}
