import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Nav from "./Nav";

const navSettingsQuery = groq`
  *[_type == "siteSettings"][0]{ navCtaLabel, navCtaLink }
`;

// Wrapper serveur : lit le bouton CTA configuré dans Sanity et le passe à la Nav (client).
export default async function NavBar() {
  const settings = await client
    .fetch<{ navCtaLabel?: string; navCtaLink?: string }>(navSettingsQuery)
    .catch(() => null);

  return <Nav ctaLink={settings?.navCtaLink} ctaLabel={settings?.navCtaLabel} />;
}
