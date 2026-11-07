'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ExteriorScene — MSN Residences Architectural Reveal
 *
 * Implements a modern high-rise luxury residence with:
 * - Stepped architectural crown and bronze vertical louvers
 * - Double-glazed facade with warm glowing apartments
 * - Cantilevered private terraces with illuminated glass balustrades
 * - Grand entrance porte-cochère with arrival court & reflecting water feature
 * - Sculptural landscape with directional ground up-lights
 * - Floating atmospheric embers/particles
 *
 * Designed with modular structures so 3D artists can replace geometry
 * with GLTF/GLB models seamlessly via useGLTF hooks.
 */

/** Lit window grid generating realistic uneven apartment occupancy */
function FacadeWindows({
  width,
  height,
  position,
  rotation,
}: {
  width: number;
  height: number;
  position: THREE.Vector3Tuple;
  rotation?: THREE.Euler;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const rows = Math.floor(height / 1.5);
  const cols = Math.floor(width / 2.6);
  const count = rows * cols;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    if (!meshRef.current) return;
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dummy.position.set(
          c * 2.6 - (cols * 2.6) / 2 + 1.3,
          r * 1.5 + 0.8,
          0
        );
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [rows, cols, dummy]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      position={position}
      rotation={rotation}
    >
      <planeGeometry args={[2.0, 1.15]} />
      <meshStandardMaterial
        color="#FFE5B4"
        emissive="#FFB347"
        emissiveIntensity={0.45}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.88}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

/** Residential balconies on the building facade */
function Balconies() {
  const balconyFloors = [8, 12, 16, 20, 24, 28, 32, 36];
  return (
    <group position={[0, 0, 7.2]}>
      {balconyFloors.map((y) => (
        <group key={y} position={[0, y, 0]}>
          {/* Left balcony slab */}
          <mesh position={[-5, 0, 0.9]} castShadow receiveShadow>
            <boxGeometry args={[6.5, 0.25, 2.0]} />
            <meshStandardMaterial color="#22252a" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Left balcony glass railing */}
          <mesh position={[-5, 0.55, 1.85]}>
            <boxGeometry args={[6.4, 0.85, 0.05]} />
            <meshPhysicalMaterial
              color="#a8c0d8"
              transparent
              opacity={0.4}
              roughness={0.1}
              metalness={0.8}
              clearcoat={1}
            />
          </mesh>
          {/* Subtle warm terrace accent light */}
          <pointLight
            position={[-5, 0.8, 0.5]}
            color="#FFD580"
            intensity={0.3}
            distance={4}
          />

          {/* Right balcony slab */}
          <mesh position={[5, 0, 0.9]} castShadow receiveShadow>
            <boxGeometry args={[6.5, 0.25, 2.0]} />
            <meshStandardMaterial color="#22252a" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Right balcony glass railing */}
          <mesh position={[5, 0.55, 1.85]}>
            <boxGeometry args={[6.4, 0.85, 0.05]} />
            <meshPhysicalMaterial
              color="#a8c0d8"
              transparent
              opacity={0.4}
              roughness={0.1}
              metalness={0.8}
              clearcoat={1}
            />
          </mesh>
          <pointLight
            position={[5, 0.8, 0.5]}
            color="#FFD580"
            intensity={0.3}
            distance={4}
          />
        </group>
      ))}
    </group>
  );
}

