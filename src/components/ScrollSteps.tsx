"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const steps = [
  {
    num: "01",
    tab: "Choisissez",
    title: "Choisissez votre événement",
    body: "Parcourez notre catalogue d'événements disponibles — concerts, matchs, spectacles. Sélectionnez la date et la catégorie de place qui vous convient.",
    blob1: "rgba(201,169,97,0.2)",
    blob2: "rgba(50,80,220,0.15)",
    image: "/img/carou_01.webp",
  },
  {
    num: "02",
    tab: "Contactez",
    title: "Contactez-nous directement",
    body: "Envoyez-nous un message via Instagram ou WhatsApp Business. Notre équipe vous répond en quelques minutes, 7j/7, pour confirmer la disponibilité.",
    blob1: "rgba(50,80,220,0.2)",
    blob2: "rgba(220,50,50,0.15)",
    image: "/img/carou_02.webp",
  },
  {
    num: "03",
    tab: "Payez",
    title: "Payez en toute sécurité",
    body: "Virement bancaire ou PayPal entre proches. Toutes les modalités sont confirmées avec vous avant la transaction. Zéro surprise.",
    blob1: "rgba(220,50,50,0.18)",
    blob2: "rgba(201,169,97,0.18)",
    image: "/img/carou_03.webp",
  },
  {
    num: "04",
    tab: "Profitez",
    title: "Vivez l'instant",
    body: "Recevez vos billets par mail ou WhatsApp. Vous n'avez plus qu'à profiter — on s'est occupé du reste.",
    blob1: "rgba(30,200,120,0.14)",
    blob2: "rgba(50,80,220,0.18)",
    image: "/img/carou_04.webp",
  },
];

export default function ScrollSteps() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"before" | "pinned" | "after">("before");
  const [entryOffset, setEntryOffset] = useState(9999);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(0);
  const phaseRef = useRef<"before" | "pinned" | "after">("before");
  const entryOffsetRef = useRef(9999);

  const tick = useCallback(() => {
    const el = outerRef.current;
    if (!el) { rafRef.current = requestAnimationFrame(tick); return; }

    const rect = el.getBoundingClientRect();
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;

    // Offset scroll-driven : quand rect.top > 0, le panel est en dessous du viewport
    // rect.top pixels plus bas que le centre → pas de chevauchement avec la section précédente
    const newOffset = Math.max(0, rect.top);
    if (Math.abs(entryOffsetRef.current - newOffset) > 1) {
      entryOffsetRef.current = newOffset;
      setEntryOffset(newOffset);
    }

    if (rect.top > window.innerHeight) {
      if (phaseRef.current !== "before") { phaseRef.current = "before"; setPhase("before"); }
      setProgress(0);
      if (activeRef.current !== 0) { activeRef.current = 0; setActive(0); }
    } else if (rect.bottom < window.innerHeight) {
      if (phaseRef.current !== "after") { phaseRef.current = "after"; setPhase("after"); }
      setProgress(1);
      if (activeRef.current !== steps.length - 1) {
        activeRef.current = steps.length - 1;
        setActive(steps.length - 1);
      }
    } else {
      if (phaseRef.current !== "pinned") { phaseRef.current = "pinned"; setPhase("pinned"); }
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(p);
      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
      if (activeRef.current !== idx) { activeRef.current = idx; setActive(idx); }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const step = steps[active];
  const stepProgress = (progress * steps.length) % 1;

  // Opacité : apparaît progressivement dans le dernier tiers d'entrée
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const panelOpacity = Math.max(0, Math.min(1, 1 - entryOffset / (vh * 0.6)));


  const goTo = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    // Lenis scroll via custom event
    const target = el.offsetTop + (i / steps.length) * (el.offsetHeight - window.innerHeight);
    window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: { target } }));
  };

  return (
    <div
      ref={outerRef}
      id="how"
      style={{ height: `${steps.length * 60}vh`, position: "relative" }}
    >
      {/* Panel — fixed sauf en "after" où il redevient absolu pour partir avec la page */}
      <div
        className="ssp-panel"
        style={{
          position: phase === "after" ? "absolute" : "fixed",
          top: phase === "after" ? "auto" : "50%",
          bottom: phase === "after" ? "6vh" : "auto",
          left: "50%",
          right: "auto",
          opacity: panelOpacity,
          transform: phase === "after" ? "translateX(-50%)" : `translate(-50%, calc(-50% + ${entryOffset}px))`,
          pointerEvents: entryOffset === 0 ? "auto" : "none",
        }}
      >
        {/* Image de fond */}
        {step.image && (
          <div
            className="ssp-bg"
            key={active + "bg"}
            style={{ backgroundImage: `url(${step.image})` }}
          />
        )}
        <div className="ssp-overlay" />

        {/* Blobs (uniquement si pas d'image) */}
        {!step.image && <div className="ssp-blob ssp-blob-1" style={{ background: step.blob1 }} />}
        {!step.image && <div className="ssp-blob ssp-blob-2" style={{ background: step.blob2 }} />}

        {/* Tabs */}
        <div className="ssp-tabs">
          {steps.map((s, i) => (
            <button
              key={i}
              className={`ssp-tab${i === active ? " active" : ""}`}
              onClick={() => goTo(i)}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Numéro décoratif */}
        <div className="ssp-deco" key={active}>{step.num}</div>

        {/* Barre verticale */}
        <div className="ssp-bar">
          {steps.map((s, i) => (
            <button key={i} className={`ssp-bar-item${i === active ? " active" : ""}`} onClick={() => goTo(i)}>
              <span className="ssp-bar-dot" />
              <span className="ssp-bar-label">{s.tab}</span>
            </button>
          ))}
        </div>

        {/* Contenu centré sur le fond */}
        <div className="ssp-content">
          <div className="ssp-num" key={active + "n"}>{step.num}</div>
          <h2 className="ssp-title display" key={active + "t"}>{step.title}</h2>
          <p className="ssp-body" key={active + "b"}>{step.body}</p>
          <div className="ssp-hint">
            <div className="ssp-hint-bar">
              <div className="ssp-hint-fill" style={{ width: `${stepProgress * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
