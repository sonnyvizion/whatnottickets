"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Permet aux composants de déclencher un scroll Lenis via custom event
    const onScrollTo = (e: Event) => {
      const { target } = (e as CustomEvent).detail as { target: number };
      lenis.scrollTo(target, { duration: 1.2 });
    };
    window.addEventListener("lenis-scroll-to", onScrollTo);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis-scroll-to", onScrollTo);
      lenis.destroy();
    };
  }, []);

  return null;
}
