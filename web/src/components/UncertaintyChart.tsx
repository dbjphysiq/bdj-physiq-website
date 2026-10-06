/**
 * Hero illustration: a process forecast whose uncertainty band (amber)
 * narrows as measured data arrives. Pure SVG, no image download.
 */
export function UncertaintyChart() {
  return (
    <svg viewBox="0 0 480 300" role="img" aria-labelledby="chart-title chart-desc" className="h-auto w-full">
      <title id="chart-title">Forecast with a narrowing uncertainty band</title>
      <desc id="chart-desc">Measured points on the left, a forecast line to the right, and an amber band showing the stated uncertainty range.</desc>
      <defs>
        <linearGradient id="band" x1="0" x2="1">
          <stop offset="0" stopColor="#eda100" stopOpacity="0.15" />
          <stop offset="1" stopColor="#eda100" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="300" rx="16" fill="#13315c" />
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="32" x2="456" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.08" />
      ))}
      <line x1="240" x2="240" y1="36" y2="264" stroke="#ffffff" strokeOpacity="0.35" strokeDasharray="4 4" />
      <text x="248" y="52" fill="#cde2fb" fontSize="12">now</text>
      <path d="M240 150 C 300 120, 360 95, 456 70 L 456 210 C 360 185, 300 172, 240 158 Z" fill="url(#band)" />
      <path d="M240 154 C 300 146, 360 138, 456 140" fill="none" stroke="#eda100" strokeWidth="2.5" strokeDasharray="6 5" />
      <path d="M32 190 C 70 170, 100 200, 140 175 S 200 150, 240 154" fill="none" stroke="#86b6ef" strokeWidth="2.5" />
      {[[32,190],[62,178],[92,193],[122,181],[152,170],[182,166],[212,157],[240,154]].map(([x,y]) => (
        <circle key={`${x}`} cx={x} cy={y} r="4" fill="#ffffff" />
      ))}
      <text x="32" y="284" fill="#cde2fb" fontSize="12">measured</text>
      <text x="356" y="284" fill="#eda100" fontSize="12">forecast ± range</text>
    </svg>
  );
}
