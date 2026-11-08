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
    title: "Engineering and Industrial AI",
    intro: "For manufacturers, engineering teams, and R&D groups working with physical processes.",
  },
  {
    key: "data",
    title: "Data Engineering and Analytics",
    intro: "For organizations whose decisions depend on numbers they cannot currently trace.",
  },
  {
    key: "governance",
    title: "AI Governance and Institutional Support",
    intro: "For ministries, regulators, funds, programs, and companies selling into regulated markets.",
  },
] as const;

export const PACKAGED = {
  key: "packaged",
  title: "Prepare your data and AI systems for regulatory requirements.",
  intro: "We help organizations assess readiness, organize supporting evidence, and strengthen reporting processes. Each engagement defines the relevant requirements, responsibilities, and deliverables.",
};

/** One line under the homepage hero. */
export const STRAPLINE = "Delivered in French and English, by the people who built it.";

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
    text: "Evaluate designs, understand process behavior, and identify opportunities to improve performance. We develop simulation tools, predictive models, and measurement plans around your engineering objectives.",
    label: "Explore engineering services",
    href: "/services#engineering",
  },
  {
    title: "For public institutions and development organizations",
    text: "Strengthen data systems, evaluate programs, and establish practical AI governance. We deliver analysis and tools that support accountable decisions and can be maintained by your team.",
    label: "Explore institutional services",
    href: "/services#governance",
  },
];

/** "How we work" commitments. The last one is shown with emphasis. */
export const HOW_WE_WORK = [
  "A written scope before any work starts. You know what you are getting and what you are not.",
  "Fixed-price pilots of four to eight weeks. No open-ended engagements.",
  "A go or no-go decision at the end of the pilot, with no obligation either way.",
  "We agree where data will be stored and processed before work begins. Any transfer follows the access controls and data-handling terms set for the engagement.",
  "Every forecast reports its uncertainty. A number without a bound is not a result.",
  "Documentation an auditor can follow: inputs, method, assumptions, limits.",
  "You keep the code. We hand over the scripts, the environment specification and the documentation, and we will train your team to run it.",
];

/** Shown beside the founder profile on the About page. */
export const METHODS_NOTE =
  "We publish our methods. If a claim on this site matters to your decision, ask us for the paper or the code behind it.";

/** Homepage summary of the flagship service (the full method is on its own page). */
export const FLAGSHIP_HOME = {
  subtitle: "Faster simulations. Clearer uncertainty.",
  intro:
    "Surrogate models approximate computationally expensive simulations, helping engineers explore more design options in less time. We develop and calibrate these models, evaluate prediction errors, and document the conditions under which the results can support engineering decisions.",
  points: [
    "Surrogate modeling using simulation or experimental data",
    "Prediction intervals with documented assumptions and validation",
    "Design optimization within engineering constraints",
    "Inverse design for specified performance targets",
  ],
  cta: "Explore calibrated surrogate modeling",
};

/** Short founder introduction for the homepage; full credentials live on the About page. */
export const FOUNDER_SUMMARY =
  "DBJ PhysIQ Technologies was founded by Dr. Daliwa Joseph Bainamndi, whose background spans physics, AI, and data science. His work brings scientific modeling, uncertainty assessment, and practical data methods to industrial and institutional challenges.";

/** The main contact button label, used site-wide. */
export const CONTACT_CTA = "Discuss your project";
