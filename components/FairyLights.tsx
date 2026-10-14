// Server component: strings are plain SVG, dots are CSS-twinkled spans. Brightness follows --lights (set by DayEngine).

type Props = { count?: number; strings?: number; flip?: boolean; seed?: number; className?: string };

/** Small deterministic PRNG so server and client markup always match. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function FairyLights({ count = 36, strings = 3, flip = false, seed = 7, className = "" }: Props) {
  const rand = rng(seed);
  const perString = Math.ceil(count / strings);
  const swags = 3; // swags per string

  const rows = Array.from({ length: strings }, (_, k) => {
    const y0 = 6 + k * 24 + rand() * 6; // anchor height (% of container)
    const sag = 16 + rand() * 12;
    let d = `M0 ${y0}`;
    const segW = 100 / swags;
    for (let i = 0; i < swags; i++) {
      const x0 = i * segW;
      d += ` Q${x0 + segW / 2} ${y0 + 2 * sag} ${x0 + segW} ${y0}`;
    }
    const dots = Array.from({ length: perString }, (_, j) => {
      const x = ((j + 0.5 + (rand() - 0.5) * 0.5) / perString) * 100;
      const local = (x % segW) / segW;
      const y = y0 + 4 * sag * local * (1 - local);
      return { x, y, delay: rand() * 5, dur: 3 + rand() * 4, extra: j % 2 === 1 };
    });
    return { d, dots };
  });

  return (
    <div className={`lights ${flip ? "lights-bottom" : ""} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {rows.map((r, i) => (
          <path key={i} d={r.d} fill="none" stroke="rgba(216,199,166,0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {rows.flatMap((r, i) =>
        r.dots.map((dot, j) => (
          <span
            key={`${i}-${j}`}
            className="light-dot"
            data-extra={dot.extra ? "" : undefined}
            style={{ left: `${dot.x}%`, top: `${dot.y}%`, ["--delay" as string]: `${dot.delay.toFixed(2)}s`, ["--dur" as string]: `${dot.dur.toFixed(2)}s` }}
          />
        )),
      )}
    </div>
  );
}
