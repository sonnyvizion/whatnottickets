import { client } from "@/sanity/lib/client";
import { allEventsQuery, siteSettingsQuery } from "@/sanity/queries";
import { Event, SiteSettings } from "@/sanity/types";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EventsGrid from "@/components/EventsGrid";
import RevealObserver from "@/components/RevealObserver";

export const revalidate = 60;

export const metadata = {
  title: "Tous les événements — WhatnotTickets",
  description: "Concerts, matchs, spectacles — trouvez votre billet parmi tous nos événements disponibles.",
};

export default async function EventsPage() {
  const [events, settings] = await Promise.all([
    client.fetch<Event[]>(allEventsQuery).catch(() => [] as Event[]),
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
  ]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
      />
      <Nav />
      <main>
        <section className="section" style={{ paddingTop: "120px" }}>
          <div className="container">
            <div className="section-head section-head-center reveal">
              <div className="section-eyebrow">Events</div>
              <h1 className="section-title display">
                Tous les <span className="silver-shine">événements</span>
              </h1>
            </div>
            <EventsGrid events={events} whatsappLink={settings?.whatsappLink} instagramLink={settings?.instagramLink} />
          </div>
        </section>
      </main>
      <Footer
        whatsappLink={settings?.whatsappLink}
        instagramLink={settings?.instagramLink}
        email={settings?.contactEmail}
      />
      <RevealObserver />
    </>
  );
}
