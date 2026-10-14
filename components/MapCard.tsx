import { copy, site } from "@/content/site";

/** Styled static map panel (no iframe: lighter, no consent issues). Links out to Google Maps. */
export function MapCard() {
  const { lat, lng } = site.geo;
  return (
    <div className="bg-roast">
      <div className="plate-band" aria-hidden="true" />
      <div className="relative overflow-hidden">
        <svg viewBox="0 0 480 320" className="block h-auto w-full" role="img" aria-label="Sketch map: Jose Abad Santos Avenue, with the small inner road to the cafe entrance on the left">
          <rect width="480" height="320" fill="#23130c" />
          <g stroke="#3F1F13" strokeWidth="1">
            {Array.from({ length: 12 }, (_, i) => (
              <path key={`v${i}`} d={`M${i * 44} 0V320`} />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <path key={`h${i}`} d={`M0 ${i * 44}H480`} />
            ))}
          </g>
          <g fill="#1E3A26" opacity=".85">
            <circle cx="340" cy="86" r="34" />
            <circle cx="392" cy="120" r="26" />
            <circle cx="300" cy="150" r="22" />
          </g>
          <path d="M-10 262 C120 246 250 248 490 214" stroke="#D8C7A6" strokeWidth="16" strokeLinecap="round" fill="none" opacity=".9" />
          <path d="M-10 262 C120 246 250 248 490 214" stroke="#3F1F13" strokeWidth="2" strokeDasharray="10 12" fill="none" />
          <path d="M214 250 C214 214 226 188 258 160 C276 144 290 134 306 128" stroke="#D8C7A6" strokeWidth="8" strokeLinecap="round" fill="none" opacity=".8" />
          <g transform="translate(306 120)">
            <circle r="26" fill="#F2A31B" opacity=".25" />
            <path d="M0 14 C-12 0 -12 -14 0 -14 C12 -14 12 0 0 14Z" transform="translate(0 -4) scale(1.15)" fill="#F2A31B" />
            <circle cy="-17" r="4.2" fill="#2A140C" />
          </g>
          <text x="22" y="292" fill="#F6EAD2" fontSize="13" fontWeight="600" fontFamily="var(--font-figtree), sans-serif">
            Jose Abad Santos Ave.
          </text>
          <text x="240" y="204" fill="#F6EAD2" fontSize="12" fontWeight="600" fontFamily="var(--font-figtree), sans-serif">
            Inner road
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <p className="t-small text-latte">
          {lat}, {lng} · {copy.bisita.mapNote}
        </p>
        <p className="text-ink-on-dark">{site.address.display}</p>
        <a href={site.links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-lg self-start">
          {copy.buttons.directions}
        </a>
        <a href={site.links.maps} target="_blank" rel="noopener noreferrer" className="link w-fit text-ink-on-dark">
          Open in Google Maps
        </a>
      </div>
      <div className="plate-band" aria-hidden="true" />
    </div>
  );
}
