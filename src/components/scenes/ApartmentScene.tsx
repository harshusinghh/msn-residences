'use client';

import * as THREE from 'three';

/**
 * ApartmentScene — The Sky Residence
 *
 * Implements a high-floor private sanctuary:
 * - Smoked oak timber floor
 * - Panoramic floor-to-ceiling glass wall looking out over the city horizon
 * - Open living salon with low-slung Italian modular sofa & marble coffee table
 * - Designer chef's kitchen with Calacatta waterfall island & bronze bar stools
 * - Minimalist bedroom suite with textured headboard & globe pendant lighting
 *
 * Structured cleanly for GLB/GLTF model replacement.
 */

/** Smoked oak chevron timber flooring */
function OakFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
      <planeGeometry args={[18, 14]} />
      <meshStandardMaterial
        color="#3d2c1f"
        roughness={0.65}
        metalness={0.08}
      />
    </mesh>
  );
}

/** Architectural enclosure & floor-to-ceiling glass curtain wall */
function ArchitecturalShell() {
  return (
    <group>
      {/* Back acoustic panel wall */}
      <mesh position={[0, 3.5, -6.9]} receiveShadow>
        <boxGeometry args={[18, 7, 0.2]} />
        <meshStandardMaterial color="#f0ebe3" roughness={0.75} />
      </mesh>

      {/* Left partition wall */}
      <mesh position={[-8.9, 3.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 7, 14]} />
        <meshStandardMaterial color="#ebe6de" roughness={0.75} />
      </mesh>

      {/* Right partition wall */}
      <mesh position={[8.9, 3.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 7, 14]} />
        <meshStandardMaterial color="#ebe6de" roughness={0.75} />
      </mesh>

      {/* Ceiling with recessed perimeter light channel */}
      <mesh position={[0, 6.9, 0]}>
        <boxGeometry args={[18, 0.2, 14]} />
        <meshStandardMaterial color="#faf7f2" roughness={0.8} />
      </mesh>

      {/* Warm perimeter ceiling cove light */}
      <mesh position={[0, 6.75, 0]}>
        <boxGeometry args={[17, 0.04, 13]} />
        <meshStandardMaterial
          color="#FFE5B4"
          emissive="#FFD580"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Front floor-to-ceiling panoramic glass facade */}
      <mesh position={[0, 3.5, 6.95]}>
        <boxGeometry args={[17.8, 6.8, 0.05]} />
        <meshPhysicalMaterial
          color="#8ac4ea"
          metalness={0.1}
          roughness={0.02}
          transparent
          opacity={0.18}
          clearcoat={1}
        />
      </mesh>

      {/* Minimalist black anodized window mullions */}
      {[-6, -2, 2, 6].map((x) => (
        <mesh key={x} position={[x, 3.5, 7.0]}>
          <boxGeometry args={[0.08, 6.9, 0.12]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/** Living salon furniture */
function LivingSalon() {
  return (
    <group position={[2.5, 0, 1]}>
      {/* Italian modular low sofa */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[4.8, 0.55, 2.0]} />
        <meshStandardMaterial color="#302e34" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.75, -0.75]}>
        <boxGeometry args={[4.8, 0.45, 0.5]} />
        <meshStandardMaterial color="#302e34" roughness={0.75} />
      </mesh>

      {/* Return chaise section */}
      <mesh position={[2.2, 0.35, 1.2]} castShadow>
        <boxGeometry args={[1.6, 0.55, 2.4]} />
        <meshStandardMaterial color="#302e34" roughness={0.75} />
      </mesh>

      {/* Accent cushions */}
      {[-1.4, 0, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.75, -0.2]}>
          <boxGeometry args={[0.9, 0.25, 0.6]} />
          <meshStandardMaterial color="#423e48" roughness={0.8} />
        </mesh>
      ))}

      {/* Low organic coffee table */}
      <mesh position={[0, 0.22, 1.8]} castShadow>
        <boxGeometry args={[2.6, 0.35, 1.1]} />
        <meshStandardMaterial color="#1a181c" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.42, 1.8]}>
        <boxGeometry args={[2.7, 0.05, 1.2]} />
        <meshPhysicalMaterial color="#e8e2d8" roughness={0.1} metalness={0.1} clearcoat={0.8} />
      </mesh>

      {/* Floating media console on back wall */}
      <mesh position={[0, 1.2, -4.5]} castShadow>
        <boxGeometry args={[4.5, 0.45, 0.6]} />
        <meshStandardMaterial color="#1f1e24" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* TV screen */}
      <mesh position={[0, 2.8, -4.75]}>
        <boxGeometry args={[3.8, 2.1, 0.05]} />
        <meshStandardMaterial
          color="#0d0d12"
          emissive="#162235"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Textured wool area rug */}
      <mesh position={[0, 0.06, 1.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.8, 4.4]} />
        <meshStandardMaterial color="#2b2826" roughness={0.92} />
      </mesh>
    </group>
  );
}

