import { client } from "@/sanity/lib/client";
import {
  featuredEventsQuery,
  featuredTestimonialsQuery,
  faqQuery,
  siteSettingsQuery,
  homePageQuery,
} from "@/sanity/queries";
import { Event, Testimonial, Faq, SiteSettings, HomePage as HomePageContent } from "@/sanity/types";

import Link from "next/link";
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
  const [events, testimonials, faqs, settings, home] = await Promise.all([
    client.fetch<Event[]>(featuredEventsQuery).catch(() => [] as Event[]),
    client.fetch<Testimonial[]>(featuredTestimonialsQuery).catch(() => [] as Testimonial[]),
    client.fetch<Faq[]>(faqQuery).catch(() => [] as Faq[]),
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
    client.fetch<HomePageContent>(homePageQuery).catch(() => null),
  ]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
      />
      <Nav />
      <main>
        <Hero heroImages={settings?.heroImages} content={home?.hero} />
        <TrustStrip items={home?.trustItems} />

        <section className="section" id="concerts">
          <div className="container">
            <div className="section-head section-head-center reveal">
              <div className="section-eyebrow">{home?.events?.eyebrow ?? "Events"}</div>
              <h2 className="section-title display">
                {home?.events?.title ?? "Les events"}{" "}
                <span className="silver-shine">{home?.events?.titleHighlight ?? "du moment"}</span>
              </h2>
            </div>
            <EventsGrid events={events} whatsappLink={settings?.whatsappLink} instagramLink={settings?.instagramLink} />
            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <Link href="/events" className="btn btn-secondary btn-lg">
                {home?.events?.ctaLabel ?? "Voir les events"} <i className="ti ti-arrow-right" />
              </Link>
            </div>
          </div>
        </section>

        <ScrollSteps steps={home?.steps} />
        <WhyUs content={home?.whyUs} />
        <TestimonialsGrid testimonials={testimonials} content={home?.testimonials} />
        <FaqSection faqs={faqs} title={home?.faq?.title} />
        <FinalCta
          whatsappLink={settings?.whatsappLink}
          content={home?.finalCta}
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
