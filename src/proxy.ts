import { NextResponse, type NextRequest } from "next/server";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Cache mémoire (par instance edge) pour éviter un appel Sanity à chaque requête.
let cache = { value: false, ts: 0 };
const TTL_MS = 30_000;

async function isComingSoon(): Promise<boolean> {
  if (!PROJECT_ID) return false;
  const now = Date.now();
  if (now - cache.ts < TTL_MS) return cache.value;

  try {
    const query = encodeURIComponent(`*[_type=="siteSettings"][0].comingSoon`);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    const json = await res.json();
    cache = { value: json?.result === true, ts: now };
  } catch {
    // En cas d'erreur réseau, on ne bloque pas le site (fail-open).
  }
  return cache.value;
}

export default async function proxy(req: NextRequest) {
  if (await isComingSoon()) {
    const url = req.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // Exclut : /studio, /coming-soon, les internes Next (_next) et tout fichier
  // avec extension (images, og-image.jpg, robots.txt, sitemap.xml, fonts…).
  matcher: ["/((?!_next/|studio|coming-soon|.*\\.).*)"],
};
