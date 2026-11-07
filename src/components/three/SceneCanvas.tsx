'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import CameraController from '@/components/three/CameraController';
import SceneLighting from '@/components/three/SceneLighting';
import { ExteriorScene, AmenitiesScene, LobbyScene, ApartmentScene } from '@/components/scenes';

interface SceneCanvasProps {
  scrollProgress: number;
}

/**
 * SceneCanvas — Persistent 3D Architectural World
 *
 * Houses all 4 connected architectural scenes simultaneously in a single coordinate system.
 * The camera navigates through the world based on scroll progress:
 * 1. Exterior (high-angle twilight reveal)
 * 2. Amenities (pool & garden terrace)
 * 3. Lobby (ground porte-cochère atrium)
 * 4. Apartment (sky residence salon & terrace)
 */
export default function SceneCanvas({ scrollProgress }: SceneCanvasProps) {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [52, 24, 52],
          fov: 46,
          near: 0.1,
          far: 350,
        }}
        gl={{
          antialias: true,
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.15,
        }}
        style={{ background: '#0a0a0f', pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          {/* Camera controller driven by smooth scroll progress */}
          <CameraController scrollProgress={scrollProgress} />

          {/* Cinematic architectural lighting rig */}
          <SceneLighting />

          {/* Scene 1: Exterior high-rise & arrival plaza */}
          <group position={[0, 0, 0]}>
            <ExteriorScene />
          </group>

          {/* Scene 2: Amenities (East garden terrace & pool) */}
          <group position={[0, 0, 0]}>
            <AmenitiesScene />
          </group>

          {/* Scene 3: Lobby (Ground atrium behind porte-cochère) */}
          <group position={[0, 0, 2]}>
            <LobbyScene />
          </group>

          {/* Scene 4: Apartment (Elevated tower sky residence) */}
          <group position={[0, 19.5, 0]}>
            <ApartmentScene />
          </group>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
