import { client } from "@/sanity/lib/client";
import {
  featuredEventsQuery,
  featuredTestimonialsQuery,
  faqQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import { Event, Testimonial, Faq, SiteSettings } from "@/sanity/types";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import EventsGrid from "@/components/EventsGrid";
import ScrollSteps from "@/components/ScrollSteps";
import WhyUs from "@/components/WhyUs";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export const revalidate = 60;

export default async function HomePage() {
  const [events, testimonials, faqs, settings] = await Promise.all([
    client.fetch<Event[]>(featuredEventsQuery).catch(() => [] as Event[]),
    client.fetch<Testimonial[]>(featuredTestimonialsQuery).catch(() => [] as Testimonial[]),
    client.fetch<Faq[]>(faqQuery).catch(() => [] as Faq[]),
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
        <Hero heroImages={settings?.heroImages} />
        <TrustStrip />

        <section className="section" id="concerts">
          <div className="container">
            <div className="section-head section-head-center reveal">
              <div className="section-eyebrow">Events</div>
              <h2 className="section-title display">
                Les events <span className="silver-shine">du moment</span>
              </h2>
            </div>
            <EventsGrid events={events} />
          </div>
        </section>

        <ScrollSteps />
        <WhyUs />
        <TestimonialsGrid testimonials={testimonials} />
        <FaqSection faqs={faqs} />
        <FinalCta
          whatsappLink={settings?.whatsappLink}
          instagramLink={settings?.instagramLink}
        />
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
