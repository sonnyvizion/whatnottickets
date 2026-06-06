"use client";

import { Event } from "@/sanity/types";
import { INSTAGRAM_LINK } from "@/lib/links";

const CATEGORY_ICONS: Record<string, string> = {
  concert: "ti-microphone-2",
  festival: "ti-music",
  sport: "ti-trophy",
  foot: "ti-ball-football",
  basket: "ti-ball-basketball",
  baskets: "ti-shoe",
  spectacle: "ti-masks-theater",
  evenement: "ti-calendar-event",
  autre: "ti-ticket",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) + " · " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function buildWhatsappLink(base?: string, eventTitle?: string) {
  if (!base) base = "https://wa.me/33743522051";
  const msg = encodeURIComponent(`Bonjour, je souhaite faire une demande pour : ${eventTitle ?? "un événement"}`);
  return `${base}?text=${msg}`;
}

export default function EventsGrid({
  events,
  whatsappLink,
}: {
  events: Event[];
  whatsappLink?: string;
  instagramLink?: string;
}) {
  if (!events.length) {
    return (
      <p style={{ color: "#7A8499", textAlign: "center", padding: "40px 0" }}>
        Aucun événement à venir pour le moment.
      </p>
    );
  }

  return (
    <div className="events-grid reveal">
      {events.map((event) => (
        <div
          key={event._id}
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
            {event.featured && <div className="event-badge">À LA UNE</div>}
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
              <div className="event-ctas">
                <a
                  href={buildWhatsappLink(event.whatsappLink || whatsappLink, event.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  title="WhatsApp"
                >
                  <i className="ti ti-brand-whatsapp" /> WhatsApp
                </a>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  title="Instagram"
                >
                  <i className="ti ti-brand-instagram" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
