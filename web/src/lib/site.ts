/**
 * Site-wide facts that live in code rather than in Sanity.
 * Edit here; every page picks the change up on the next deploy.
 */

/**
 * Founder portrait served from /public. A photo uploaded in the Sanity Studio
 * (About page > Founder photo) takes precedence over this file.
 * Set to null to show the monogram card instead.
 */
export const FOUNDER_PHOTO_SRC: string | null = null;

/** Fixed-price pilot terms. */
export const PILOT = {
  weeks: "4 to 8 weeks",
  eur: "€15,000 to €40,000",
  // Rounded at EUR/USD 1.14 to 1.15 (late 2026). Review if the rate moves by more than 5%.
  usd: "roughly US$17,000 to US$46,000",
};

/**
 * The founder's training and research affiliations. Shown as plain text,
 * never as logos, and labelled as the founder's background so no reader
 * mistakes them for clients.
 */
export const AFFILIATIONS = [
  { name: "Fulbright", detail: "Scholar Researcher, University of Missouri" },
  { name: "Chevening", detail: "MSc AI & Data Science, University of Hull" },
  { name: "CNRS", detail: "Associate Researcher, LOMC, Le Havre" },
  { name: "J. Acoust. Soc. Am.", detail: "Peer-reviewed publication, 2026" },
];

/** The peer-reviewed paper behind the method. */
export const PAPER = {
  title:
    "Physics-Informed Machine Learning for Micro-Perforated Panels: Reproducible Prediction, Uncertainty, and Design Optimization",
  venue: "Journal of the Acoustical Society of America",
  citation: "J. Acoust. Soc. Am. 160, 1001–1010 (2026)",
  doi: "10.1121/10.0044535",
};

/** West Africa Time (UTC+1, no daylight saving) against client time zones. */
export const HOURS_LINE = "English and French · hours overlap US Eastern and European time";
