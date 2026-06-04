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
  const nextSpawnRef = useRef(300 + Math.random() * 400);
  const uniformsRef = useRef(
    Array.from({ length: POOL_SIZE }, () => ({ uOpacity: { value: 0 } }))
  );

  useFrame((state, delta) => {
    if (size.width === 0) return;
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
            uniforms={uniformsRef.current[i]}
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
