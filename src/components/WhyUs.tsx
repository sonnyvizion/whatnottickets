const cards = [
  { icon: "ti-rosette-discount-check", title: "Réseau de confiance", desc: "Uniquement des vendeurs vérifiés, sélectionnés sur leur historique et leur fiabilité." },
  { icon: "ti-bolt", title: "Contact direct & rapide", desc: "Instagram ou WhatsApp Business — réponse en quelques minutes, 7j/7." },
  { icon: "ti-package", title: "Packages sur mesure", desc: "Hôtel, transport, accès VIP — on construit l'expérience complète à vos côtés." },
  { icon: "ti-shield-lock", title: "Paiement sécurisé", desc: "Virement bancaire ou PayPal entre proches. Modalités confirmées avant transaction." },
];

export default function WhyUs() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head section-head-row reveal">
          <div>
            <div className="section-eyebrow">Pourquoi nous</div>
            <h2 className="section-title display">
              La fiabilité, <span className="silver-shine">sans le stress</span>
            </h2>
          </div>
          <p className="section-sub">
            Une expérience pensée pour vous concentrer sur ce qui compte vraiment.
          </p>
        </div>
        <div className="why-grid reveal">
          {cards.map((card) => (
            <div className="why-card" key={card.title}>
              <div className="why-icon">
                <i className={`ti ${card.icon}`} />
              </div>
              <h3 className="why-title">{card.title}</h3>
              <p className="why-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
