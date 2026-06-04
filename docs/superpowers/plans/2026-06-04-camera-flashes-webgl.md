# Camera Flashes WebGL Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un effet de flash de téléphone/paparazzi WebGL en arrière-plan fixe sur toute la page.

**Architecture:** Un composant client `CameraFlashes.tsx` monte un canvas WebGL R3F fullscreen en `position: fixed; z-index: 0; pointer-events: none`. Un pool de 7 meshes réutilisables avec un ShaderMaterial custom simule les flashs (radial gradient blanc → transparent, additive blending). Chaque frame : on fait apparaître un nouveau flash toutes les 300–700ms et on fade out les flashs actifs en ~200ms.

**Tech Stack:** `three`, `@react-three/fiber`, Next.js dynamic import (ssr: false)

---

## Fichiers

- **Créer:** `src/components/CameraFlashes.tsx`
- **Modifier:** `src/app/layout.tsx`

---

## Task 1 : Installer les dépendances

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1 : Installer three + @react-three/fiber + @types/three**

```bash
cd /Users/inspee/Documents/S/Whatnottickets/whatnottickets
npm install three @react-three/fiber
npm install --save-dev @types/three
```

Expected output : no errors, `package.json` updated with `three` and `@react-three/fiber` in dependencies.

- [ ] **Step 2 : Vérifier l'installation**

```bash
cat package.json | grep -E "three|fiber"
```

Expected output :
```
"@react-three/fiber": "^x.x.x",
"three": "^x.x.x",
```

- [ ] **Step 3 : Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install three.js + @react-three/fiber for WebGL flash effect"
```

---

## Task 2 : Créer le composant CameraFlashes

**Files:**
- Create: `src/components/CameraFlashes.tsx`

- [ ] **Step 1 : Créer `src/components/CameraFlashes.tsx` avec le contenu suivant**

```tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const POOL_SIZE = 7;
const FADE_SPEED = 5.0; // opacity units per second → fade dure ~200ms

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    vec2 centered = vUv - 0.5;
    float dist = length(centered) * 2.0;
    float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * uOpacity;
    float blueAmount = smoothstep(0.0, 0.6, dist);
    vec3 color = mix(vec3(1.0, 1.0, 1.0), vec3(0.71, 0.78, 1.0), blueAmount);
    gl_FragColor = vec4(color, alpha);
  }
`;

type FlashState = { active: boolean; opacity: number };

function FlashPool() {
  const { viewport, size } = useThree();
  const meshesRef = useRef<(THREE.Mesh | null)[]>(new Array(POOL_SIZE).fill(null));
  const materialsRef = useRef<(THREE.ShaderMaterial | null)[]>(new Array(POOL_SIZE).fill(null));
  const statesRef = useRef<FlashState[]>(
    Array.from({ length: POOL_SIZE }, () => ({ active: false, opacity: 0 }))
  );
  const nextSpawnRef = useRef(0);

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime * 1000;
    // 1 CSS pixel en unités three.js (zoom=1 → ratio=1, mais on calcule proprement)
    const px = viewport.width / size.width;

    // Spawn un nouveau flash si le timer est écoulé
    if (now >= nextSpawnRef.current) {
      const freeIdx = statesRef.current.findIndex((s) => !s.active);
      if (freeIdx !== -1) {
        const mesh = meshesRef.current[freeIdx];
        const mat = materialsRef.current[freeIdx];
        if (mesh && mat) {
          const flashSizePx = 80 + Math.random() * 140; // 80–220px
          mesh.scale.setScalar(flashSizePx * px);
          mesh.position.set(
            (Math.random() - 0.5) * viewport.width,
            (Math.random() - 0.5) * viewport.height,
            0
          );
          mesh.visible = true;
          statesRef.current[freeIdx].active = true;
          statesRef.current[freeIdx].opacity = 1.0;
          mat.uniforms.uOpacity.value = 1.0;
        }
      }
      // Prochain flash dans 300–700ms
      nextSpawnRef.current = now + 300 + Math.random() * 400;
    }

    // Fade out les flashs actifs
    statesRef.current.forEach((s, i) => {
      if (!s.active) return;
      s.opacity -= delta * FADE_SPEED;
      if (s.opacity <= 0) {
        s.active = false;
        s.opacity = 0;
        const mesh = meshesRef.current[i];
        if (mesh) mesh.visible = false;
      }
      const mat = materialsRef.current[i];
      if (mat) mat.uniforms.uOpacity.value = Math.max(0, s.opacity);
    });
  });

  return (
    <>
      {Array.from({ length: POOL_SIZE }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshesRef.current[i] = el; }}
          visible={false}
        >
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            ref={(el) => { materialsRef.current[i] = el; }}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{ uOpacity: { value: 0 } }}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

export default function CameraFlashes() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, position: [0, 0, 10], near: 0.1, far: 1000 }}
      gl={{ alpha: true, antialias: false }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      frameloop="always"
    >
      <FlashPool />
    </Canvas>
  );
}
```

- [ ] **Step 2 : Vérifier que TypeScript ne remonte pas d'erreur**

```bash
cd /Users/inspee/Documents/S/Whatnottickets/whatnottickets
npx tsc --noEmit
```

Expected : aucune erreur sur `CameraFlashes.tsx`. Si erreur sur `@types/three`, vérifier que `npm install --save-dev @types/three` a bien tourné.

- [ ] **Step 3 : Commit**

```bash
git add src/components/CameraFlashes.tsx
git commit -m "feat: add CameraFlashes WebGL component with shader flash pool"
```

---

## Task 3 : Intégrer dans layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

Le composant utilise WebGL (browser-only). Il faut l'importer avec `dynamic` + `ssr: false` pour éviter les erreurs SSR Next.js.

Les `{children}` sont wrappés dans un div `position: relative; z-index: 1` pour qu'ils apparaissent au-dessus du canvas (`z-index: 0`). La Nav a déjà `zIndex: 100` inline — elle restera bien au-dessus.

- [ ] **Step 1 : Modifier `src/app/layout.tsx`**

Remplacer le contenu du fichier par :

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const CameraFlashes = dynamic(() => import("@/components/CameraFlashes"), { ssr: false });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WhatnotTickets — Billetterie premium pour concerts, matchs & spectacles",
  description: "Billets pour concerts, matchs et spectacles. Vendeurs vérifiés, réponse rapide, paiement sécurisé.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <SmoothScroll />
        <CameraFlashes />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2 : Lancer le dev server et vérifier visuellement**

```bash
cd /Users/inspee/Documents/S/Whatnottickets/whatnottickets
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) et vérifier :
- Des flashs blancs/bleutés apparaissent aléatoirement sur toute la page
- Ils sont visibles en scrollant (fixed background)
- Le contenu (textes, nav, boutons) est bien cliquable et au-dessus des flashs
- La Nav reste visible et fonctionnelle

- [ ] **Step 3 : Vérifier le build de production**

```bash
npm run build
```

Expected : build réussi sans erreur. Si erreur SSR, vérifier que le `dynamic(..., { ssr: false })` est bien en place.

- [ ] **Step 4 : Commit final**

```bash
git add src/app/layout.tsx
git commit -m "feat: mount CameraFlashes in root layout with SSR-safe dynamic import"
```
