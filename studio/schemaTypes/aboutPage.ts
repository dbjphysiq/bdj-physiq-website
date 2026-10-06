import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "mission", title: "Mission (one sentence)", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "vision", type: "text", rows: 2 }),
    defineField({ name: "approach", title: "How we earn trust", type: "array", of: [{ type: "titleText" }] }),
    defineField({ name: "method", title: "Method steps", type: "array", of: [{ type: "titleText" }] }),
    defineField({ name: "values", type: "array", of: [{ type: "titleText" }] }),
    defineField({ name: "founderName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "founderRole", type: "string" }),
    defineField({ name: "founderBio", type: "text", rows: 3 }),
    defineField({ name: "founderCredentials", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "publicationUrl", title: "Publication link (DOI)", type: "url" }),
    defineField({
      name: "founderPhoto", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() })],
    }),
    defineField({ name: "outlook", title: "Future outlook", type: "array", of: [{ type: "titleText" }] }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
