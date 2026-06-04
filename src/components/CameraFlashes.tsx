"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GLOW_COUNT = 12;
const PARTICLE_COUNT = 90;

// rgba(220,50,50) et rgba(50,80,220) — box-shadow btn-hero
const GLOW_COLORS: [number, number, number][] = [
  [220 / 255, 50 / 255,  50 / 255],
  [50  / 255, 80 / 255, 220 / 255],
  [220 / 255, 50 / 255,  50 / 255],
  [50  / 255, 80 / 255, 220 / 255],
  [220 / 255, 50 / 255,  50 / 255],
  [50  / 255, 80 / 255, 220 / 255],
  [220 / 255, 50 / 255,  50 / 255],
  [50  / 255, 80 / 255, 220 / 255],
  [220 / 255, 50 / 255,  50 / 255],
  [50  / 255, 80 / 255, 220 / 255],
  [220 / 255, 50 / 255,  50 / 255],
  [50  / 255, 80 / 255, 220 / 255],
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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

// Vertex shader pour les particules Points — gl_PointSize en pixels écran
const particleVertexShader = `
  attribute float aSize;
  attribute float aOpacity;
  attribute vec3 aColor;
  varying float vOpacity;
  varying vec3 vColor;
  void main() {
    vOpacity = aOpacity;
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize;
  }
`;

// Fragment shader particule — disque doux avec léger halo
const particleFragmentShader = `
  varying float vOpacity;
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    float core = smoothstep(0.5, 0.1, dist);
    float halo = smoothstep(0.5, 0.0, dist) * 0.4;
    float alpha = (core + halo) * vOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

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
        baseOpacity: 0.22 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
        period: 3 + Math.random() * 3,
        sizePx: 500 + Math.random() * 500,
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

function ParticleField() {
  const { viewport, size, scene } = useThree();
  const pointsRef = useRef<THREE.Points | null>(null);
  const metaRef = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 4));
  const initializedRef = useRef(false);
  const spreadRef = useRef({ w: 1920, h: 1080 });

  useEffect(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const opacities = new Float32Array(PARTICLE_COUNT);
    const meta = new Float32Array(PARTICLE_COUNT * 4);

    const colors = new Float32Array(PARTICLE_COUNT * 3);
    // Couleurs désaturées — mélange 40% couleur + 60% blanc
    const RED  = [220/255 * 0.4 + 0.6, 50/255 * 0.4 + 0.6, 50/255 * 0.4 + 0.6];
    const BLUE = [50/255  * 0.4 + 0.6, 80/255 * 0.4 + 0.6, 220/255 * 0.4 + 0.6];

    const spreadW = typeof window !== "undefined" ? window.innerWidth  : 1920;
    const spreadH = typeof window !== "undefined" ? window.innerHeight : 1080;
    spreadRef.current = { w: spreadW, h: spreadH };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread immédiat sur tout le viewport dès le départ
      positions[i * 3]     = (Math.random() - 0.5) * spreadW;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadH;
      positions[i * 3 + 2] = 0;
      // ~20% de particules grosses (8–14px), le reste petites (2–6px)
      const isBig = Math.random() < 0.2;
      sizes[i] = isBig ? 8 + Math.random() * 6 : 2 + Math.random() * 4;
      opacities[i] = 0.35 + Math.random() * 0.45;
      const c = i % 2 === 0 ? RED : BLUE;
      colors[i * 3 + 0] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
      meta[i * 4 + 0] = (Math.random() - 0.5) * 18;
      meta[i * 4 + 1] = 8 + Math.random() * 28;
      meta[i * 4 + 2] = Math.random() * Math.PI * 2;
      meta[i * 4 + 3] = 1.5 + Math.random() * 3;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);
    pointsRef.current = points;
    metaRef.current = meta;
    initializedRef.current = false;

    return () => {
      scene.remove(points);
      geo.dispose();
      mat.dispose();
    };
  }, [scene]);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts || size.width === 0) return;

    const geo = pts.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const ops = geo.attributes.aOpacity.array as Float32Array;
    const meta = metaRef.current;
    const elapsed = state.clock.elapsedTime;
    const hw = viewport.width / 2;
    const hh = viewport.height / 2;
    const px = viewport.width / size.width;

    // Recale les positions au bon ratio px→unités three.js au premier frame valide
    if (!initializedRef.current) {
      const scaleX = viewport.width  / spreadRef.current.w;
      const scaleY = viewport.height / spreadRef.current.h;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3 + 0] *= scaleX;
        pos[i * 3 + 1] *= scaleY;
      }
      initializedRef.current = true;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vx = meta[i * 4 + 0];
      const vy = meta[i * 4 + 1];
      const phase = meta[i * 4 + 2];
      const period = meta[i * 4 + 3];

      pos[i * 3 + 0] += vx * delta * px;
      pos[i * 3 + 1] += vy * delta * px; // monte

      // Wrap horizontal
      if (pos[i * 3 + 0] > hw) pos[i * 3 + 0] = -hw;
      if (pos[i * 3 + 0] < -hw) pos[i * 3 + 0] = hw;
      // Wrap vertical — revient en bas quand sort par le haut
      if (pos[i * 3 + 1] > hh) {
        pos[i * 3 + 1] = -hh;
        pos[i * 3 + 0] = (Math.random() - 0.5) * viewport.width;
      }

      // Scintillement
      const twinkle = 0.5 + 0.5 * Math.sin(elapsed * (Math.PI * 2) / period + phase);
      ops[i] = (0.25 + Math.random() * 0.1) + twinkle * 0.45;
    }

    geo.attributes.position.needsUpdate = true;
    geo.attributes.aOpacity.needsUpdate = true;
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
      <ParticleField />
    </Canvas>
  );
}
