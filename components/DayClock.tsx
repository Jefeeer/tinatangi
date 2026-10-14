"use client";

import { useSyncExternalStore } from "react";
import { dayStore, formatDayMinutes } from "@/lib/day";

/** Header chip: counts from 7:00 AM to 12:00 MN as you scroll. Decorative, so hidden from screen readers. */
export function DayClock({ className = "" }: { className?: string }) {
  const m = useSyncExternalStore(dayStore.subscribe, dayStore.get, dayStore.getServer);
  return (
    <span
      aria-hidden="true"
      className={`day-chip items-center rounded-full px-3 py-1 text-[0.9375rem] font-semibold tabular ring-1 ring-current/40 ${className}`}
    >
      {formatDayMinutes(m)}
    </span>
  );
}
