import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Button text", type: "string", validation: (r) => r.required().max(40) }),
    defineField({ name: "href", title: "Link (e.g. /contact or https://…)", type: "string", validation: (r) => r.required() }),
  ],
});

export const titleText = defineType({
  name: "titleText",
  title: "Title and text",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Big number", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "sourceLabel", title: "Source name and year", type: "string", validation: (r) => r.required().warning("Every statistic needs a source") }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url" }),
  ],
  preview: { select: { title: "value", subtitle: "caption" } },
});

export const source = defineType({
  name: "source",
  title: "Source",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", type: "url", validation: (r) => r.required() }),
  ],
});
