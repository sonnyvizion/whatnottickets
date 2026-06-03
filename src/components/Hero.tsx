"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const SLIDES = [
  "/img/banner-tickets.webp",
  "/img/carou_01.webp",
  "/img/carou_02.webp",
];

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero hero-img" id="accueil">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="hero-img-bg"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />
      ))}
      <div className="hero-content">
        <h1 className="display hero-title">
          Trouvez vos billets pour les<br />
          événements les plus demandés
        </h1>
        <p className="hero-sub">
          WhatnotTickets vous accompagne dans la recherche de places fiables
          pour vos concerts, matchs et spectacles préférés.
        </p>
        <div className="hero-cta">
          <Link href="#concerts" className="btn btn-hero-outline btn-lg">
            Voir les concerts
          </Link>
          <Link href="#contact" className="btn btn-hero-white btn-lg">
            Faire une demande
          </Link>
        </div>
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
