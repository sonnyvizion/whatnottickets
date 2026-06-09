import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allEventSlugsQuery } from "@/sanity/queries";

const BASE_URL = "https://whatnottickets.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await client.fetch<{ slug: string }[]>(allEventSlugsQuery).catch(() => []);

  const eventUrls: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${BASE_URL}/events/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/events`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/conditions-utilisation`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politique-confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    ...eventUrls,
  ];
}
