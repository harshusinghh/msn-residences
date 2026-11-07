'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AmenitiesScene — The Resort Wing
 *
 * Positioned on the east landscaped garden terrace featuring:
 * - Luxury infinity edge pool with animated reflective water
 * - Sunken sun loungers & teak cabanas
 * - Glazed wellness pavilion / fitness center
 * - Landscaped zen gardens with warm bollards
 * - Private resident clubhouse
 *
 * Prepared for GLB/GLTF models replacement.
 */

/** Infinity pool with animated water surface */
function SwimmingPool() {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!waterRef.current) return;
    const material = waterRef.current.material as THREE.MeshPhysicalMaterial;
    material.emissiveIntensity = 0.2 + Math.sin(clock.getElapsedTime() * 0.8) * 0.06;
  });

  return (
    <group position={[26, 0.1, 10]}>
      {/* Pool coping & basin */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[16, 0.5, 8]} />
        <meshStandardMaterial color="#1a1c22" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Water surface */}
      <mesh ref={waterRef} position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15.2, 7.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#0f4c6e"
          metalness={0.15}
          roughness={0.04}
          transparent
          opacity={0.88}
          emissive="#123d5a"
          emissiveIntensity={0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Pool perimeter gold LED strip */}
      {[-7.7, 7.7].map((x) => (
        <mesh key={x} position={[x, 0.44, 0]}>
          <boxGeometry args={[0.08, 0.04, 7.3]} />
          <meshStandardMaterial
            color="#C9A96E"
            emissive="#C9A96E"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
      {[-3.65, 3.65].map((z) => (
        <mesh key={z} position={[0, 0.44, z]}>
          <boxGeometry args={[15.4, 0.04, 0.08]} />
          <meshStandardMaterial
            color="#C9A96E"
            emissive="#C9A96E"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {/* Teak lounge chairs with cream cushions */}
      {[-5, -2.5, 0, 2.5, 5].map((x) => (
        <group key={x} position={[x, 0.55, -5]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.2, 2.8]} />
            <meshStandardMaterial color="#faf7f2" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.35, -1.0]} rotation={[0.45, 0, 0]}>
            <boxGeometry args={[1.4, 0.15, 1.1]} />
            <meshStandardMaterial color="#faf7f2" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Glazed wellness pavilion / gym */
function WellnessPavilion() {
  return (
    <group position={[38, 0, 10]}>
      {/* Structural shell */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[9, 5.8, 8]} />
        <meshStandardMaterial color="#181c24" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Panoramic glass wall */}
      <mesh position={[0, 3, 4.05]}>
        <boxGeometry args={[8.6, 5.4, 0.08]} />
        <meshPhysicalMaterial
          color="#0d1824"
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Interior warm ambient glow */}
      <mesh position={[0, 3, 3.8]}>
        <boxGeometry args={[7.5, 4.5, 0.05]} />
        <meshStandardMaterial
          color="#FFE5B4"
          emissive="#FFD580"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Gold roof fascia trim */}
      <mesh position={[0, 5.9, 4.1]}>
        <boxGeometry args={[9.2, 0.2, 0.1]} />
        <meshStandardMaterial
          color="#C9A96E"
          emissive="#C9A96E"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

/** Landscaped gardens and illuminated promenade */
function GardenPromenade() {
  const gardenBushes = useMemo(() => {
    return [
      [18, 0, 16],
      [22, 0, 18],
      [32, 0, 18],
      [36, 0, 16],
      [28, 0, 22],
      [34, 0, 2],
    ] as THREE.Vector3Tuple[];
  }, []);

  return (
    <group>
      {/* Stone garden pathway */}
      <mesh position={[26, 0.03, 16]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 2.5]} />
        <meshStandardMaterial color="#22252e" roughness={0.7} />
      </mesh>

      {/* Sculpted bushes */}
      {gardenBushes.map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.6, pos[2]]} castShadow>
          <sphereGeometry args={[0.9, 12, 12]} />
          <meshStandardMaterial color="#1b3320" roughness={0.75} />
        </mesh>
      ))}

      {/* Minimalist lighting bollards along pathway */}
      {[16, 21, 26, 31, 36].map((x) => (
        <group key={x} position={[x, 0, 17.5]}>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.9, 12]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
          </mesh>
          <pointLight
            position={[0, 0.9, 0]}
            color="#FFD580"
            intensity={0.45}
            distance={4.5}
          />
        </group>
      ))}
    </group>
  );
}

export default function AmenitiesScene() {
  return (
    <group>
      <SwimmingPool />
      <WellnessPavilion />
      <GardenPromenade />
    </group>
  );
}
