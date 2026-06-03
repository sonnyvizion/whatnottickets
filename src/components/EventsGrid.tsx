"use client";

import Link from "next/link";
import { useState } from "react";
import { Event } from "@/sanity/types";

const CATEGORY_ICONS: Record<string, string> = {
  foot: "ti-trophy",
  concert: "ti-microphone-2",
  spectacle: "ti-masks-theater",
  autre: "ti-ticket",
};

const PER_PAGE = 6;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) + " · " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function EventsGrid({ events }: { events: Event[] }) {
  const [page, setPage] = useState(0);

  if (!events.length) {
    return (
      <p style={{ color: "#7A8499", textAlign: "center", padding: "40px 0" }}>
        Aucun événement à venir pour le moment.
      </p>
    );
  }

  const totalPages = Math.ceil(events.length / PER_PAGE);
  const visible = events.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <>
      <div className="carousel-nav-row">
        <button
          className="carousel-arrow arrow-prev"
          aria-label="Précédent"
          onClick={prev}
          disabled={page === 0}
        >
          <i className="ti ti-arrow-left" />
        </button>
        <button
          className="carousel-arrow arrow-next"
          aria-label="Suivant"
          onClick={next}
          disabled={page === totalPages - 1}
        >
          <i className="ti ti-arrow-right" />
        </button>
      </div>

      <div className="events-grid reveal" key={page}>
        {visible.map((event) => (
          <Link
            key={event._id}
            href={`/events/${event.slug}`}
            className={`event-card${event.featured ? " featured" : ""}`}
          >
            <div className="event-img">
              {event.coverImageUrl ? (
                <img src={event.coverImageUrl} alt={event.title} />
              ) : (
                <i className={`ti ${CATEGORY_ICONS[event.category ?? "autre"] ?? "ti-ticket"}`} />
              )}
              {event.category && (
                <div className="event-cat">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
              )}
              {event.featured && <div className="event-badge">FEATURED</div>}
              {event.soldOut && (
                <div className="event-badge" style={{ background: "#3D4A66", color: "#C5CCD9" }}>
                  COMPLET
                </div>
              )}
            </div>
            <div className="event-body">
              {event.eventDate && (
                <div className="event-date">
                  <i className="ti ti-calendar" />
                  {formatDate(event.eventDate)}
                </div>
              )}
              <h3 className="event-title">{event.title}</h3>
              {(event.venue || event.city) && (
                <div className="event-venue">
                  <i className="ti ti-map-pin" />
                  {[event.venue, event.city].filter(Boolean).join(", ")}
                </div>
              )}
              <div className="event-foot">
                <div>
                  <div className="event-price-label">À partir de</div>
                  <div className="event-price">{event.minPrice ?? "—"}€</div>
                </div>
                <div className="event-link">
                  Voir <i className="ti ti-arrow-right" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="carousel-dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`dot${i === page ? " dot-active" : " dot-inactive"}`}
            onClick={() => setPage(i)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </>
  );
}
