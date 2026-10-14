"use client";

import { useSyncExternalStore } from "react";
import { dayStore, formatDayMinutes } from "@/lib/day";

// A small sky dot beside the time: morning sun, noon, golden hour, dusk blue, then moon.
const SKY: [number, [number, number, number]][] = [
  [7 * 60, [255, 205, 77]],
  [12 * 60, [255, 243, 176]],
  [17 * 60 + 30, [240, 138, 36]],
  [20 * 60, [92, 120, 224]],
  [24 * 60, [216, 199, 166]],
];

function sky(m: number): string {
  for (let i = 1; i < SKY.length; i++) {
    const [m1, c1] = SKY[i];
    if (m <= m1) {
      const [m0, c0] = SKY[i - 1];
      const t = Math.min(1, Math.max(0, (m - m0) / (m1 - m0)));
      return `rgb(${c0.map((v, k) => Math.round(v + (c1[k] - v) * t)).join(",")})`;
    }
  }
  return `rgb(${SKY[SKY.length - 1][1].join(",")})`;
}

/** Header chip: counts from 7:00 AM to 12:00 MN as you scroll. Decorative, so hidden from screen readers. */
export function DayClock({ className = "" }: { className?: string }) {
  const m = useSyncExternalStore(dayStore.subscribe, dayStore.get, dayStore.getServer);
  const c = sky(m);
  return (
    <span
      aria-hidden="true"
      className={`day-chip items-center whitespace-nowrap gap-2 rounded-full px-3 py-1 text-[0.9375rem] font-semibold tabular ring-1 ring-current/40 ${className}`}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
      {formatDayMinutes(m)}
    </span>
  );
}
