# Glow Pool WebGL — Design Spec
Date: 2026-06-04

## Objectif
Ajouter des lueurs rouges et bleues flottantes en arrière-plan WebGL, complémentant les flashs blancs existants et reprenant les couleurs du design system (box-shadow rouge/bleu).

## Fichier modifié
- **Modifier uniquement:** `src/components/CameraFlashes.tsx`

## Architecture
Nouveau composant `GlowPool` monté dans le `<Canvas>` existant, juste avant `<FlashPool />`. Même pattern impératif `useEffect` + `useFrame` que `FlashPool`.

## Pool
- **6 glows fixes** — créés une fois au mount, jamais détruits/recréés
- 3 rouges : `vec3(0.863, 0.196, 0.196)` → `rgb(220, 50, 50)`
- 3 bleus : `vec3(0.196, 0.314, 0.863)` → `rgb(50, 80, 220)`
- Alternance : rouge, bleu, rouge, bleu, rouge, bleu

## Visuel par glow
- `PlaneGeometry(1, 1)` + `ShaderMaterial` custom
- Fragment shader : gradient radial exponentiel (`pow(1.0 - dist, 3.0)`) — plus doux que les flashs
- `AdditiveBlending`, `depthWrite: false`, `transparent: true`
- Uniforms : `uOpacity` (float) + `uColor` (vec3)
- Taille : 300–600px de diamètre (random à la création, via `mesh.scale`)
- Opacité de base `baseOpacity` : 0.08 à 0.18 (random à la création)

## Mouvement
- Vélocité initiale aléatoire : `vx`, `vy` entre ±0.3 et ±0.8 px/s (random sign + magnitude)
- Chaque frame : `x += vx * delta * px`, `y += vy * delta * px` (px = unités/pixel)
- Rebond sur les bords du viewport : inverser la composante concernée quand `|x| > viewport.width/2` ou `|y| > viewport.height/2`

## Pulsation d'opacité
- Chaque glow a une `phase` (random 0–2π) et une `period` (random 3–6s)
- `uOpacity = baseOpacity * (0.7 + 0.3 * sin(elapsedTime * 2π / period + phase))`
- Oscillation douce entre `baseOpacity * 0.7` et `baseOpacity * 1.0`

## État par glow (géré en refs, pas en React state)
```ts
type GlowState = {
  vx: number;   // vélocité x en px/s
  vy: number;   // vélocité y en px/s
  baseOpacity: number;
  phase: number;
  period: number;
};
```

## Cleanup
`useEffect` return : `scene.remove(mesh)`, `mesh.geometry.dispose()`, `mesh.material.dispose()`
