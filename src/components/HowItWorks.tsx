const steps = [
  { num: "01", title: "Choisissez", desc: "Sélectionnez l'event et la catégorie de place" },
  { num: "02", title: "Contactez-nous", desc: "Via Instagram ou WhatsApp Business" },
  { num: "03", title: "Payez", desc: "Virement bancaire ou PayPal entre proches" },
  { num: "04", title: "Profitez", desc: "Recevez vos places et vivez l'instant" },
];

export default function HowItWorks() {
  return (
    <section className="section section-tinted" id="how">
      <div className="container">
        <div className="section-head section-head-center reveal">
          <div className="section-eyebrow">Processus</div>
          <h2 className="section-title display">
            4 étapes, <span className="silver-shine">zéro stress</span>
          </h2>
        </div>
        <div className="steps reveal">
          {steps.map((step) => (
            <div className="step" key={step.num}>
              <div className="step-num">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