/** Chef's kitchen island and bar dining */
function KitchenIsland() {
  return (
    <group position={[-4.5, 0, -2.5]}>
      {/* Monolith island counter with marble waterfall */}
      <mesh position={[0, 0.55, 1.5]} castShadow>
        <boxGeometry args={[4.2, 1.05, 1.4]} />
        <meshPhysicalMaterial
          color="#ded7cb"
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.7}
        />
      </mesh>

      {/* Countertop cantilever */}
      <mesh position={[0, 1.1, 1.5]}>
        <boxGeometry args={[4.3, 0.06, 1.5]} />
        <meshPhysicalMaterial
          color="#ded7cb"
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.8}
        />
      </mesh>

      {/* Bronze bar stools */}
      {[-1.2, 0, 1.2].map((x) => (
        <group key={x} position={[x, 0, 2.6]}>
          <mesh position={[0, 0.38, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.75, 12]} />
            <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.78, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
            <meshStandardMaterial color="#222026" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Linear brass pendant fixture */}
      <group position={[0, 5.8, 1.5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.6, 0.06, 0.06]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.15} />
        </mesh>
        {[-1.2, 0, 1.2].map((x) => (
          <group key={x} position={[x, -0.4, 0]}>
            <mesh>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#FFE5B4"
                emissive="#FFD580"
                emissiveIntensity={2}
              />
            </mesh>
            <pointLight color="#FFD580" intensity={0.5} distance={3.5} />
          </group>
        ))}
      </group>
    </group>
  );
}

/** Bedroom preview wing */
function BedroomSuite() {
  return (
    <group position={[-5, 0, 3]}>
      {/* Platform bed */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[3.2, 0.4, 4.0]} />
        <meshStandardMaterial color="#2a2522" roughness={0.6} />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[3.0, 0.28, 3.8]} />
        <meshStandardMaterial color="#f0ece6" roughness={0.8} />
      </mesh>
      {/* Textured headboard */}
      <mesh position={[0, 1.4, -2.0]}>
        <boxGeometry args={[3.4, 1.8, 0.18]} />
        <meshStandardMaterial color="#2d2a32" roughness={0.7} />
      </mesh>

      {/* Bedside lamps */}
      {[-1.9, 1.9].map((x) => (
        <group key={x} position={[x, 0, -1.8]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.65, 0.5, 0.65]} />
            <meshStandardMaterial color="#2a2522" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color="#FFE5B4"
              emissive="#FFD580"
              emissiveIntensity={1.5}
            />
          </mesh>
          <pointLight position={[0, 0.8, 0]} color="#FFD580" intensity={0.3} distance={2.5} />
        </group>
      ))}
    </group>
  );
}

export default function ApartmentScene() {
  return (
    <group>
      <OakFloor />
      <ArchitecturalShell />
      <LivingSalon />
      <KitchenIsland />
      <BedroomSuite />
    </group>
  );
}
