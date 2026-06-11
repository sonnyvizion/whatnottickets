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

function dayIndex(d: Date): number {
  return Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 86_400_000);
}

function isConsecutive(dates: Date[]): boolean {
  for (let i = 1; i < dates.length; i++) {
    if (dayIndex(dates[i]) - dayIndex(dates[i - 1]) !== 1) return false;
  }
  return true;
}

function formatRange(a: Date, b: Date): string {
  if (a.getFullYear() === b.getFullYear()) {
    if (a.getMonth() === b.getMonth()) {
      return `Du ${a.getDate()} au ${b.getDate()} ${MONTHS_FR[b.getMonth()]} ${b.getFullYear()}`;
    }
    return `Du ${a.getDate()} ${MONTHS_FR[a.getMonth()]} au ${b.getDate()} ${MONTHS_FR[b.getMonth()]} ${b.getFullYear()}`;
  }
  return `Du ${fullDate(a)} au ${fullDate(b)}`;
}

/**
 * Version compacte pour les cartes : évite les listes trop longues.
 * - 1 date : "11 juin 2026" (+ heure)
 * - 2 à 4 dates : liste complète ("11, 12 & 13 juin 2026")
 * - 4+ dates consécutives : "Du 1 au 8 janvier 2027"
 * - 5+ dates éparses : "8 dates · janvier 2027" (ou "8 dates" si plusieurs mois)
 */
export function formatEventDatesCompact(raw: string[]): { label: string; time: string | null } {
  const dates = raw
    .map((s) => new Date(s))
    .filter((d) => !isNaN(d.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  const n = dates.length;
  if (n === 0) return { label: "", time: null };
  if (n === 1) return formatEventDates(raw);
  if (n >= 4 && isConsecutive(dates)) return { label: formatRange(dates[0], dates[n - 1]), time: null };
  if (n <= 4) return formatEventDates(raw);

  const sameMonth = dates.every(
    (d) => d.getMonth() === dates[0].getMonth() && d.getFullYear() === dates[0].getFullYear()
  );
  const label = sameMonth
    ? `${n} dates · ${MONTHS_FR[dates[0].getMonth()]} ${dates[0].getFullYear()}`
    : `${n} dates`;
  return { label, time: null };
}
