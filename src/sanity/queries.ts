import { groq } from "next-sanity";

export const featuredEventsQuery = groq`
  *[_type == "event"] | order(coalesce(eventDates[0], eventDate) asc) {
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
  *[_type == "event"] | order(coalesce(eventDates[0], eventDate) asc) {
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
  *[_type == "event" && slug.current == $slug][0] {
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
    whatsappLink,
    instagramLink,
    contactEmail,
    footerText
  }
`;

export const allEventSlugsQuery = groq`
  *[_type == "event"] { "slug": slug.current }
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
