# WhatnotTickets — État du projet

## Stack
- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** (config via `@theme` dans `globals.css`, pas de `tailwind.config.ts`)
- **Sanity** (project ID: `51soe3m9`, dataset: `production`) — Studio intégré sur `/studio`
- **Lenis v1.3** — smooth scroll (⚠️ v1 : désactive le scroll natif via transform, `window.scrollY` ne se met pas à jour, utiliser `getBoundingClientRect()` dans un RAF loop)
- **Fonte** : Neue Kaine (fichiers individuels dans `public/fonts/`) + Inter (Google Fonts)

## Structure
```
src/
  app/
    page.tsx              — Homepage (Server Component, fetch Sanity, revalidate 60s)
    layout.tsx            — Root layout (Inter + SmoothScroll)
    globals.css           — Tous les styles (Tailwind @theme + CSS custom)
    studio/[[...tool]]/   — Sanity Studio
    events/[slug]/        — Page event dynamique (SSG)
  components/
    Nav.tsx               — Fixed, hide-on-scroll-down / show-on-scroll-up
    Hero.tsx              — Image plein écran (banner-tickets.webp) + overlay
    TrustStrip.tsx        — Marquee infini avec fondu sur les bords
    ScrollSteps.tsx       — Section "Comment ça marche" scroll-driven (carte 78vw×82vh, images fond)
    EventsGrid.tsx        — Grille events depuis Sanity
    WhyUs.tsx             — 4 cards "Pourquoi nous"
    TestimonialsGrid.tsx  — 3 testimonials depuis Sanity
    FaqSection.tsx        — Accordéon FAQ (client component)
    FinalCta.tsx          — Section contact (WhatsApp + Instagram)
    Footer.tsx            — 3 colonnes
    SmoothScroll.tsx      — Lenis init + listener custom event "lenis-scroll-to"
    RevealObserver.tsx    — IntersectionObserver pour animations .reveal
  sanity/
    schemas/              — event, testimonial, faq, siteSettings
    lib/client.ts         — Sanity client
    lib/image.ts          — urlFor() helper
    types.ts              — TypeScript interfaces
    queries.ts            — Queries GROQ
sanity.config.ts
```

## DA — Design System
- **Fond** : `#0B0F1A` (bleu nuit), sections alternées `#0E1322`
- **Accent** : `#C9A961` (gold)
- **Texte** : `#C5CCD9` (cream), `#8B94A8` (muted), `#7A8499` (faint)
- **Signature** : box-shadow rouge/bleu sur tous les éléments interactifs
  - Repos : `-3px 3px 10px rgba(220,50,50,0.3), 3px -3px 10px rgba(50,80,220,0.3)`
  - Hover : `-5px 5px 18px rgba(220,50,50,0.55), 5px -5px 18px rgba(50,80,220,0.55)`
- **Border-radius** : 15px boutons, 16px cards, 24px panel ScrollSteps
- **Fonte titres** : Neue Kaine (300→900 via fichiers individuels woff dans `public/fonts/`)
- **Silver-shine** : effet gradient argent sur mots-clés, class `.silver-shine`
- **Logo** : `public/img/logo_white.png` + drop-shadow rouge/bleu

## Fichiers images
```
public/
  img/
    banner-tickets.webp   — Hero background
    logo_white.png        — Logo nav + footer
    carou_01.webp         — ScrollSteps step 01
    carou_02.webp         — ScrollSteps step 02
    carou_03.webp         — ScrollSteps step 03
    carou_04.webp         — ScrollSteps step 04
  fonts/
    NeueKaine-Light.woff / Regular / Medium / SemiBold / Bold / ExtraBold / Black
    Neue-Kaine-Variable.woff (non utilisé)
```

## Points importants / pièges à éviter
- **Lenis v1** : ne jamais utiliser `window.scrollY` ni `position: sticky` — tout tracking scroll doit passer par `getBoundingClientRect()` dans un RAF loop
- **ScrollSteps** : utilise `position: fixed` (phase "pinned") + `position: absolute` (avant/après) pour simuler le sticky
- **Tailwind v4** : couleurs custom définies en CSS `@theme { --color-* }`, pas de `tailwind.config.ts`
- **Hooks désactivés** : `disableAllHooks: true` dans `.claude/settings.json` (plugin aaron-seo-geo causait des blocages)
- **Nav** : `position: fixed` géré en JS (useState hidden), pas en CSS sticky

## Ce qui reste à faire
- [ ] Alimenter Sanity avec les vrais events, testimonials, FAQ
- [ ] Configurer les liens WhatsApp Business et Instagram dans Sanity (`siteSettings`)
- [ ] Déployer sur Vercel + connecter le domaine
- [ ] Webhook Sanity → Vercel pour rebuild automatique à la publication
- [ ] SEO : metadata dynamique par page event, sitemap, schema.org Event
- [ ] Mentions légales / CGV / Confidentialité (pages à créer)
- [ ] Logo final SVG (en cours de génération via Nano Banana)
- [ ] Tester sur mobile (responsive vérifié en CSS mais pas testé device réel)
