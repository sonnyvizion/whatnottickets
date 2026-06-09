import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — WhatnotTickets",
  description: "Mentions légales du site WhatnotTickets.",
};

export default function MentionsLegales() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 100, paddingBottom: 80, minHeight: "80vh" }}>
        <div className="legal-container">
          <h1 className="legal-title">Mentions légales</h1>

          <section className="legal-section">
            <h2>Éditeur du site</h2>
            <p>
              Le site WhatnotTickets, accessible à l'adresse <strong>whatnottickets.fr</strong>, est édité par :
            </p>
            <p>
              <strong>Nom / Raison sociale :</strong> WhatnotTickets<br />
              <strong>Forme juridique :</strong> SASU<br />
              <strong>Adresse du siège social :</strong> 107 rue de l'Hortus, 34380 Saint-Martin-de-Londres<br />
              <strong>Numéro SIREN :</strong> 999202351<br />
              <strong>Email :</strong> <a href="mailto:whatnottickets1@gmail.com">whatnottickets1@gmail.com</a><br />
              <strong>Téléphone :</strong> +33 7 43 52 20 51
            </p>
            <p>
              <strong>Directeur de la publication :</strong> Kyliann PLACE
            </p>
          </section>

          <section className="legal-section">
            <h2>Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <p>
              <strong>Nom de l'hébergeur :</strong> HOSTINGER operations, UAB<br />
              <strong>Adresse :</strong> Švitrigailos str. 34, Vilnius 03230, Lithuania<br />
              <strong>Téléphone :</strong> +370 645 03378<br />
              <strong>Email :</strong> <a href="mailto:domains@hostinger.com">domains@hostinger.com</a><br />
              <strong>Site internet :</strong>{" "}
              <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer">www.hostinger.fr</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur le site WhatnotTickets, notamment les textes, images, éléments
              graphiques, logo, design, structure et mise en page, sont protégés par le droit de la propriété
              intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, diffusion ou exploitation, totale ou partielle, du site
              ou de l'un de ses éléments, sans autorisation écrite préalable de WhatnotTickets, est interdite.
            </p>
          </section>

          <section className="legal-section">
            <h2>Responsabilité</h2>
            <p>
              WhatnotTickets s'efforce de fournir des informations fiables et à jour sur son site. Toutefois, des
              erreurs, omissions ou indisponibilités temporaires peuvent survenir.
            </p>
            <p>
              Le site WhatnotTickets ne permet pas l'achat direct de billets en ligne. Il présente un service de
              recherche, d'accompagnement et/ou de mise en relation autour de billets d'événements. Toute demande
              effectuée via le site, WhatsApp, Instagram ou email ne constitue pas une commande ferme tant qu'elle
              n'a pas été confirmée par écrit par WhatnotTickets et acceptée par le client.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>
              Pour toute question relative au site ou à son contenu, vous pouvez contacter WhatnotTickets à l'adresse
              suivante : <a href="mailto:whatnottickets1@gmail.com">whatnottickets1@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
