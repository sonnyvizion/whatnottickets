import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — WhatnotTickets",
  description: "Politique de confidentialité et protection des données personnelles de WhatnotTickets.",
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 100, paddingBottom: 80, minHeight: "80vh" }}>
        <div className="legal-container">
          <h1 className="legal-title">Politique de confidentialité</h1>
          <p className="legal-date">Dernière mise à jour : juin 2026</p>

          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              La présente politique de confidentialité explique comment WhatnotTickets collecte, utilise et protège
              les données personnelles des utilisateurs dans le cadre de l'utilisation du site{" "}
              <strong>whatnottickets.fr</strong> et des échanges effectués par email, WhatsApp, Instagram ou tout
              autre moyen de contact.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Responsable du traitement</h2>
            <p>Le responsable du traitement des données est :</p>
            <p>
              <strong>Nom / Raison sociale :</strong> WhatnotTickets<br />
              <strong>Forme juridique :</strong> SASU<br />
              <strong>Adresse du siège social :</strong> 107 rue de l'Hortus, 34380 Saint-Martin-de-Londres<br />
              <strong>Numéro SIREN :</strong> 999202351<br />
              <strong>Email :</strong> <a href="mailto:whatnottickets1@gmail.com">whatnottickets1@gmail.com</a><br />
              <strong>Téléphone :</strong> +33 7 43 52 20 51
            </p>
            <p><strong>Directeur de la publication :</strong> Kyliann PLACE</p>
          </section>

          <section className="legal-section">
            <h2>3. Données collectées</h2>
            <p>WhatnotTickets peut collecter les données suivantes :</p>
            <ul>
              <li>nom et prénom ;</li>
              <li>adresse email ;</li>
              <li>numéro de téléphone ;</li>
              <li>compte Instagram ou autre identifiant de contact ;</li>
              <li>informations liées à une demande de billets ;</li>
              <li>événement recherché ;</li>
              <li>date de l'événement ;</li>
              <li>nombre de billets souhaités ;</li>
              <li>budget ou préférence de placement ;</li>
              <li>historique des échanges avec le client.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Finalités de la collecte</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul>
              <li>répondre aux demandes envoyées par les utilisateurs ;</li>
              <li>rechercher des billets ou disponibilités correspondant à la demande ;</li>
              <li>assurer le suivi de la relation client ;</li>
              <li>transmettre des informations liées à une réservation ;</li>
              <li>gérer les réclamations éventuelles ;</li>
              <li>améliorer la qualité du service.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Base légale du traitement</h2>
            <p>Les données sont traitées sur la base :</p>
            <ul>
              <li>de l'exécution de mesures précontractuelles ou contractuelles lorsque l'utilisateur effectue une demande ;</li>
              <li>de l'intérêt légitime de WhatnotTickets à répondre aux sollicitations ;</li>
              <li>du consentement de l'utilisateur lorsque cela est nécessaire.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Durée de conservation</h2>
            <p>
              Les données personnelles sont conservées pendant une durée limitée, nécessaire aux finalités pour
              lesquelles elles ont été collectées.
            </p>
            <p>
              Sauf demande de suppression de l'utilisateur, les données liées aux demandes et échanges clients
              peuvent être conservées pendant une durée maximale de <strong>3 ans</strong> à compter du dernier
              contact.
            </p>
            <p>
              Certaines données peuvent être conservées plus longtemps lorsque la loi l'impose, notamment à des
              fins comptables, fiscales ou de preuve.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Destinataires des données</h2>
            <p>
              Les données personnelles sont destinées à WhatnotTickets.
            </p>
            <p>
              Elles peuvent être transmises à des prestataires ou partenaires uniquement lorsque cela est nécessaire
              au traitement de la demande, à la réservation ou à la transmission des billets.
            </p>
            <p>
              <strong>WhatnotTickets ne vend pas les données personnelles des utilisateurs.</strong>
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Sécurité des données</h2>
            <p>
              WhatnotTickets met en œuvre des mesures raisonnables pour protéger les données personnelles contre
              la perte, l'accès non autorisé, la modification ou la divulgation.
            </p>
            <p>
              Cependant, aucun système de transmission ou de stockage de données n'est totalement sécurisé.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Droits des utilisateurs</h2>
            <p>
              Conformément à la réglementation applicable, l'utilisateur dispose des droits suivants :
            </p>
            <ul>
              <li>droit d'accès ;</li>
              <li>droit de rectification ;</li>
              <li>droit de suppression ;</li>
              <li>droit d'opposition ;</li>
              <li>droit à la limitation du traitement ;</li>
              <li>droit à la portabilité des données lorsque cela est applicable.</li>
            </ul>
            <p>
              Pour exercer ces droits, l'utilisateur peut contacter WhatnotTickets à l'adresse suivante :{" "}
              <a href="mailto:whatnottickets1@gmail.com">whatnottickets1@gmail.com</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Cookies</h2>
            <p>
              Le site peut utiliser des cookies nécessaires à son bon fonctionnement.
            </p>
            <p>
              Si des outils de mesure d'audience, de suivi publicitaire ou de réseaux sociaux sont utilisés,
              l'utilisateur pourra être informé et, lorsque nécessaire, donner ou refuser son consentement.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact</h2>
            <p>
              Pour toute question concernant la présente politique de confidentialité, l'utilisateur peut contacter
              WhatnotTickets à :{" "}
              <a href="mailto:whatnottickets1@gmail.com">whatnottickets1@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
