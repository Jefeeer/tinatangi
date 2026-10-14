"use client";

import { useEffect, useState } from "react";
import { hours, hoursSummary, TIMEZONE } from "@/content/hours";
import { statusAt, statusText, zonedNow } from "@/lib/hours";

/**
 * Live open/closed badge in Manila time. The server renders the neutral hours summary and the client swaps it
 * after mount, so there is no hydration mismatch. A dot plus text, never colour alone.
 */
export function OpenBadge({ size = "sm", compactLabel, className = "" }: { size?: "sm" | "lg"; compactLabel?: boolean; className?: string }) {
  const [live, setLive] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      try {
        const { day, mins } = zonedNow(TIMEZONE);
        if (day < 0) throw new Error("bad weekday");
        const s = statusAt(hours, day, mins);
        setLive({ open: s.open, text: statusText(s) });
      } catch {
        setLive(null);
      }
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const text = live?.text ?? hoursSummary;
  const dot = live ? (live.open ? "#7BC47F" : "#F2A31B") : "#D8C7A6";
  const short = live ? (live.open ? "Open now" : "Closed now") : "Open daily";
  const pad = size === "lg" ? "px-5 py-3 text-base" : "px-3 py-1.5 text-[0.9375rem]";

  return (
    <p className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-full font-semibold ring-1 ring-current/35 ${pad} ${className}`} role="status">
      <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: dot, boxShadow: `0 0 8px ${dot}` }} />
      {compactLabel ? (
        <>
          <span className="lg:hidden">{short}</span>
          <span className="hidden lg:inline">{text}</span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </p>
  );
}
