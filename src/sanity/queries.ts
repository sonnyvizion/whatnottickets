import { groq } from "next-sanity";

export const featuredEventsQuery = groq`
  *[_type == "event"] | order(eventDate asc) {
    _id,
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    category,
    eventDate,
    venue,
    city,
    minPrice,
    soldOut
  }[0...6]
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "coverImageUrl": coverImage.asset->url,
    "gallery": gallery[]{ "url": asset->url },
    category,
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
    answer
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    heroTagline,
    whatsappLink,
    instagramLink,
    contactEmail,
    footerText
  }
`;

export const allEventSlugsQuery = groq`
  *[_type == "event"] { "slug": slug.current }
`;
