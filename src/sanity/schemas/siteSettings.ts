import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  type: "document",
  title: "Paramètres du site",
  fields: [
    defineField({
      name: "comingSoon",
      type: "boolean",
      title: "Site en construction (Coming soon)",
      description: "Si activé, le site public affiche une page « Bientôt disponible ». Le studio reste accessible. Effet en ~1 min après publication.",
      initialValue: false,
    }),
    defineField({ name: "heroTagline", type: "string", title: "Tagline du hero" }),
    defineField({
      name: "heroImages",
      type: "array",
      title: "Images du hero (carousel)",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "navCtaLabel",
      type: "string",
      title: "Bouton Nav — texte",
      description: "Texte du bouton en haut à droite (défaut : « Obtenir mes billets »).",
    }),
    defineField({
      name: "navCtaLink",
      type: "string",
      title: "Bouton Nav — lien",
      description:
        "Où mène le bouton. Lien externe (https://wa.me/…, Instagram…) ou interne (/events, /#contact).",
    }),
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
