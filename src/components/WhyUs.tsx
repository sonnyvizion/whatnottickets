import Image from "next/image";
import { HomeWhyCard } from "@/sanity/types";

// Icônes par carte (non éditables) — fusionnées par index avec le contenu Sanity
const CARD_ICONS = ["/img/icone_01.png", "/img/icone_02.png", "/img/icone_03.png", "/img/icone_04.png"];

const DEFAULT_CARDS: HomeWhyCard[] = [
  { title: "Réseau de confiance", desc: "Uniquement des vendeurs vérifiés, sélectionnés sur leur historique et leur fiabilité." },
  { title: "Contact direct & rapide", desc: "Instagram ou WhatsApp Business — réponse en quelques minutes, 7j/7." },
  { title: "Packages sur mesure", desc: "Hôtel, transport, accès VIP — on construit l'expérience complète à vos côtés." },
  { title: "Paiement sécurisé", desc: "Virement bancaire ou PayPal entre proches. Modalités confirmées avant transaction." },
];

interface WhyUsContent {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  cards?: HomeWhyCard[];
}

export default function WhyUs({ content }: { content?: WhyUsContent }) {
  const title = content?.title ?? "La fiabilité,";
  const titleHighlight = content?.titleHighlight ?? "sans le stress";
  const subtitle = content?.subtitle ?? "Une expérience pensée pour vous concentrer sur ce qui compte vraiment.";
  const cards = content?.cards?.length ? content.cards : DEFAULT_CARDS;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head section-head-center reveal">
          <h2 className="section-title display">
            {title} <span className="silver-shine">{titleHighlight}</span>
          </h2>
          <p style={{ fontSize: 15, color: "#7A8499", marginTop: 16, lineHeight: 1.65 }}>
            {subtitle}
          </p>
        </div>
        <div className="why-grid reveal">
          {cards.map((card, i) => (
            <div className="why-card" key={card.title ?? i}>
              <div className="why-icon">
                <Image src={CARD_ICONS[i % CARD_ICONS.length]} alt={card.title ?? ""} width={72} height={72} />
              </div>
              <div className="why-body">
                <h3 className="why-title">{card.title}</h3>
                <p className="why-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
