import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  type: "document",
  title: "Event",
  fields: [
    defineField({ name: "title", type: "string", title: "Nom de l'event", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug URL", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "coverImage", type: "image", title: "Image principale", options: { hotspot: true } }),
    defineField({ name: "gallery", type: "array", title: "Galerie", of: [{ type: "image" }] }),
    defineField({
      name: "category",
      type: "string",
      title: "Catégorie",
      options: {
        list: [
          { title: "Foot", value: "foot" },
          { title: "Concert", value: "concert" },
          { title: "Spectacle", value: "spectacle" },
          { title: "Autre", value: "autre" },
        ],
      },
    }),
    defineField({ name: "eventDate", type: "datetime", title: "Date et heure" }),
    defineField({ name: "venue", type: "string", title: "Lieu" }),
    defineField({ name: "city", type: "string", title: "Ville" }),
    defineField({ name: "shortDescription", type: "text", title: "Description courte", rows: 2 }),
    defineField({ name: "longDescription", type: "array", title: "Description complète", of: [{ type: "block" }] }),
    defineField({ name: "minPrice", type: "number", title: "Prix minimum (€)" }),
    defineField({
      name: "priceCategories",
      type: "array",
      title: "Catégories de prix",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string", title: "Catégorie" }),
          defineField({ name: "description", type: "string", title: "Description" }),
          defineField({ name: "price", type: "number", title: "Prix (€)" }),
        ],
      }],
    }),
    defineField({ name: "whatsappLink", type: "url", title: "Lien WhatsApp" }),
    defineField({ name: "instagramLink", type: "url", title: "Lien Instagram" }),
    defineField({ name: "featured", type: "boolean", title: "Épingler dans le carrousel", initialValue: false }),
    defineField({ name: "soldOut", type: "boolean", title: "Complet", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "eventDate", media: "coverImage" },
  },
});
