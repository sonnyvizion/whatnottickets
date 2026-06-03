const items = [
  { icon: "ti-rosette-discount-check", label: "Vendeurs vérifiés" },
  { icon: "ti-bolt", label: "Réponse rapide" },
  { icon: "ti-headset", label: "Accompagnement humain" },
  { icon: "ti-shield-check", label: "Paiement sécurisé" },
  { icon: "ti-star", label: "+250 clients satisfaits" },
  { icon: "ti-clock", label: "Disponible 7j/7" },
];

// Triplé pour un loop parfaitement fluide
const track = [...items, ...items, ...items];

export default function TrustStrip() {
  return (
    <div className="trust-marquee-wrap">
      <div className="trust-marquee-track">
        {track.map((item, i) => (
          <div className="trust-pill" key={i}>
            <span>{item.label}</span>
            <i className={`ti ${item.icon}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
