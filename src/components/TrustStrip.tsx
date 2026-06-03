import Image from "next/image";

const icons = [
  "/img/icone_01.png",
  "/img/icone_02.png",
  "/img/icone_03.png",
  "/img/icone_04.png",
];

const items = [
  { label: "Vendeurs vérifiés" },
  { label: "Réponse rapide" },
  { label: "Accompagnement humain" },
  { label: "Paiement sécurisé" },
  { label: "+250 clients satisfaits" },
  { label: "Disponible 7j/7" },
];

const track = [...items, ...items, ...items];

export default function TrustStrip() {
  return (
    <div className="trust-marquee-wrap">
      <div className="trust-marquee-track">
        {track.map((item, i) => (
          <div className="trust-pill" key={i}>
            <Image src={icons[i % icons.length]} alt="" width={40} height={40} style={{ flexShrink: 0 }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
