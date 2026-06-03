interface FinalCtaProps {
  whatsappLink?: string;
  instagramLink?: string;
}

export default function FinalCta({ instagramLink = "#" }: FinalCtaProps) {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta-inner">
        <div className="section-eyebrow">Contactez-nous</div>
        <h2 className="display">
          Prêt à vivre l&apos;événement <span className="silver-shine">de l&apos;année</span> ?
        </h2>
        <p className="final-cta-sub">Contactez-nous, on s&apos;occupe du reste.</p>
        <div className="final-cta-btns">
          <a href={instagramLink} className="btn btn-lg" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", border: "none", color: "#FFF" }} target="_blank" rel="noopener noreferrer">
            <i className="ti ti-brand-instagram" /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
