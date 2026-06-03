"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Cache si on scroll vers le bas de plus de 10px
      if (y > lastY.current + 10 && y > 80) {
        setHidden(true);
        setOpen(false);
      }
      // Réapparaît dès qu'on remonte
      if (y < lastY.current - 5) {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Image
              src="/img/logo_white.png"
              alt="WhatnotTickets"
              width={48}
              height={48}
              style={{ objectFit: "contain" }}
            />
          </Link>

          <div className="nav-links">
            <Link href="#accueil">Accueil</Link>
            <Link href="#concerts">Concerts</Link>
            <Link href="#how">Comment ça marche</Link>
            <Link href="#avis">Package</Link>
            <Link href="#contact">Contact</Link>
          </div>

          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <i className={open ? "ti ti-x" : "ti ti-menu-2"} />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile ${open ? "open" : ""}`}>
        <Link href="#accueil" onClick={() => setOpen(false)}>Accueil</Link>
        <Link href="#concerts" onClick={() => setOpen(false)}>Concerts</Link>
        <Link href="#how" onClick={() => setOpen(false)}>Comment ça marche</Link>
        <Link href="#avis" onClick={() => setOpen(false)}>Package</Link>
        <Link href="#contact" onClick={() => setOpen(false)}>Contact</Link>
      </div>
    </header>
  );
}
