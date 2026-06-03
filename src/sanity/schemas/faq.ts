import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  type: "document",
  title: "FAQ",
  fields: [
    defineField({ name: "question", type: "string", title: "Question", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "array", title: "Réponse", of: [{ type: "block" }] }),
    defineField({ name: "order", type: "number", title: "Ordre d'affichage" }),
    defineField({ name: "image", type: "image", title: "Image associée", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "question", subtitle: "order" },
  },
});
