'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * SceneLighting — Cinematic Architectural Rig
 *
 * Designed for luxury evening architectural visualization:
 * - Subtle deep blue sky dome ambient fill
 * - High-angle key moon directional light casting crisp architectural shadows
 * - Warm champagne architectural grazing uplights highlighting building facades
 * - Subtle orbiting fill light adding living dimensionality
 * - Depth-calibrated atmospheric fog matching #0a0a0f background
 */
export default function SceneLighting() {
  const movingFillRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!movingFillRef.current) return;
    const t = clock.getElapsedTime() * 0.12;
    movingFillRef.current.position.x = 20 + Math.sin(t) * 15;
    movingFillRef.current.position.z = 25 + Math.cos(t) * 15;
  });

  return (
    <>
      {/* Deep evening ambient fill */}
      <ambientLight intensity={0.25} color="#182030" />

      {/* Main directional key light (low moonlight) */}
      <directionalLight
        position={[45, 55, 35]}
        intensity={1.1}
        color="#c8d6e5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-camera-near={1}
        shadow-camera-far={180}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />

      {/* Opposite cool rim light for silhouette definition */}
      <directionalLight
        position={[-40, 30, -30]}
        intensity={0.45}
        color="#486581"
      />

      {/* Architectural warm wash on the facade */}
      <pointLight
        position={[0, 18, 25]}
        intensity={1.2}
        color="#FFD580"
        distance={60}
        decay={2}
      />

      {/* Ground arrival court warm bounce */}
      <pointLight
        position={[0, 3, 24]}
        intensity={0.9}
        color="#FFE5B4"
        distance={25}
        decay={2}
      />

      {/* Subtle orbiting soft fill light */}
      <pointLight
        ref={movingFillRef}
        position={[25, 20, 30]}
        intensity={0.4}
        color="#C9A96E"
        distance={50}
        decay={2}
      />

      {/* Deep atmospheric fog blending with the charcoal background */}
      <fog attach="fog" args={['#0a0a0f', 55, 170]} />
    </>
  );
}
