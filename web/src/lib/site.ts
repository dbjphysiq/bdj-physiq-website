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

/* ───────────── Service structure and page copy ───────────── */

/** The flagship service has its own page instead of a standard service page. */
export const FLAGSHIP = {
  slug: "calibrated-surrogate-models",
  path: "/calibrated-surrogates",
};

/** Link to a service: the flagship goes to its own page. */
export const serviceHref = (slug: string) => (slug === FLAGSHIP.slug ? FLAGSHIP.path : `/services/${slug}`);

/** The three service families plus the packaged compliance programmes, in page order. */
export const FAMILIES = [
  {
    key: "engineering",
    title: "Engineering and industrial AI",
    intro: "For manufacturers, engineering teams and R&D groups working with physical processes.",
  },
  {
    key: "data",
    title: "Data and analytics",
    intro: "For organisations whose decisions depend on numbers they cannot currently trace.",
  },
  {
    key: "governance",
    title: "Governance, institutions and capability",
    intro: "For ministries, regulators, funds, programmes and companies selling into regulated markets.",
  },
] as const;

export const PACKAGED = {
  key: "packaged",
  title: "Built for the 2026 to 2028 compliance deadlines",
  intro: "Fixed-scope programmes aimed at obligations with a date attached.",
};

/** One line under the homepage hero. */
export const STRAPLINE = "Delivered in French and English, by the people who built it.";

/** Closing line of the homepage positioning block. */
export const POSITIONING_NOTE = "Every model we deliver reports how far it should be trusted. Your data stays in your systems.";

/** Homepage credibility line: plain text, no logos. */
export const CREDIBILITY = [
  "Peer-reviewed in the Journal of the Acoustical Society of America",
  "Associate Researcher, CNRS joint research unit",
  "National AI strategy drafting",
  "Published methods with a reproduction script",
];

/** The two audience routes on the homepage. */
export const DOORS = [
  {
    title: "For manufacturers and engineering teams",
    text: "Faster design cycles without losing traceability. Process models, calibrated surrogates, and measurement campaigns designed to answer the question you actually have.",
    label: "Engineering and industrial AI",
    href: "/services#engineering",
  },
  {
    title: "For institutions, programmes and funds",
    text: "Evidence you can defend. Data systems, analytics, AI governance and independent evaluation, built so your own team can run them afterwards.",
    label: "Institutions and governance",
    href: "/services#governance",
  },
];

/** "How we work" commitments. The last one is shown with emphasis. */
export const HOW_WE_WORK = [
  "A written scope before any work starts. You know what you are getting and what you are not.",
  "Fixed-price pilots of four to eight weeks. No open-ended engagements.",
  "A go or no-go decision at the end of the pilot, with no obligation either way.",
  "Your data stays in your systems. Where it has to move, we work to your data processing terms.",
  "Every forecast reports its uncertainty. A number without a bound is not a result.",
  "Documentation an auditor can follow: inputs, method, assumptions, limits.",
  "You keep the code. We hand over the scripts, the environment specification and the documentation, and we will train your team to run it.",
];

/** Shown beside the founder profile on the About page. */
export const METHODS_NOTE =
  "We publish our methods. If a claim on this site matters to your decision, ask us for the paper or the code behind it.";
