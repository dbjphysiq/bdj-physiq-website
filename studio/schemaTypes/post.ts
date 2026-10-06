import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Insight article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.max(220) }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "mainImage", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (r) => r.required() })],
    }),
    defineField({
      name: "body", type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image", options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "mainImage" } },
});
