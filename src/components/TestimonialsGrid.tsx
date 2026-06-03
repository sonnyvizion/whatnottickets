import { Testimonial } from "@/sanity/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

export default function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section section-tinted" id="avis">
      <div className="container">
        <div className="section-head section-head-row reveal">
          <div>
            <div className="section-eyebrow">Avis clients</div>
            <h2 className="section-title display">Ils nous font confiance</h2>
          </div>
          <div className="testimonials-rating">
            <div className="stars">★★★★★</div>
            <div className="rating-meta">+250 clients satisfaits</div>
          </div>
        </div>
        <div className="testimonials-grid reveal">
          {testimonials.map((t) => (
            <div className="testimonial" key={t._id}>
              <i className="ti ti-quote testimonial-quote" />
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="avatar">{t.initials}</div>
                <div>
                  <div className="author-name">{t.authorName}</div>
                  {t.date && <div className="author-meta">{formatDate(t.date)}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
