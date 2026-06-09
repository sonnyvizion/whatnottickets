import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation & de réservation — WhatnotTickets",
  description: "Conditions générales d'utilisation et de réservation de WhatnotTickets.",
};

export default function ConditionsUtilisation() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 100, paddingBottom: 80, minHeight: "80vh" }}>
        <div className="legal-container">
          <h1 className="legal-title">Conditions d'utilisation<br />& de réservation</h1>
          <p className="legal-date">Dernière mise à jour : juin 2026</p>

          <section className="legal-section">
            <h2>1. Objet</h2>
            <p>
              Les présentes conditions ont pour objet de définir les modalités d'utilisation du site WhatnotTickets et
              les conditions applicables aux demandes de recherche, d'accompagnement, de réservation ou de mise en
              relation autour de billets d'événements.
            </p>
            <p>
              Le site WhatnotTickets, accessible à l'adresse <strong>whatnottickets.fr</strong>, ne permet pas l'achat
              direct de billets en ligne. Il sert à présenter le service proposé et à permettre aux utilisateurs
              d'entrer en contact avec WhatnotTickets afin de formuler une demande.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Identification du prestataire</h2>
            <p>Le service est proposé par :</p>
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
            <h2>3. Description du service</h2>
            <p>
              WhatnotTickets propose un service de recherche, d'accompagnement et/ou de mise en relation pour
              l'obtention de billets liés à des événements, notamment concerts, événements sportifs, spectacles ou
              autres événements publics.
            </p>
            <p>
              Selon la demande du client, WhatnotTickets peut rechercher des disponibilités, proposer une offre,
              accompagner le client dans sa demande ou le mettre en relation avec des vendeurs ou sources considérés
              comme fiables.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Demande du client</h2>
            <p>
              Le client peut effectuer une demande via le site, WhatsApp, Instagram, email ou tout autre canal de
              contact indiqué par WhatnotTickets.
            </p>
            <p>Toute demande doit préciser, lorsque cela est possible :</p>
            <ul>
              <li>l'événement recherché ;</li>
              <li>la date de l'événement ;</li>
              <li>le nombre de billets souhaités ;</li>
              <li>la catégorie ou le type de place souhaité ;</li>
              <li>le budget approximatif ;</li>
              <li>les coordonnées de contact du client.</li>
            </ul>
            <p>Une demande envoyée par le client ne constitue pas une commande ferme.</p>
          </section>

          <section className="legal-section">
            <h2>5. Validation d'une réservation</h2>
            <p>Une réservation ou commande est considérée comme validée uniquement lorsque :</p>
            <ul>
              <li>WhatnotTickets a confirmé la disponibilité ou la possibilité de fournir les billets ;</li>
              <li>le prix total a été communiqué au client ;</li>
              <li>le client a accepté explicitement l'offre proposée ;</li>
              <li>le paiement a été effectué selon les modalités convenues.</li>
            </ul>
            <p>Avant cette validation, aucune réservation n'est garantie.</p>
          </section>

          <section className="legal-section">
            <h2>6. Prix</h2>
            <p>
              Les prix sont communiqués au client avant toute validation de réservation ou de commande.
            </p>
            <p>
              Les prix peuvent varier selon la disponibilité, la catégorie des places, la demande, les frais éventuels,
              les conditions des vendeurs ou plateformes partenaires, ainsi que la proximité de la date de l'événement.
            </p>
            <p>
              Le prix final communiqué au client peut inclure, selon les cas, le prix du billet, les frais de
              recherche, les frais de service, les frais de transfert, les frais de plateforme ou tout autre frais
              communiqué au client avant validation.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Paiement</h2>
            <p>
              Le moyen de paiement accepté par WhatnotTickets est <strong>PayPal</strong>.
            </p>
            <p>
              Le paiement doit être effectué selon les modalités communiquées au client avant validation de la
              réservation.
            </p>
            <p>
              La réservation n'est considérée comme confirmée qu'après acceptation de l'offre par le client et
              réception effective du paiement via PayPal.
            </p>
            <p>
              WhatnotTickets se réserve le droit de ne pas confirmer une réservation tant que le paiement n'a pas
              été reçu ou validé.
            </p>
            <p>
              Les éventuels frais liés à l'utilisation de PayPal, lorsqu'ils sont applicables, peuvent être
              intégrés au prix final communiqué au client avant validation.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Livraison ou transmission des billets</h2>
            <p>
              Les billets sont transmis au client par voie électronique, sauf indication contraire.
            </p>
            <p>La transmission peut se faire par :</p>
            <ul>
              <li>email ;</li>
              <li>lien de transfert officiel ;</li>
              <li>application ou plateforme de billetterie ;</li>
              <li>tout autre moyen convenu avec le client.</li>
            </ul>
            <p>
              Le délai de transmission peut varier selon l'événement, la plateforme de billetterie, le vendeur ou les
              conditions imposées par l'organisateur.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Annulation, report ou modification d'un événement</h2>
            <p>
              En cas d'annulation, de report ou de modification d'un événement par l'organisateur, les conditions
              applicables sont celles prévues par l'organisateur, la plateforme de billetterie ou le vendeur initial.
            </p>
            <p>
              WhatnotTickets accompagne le client dans la mesure du possible, mais ne peut être tenu responsable des
              décisions prises par l'organisateur, la salle, l'artiste, le club, la plateforme de billetterie ou tout
              autre tiers lié à l'événement.
            </p>
            <p>
              Les modalités de remboursement, d'échange ou de validité des billets dépendent des conditions fixées
              par ces tiers.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Droit de rétractation</h2>
            <p>
              Conformément aux règles applicables aux prestations de loisirs fournies à une date ou période
              déterminée, les billets d'événements ne bénéficient généralement pas du droit de rétractation.
            </p>
            <p>
              Le client reconnaît que toute réservation validée pour un événement daté peut être ferme et définitive,
              sauf conditions particulières communiquées par WhatnotTickets ou par l'organisateur.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Responsabilité</h2>
            <p>
              WhatnotTickets s'engage à traiter les demandes avec sérieux et à fournir les informations disponibles
              de manière claire.
            </p>
            <p>Toutefois, WhatnotTickets ne peut être tenu responsable :</p>
            <ul>
              <li>d'une annulation ou d'un report d'événement ;</li>
              <li>d'un changement d'horaire, de lieu, d'artiste, d'équipe ou de programmation ;</li>
              <li>d'une décision prise par l'organisateur ou la plateforme de billetterie ;</li>
              <li>d'un refus d'accès lié au non-respect des conditions de l'organisateur ;</li>
              <li>d'une erreur dans les informations fournies par le client ;</li>
              <li>d'un problème technique lié à une plateforme tierce.</li>
            </ul>
            <p>
              Le client est responsable de vérifier les informations liées à l'événement, notamment la date, l'heure,
              le lieu, les conditions d'accès, l'âge minimum, les pièces justificatives nécessaires et les règles de
              sécurité.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Utilisation du site</h2>
            <p>
              L'utilisateur s'engage à utiliser le site de manière normale et licite.
            </p>
            <p>
              Il est interdit de porter atteinte au bon fonctionnement du site, de tenter d'accéder frauduleusement
              à ses systèmes ou d'utiliser les contenus du site sans autorisation.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Données personnelles</h2>
            <p>
              Les données personnelles collectées dans le cadre des demandes sont utilisées uniquement pour répondre
              aux demandes des clients, assurer le suivi des échanges et gérer les réservations éventuelles.
            </p>
            <p>
              Pour plus d'informations, l'utilisateur est invité à consulter la{" "}
              <a href="/politique-confidentialite">Politique de confidentialité</a> du site.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Réclamations</h2>
            <p>
              Pour toute question ou réclamation, le client peut contacter WhatnotTickets à l'adresse suivante :{" "}
              <a href="mailto:whatnottickets1@gmail.com">whatnottickets1@gmail.com</a>
            </p>
            <p>
              Le client est invité à préciser l'objet de sa demande, ses coordonnées, l'événement concerné et tout
              élément utile au traitement de sa réclamation.
            </p>
          </section>

          <section className="legal-section">
            <h2>15. Droit applicable</h2>
            <p>
              Les présentes conditions sont soumises au droit français.
            </p>
            <p>
              En cas de litige, les parties chercheront d'abord une solution amiable avant toute procédure.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
