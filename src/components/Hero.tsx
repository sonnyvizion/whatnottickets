"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const FALLBACK_SLIDES = [
  "/img/concert_banner_copie.webp",
];

const INTERVAL = 5000;

interface HeroContent {
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

export default function Hero({ heroImages, content }: { heroImages?: string[]; content?: HeroContent }) {
  const slides = heroImages?.length ? heroImages : FALLBACK_SLIDES;
  const [current, setCurrent] = useState(0);

  const title = content?.title ?? "Trouvez vos billets pour les événements les plus demandés";
  const subtitle = content?.subtitle ?? "WhatnotTickets vous accompagne dans la recherche de places fiables pour vos concerts, matchs et spectacles préférés.";
  const primaryCtaLabel = content?.primaryCtaLabel ?? "Voir les events";
  const secondaryCtaLabel = content?.secondaryCtaLabel ?? "Faire une demande";

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="hero hero-img" id="accueil">
      {/* div bg pour animations CSS + ::after overlay */}
      <div
        className="hero-img-bg"
        style={{ backgroundImage: `url('${slides[current]}')` }}
      />
      {/* img SEO-visible pour les crawlers, visuellement masquée */}
      <img
        src={slides[current]}
        alt="WhatnotTickets — Billetterie premium concerts, matchs et spectacles"
        fetchPriority="high"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        aria-hidden="true"
      />
      <div className="hero-content">
        <h1 className="display hero-title">{title}</h1>
        <p className="hero-sub">{subtitle}</p>
        <div className="hero-cta">
          <Link href="/events" className="btn btn-hero-outline btn-lg">
            {primaryCtaLabel}
          </Link>
          <Link href="#contact" className="btn btn-hero-white btn-lg">
            {secondaryCtaLabel}
          </Link>
        </div>
        {slides.length > 1 && (
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot${i === current ? " active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
