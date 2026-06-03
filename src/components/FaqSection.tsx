"use client";

import { useState, useRef, useEffect } from "react";
import { Faq } from "@/sanity/types";

const DEFAULT_FAQS: Faq[] = [
  { _id: "1", question: "Comment se passe le paiement ?", answer: [{ _type: "block", children: [{ _type: "span", text: "Nous acceptons les virements bancaires ainsi que PayPal entre proches. Toutes les modalités sont confirmées avec vous avant la transaction." }] }], image: "/img/carou_01.webp" },
  { _id: "2", question: "Comment je reçois mes billets ?", answer: [{ _type: "block", children: [{ _type: "span", text: "Vous recevez vos billets par mail ou directement sur WhatsApp, sous format électronique. Le délai dépend de l'événement mais reste toujours dans des temps confortables avant la date." }] }], image: "/img/carou_02.webp" },
  { _id: "3", question: "Vos places sont-elles garanties ?", answer: [{ _type: "block", children: [{ _type: "span", text: "Oui. Toutes les places passent par notre réseau de vendeurs vérifiés. Nous garantissons la validité du billet et la catégorie réservée." }] }], image: "/img/banner-tickets.webp" },
  { _id: "4", question: "Que comprend un package ?", answer: [{ _type: "block", children: [{ _type: "span", text: "Selon vos besoins : hôtel, transport, accès VIP, restauration. Chaque package est construit sur mesure. Contactez-nous pour un devis personnalisé." }] }], image: "/img/carou_03.webp" },
  { _id: "5", question: "Que faire si l'événement est annulé ?", answer: [{ _type: "block", children: [{ _type: "span", text: "En cas d'annulation par l'organisateur, nous nous engageons à trouver une solution avec vous : remboursement, report, ou place sur un événement équivalent." }] }], image: "/img/carou_04.webp" },
];

function getAnswerText(answer: unknown[]): string {
  try {
    return (answer as { children?: { text?: string }[] }[])
      .flatMap((b) => b.children ?? [])
      .map((s) => s.text ?? "")
      .join("");
  } catch {
    return "";
  }
}

function FaqItem({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (isOpen) {
      setHeight(bodyRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? " open" : ""}`}>
      <button className="faq-summary" onClick={onToggle}>
        <span>{faq.question}</span>
        <i className="ti ti-plus" />
      </button>
      <div
        className="faq-body-wrap"
        style={{ height, overflow: "hidden", transition: "height 0.4s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div ref={bodyRef} className="faq-body">
          {faq.answer ? getAnswerText(faq.answer) : ""}
        </div>
      </div>
    </div>
  );
}

export default function FaqSection({ faqs }: { faqs?: Faq[] }) {
  const items = faqs?.length ? faqs : DEFAULT_FAQS;
  const [activeId, setActiveId] = useState<string>(items[0]._id);
  const activeItem = items.find((f) => f._id === activeId) ?? items[0];

  return (
    <section className="section section-tinted" id="faq">
      <div className="container">
        <div className="section-head section-head-center reveal">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title display">Questions fréquentes</h2>
        </div>
        <div className="faq-layout reveal">
          {/* Photo gauche */}
          <div className="faq-visual">
            {items.map((faq) => (
              <div
                key={faq._id}
                className="faq-visual-img"
                style={{
                  backgroundImage: `url('${(faq as Faq & { image?: string }).image ?? "/img/banner-tickets.webp"}')`,
                  opacity: faq._id === activeId ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            ))}
            <div className="faq-visual-overlay" />
          </div>

          {/* Questions droite */}
          <div className="faq-list">
            {items.map((faq) => (
              <FaqItem
                key={faq._id}
                faq={faq}
                isOpen={activeId === faq._id}
                onToggle={() => setActiveId(faq._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
