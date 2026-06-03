export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface PriceCategory {
  _key: string;
  label: string;
  description?: string;
  price: number;
}

export interface Event {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImage;
  coverImageUrl?: string;
  gallery?: { url: string }[];
  category?: "foot" | "concert" | "spectacle" | "autre";
  eventDate?: string;
  venue?: string;
  city?: string;
  shortDescription?: string;
  longDescription?: unknown[];
  minPrice?: number;
  priceCategories?: PriceCategory[];
  whatsappLink?: string;
  instagramLink?: string;
  featured?: boolean;
  soldOut?: boolean;
}

export interface Testimonial {
  _id: string;
  authorName: string;
  initials: string;
  text: string;
  date?: string;
  featured?: boolean;
}

export interface Faq {
  _id: string;
  question: string;
  answer?: unknown[];
  order?: number;
  image?: string;
}

export interface SiteSettings {
  heroImages?: string[];
  _id: string;
  heroTagline?: string;
  whatsappLink?: string;
  instagramLink?: string;
  contactEmail?: string;
  footerText?: string;
}
