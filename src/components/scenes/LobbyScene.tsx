'use client';

import * as THREE from 'three';

/**
 * LobbyScene — The Grand Atrium
 *
 * Positioned seamlessly on the ground level of the main tower:
 * - Book-matched polished Italian marble flooring
 * - Fluted bronze and smoked oak wall panels
 * - Sculptural reception concierge desk with illuminated MSN insignia
 * - Suspended crystal rod chandelier with warm point lights
 * - Fluted bronze structural colonnade
 * - Luxury resident waiting salon
 *
 * Designed for GLB/GLTF model integration.
 */

/** Reflective Italian marble floor */
function MarbleFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 2]} receiveShadow>
      <planeGeometry args={[22, 18]} />
      <meshPhysicalMaterial
        color="#e8e2d8"
        metalness={0.15}
        roughness={0.12}
        clearcoat={0.9}
        clearcoatRoughness={0.08}
        reflectivity={0.8}
      />
    </mesh>
  );
}

/** Lobby architectural enclosure */
function LobbyShell() {
  return (
    <group>
      {/* Back feature wall */}
      <mesh position={[0, 3.5, -6.5]} receiveShadow>
        <boxGeometry args={[22, 7, 0.4]} />
        <meshStandardMaterial color="#1a1c22" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Decorative vertical fluted bronze panels on back wall */}
      {[-7, -3.5, 0, 3.5, 7].map((x) => (
        <group key={x} position={[x, 3.5, -6.25]}>
          <mesh>
            <boxGeometry args={[2.8, 6.2, 0.08]} />
            <meshStandardMaterial color="#26242a" roughness={0.4} />
          </mesh>
          {/* Gold perimeter trim */}
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[2.9, 6.3, 0.02]} />
            <meshStandardMaterial
              color="#C9A96E"
              emissive="#C9A96E"
              emissiveIntensity={0.35}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        </group>
      ))}

      {/* Left side wall */}
      <mesh position={[-11, 3.5, 2]} receiveShadow>
        <boxGeometry args={[0.4, 7, 17]} />
        <meshStandardMaterial color="#1a1c22" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Right side wall */}
      <mesh position={[11, 3.5, 2]} receiveShadow>
        <boxGeometry args={[0.4, 7, 17]} />
        <meshStandardMaterial color="#1a1c22" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Double-height ceiling with recessed cove light */}
      <mesh position={[0, 7.1, 2]}>
        <boxGeometry args={[22, 0.3, 17]} />
        <meshStandardMaterial color="#15171d" roughness={0.7} />
      </mesh>

      {/* Perimeter warm cove light ribbon */}
      <mesh position={[0, 6.9, 2]}>
        <boxGeometry args={[20.5, 0.05, 15.5]} />
        <meshStandardMaterial
          color="#FFE5B4"
          emissive="#FFD580"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Front glass entrance portal */}
      <mesh position={[0, 3.5, 10.4]}>
        <boxGeometry args={[21.5, 6.8, 0.08]} />
        <meshPhysicalMaterial
          color="#d0e2ec"
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={0.3}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

/** Concierge reception desk */
function ReceptionDesk() {
  return (
    <group position={[0, 0, -2.5]}>
      {/* Curved monolith desk base */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[6.5, 1.1, 1.8]} />
        <meshStandardMaterial color="#141416" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Polished Calacatta marble counter top */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[6.8, 0.1, 2.0]} />
        <meshPhysicalMaterial
          color="#ede7dd"
          metalness={0.1}
          roughness={0.1}
          clearcoat={0.9}
        />
      </mesh>

      {/* Recessed gold toe-kick & front accent inlay */}
      <mesh position={[0, 0.55, 0.92]}>
        <boxGeometry args={[6.2, 0.65, 0.04]} />
        <meshStandardMaterial
          color="#C9A96E"
          emissive="#C9A96E"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Illuminated MSN Emblem on back wall */}
      <group position={[0, 4.5, -3.8]}>
        <mesh>
          <boxGeometry args={[3.2, 1.1, 0.08]} />
          <meshStandardMaterial
            color="#C9A96E"
            emissive="#FFD580"
            emissiveIntensity={1.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

/** Sculptural crystal and bronze rod chandelier */
function Chandelier() {
  const crystalRods = Array.from({ length: 16 }, (_, i) => ({
    angle: (i / 16) * Math.PI * 2,
    radius: 1.2 + (i % 2) * 0.4,
    drop: 2.2 + (i % 3) * 0.6,
  }));

  return (
    <group position={[0, 6.8, 1.5]}>
      {/* Central bronze canopy */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.15, 24]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.92} roughness={0.1} />
      </mesh>

      {/* Suspended glowing crystal rods */}
      {crystalRods.map((rod, i) => {
        const x = Math.cos(rod.angle) * rod.radius;
        const z = Math.sin(rod.angle) * rod.radius;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, -rod.drop / 2, 0]}>
              <cylinderGeometry args={[0.02, 0.02, rod.drop, 8]} />
              <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -rod.drop, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
              <meshPhysicalMaterial
                color="#FFE5B4"
                emissive="#FFD580"
                emissiveIntensity={1.8}
                transparent
                opacity={0.95}
              />
            </mesh>
            <pointLight position={[0, -rod.drop, 0]} color="#FFD580" intensity={0.25} distance={4} />
          </group>
        );
      })}
    </group>
  );
}

/** Fluted bronze structural colonnade */
function Colonnade() {
  const columnPositions: THREE.Vector3Tuple[] = [
    [-7.5, 0, -1],
    [7.5, 0, -1],
    [-7.5, 0, 5],
    [7.5, 0, 5],
  ];

  return (
    <group>
      {columnPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Main fluted column shaft */}
          <mesh position={[0, 3.5, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.4, 7, 20]} />
            <meshPhysicalMaterial
              color="#e2dcd2"
              metalness={0.2}
              roughness={0.18}
              clearcoat={0.6}
            />
          </mesh>
          {/* Column bronze plinth */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.95, 0.3, 0.95]} />
            <meshStandardMaterial color="#C9A96E" metalness={0.92} roughness={0.15} />
          </mesh>
          {/* Column bronze capital */}
          <mesh position={[0, 6.9, 0]}>
            <boxGeometry args={[0.95, 0.3, 0.95]} />
            <meshStandardMaterial color="#C9A96E" metalness={0.92} roughness={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Resident lounge salon */
function LoungeSalon() {
  return (
    <group position={[6.5, 0, 2]}>
      {/* Minimalist sofa */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[3.8, 0.55, 1.4]} />
        <meshStandardMaterial color="#2b2824" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.75, -0.5]}>
        <boxGeometry args={[3.8, 0.45, 0.4]} />
        <meshStandardMaterial color="#2b2824" roughness={0.7} />
      </mesh>

      {/* Bronze & marble coffee table */}
      <mesh position={[0, 0.28, 1.8]} castShadow>
        <boxGeometry args={[2.2, 0.4, 0.9]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 1.8]}>
        <boxGeometry args={[2.3, 0.05, 1.0]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.05} metalness={0.1} clearcoat={1} />
      </mesh>
    </group>
  );
}

export default function LobbyScene() {
  return (
    <group>
      <MarbleFloor />
      <LobbyShell />
      <ReceptionDesk />
      <Chandelier />
      <Colonnade />
      <LoungeSalon />
    </group>
  );
}
