import { client } from "@/sanity/lib/client";
import {
  featuredEventsQuery,
  featuredTestimonialsQuery,
  faqQuery,
  siteSettingsQuery,
  homePageQuery,
} from "@/sanity/queries";
import { Event, Testimonial, Faq, SiteSettings, HomePage as HomePageContent, HomeStep } from "@/sanity/types";

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "WhatnotTickets — Billetterie premium pour concerts, matchs & spectacles",
  description: "WhatnotTickets trouve vos billets pour les concerts, matchs et spectacles les plus demandés. Service de conciergerie personnalisé, vendeurs vérifiés, réponse rapide via WhatsApp et Instagram, paiement sécurisé.",
  alternates: { canonical: "https://whatnottickets.fr" },
};
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

        {(() => {
          const DEFAULT_STEPS: HomeStep[] = [
            { num: "01", title: "Choisissez votre événement", body: "Parcourez notre catalogue d'événements disponibles — concerts, matchs, spectacles. Sélectionnez la date et la catégorie de place qui vous convient." },
            { num: "02", title: "Contactez-nous directement", body: "Envoyez-nous un message via Instagram ou WhatsApp Business. Notre équipe vous répond en quelques minutes, 7j/7, pour confirmer la disponibilité." },
            { num: "03", title: "Payez en toute sécurité", body: "Virement bancaire ou PayPal entre proches. Toutes les modalités sont confirmées avec vous avant la transaction. Zéro surprise." },
            { num: "04", title: "Vivez l'instant", body: "Recevez vos billets par mail ou WhatsApp. Vous n'avez plus qu'à profiter — on s'est occupé du reste." },
          ];
          const steps = home?.steps?.length ? home.steps : DEFAULT_STEPS;
          const schema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Comment obtenir vos billets avec WhatnotTickets",
            description: "WhatnotTickets vous accompagne en 4 étapes pour obtenir vos billets d'événements.",
            step: steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title ?? "",
              text: s.body ?? "",
            })),
          };
          return (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          );
        })()}
        <ScrollSteps steps={home?.steps} />
        <WhyUs content={home?.whyUs} />
        <TestimonialsGrid testimonials={testimonials} content={home?.testimonials} />
        {faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: (faq.answer as { children?: { text?: string }[] }[] ?? [])
                      .flatMap((b) => b.children ?? [])
                      .map((s) => s.text ?? "")
                      .join(""),
                  },
                })),
              }),
            }}
          />
        )}
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
