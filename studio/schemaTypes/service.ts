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
      name: "category", type: "string", initialValue: "core", validation: (r) => r.required(),
      options: { list: [
        { title: "Core service", value: "core" },
        { title: "Accelerator (in development)", value: "accelerator" },
        { title: "New service (innovation track)", value: "innovation" },
      ], layout: "radio" },
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 99 }),
    defineField({ name: "tagline", type: "string", validation: (r) => r.required().max(120) }),
    defineField({ name: "whyNow", title: "Why now (date + driver)", type: "string", hidden: ({ document }) => document?.category !== "innovation" }),
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
  preview: { select: { title: "title", subtitle: "category" } },
});
