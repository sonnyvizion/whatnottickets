import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  type: "document",
  title: "Paramètres du site",
  fields: [
    defineField({ name: "heroTagline", type: "string", title: "Tagline du hero" }),
    defineField({ name: "whatsappLink", type: "url", title: "Lien WhatsApp Business global" }),
    defineField({ name: "instagramLink", type: "url", title: "Lien Instagram global" }),
    defineField({ name: "contactEmail", type: "string", title: "Email de contact" }),
    defineField({ name: "footerText", type: "text", title: "Texte footer", rows: 2 }),
  ],
  preview: {
    prepare() {
      return { title: "Paramètres du site" };
    },
  },
});
