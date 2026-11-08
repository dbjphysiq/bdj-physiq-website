/**
 * Hero illustration: measured data up to "now", then a forecast whose
 * uncertainty range (amber band) widens with the forecast horizon.
 * Pure SVG, transparent background, designed to sit on a dark card.
 */
export function UncertaintyChart() {
  const measured: [number, number][] = [
    [24, 196], [54, 184], [84, 199], [114, 186], [144, 175], [174, 170], [204, 161], [234, 156],
  ];
  return (
    <svg viewBox="0 0 480 280" role="img" aria-labelledby="chart-title chart-desc" className="h-auto w-full overflow-visible">
      <title id="chart-title">Forecast with a stated uncertainty range</title>
      <desc id="chart-desc">
        Measured points on the left up to now, then a dashed forecast line to the right inside an amber band
        that shows the stated uncertainty range, widening further into the future.
      </desc>
      <defs>
        <linearGradient id="uc-band" x1="0" x2="1">
          <stop offset="0" stopColor="#eda100" stopOpacity="0.1" />
          <stop offset="1" stopColor="#eda100" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id="uc-measured" x1="0" x2="1">
          <stop offset="0" stopColor="#8bb9f2" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8bb9f2" stopOpacity="1" />
        </linearGradient>
        <filter id="uc-glow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid */}
      {[40, 95, 150, 205, 252].map((y) => (
        <line key={y} x1="24" x2="456" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.07" />
      ))}
      {[24, 132, 240, 348, 456].map((x) => (
        <line key={x} x1={x} x2={x} y1="252" y2="258" stroke="#ffffff" strokeOpacity="0.25" />
      ))}

      {/* Now marker */}
      <line x1="240" x2="240" y1="30" y2="252" stroke="#ffffff" strokeOpacity="0.32" strokeDasharray="3 5" />
      <rect x="216" y="14" width="48" height="20" rx="10" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.18" />
      <text x="240" y="28" textAnchor="middle" fill="#e6eef8" fontSize="10.5" letterSpacing="1.5" className="font-mono">NOW</text>

      {/* Forecast and its uncertainty range */}
      <path d="M240 152 C 300 124, 360 98, 456 72 L 456 214 C 360 188, 300 174, 240 160 Z" fill="url(#uc-band)" />
      <path d="M240 156 C 300 148, 360 140, 456 143" fill="none" stroke="#eda100" strokeWidth="2.5" strokeDasharray="7 6" filter="url(#uc-glow)" />

      {/* Measured data */}
      <path d="M24 196 C 60 176, 92 204, 132 182 S 200 154, 240 156" fill="none" stroke="url(#uc-measured)" strokeWidth="2.5" />
      {measured.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.6" fill="#ffffff" stroke="#050d1a" strokeWidth="1.5" />
      ))}

      {/* Labels */}
      <text x="24" y="276" fill="#8bb9f2" fontSize="10.5" letterSpacing="1.4" className="font-mono">MEASURED</text>
      <text x="456" y="276" textAnchor="end" fill="#eda100" fontSize="10.5" letterSpacing="1.4" className="font-mono">FORECAST ± RANGE</text>
    </svg>
  );
}
