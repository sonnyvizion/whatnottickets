import { groq } from "next-sanity";

// Délai après le début de la dernière date avant qu'un event soit considéré
// comme terminé (les dates Sanity n'ont qu'une heure de début). 6 h : un concert
// à 21:00 disparaît du site à 3:00.
const EXPIRE_AFTER_SECONDS = 6 * 60 * 60;

// Un event reste visible tant qu'au moins une de ses dates n'est pas terminée.
// Sans aucune date, il reste visible. Rien n'est supprimé dans Sanity : l'event
// est seulement masqué du site (pages ISR 60 s → disparaît en ~1 min).
const NOT_ENDED = `(
  count(eventDates[dateTime(@) > dateTime(now()) - ${EXPIRE_AFTER_SECONDS}]) > 0
  || (
    count(coalesce(eventDates, [])) == 0
    && (!defined(eventDate) || dateTime(eventDate) > dateTime(now()) - ${EXPIRE_AFTER_SECONDS})
  )
)`;

export const featuredEventsQuery = groq`
  *[_type == "event" && ${NOT_ENDED}] | order(orderRank, coalesce(eventDates[0], eventDate) asc) {
    _id,
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    category,
    eventDates,
    eventDate,
    venue,
    city,
    minPrice,
    soldOut,
    featured,
    whatsappLink
  }[0...6]
`;

export const allEventsQuery = groq`
  *[_type == "event" && ${NOT_ENDED}] | order(orderRank, coalesce(eventDates[0], eventDate) asc) {
    _id,
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    category,
    eventDates,
    eventDate,
    venue,
    city,
    minPrice,
    soldOut,
    featured,
    whatsappLink
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug && ${NOT_ENDED}][0] {
    _id,
    title,
    "coverImageUrl": coverImage.asset->url,
    "gallery": gallery[]{ "url": asset->url },
    category,
    eventDates,
    eventDate,
    venue,
    city,
    shortDescription,
    longDescription,
    minPrice,
    priceCategories,
    whatsappLink,
    instagramLink,
    soldOut
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(date desc) {
    _id,
    authorName,
    initials,
    text,
    date
  }[0...3]
`;

export const faqQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    "image": image.asset->url
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    heroTagline,
    "heroImages": heroImages[].asset->url,
    navCtaLabel,
    navCtaLink,
    whatsappLink,
    instagramLink,
    contactEmail,
    footerText
  }
`;

export const allEventSlugsQuery = groq`
  *[_type == "event" && ${NOT_ENDED}] { "slug": slug.current }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero,
    trustItems,
    events,
    steps,
    whyUs,
    testimonials,
    faq,
    finalCta
  }
`;
