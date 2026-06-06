import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { eventBySlugQuery, allEventSlugsQuery } from "@/sanity/queries";
import { Event } from "@/sanity/types";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { INSTAGRAM_LINK } from "@/lib/links";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allEventSlugsQuery).catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }) + " à " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

const CATEGORY_LABELS: Record<string, string> = {
  foot: "Foot",
  concert: "Concert",
  spectacle: "Spectacle",
  autre: "Autre",
};

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await client.fetch<Event>(eventBySlugQuery, { slug }).catch(() => null);

  if (!event) notFound();

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css" />
      <Nav />

      {/* Hero event */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "120px 32px 60px",
          background: event.coverImageUrl
            ? `linear-gradient(to bottom, rgba(11,15,26,0.3) 0%, rgba(11,15,26,0.85) 100%), url(${event.coverImageUrl}) center/cover no-repeat`
            : "linear-gradient(135deg, #0E1322 0%, #161D2F 100%)",
        }}
      >
        <div className="container">
          {event.category && (
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="eyebrow-dot" />
              {CATEGORY_LABELS[event.category] ?? event.category}
            </div>
          )}
          <h1 className="display" style={{ fontSize: "clamp(36px,6vw,72px)", color: "#FFF", letterSpacing: "-2px", marginBottom: 16 }}>
            {event.title}
          </h1>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", color: "#8B94A8", fontSize: 14 }}>
            {event.eventDate && (
              <span><i className="ti ti-calendar" style={{ marginRight: 6 }} />{formatDate(event.eventDate)}</span>
            )}
            {(event.venue || event.city) && (
              <span><i className="ti ti-map-pin" style={{ marginRight: 6 }} />{[event.venue, event.city].filter(Boolean).join(", ")}</span>
            )}
          </div>
        </div>
      </section>

      <main style={{ background: "#0B0F1A" }}>
        <div className="container" style={{ padding: "80px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" }}>

            {/* Left: description */}
            <div>
              {event.shortDescription && (
                <p style={{ fontSize: 18, color: "#C5CCD9", lineHeight: 1.7, marginBottom: 40 }}>
                  {event.shortDescription}
                </p>
              )}

              {/* Price categories */}
              {event.priceCategories && event.priceCategories.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  <h2 className="display" style={{ fontSize: 28, color: "#FFF", letterSpacing: "-0.5px", marginBottom: 24 }}>
                    Catégories de prix
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {event.priceCategories.map((cat) => (
                      <div
                        key={cat._key}
                        style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "20px 24px", border: "1px solid rgba(216,221,230,0.08)",
                          borderRadius: 12, background: "#161D2F",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, color: "#FFF", fontSize: 15 }}>{cat.label}</div>
                          {cat.description && <div style={{ fontSize: 13, color: "#7A8499", marginTop: 4 }}>{cat.description}</div>}
                        </div>
                        <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 22, fontWeight: 700, color: "#C9A961" }}>
                          {cat.price}€
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: CTA card */}
            <div style={{
              position: "sticky", top: 100,
              border: "1px solid rgba(201,169,97,0.3)", borderRadius: 16,
              background: "linear-gradient(180deg, rgba(201,169,97,0.04) 0%, #161D2F 100%)",
              padding: 32,
            }}>
              <div style={{ marginBottom: 8, fontSize: 12, color: "#7A8499" }}>À partir de</div>
              <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 42, fontWeight: 700, color: "#C9A961", letterSpacing: "-1px", marginBottom: 24 }}>
                {event.minPrice ?? "—"}€
              </div>

              {event.soldOut ? (
                <div style={{ textAlign: "center", padding: "14px", background: "rgba(216,221,230,0.06)", borderRadius: 999, color: "#7A8499", fontSize: 14 }}>
                  Événement complet
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {event.whatsappLink && (
                    <a href={event.whatsappLink} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer" style={{ justifyContent: "center" }}>
                      <i className="ti ti-brand-whatsapp" /> Réserver via WhatsApp
                    </a>
                  )}
                  <a href={INSTAGRAM_LINK} className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer" style={{ justifyContent: "center" }}>
                    <i className="ti ti-brand-instagram" /> DM Instagram
                  </a>
                </div>
              )}

              <p style={{ fontSize: 12, color: "#7A8499", marginTop: 20, textAlign: "center", lineHeight: 1.5 }}>
                Paiement par virement ou PayPal entre proches. Modalités confirmées avant transaction.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
