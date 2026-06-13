import { INSTAGRAM_LINK, WHATSAPP_LINK } from "@/lib/links";

interface FinalCtaContent {
  title?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  subtitle?: string;
}

interface FinalCtaProps {
  whatsappLink?: string;
  instagramLink?: string;
  content?: FinalCtaContent;
}

export default function FinalCta({ content }: FinalCtaProps) {
  const title = content?.title ?? "Prêt à vivre l'événement";
  const titleHighlight = content?.titleHighlight ?? "de l'année";
  const titleSuffix = content?.titleSuffix ?? "?";
  const subtitle = content?.subtitle ?? "Contactez-nous, on s'occupe du reste.";

  return (
    <section className="final-cta" id="contact">
      <div className="final-cta-inner">
        <h2 className="display">
          {title} <span className="silver-shine">{titleHighlight}</span> {titleSuffix}
        </h2>
        <p className="final-cta-sub">{subtitle}</p>
        <div className="final-cta-btns">
          <a
            href={WHATSAPP_LINK}
            className="btn btn-lg"
            style={{ background: "linear-gradient(135deg, #1a9e4f 0%, #25D366 60%, #2ecc71 100%)", border: "none", color: "#FFF" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ti ti-brand-whatsapp" /> WhatsApp
          </a>
          <a
            href={INSTAGRAM_LINK}
            className="btn btn-lg"
            style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", border: "none", color: "#FFF" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ti ti-brand-instagram" /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
