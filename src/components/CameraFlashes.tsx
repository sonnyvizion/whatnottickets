"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const POOL_SIZE = 7;
const FADE_SPEED = 5.0;
const GLOW_COUNT = 6;

const GLOW_COLORS: [number, number, number][] = [
  [0.863, 0.196, 0.196], // red  rgb(220,50,50)
  [0.196, 0.314, 0.863], // blue rgb(50,80,220)
  [0.863, 0.196, 0.196],
  [0.196, 0.314, 0.863],
  [0.863, 0.196, 0.196],
  [0.196, 0.314, 0.863],
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const flashFragmentShader = `
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

const glowFragmentShader = `
  uniform float uOpacity;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    vec2 centered = vUv - 0.5;
    float dist = length(centered) * 2.0;
    float alpha = pow(max(0.0, 1.0 - dist), 3.0) * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

type FlashState = { active: boolean; opacity: number };

type GlowState = {
  vx: number;
  vy: number;
  baseOpacity: number;
  phase: number;
  period: number;
  sizePx: number;
};

function GlowPool() {
  const { viewport, size, scene } = useThree();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const statesRef = useRef<GlowState[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    const meshes: THREE.Mesh[] = [];
    const states: GlowState[] = [];

    for (let i = 0; i < GLOW_COUNT; i++) {
      const [r, g, b] = GLOW_COLORS[i];
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: glowFragmentShader,
        uniforms: {
          uOpacity: { value: 0 },
          uColor: { value: new THREE.Color(r, g, b) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
      scene.add(mesh);
      meshes.push(mesh);

      const speed = 0.3 + Math.random() * 0.5;
      const angle = Math.random() * Math.PI * 2;
      states.push({
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseOpacity: 0.08 + Math.random() * 0.10,
        phase: Math.random() * Math.PI * 2,
        period: 3 + Math.random() * 3,
        sizePx: 300 + Math.random() * 300,
      });
    }

    meshesRef.current = meshes;
    statesRef.current = states;
    initializedRef.current = false;

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
    const px = viewport.width / size.width;
    const hw = viewport.width / 2;
    const hh = viewport.height / 2;
    const elapsed = state.clock.elapsedTime;

    if (!initializedRef.current) {
      meshesRef.current.forEach((mesh, i) => {
        const s = statesRef.current[i];
        mesh.scale.setScalar(s.sizePx * px);
        mesh.position.set(
          (Math.random() - 0.5) * viewport.width,
          (Math.random() - 0.5) * viewport.height,
          -1
        );
      });
      initializedRef.current = true;
    }

    meshesRef.current.forEach((mesh, i) => {
      const s = statesRef.current[i];
      const mat = mesh.material as THREE.ShaderMaterial;

      mesh.position.x += s.vx * delta * px;
      mesh.position.y += s.vy * delta * px;

      if (Math.abs(mesh.position.x) > hw) {
        s.vx = -s.vx;
        mesh.position.x = Math.sign(mesh.position.x) * hw;
      }
      if (Math.abs(mesh.position.y) > hh) {
        s.vy = -s.vy;
        mesh.position.y = Math.sign(mesh.position.y) * hh;
      }

      const pulse = 0.7 + 0.3 * Math.sin(elapsed * (Math.PI * 2) / s.period + s.phase);
      mat.uniforms.uOpacity.value = s.baseOpacity * pulse;
    });
  });

  return null;
}

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
        fragmentShader: flashFragmentShader,
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
      <GlowPool />
      <FlashPool />
    </Canvas>
  );
}
