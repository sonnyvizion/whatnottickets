import Image from "next/image";

const icons = [
  "/img/icone_01.png",
  "/img/icone_02.png",
  "/img/icone_03.png",
  "/img/icone_04.png",
];

const DEFAULT_ITEMS = [
  "Vendeurs vérifiés",
  "Réponse rapide",
  "Accompagnement humain",
  "Paiement sécurisé",
  "+250 clients satisfaits",
  "Disponible 7j/7",
];

export default function TrustStrip({ items }: { items?: string[] }) {
  const labels = items?.length ? items : DEFAULT_ITEMS;
  const track = [...labels, ...labels, ...labels];

  return (
    <div className="trust-marquee-wrap">
      <div className="trust-marquee-track">
        {track.map((label, i) => (
          <div className="trust-pill" key={i}>
            <Image src={icons[i % icons.length]} alt="" width={40} height={40} style={{ flexShrink: 0 }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
