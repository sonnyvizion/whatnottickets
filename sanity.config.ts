import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const SINGLETONS = [
  { id: "homePage", title: "Page d'accueil", icon: "🏠" },
  { id: "siteSettings", title: "Paramètres du site", icon: "⚙️" },
];

const SINGLETON_IDS = SINGLETONS.map((s) => s.id);

export default defineConfig({
  name: "whatnottickets",
  title: "WhatnotTickets",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "51soe3m9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            ...SINGLETONS.map((singleton) =>
              S.listItem()
                .title(singleton.title)
                .id(singleton.id)
                .child(
                  S.document().schemaType(singleton.id).documentId(singleton.id)
                )
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !SINGLETON_IDS.includes(listItem.getId() as string)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Empêche la création/suppression de plusieurs instances des singletons
    actions: (input, context) =>
      SINGLETON_IDS.includes(context.schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action as string)
          )
        : input,
  },
});
