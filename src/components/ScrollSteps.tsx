"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { HomeStep } from "@/sanity/types";

// Style/visuel par étape (non éditable) — fusionné par index avec le contenu Sanity
const STEP_VISUALS = [
  { blob1: "rgba(201,169,97,0.2)", blob2: "rgba(50,80,220,0.15)", image: "/img/carou_01.webp" },
  { blob1: "rgba(50,80,220,0.2)", blob2: "rgba(220,50,50,0.15)", image: "/img/carou_02.webp" },
  { blob1: "rgba(220,50,50,0.18)", blob2: "rgba(201,169,97,0.18)", image: "/img/carou_03.webp" },
  { blob1: "rgba(30,200,120,0.14)", blob2: "rgba(50,80,220,0.18)", image: "/img/carou_04.webp" },
];

const DEFAULT_STEPS: HomeStep[] = [
  { num: "01", tab: "Choisissez", title: "Choisissez votre événement", body: "Parcourez notre catalogue d'événements disponibles — concerts, matchs, spectacles. Sélectionnez la date et la catégorie de place qui vous convient." },
  { num: "02", tab: "Contactez", title: "Contactez-nous directement", body: "Envoyez-nous un message via Instagram ou WhatsApp Business. Notre équipe vous répond en quelques minutes, 7j/7, pour confirmer la disponibilité." },
  { num: "03", tab: "Payez", title: "Payez en toute sécurité", body: "Virement bancaire ou PayPal entre proches. Toutes les modalités sont confirmées avec vous avant la transaction. Zéro surprise." },
  { num: "04", tab: "Profitez", title: "Vivez l'instant", body: "Recevez vos billets par mail ou WhatsApp. Vous n'avez plus qu'à profiter — on s'est occupé du reste." },
];

export default function ScrollSteps({ steps: stepsProp }: { steps?: HomeStep[] }) {
  const content = stepsProp?.length ? stepsProp : DEFAULT_STEPS;
  const steps = content.map((s, i) => ({
    num: s.num ?? String(i + 1).padStart(2, "0"),
    tab: s.tab ?? "",
    title: s.title ?? "",
    body: s.body ?? "",
    ...STEP_VISUALS[i % STEP_VISUALS.length],
  }));
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
    // RAF uniquement sur desktop (le panel mobile est géré en CSS pur)
    if (window.innerWidth <= 768) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const step = steps[active];
  const stepProgress = (progress * steps.length) % 1;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const panelOpacity = Math.max(0, Math.min(1, 1 - entryOffset / (vh * 0.6)));

  const goTo = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const target = el.offsetTop + (i / steps.length) * (el.offsetHeight - window.innerHeight);
    window.dispatchEvent(new CustomEvent("lenis-scroll-to", { detail: { target } }));
  };

  return (
    <>
      {/* Mobile : cartes empilées — visible uniquement via CSS ≤768px */}
      <div className="ssp-mobile" id="how">
        {steps.map((s) => (
          <div key={s.num} className="ssp-mobile-card">
            {s.image && <div className="ssp-bg" style={{ backgroundImage: `url(${s.image})` }} />}
            <div className="ssp-overlay" />
            <div className="ssp-content">
              <div className="ssp-num">{s.num}</div>
              <h2 className="ssp-title display">{s.title}</h2>
              <p className="ssp-body">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop : scroll-driven — visible uniquement via CSS >768px */}
      <div
        ref={outerRef}
        className="ssp-desktop"
        style={{ height: `${steps.length * 100}vh`, position: "relative" }}
      >
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
          {step.image && (
            <div
              className="ssp-bg"
              key={active + "bg"}
              style={{ backgroundImage: `url(${step.image})` }}
            />
          )}
          <div className="ssp-overlay" />
          {!step.image && <div className="ssp-blob ssp-blob-1" style={{ background: step.blob1 }} />}
          {!step.image && <div className="ssp-blob ssp-blob-2" style={{ background: step.blob2 }} />}
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
          <div className="ssp-deco" key={active}>{step.num}</div>
          <div className="ssp-bar">
            {steps.map((s, i) => (
              <button key={i} className={`ssp-bar-item${i === active ? " active" : ""}`} onClick={() => goTo(i)}>
                <span className="ssp-bar-dot" />
                <span className="ssp-bar-label">{s.tab}</span>
              </button>
            ))}
          </div>
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
    </>
  );
}
