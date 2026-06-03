import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  type: "document",
  title: "Témoignage",
  fields: [
    defineField({ name: "authorName", type: "string", title: "Nom", validation: (r) => r.required() }),
    defineField({ name: "initials", type: "string", title: "Initiales (max 3)", validation: (r) => r.required().max(3) }),
    defineField({ name: "text", type: "text", title: "Témoignage", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "date", type: "date", title: "Date" }),
    defineField({ name: "featured", type: "boolean", title: "Afficher en homepage", initialValue: false }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "text" },
  },
});
