import { RocketIcon } from "@sanity/icons/Rocket";
import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (r) => r.required() }),
    defineField({
      name: "family", title: "Service family", type: "string", validation: (r) => r.required(),
      description: "Where the service appears on the Services page.",
      options: { list: [
        { title: "Engineering and industrial AI", value: "engineering" },
        { title: "Data and analytics", value: "data" },
        { title: "Governance, institutions and capability", value: "governance" },
        { title: "Compliance programme (packaged offer)", value: "packaged" },
      ], layout: "radio" },
    }),
    // Legacy field from the first site layout; no longer used by the website.
    defineField({ name: "category", type: "string", hidden: true }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 99 }),
    defineField({ name: "tagline", type: "string", validation: (r) => r.required().max(120) }),
    defineField({ name: "summary", title: "Summary (compliance programmes)", type: "text", rows: 4, description: "Shown on the Services page for packaged offers.", hidden: ({ document }) => document?.family !== "packaged" }),
    defineField({ name: "whyNow", title: "Why now (date + driver)", type: "string", hidden: ({ document }) => document?.family !== "packaged" }),
    defineField({ name: "statusNote", title: "Status note", type: "string" }),
    defineField({ name: "cardBullets", title: "Card bullets (max 3)", type: "array", of: [{ type: "string" }], validation: (r) => r.max(3) }),
    defineField({ name: "problem", title: "The problem we solve", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "features", title: "Features and deliverables", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "benefits", title: "Benefits and business impact", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "audience", title: "Who it is for", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "Button text", type: "string" }),
    defineField({ name: "sources", title: "Sources for statistics", type: "array", of: [{ type: "source" }] }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "family" } },
});
