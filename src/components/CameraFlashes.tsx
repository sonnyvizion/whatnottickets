"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const POOL_SIZE = 7;
const FADE_SPEED = 5.0;

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
  const { viewport, size, scene } = useThree();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const statesRef = useRef<FlashState[]>([]);
  const nextSpawnRef = useRef(0);

  useEffect(() => {
    nextSpawnRef.current = 300 + Math.random() * 400;
    const meshes: THREE.Mesh[] = [];
    const states: FlashState[] = [];

    for (let i = 0; i < POOL_SIZE; i++) {
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uOpacity: { value: 0 } },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
      mesh.visible = false;
      scene.add(mesh);
      meshes.push(mesh);
      states.push({ active: false, opacity: 0 });
    }

    meshesRef.current = meshes;
    statesRef.current = states;

    return () => {
      for (const mesh of meshes) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
      }
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (size.width === 0 || meshesRef.current.length === 0) return;
    const now = state.clock.elapsedTime * 1000;
    const px = viewport.width / size.width;

    if (now >= nextSpawnRef.current) {
      const freeIdx = statesRef.current.findIndex((s) => !s.active);
      if (freeIdx !== -1) {
        const mesh = meshesRef.current[freeIdx];
        const mat = mesh.material as THREE.ShaderMaterial;
        const flashSizePx = 80 + Math.random() * 140;
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
      nextSpawnRef.current = now + 300 + Math.random() * 400;
    }

    statesRef.current.forEach((s, i) => {
      if (!s.active) return;
      s.opacity -= delta * FADE_SPEED;
      if (s.opacity <= 0) {
        s.active = false;
        s.opacity = 0;
        meshesRef.current[i].visible = false;
        return;
      }
      (meshesRef.current[i].material as THREE.ShaderMaterial).uniforms.uOpacity.value = s.opacity;
    });
  });

  return null;
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
