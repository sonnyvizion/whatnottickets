# Camera Flashes WebGL Background — Design Spec
Date: 2026-06-04

## Objectif
Ajouter un effet de flash de téléphone/paparazzi en arrière-plan de toute la page, similaire à adrientickets.com. L'effet couvre toute la page en position fixed, derrière tout le contenu.

## Stack
- `three.js` + `@react-three/fiber`
- Client component Next.js
- Pas de `@react-three/drei`

## Architecture

### Composant `CameraFlashes.tsx`
- `"use client"` — client component
- Canvas WebGL `position: fixed`, `top: 0`, `left: 0`, `width: 100vw`, `height: 100vh`
- `z-index: 0`, `pointer-events: none` — jamais interactif, toujours derrière le contenu
- Monté dans `layout.tsx` après `<SmoothScroll />`

### Scène Three.js
- Caméra orthographique (OrthographicCamera) — pas de perspective, 2D pur
- Fond transparent (`alpha: true` sur le renderer) — le `#0B0F1A` du body reste visible
- Pas de lumières globales — chaque flash est auto-lumineux via ShaderMaterial

### Flash — unité visuelle
Chaque flash est un `Mesh` avec :
- `PlaneGeometry` carré (même largeur/hauteur)
- `ShaderMaterial` custom avec fragment shader radial gradient :
  - Centre : blanc pur `#FFFFFF`, opacité 1
  - Bord : transparent
  - Léger halo bleuté `rgba(180,200,255,0.3)` en couronne intermédiaire
- `blending: THREE.AdditiveBlending` — s'additionne aux couleurs dessous pour effet lumineux
- `depthWrite: false`

### Comportement
- **Pool fixe de 7 flashs** — objets Three.js créés une fois, réutilisés (visible/invisible)
- **Timing** : un nouveau flash activé toutes les 300–700ms (random)
- **Position** : x/y aléatoire sur tout l'écran, z = 0
- **Taille** : diamètre entre 80px et 220px (random par flash)
- **Cycle de vie** :
  1. Activation : opacity uniform = 1.0, position random, taille random
  2. Fade out : chaque frame, opacity -= delta * 5.0 (fade en ~200ms)
  3. Désactivation : quand opacity <= 0, mesh.visible = false, retour au pool

### Intégration layout.tsx
```tsx
<body>
  <SmoothScroll />
  <CameraFlashes />   {/* fixed, z-0, pointer-events-none */}
  {children}
</body>
```

Le contenu (`children`) doit avoir `position: relative` et `z-index: 1` pour passer par-dessus.

## Performance
- Pool de 7 objets max, aucune création/destruction pendant le runtime
- `useRef` pour tous les états Three.js — 0 re-render React
- RAF géré par `@react-three/fiber` (loop native)
- `frameloop="always"` sur le Canvas

## Dépendances à installer
```
npm install three @react-three/fiber
npm install --save-dev @types/three
```
