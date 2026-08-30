import type { Metadata } from "next";
import { Elms_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CameraFlashes from "@/components/CameraFlashes";
import CookieConsent from "@/components/CookieConsent";

// Google Analytics 4 — coller ici l'ID de mesure (format "G-XXXXXXXXXX").
// Laisser vide désactive complètement GA.
const GA_ID: string = "G-57NB6YRLJM";
// Google Search Console — coller ici le code de la balise de vérification HTML
// (juste le contenu de l'attribut content="...", pas la balise entière).
// Laisser vide n'ajoute aucune balise.
const GOOGLE_SITE_VERIFICATION: string = "56nqH9NcXk2lEOqhtZJYsd3BZyR3tCkzgTBH1-5cn74";

const elmsSans = Elms_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-google",
  display: "swap",
});

const BASE_URL = "https://whatnottickets.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "WhatnotTickets — Billetterie premium pour concerts, matchs & spectacles",
    template: "%s — WhatnotTickets",
  },
  description: "Billets pour concerts, matchs et spectacles. Vendeurs vérifiés, réponse rapide, paiement sécurisé.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "WhatnotTickets",
    title: "WhatnotTickets — Billetterie premium pour concerts, matchs & spectacles",
    description: "Billets pour concerts, matchs et spectacles. Vendeurs vérifiés, réponse rapide, paiement sécurisé.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhatnotTickets — Billetterie premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatnotTickets — Billetterie premium pour concerts, matchs & spectacles",
    description: "Billets pour concerts, matchs et spectacles. Vendeurs vérifiés, réponse rapide, paiement sécurisé.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WhatnotTickets",
  url: "https://whatnottickets.fr",
  logo: "https://whatnottickets.fr/img/logo_white.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33-7-43-52-20-51",
    contactType: "customer service",
    availableLanguage: "French",
  },
  sameAs: [
    "https://www.instagram.com/whatnottickets",
    "https://wa.me/33743522051",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "32 rue de l'Hortus",
    addressLocality: "Saint-Martin-de-Londres",
    postalCode: "34380",
    addressCountry: "FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={elmsSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <CameraFlashes />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
        <CookieConsent gaId={GA_ID} />
      </body>
    </html>
  );
}
