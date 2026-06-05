import Link from "next/link";

interface FooterProps {
  whatsappLink?: string;
  instagramLink?: string;
  email?: string;
}

export default function Footer({
  whatsappLink = "https://wa.me/33743522051",
  instagramLink = "https://ig.me/m/whatnottickets",
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
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-instagram" /> Instagram
            </a>
            <a href={`mailto:${email}`}>
              <i className="ti ti-mail" /> {email}
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} WhatnotTickets. Tous droits réservés.</span>
        <div className="footer-legal">
          <Link href="#">Mentions légales</Link>
          <Link href="#">CGV</Link>
          <Link href="#">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
