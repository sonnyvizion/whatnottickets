import { Testimonial } from "@/sanity/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

interface TestimonialsContent {
  eyebrow?: string;
  title?: string;
  ratingMeta?: string;
}

export default function TestimonialsGrid({ testimonials, content }: { testimonials: Testimonial[]; content?: TestimonialsContent }) {
  const eyebrow = content?.eyebrow ?? "Avis clients";
  const title = content?.title ?? "Ils nous font confiance";
  const ratingMeta = content?.ratingMeta ?? "+250 clients satisfaits";

  return (
    <section className="section section-tinted" id="avis">
      <div className="container">
        <div className="section-head section-head-row reveal">
          <div>
            <div className="section-eyebrow">{eyebrow}</div>
            <h2 className="section-title display">{title}</h2>
          </div>
          <div className="testimonials-rating">
            <div className="stars">★★★★★</div>
            <div className="rating-meta">{ratingMeta}</div>
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
