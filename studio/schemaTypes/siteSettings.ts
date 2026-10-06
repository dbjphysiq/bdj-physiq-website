import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Homepage and site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "home", title: "Homepage sections" },
    { name: "contact", title: "Contact and footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "siteTitle", type: "string", group: "seo", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "motto", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string", group: "hero", validation: (r) => r.required().max(90) }),
    defineField({ name: "heroSubheadline", title: "Hero sub-headline", type: "text", rows: 3, group: "hero", validation: (r) => r.required().max(280) }),
    defineField({ name: "primaryCta", title: "Primary button", type: "link", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "secondaryCta", title: "Secondary button", type: "link", group: "hero" }),
    defineField({ name: "trustLine", title: "Trust line (short phrases under the buttons)", type: "array", of: [{ type: "string" }], group: "hero" }),
    defineField({ name: "valueHeading", title: "Value proposition heading", type: "string", group: "home" }),
    defineField({ name: "valueBody", title: "Value proposition text", type: "text", rows: 4, group: "home" }),
    defineField({ name: "valuePillars", title: "Measure / Model / Deliver pillars", type: "array", of: [{ type: "titleText" }], group: "home", validation: (r) => r.max(3) }),
    defineField({ name: "stats", title: "“Why now” statistics", type: "array", of: [{ type: "stat" }], group: "home", validation: (r) => r.max(4) }),
    defineField({ name: "ctaHeading", title: "Closing banner heading", type: "string", group: "home" }),
    defineField({ name: "ctaBody", title: "Closing banner text", type: "text", rows: 3, group: "home" }),
    defineField({ name: "contactEmail", type: "string", group: "contact", validation: (r) => r.required().email() }),
    defineField({ name: "contactPhone", type: "string", group: "contact" }),
    defineField({ name: "location", type: "string", group: "contact" }),
    defineField({ name: "legalLine", title: "Legal line (footer)", type: "string", group: "contact" }),
    defineField({ name: "seoDescription", title: "Default meta description", type: "text", rows: 2, group: "seo", validation: (r) => r.max(160) }),
  ],
  preview: { prepare: () => ({ title: "Homepage and site settings" }) },
});
