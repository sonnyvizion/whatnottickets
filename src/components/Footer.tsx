import Link from "next/link";
import { INSTAGRAM_LINK } from "@/lib/links";

interface FooterProps {
  whatsappLink?: string;
  instagramLink?: string;
  email?: string;
}

export default function Footer({
  whatsappLink = "https://wa.me/33743522051",
  email = "contact@whatnottickets.com",
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="logo">
            <img src="/img/logo_white.png" alt="WhatnotTickets" style={{ height: 36, width: "auto" }} />
          </div>
          <p className="footer-brand-text">
            Conciergerie billets premium. Concerts, matchs, spectacles — on trouve vos places.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Navigation</div>
          <div className="footer-links">
            <Link href="#concerts">Concerts</Link>
            <Link href="#how">Comment ça marche</Link>
            <Link href="#avis">Avis</Link>
            <Link href="#faq">FAQ</Link>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Contact</div>
          <div className="footer-links">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-whatsapp" /> WhatsApp
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-instagram" /> Instagram
            </a>
            <a href={`mailto:${email}`}>
              <i className="ti ti-mail" /> {email}
            </a>
          </div>
        </div>
      </div>

      <div className="footer-disclaimer">
        <p>© {new Date().getFullYear()} WhatnotTickets. Tous droits réservés.</p>
        <p>
          WhatnotTickets est un service de recherche, d'accompagnement et/ou de mise en relation autour de billets
          d'événements. Le site ne permet pas l'achat direct de billets en ligne.
        </p>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/conditions-utilisation">Conditions d'utilisation & de réservation</Link>
          <Link href="/politique-confidentialite">Politique de confidentialité</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
