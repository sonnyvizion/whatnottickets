import { getCliClient } from "sanity/cli";
import { LexoRank } from "lexorank";

// Initialise orderRank sur les events qui n'en ont pas encore,
// dans l'ordre par date, pour que le glisser-déposer fonctionne.
const client = getCliClient({ apiVersion: "2024-01-01" });

async function run() {
  const events: { _id: string; orderRank?: string }[] = await client.fetch(
    `*[_type == "event"] | order(coalesce(eventDates[0], eventDate) asc){ _id, orderRank }`
  );

  let rank = LexoRank.middle();
  const tx = client.transaction();
  let count = 0;
  for (const e of events) {
    tx.patch(e._id, (p) => p.set({ orderRank: rank.toString() }));
    rank = rank.genNext();
    count++;
  }
  await tx.commit();
  console.log(`orderRank initialisé sur ${count} events`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
