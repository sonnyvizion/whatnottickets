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
          { title: "Concert", value: "concert" },
          { title: "Festival", value: "festival" },
          { title: "Sport", value: "sport" },
          { title: "Football", value: "foot" },
          { title: "Basketball", value: "basket" },
          { title: "Baskets / Sneakers", value: "baskets" },
          { title: "Spectacle", value: "spectacle" },
          { title: "Événement", value: "evenement" },
          { title: "Autre", value: "autre" },
        ],
      },
    }),
    defineField({
      name: "eventDates",
      type: "array",
      title: "Dates de l'event",
      description: "Ajoute une ou plusieurs dates (ex. 11, 12 & 13 juin). La 1re date sert de référence pour le tri et le SEO.",
      of: [{ type: "datetime" }],
    }),
    defineField({
      name: "eventDate",
      type: "datetime",
      title: "Date (ancien champ)",
      description: "Ancien champ date unique. Utilise plutôt « Dates de l'event » ci-dessus. Ce champ ne s'affiche que s'il contient déjà une valeur.",
      hidden: ({ document }) => !document?.eventDate,
    }),
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
    select: { title: "title", dates: "eventDates", legacyDate: "eventDate", media: "coverImage" },
    prepare({ title, dates, legacyDate, media }) {
      const all: string[] = (dates?.length ? dates : legacyDate ? [legacyDate] : []) as string[];
      const subtitle = all.length
        ? all
            .map((d) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }))
            .join(" · ")
        : "Aucune date";
      return { title, subtitle, media };
    },
  },
});
