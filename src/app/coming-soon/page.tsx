import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { SiteSettings } from "@/sanity/types";
import { INSTAGRAM_LINK } from "@/lib/links";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bientôt disponible",
  robots: { index: false, follow: false },
};

export default async function ComingSoonPage() {
  const settings = await client
    .fetch<SiteSettings>(siteSettingsQuery)
    .catch(() => null);
  const whatsappLink = settings?.whatsappLink ?? "https://wa.me/33743522051";

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css"
      />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px",
          background:
            "radial-gradient(ellipse at center, #0E1322 0%, #0B0F1A 70%)",
        }}
      >
        <img
          src="/img/logo_white.png"
          alt="WhatnotTickets"
          style={{
            height: 56,
            width: "auto",
            marginBottom: 40,
            filter:
              "drop-shadow(-3px 3px 8px rgba(220,50,50,0.5)) drop-shadow(3px -3px 8px rgba(50,80,220,0.5))",
          }}
        />

        <div
          style={{
            fontFamily: '"Neue Kaine", "Elms Sans", sans-serif',
            fontSize: 13,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#C9A961",
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          Bientôt disponible
        </div>

        <h1
          className="display"
          style={{
            fontSize: "clamp(34px, 6vw, 64px)",
            color: "#FFF",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 760,
            marginBottom: 24,
          }}
        >
          Notre billetterie arrive très vite
        </h1>

        <p
          style={{
            fontSize: 17,
            color: "#8B94A8",
            lineHeight: 1.6,
            maxWidth: 520,
            marginBottom: 40,
          }}
        >
          Nous préparons une sélection d&apos;événements premium — concerts,
          matchs et spectacles. En attendant, contactez-nous directement.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg"
            style={{
              background:
                "linear-gradient(135deg, #1a9e4f 0%, #25D366 60%, #2ecc71 100%)",
              border: "none",
              color: "#FFF",
            }}
          >
            <i className="ti ti-brand-whatsapp" /> WhatsApp
          </a>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg"
            style={{
              background:
                "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              border: "none",
              color: "#FFF",
            }}
          >
            <i className="ti ti-brand-instagram" /> Instagram
          </a>
        </div>
      </main>
    </>
  );
}
