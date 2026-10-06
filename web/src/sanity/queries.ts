import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  siteTitle, tagline, motto, heroHeadline, heroSubheadline,
  primaryCta, secondaryCta, trustLine,
  valueHeading, valueBody, valuePillars[]{title, text},
  stats[]{value, caption, sourceLabel, sourceUrl},
  ctaHeading, ctaBody, contactEmail, contactPhone, location, legalLine, seoDescription
}`);

export const ABOUT_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  heading, mission, vision,
  approach[]{title, text}, method[]{title, text}, values[]{title, text},
  founderName, founderRole, founderBio, founderCredentials, publicationUrl,
  "founderPhoto": founderPhoto{asset, alt, hotspot, crop},
  outlook[]{title, text}
}`);

const SERVICE_FIELDS = `
  title, "slug": slug.current, category, order, tagline, whyNow, statusNote,
  cardBullets, problem, features, benefits, audience, ctaLabel,
  sources[]{label, url}
`;

export const SERVICES_QUERY = defineQuery(`*[_type == "service" && defined(slug.current)] | order(order asc){${SERVICE_FIELDS}}`);

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{${SERVICE_FIELDS}}`);

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  title, "slug": slug.current, excerpt, publishedAt
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, "slug": slug.current, excerpt, publishedAt, body,
  "mainImage": mainImage{asset, alt, hotspot, crop}
}`);
