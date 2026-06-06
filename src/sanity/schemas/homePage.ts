import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Page d'accueil",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "trust", title: "Bandeau confiance" },
    { name: "events", title: "Section Events" },
    { name: "steps", title: "Étapes (carousel)" },
    { name: "whyUs", title: "Pourquoi nous" },
    { name: "testimonials", title: "Avis clients" },
    { name: "faq", title: "FAQ" },
    { name: "finalCta", title: "CTA final" },
  ],
  fields: [
    // ---------- HERO ----------
    defineField({
      name: "hero",
      type: "object",
      title: "Hero",
      group: "hero",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title", type: "text", rows: 2, title: "Titre", initialValue: "Trouvez vos billets pour les événements les plus demandés" }),
        defineField({ name: "subtitle", type: "text", rows: 3, title: "Sous-titre", initialValue: "WhatnotTickets vous accompagne dans la recherche de places fiables pour vos concerts, matchs et spectacles préférés." }),
        defineField({ name: "primaryCtaLabel", type: "string", title: "Bouton principal", initialValue: "Voir les events" }),
        defineField({ name: "secondaryCtaLabel", type: "string", title: "Bouton secondaire", initialValue: "Faire une demande" }),
      ],
    }),

    // ---------- BANDEAU CONFIANCE ----------
    defineField({
      name: "trustItems",
      type: "array",
      title: "Bandeau confiance (pastilles défilantes)",
      group: "trust",
      of: [{ type: "string" }],
      initialValue: [
        "Vendeurs vérifiés",
        "Réponse rapide",
        "Accompagnement humain",
        "Paiement sécurisé",
        "+250 clients satisfaits",
        "Disponible 7j/7",
      ],
    }),

    // ---------- SECTION EVENTS ----------
    defineField({
      name: "events",
      type: "object",
      title: "Section Events",
      group: "events",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Events" }),
        defineField({ name: "title", type: "string", title: "Titre", initialValue: "Les events" }),
        defineField({ name: "titleHighlight", type: "string", title: "Mot mis en avant (italique argenté)", description: "Partie du titre stylisée. Ex: « du moment »", initialValue: "du moment" }),
        defineField({ name: "ctaLabel", type: "string", title: "Libellé bouton", initialValue: "Voir les events" }),
      ],
    }),

    // ---------- ÉTAPES ----------
    defineField({
      name: "steps",
      type: "array",
      title: "Étapes",
      group: "steps",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "num", type: "string", title: "Numéro (ex: 01)" }),
          defineField({ name: "tab", type: "string", title: "Onglet (court)" }),
          defineField({ name: "title", type: "string", title: "Titre" }),
          defineField({ name: "body", type: "text", rows: 3, title: "Description" }),
        ],
        preview: { select: { title: "title", subtitle: "tab" } },
      }],
      initialValue: [
        { num: "01", tab: "Choisissez", title: "Choisissez votre événement", body: "Parcourez notre catalogue d'événements disponibles — concerts, matchs, spectacles. Sélectionnez la date et la catégorie de place qui vous convient." },
        { num: "02", tab: "Contactez", title: "Contactez-nous directement", body: "Envoyez-nous un message via Instagram ou WhatsApp Business. Notre équipe vous répond en quelques minutes, 7j/7, pour confirmer la disponibilité." },
        { num: "03", tab: "Payez", title: "Payez en toute sécurité", body: "Virement bancaire ou PayPal entre proches. Toutes les modalités sont confirmées avec vous avant la transaction. Zéro surprise." },
        { num: "04", tab: "Profitez", title: "Vivez l'instant", body: "Recevez vos billets par mail ou WhatsApp. Vous n'avez plus qu'à profiter — on s'est occupé du reste." },
      ],
    }),

    // ---------- POURQUOI NOUS ----------
    defineField({
      name: "whyUs",
      type: "object",
      title: "Pourquoi nous",
      group: "whyUs",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", type: "string", title: "Titre", initialValue: "La fiabilité," }),
        defineField({ name: "titleHighlight", type: "string", title: "Mot mis en avant (italique argenté)", initialValue: "sans le stress" }),
        defineField({ name: "subtitle", type: "text", rows: 2, title: "Sous-titre", initialValue: "Une expérience pensée pour vous concentrer sur ce qui compte vraiment." }),
        defineField({
          name: "cards",
          type: "array",
          title: "Cartes",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", type: "string", title: "Titre" }),
              defineField({ name: "desc", type: "text", rows: 2, title: "Description" }),
            ],
            preview: { select: { title: "title" } },
          }],
          initialValue: [
            { title: "Réseau de confiance", desc: "Uniquement des vendeurs vérifiés, sélectionnés sur leur historique et leur fiabilité." },
            { title: "Contact direct & rapide", desc: "Instagram ou WhatsApp Business — réponse en quelques minutes, 7j/7." },
            { title: "Packages sur mesure", desc: "Hôtel, transport, accès VIP — on construit l'expérience complète à vos côtés." },
            { title: "Paiement sécurisé", desc: "Virement bancaire ou PayPal entre proches. Modalités confirmées avant transaction." },
          ],
        }),
      ],
    }),

    // ---------- AVIS ----------
    defineField({
      name: "testimonials",
      type: "object",
      title: "Avis clients",
      group: "testimonials",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "Avis clients" }),
        defineField({ name: "title", type: "string", title: "Titre", initialValue: "Ils nous font confiance" }),
        defineField({ name: "ratingMeta", type: "string", title: "Texte note (ex: +250 clients satisfaits)", initialValue: "+250 clients satisfaits" }),
      ],
    }),

    // ---------- FAQ ----------
    defineField({
      name: "faq",
      type: "object",
      title: "FAQ",
      group: "faq",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", type: "string", title: "Titre de section", initialValue: "Questions fréquentes" }),
      ],
    }),

    // ---------- CTA FINAL ----------
    defineField({
      name: "finalCta",
      type: "object",
      title: "CTA final",
      group: "finalCta",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", type: "string", title: "Titre", initialValue: "Prêt à vivre l'événement" }),
        defineField({ name: "titleHighlight", type: "string", title: "Mot mis en avant (italique argenté)", initialValue: "de l'année" }),
        defineField({ name: "titleSuffix", type: "string", title: "Fin du titre (après le mot mis en avant)", initialValue: "?" }),
        defineField({ name: "subtitle", type: "string", title: "Sous-titre", initialValue: "Contactez-nous, on s'occupe du reste." }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Page d'accueil" };
    },
  },
});