/** Main luxury residential tower */
function MainTower() {
  const verticalFinXs = [-8.8, -6.0, -3.0, 0, 3.0, 6.0, 8.8];

  return (
    <group position={[0, 0, 0]}>
      {/* Central structural core: lower base and upper tower, leaving Sky Residence level open */}
      {/* Lower tower core */}
      <mesh position={[0, 9.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 19, 14]} />
        <meshStandardMaterial
          color="#12151b"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      {/* Upper tower core */}
      <mesh position={[0, 35, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 14, 14]} />
        <meshStandardMaterial
          color="#12151b"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Front curtain wall glass envelope */}
      <mesh position={[0, 21, 7.08]}>
        <boxGeometry args={[17.8, 41.6, 0.08]} />
        <meshPhysicalMaterial
          color="#0d1824"
          metalness={0.92}
          roughness={0.06}
          transparent
          opacity={0.72}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Rear curtain wall */}
      <mesh position={[0, 21, -7.08]}>
        <boxGeometry args={[17.8, 41.6, 0.08]} />
        <meshPhysicalMaterial
          color="#0d1824"
          metalness={0.92}
          roughness={0.06}
          transparent
          opacity={0.72}
        />
      </mesh>

      {/* Architectural vertical bronze fins */}
      {verticalFinXs.map((x) => (
        <mesh key={x} position={[x, 21, 7.3]}>
          <boxGeometry args={[0.18, 42.2, 0.35]} />
          <meshStandardMaterial
            color="#C9A96E"
            emissive="#7A5E2E"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Horizontal floor bands */}
      {[7, 14, 21, 28, 35, 41.5].map((y) => (
        <mesh key={y} position={[0, y, 7.22]}>
          <boxGeometry args={[18.4, 0.3, 0.2]} />
          <meshStandardMaterial
            color="#C9A96E"
            emissive="#C9A96E"
            emissiveIntensity={0.65}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Facade interior windows */}
      <FacadeWindows width={16.5} height={39} position={[0, 1.8, 7.15]} />
      <Balconies />

      {/* Penthouse crown structure */}
      <group position={[0, 42.5, 0]}>
        {/* Crown base */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[19.2, 0.8, 15.2]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Sky lounge glass box */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[15, 3.2, 11]} />
          <meshPhysicalMaterial
            color="#FFE5B4"
            emissive="#FFD580"
            emissiveIntensity={0.5}
            transparent
            opacity={0.75}
            roughness={0.1}
          />
        </mesh>
        {/* Architectural crown fins */}
        <mesh position={[0, 4.2, 0]}>
          <boxGeometry args={[16.5, 0.6, 12.5]} />
          <meshStandardMaterial
            color="#C9A96E"
            emissive="#C9A96E"
            emissiveIntensity={0.85}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Roof antenna beacon */}
        <mesh position={[0, 6.2, 0]}>
          <cylinderGeometry args={[0.08, 0.15, 3.6, 8]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
        </mesh>
        <pointLight position={[0, 7.9, 0]} color="#FF4500" intensity={1.5} distance={20} />
      </group>
    </group>
  );
}

/** Flanking east and west architectural wings */
function FlankingWings() {
  return (
    <>
      {/* West wing */}
      <group position={[-14.5, 0, 1.5]}>
        <mesh position={[0, 13, 0]} castShadow receiveShadow>
          <boxGeometry args={[10.5, 26, 12]} />
          <meshStandardMaterial color="#181c24" metalness={0.75} roughness={0.3} />
        </mesh>
        <mesh position={[0, 13, 6.08]}>
          <boxGeometry args={[10.2, 25.6, 0.05]} />
          <meshPhysicalMaterial
            color="#0d1824"
            metalness={0.9}
            roughness={0.08}
            transparent
            opacity={0.65}
          />
        </mesh>
        {[6, 12, 18, 24].map((y) => (
          <mesh key={y} position={[0, y, 6.18]}>
            <boxGeometry args={[10.8, 0.18, 0.1]} />
            <meshStandardMaterial color="#C9A96E" emissive="#C9A96E" emissiveIntensity={0.55} />
          </mesh>
        ))}
      </group>

      {/* East wing */}
      <group position={[14.5, 0, 1.5]}>
        <mesh position={[0, 13, 0]} castShadow receiveShadow>
          <boxGeometry args={[10.5, 26, 12]} />
          <meshStandardMaterial color="#181c24" metalness={0.75} roughness={0.3} />
        </mesh>
        <mesh position={[0, 13, 6.08]}>
          <boxGeometry args={[10.2, 25.6, 0.05]} />
          <meshPhysicalMaterial
            color="#0d1824"
            metalness={0.9}
            roughness={0.08}
            transparent
            opacity={0.65}
          />
        </mesh>
        {[6, 12, 18, 24].map((y) => (
          <mesh key={y} position={[0, y, 6.18]}>
            <boxGeometry args={[10.8, 0.18, 0.1]} />
            <meshStandardMaterial color="#C9A96E" emissive="#C9A96E" emissiveIntensity={0.55} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/** Grand entrance porte-cochère and arrival plaza */
function GrandEntrancePodium() {
  return (
    <group position={[0, 0, 0]}>
      {/* Elevated podium terrace */}
      <mesh position={[0, 1.2, 5]} receiveShadow>
        <boxGeometry args={[46, 2.4, 26]} />
        <meshStandardMaterial color="#1f2229" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Cantilevered bronze porte-cochère roof */}
      <mesh position={[0, 4.4, 16.5]} castShadow>
        <boxGeometry args={[16, 0.45, 9.5]} />
        <meshStandardMaterial
          color="#16181f"
          metalness={0.88}
          roughness={0.18}
        />
      </mesh>

      {/* Porte-cochère gold fascia perimeter trim */}
      <mesh position={[0, 4.4, 21.3]}>
        <boxGeometry args={[16.2, 0.48, 0.12]} />
        <meshStandardMaterial
          color="#C9A96E"
          emissive="#C9A96E"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Dual monumental bronze structural columns */}
      {[-6.8, 6.8].map((x) => (
        <group key={x} position={[x, 2.2, 18]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 4.4, 0.55]} />
            <meshStandardMaterial
              color="#C9A96E"
              metalness={0.92}
              roughness={0.15}
            />
          </mesh>
          {/* Column base uplight */}
          <pointLight position={[0, -1.8, 0.4]} color="#FFD580" intensity={0.8} distance={5} />
        </group>
      ))}

      {/* Recessed ceiling downlights under canopy */}
      {[-4, 0, 4].map((x) => (
        <group key={x} position={[x, 4.15, 16.5]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
            <meshStandardMaterial color="#FFF0D0" emissive="#FFE5B4" emissiveIntensity={2} />
          </mesh>
          <pointLight color="#FFE5B4" intensity={1.2} distance={8} />
        </group>
      ))}

      {/* Central circular arrival fountain & reflecting pool */}
      <group position={[0, 0.2, 28]}>
        {/* Pool rim */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <cylinderGeometry args={[4.2, 4.6, 0.4, 32]} />
          <meshStandardMaterial color="#2a2824" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Water surface with glow */}
        <mesh position={[0, 0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.9, 32]} />
          <meshPhysicalMaterial
            color="#144265"
            emissive="#1a3f5a"
            emissiveIntensity={0.3}
            roughness={0.05}
            metalness={0.1}
            clearcoat={1}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Center fountain jet element */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.12, 0.25, 0.8, 16]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.9} roughness={0.1} />
        </mesh>
        <pointLight position={[0, 1.2, 0]} color="#70B0FF" intensity={0.9} distance={8} />
      </group>
    </group>
  );
}

/** Landscaping with manicured topiary, trees, and ground lights */
function Landscaping() {
  const treePositions: THREE.Vector3Tuple[] = [
    [-22, 0, 16],
    [-24, 0, 26],
    [-18, 0, 34],
    [22, 0, 16],
    [24, 0, 26],
    [18, 0, 34],
    [-12, 0, 38],
    [12, 0, 38],
  ];

  return (
    <group>
      {/* Specimen architectural trees */}
      {treePositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Trunk */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.28, 4.4, 8]} />
            <meshStandardMaterial color="#2b1f17" roughness={0.85} />
          </mesh>
          {/* Layered canopy */}
          <mesh position={[0, 4.6, 0]} castShadow>
            <coneGeometry args={[2.2, 3.2, 8]} />
            <meshStandardMaterial color="#1a2e1d" roughness={0.7} />
          </mesh>
          <mesh position={[0, 5.8, 0]} castShadow>
            <coneGeometry args={[1.6, 2.4, 8]} />
            <meshStandardMaterial color="#233a27" roughness={0.65} />
          </mesh>
          {/* Ground uplight illuminating tree canopy */}
          <pointLight
            position={[0.5, 0.2, 0.5]}
            color="#FFD580"
            intensity={0.45}
            distance={7}
          />
        </group>
      ))}

      {/* Hedge boundary borders along driveway */}
      {[-16, 16].map((x) => (
        <group key={x} position={[x, 0.6, 26]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.5, 1.2, 16]} />
            <meshStandardMaterial color="#1e3422" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Paved luxury ground & driveway */
function GroundPlaza() {
  return (
    <group>
      {/* Main vast dark ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial
          color="#0d0e12"
          roughness={0.88}
          metalness={0.12}
        />
      </mesh>

      {/* Paved entrance driveway court */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 26]} receiveShadow>
        <ringGeometry args={[5, 14, 32]} />
        <meshStandardMaterial
          color="#161920"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Bronze divider inlay ring on the driveway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 26]}>
        <ringGeometry args={[9.5, 9.65, 32]} />
        <meshStandardMaterial
          color="#C9A96E"
          emissive="#C9A96E"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

/** Floating atmospheric gold particles (embers/dust) */
function AtmosphericParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 400;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 90;
      pos[i * 3 + 1] = Math.random() * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 90;
      siz[i] = Math.random() * 0.12 + 0.03;
    }
    return [pos, siz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    const time = clock.getElapsedTime() * 0.15;
    const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(time + i * 0.2) * 0.003;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A96E"
        size={0.1}
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ExteriorScene() {
  return (
    <group>
      <GroundPlaza />
      <MainTower />
      <FlankingWings />
      <GrandEntrancePodium />
      <Landscaping />
      <AtmosphericParticles />
    </group>
  );
}
