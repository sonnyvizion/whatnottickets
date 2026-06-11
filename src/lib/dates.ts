import { Event } from "@/sanity/types";

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

// Renvoie la liste des dates d'un event (nouveau champ eventDates, sinon ancien eventDate).
export function getEventDates(event: Pick<Event, "eventDates" | "eventDate">): string[] {
  if (event.eventDates?.length) return event.eventDates;
  return event.eventDate ? [event.eventDate] : [];
}

function fullDate(d: Date): string {
  return `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

function joinFr(parts: string[]): string {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} & ${parts[parts.length - 1]}`;
}

/**
 * Formate une liste de dates pour l'affichage.
 * - 1 date : { label: "11 juin 2026", time: "20:00" }
 * - plusieurs (même mois) : { label: "11, 12 & 13 juin 2026", time: null }
 * - plusieurs (mois différents) : { label: "30 mai & 1 juin 2026", time: null }
 */
export function formatEventDates(raw: string[]): { label: string; time: string | null } {
  const dates = raw
    .map((s) => new Date(s))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  if (dates.length === 0) return { label: "", time: null };

  if (dates.length === 1) {
    const d = dates[0];
    return {
      label: fullDate(d),
      time: d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    };
  }

  const sameMonth = dates.every(
    (d) => d.getMonth() === dates[0].getMonth() && d.getFullYear() === dates[0].getFullYear()
  );

  if (sameMonth) {
    const days = dates.map((d) => String(d.getDate()));
    return {
      label: `${joinFr(days)} ${MONTHS_FR[dates[0].getMonth()]} ${dates[0].getFullYear()}`,
      time: null,
    };
  }

  return { label: joinFr(dates.map(fullDate)), time: null };
}
