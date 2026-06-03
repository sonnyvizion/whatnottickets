interface FinalCtaProps {
  whatsappLink?: string;
  instagramLink?: string;
}

export default function FinalCta({ whatsappLink = "#", instagramLink = "#" }: FinalCtaProps) {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta-inner">
        <div className="section-eyebrow">Contactez-nous</div>
        <h2 className="display">
          Prêt à vivre l&apos;événement <span className="silver-shine">de l&apos;année</span> ?
        </h2>
        <p className="final-cta-sub">Contactez-nous, on s&apos;occupe du reste.</p>
        <div className="final-cta-btns">
          <a href={whatsappLink} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
            <i className="ti ti-brand-whatsapp" /> WhatsApp Business
          </a>
          <a href={instagramLink} className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
            <i className="ti ti-brand-instagram" /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
