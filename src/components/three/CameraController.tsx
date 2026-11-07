'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENES } from '@/lib/config';

interface CameraControllerProps {
  scrollProgress: number;
}

/**
 * CameraController — Cinematic Walkthrough Flight Path
 *
 * Synchronizes the 3D camera trajectory with scroll progress:
 * - Interpolates between scene waypoints using cubic hermite / smoothstep curves
 * - Smoothly transitions camera position, look-at target, and FOV
 * - Reverses cleanly when scrolling upwards
 * - Adds subtle luxury pointer parallax for interactive depth (inspired by igloo.inc)
 */
export default function CameraController({ scrollProgress }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(52, 24, 52));
  const targetLookAt = useRef(new THREE.Vector3(0, 15, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 15, 0));

  // Build camera path waypoints from scene configuration
  const waypoints = useMemo(() => {
    return SCENES.map((scene) => ({
      position: new THREE.Vector3(...scene.cameraPosition),
      target: new THREE.Vector3(...scene.cameraTarget),
      fov: scene.fov || 50,
      scrollStart: scene.scrollRange[0],
      scrollEnd: scene.scrollRange[1],
    }));
  }, []);

  useFrame((state, delta) => {
    // Determine active waypoint span based on scroll progress
    let currentIdx = 0;
    for (let i = waypoints.length - 1; i >= 0; i--) {
      if (scrollProgress >= waypoints[i].scrollStart) {
        currentIdx = i;
        break;
      }
    }

    const current = waypoints[currentIdx];
    const next = waypoints[Math.min(currentIdx + 1, waypoints.length - 1)];

    // Calculate normalized progress within the active segment
    const rangeSize = current.scrollEnd - current.scrollStart;
    const localProgress =
      rangeSize > 0
        ? Math.max(0, Math.min(1, (scrollProgress - current.scrollStart) / rangeSize))
        : 0;

    // Smoothstep curve for natural acceleration and deceleration
    const eased = localProgress * localProgress * (3 - 2 * localProgress);

    // Compute base interpolated position and look-at
    targetPosition.current.lerpVectors(current.position, next.position, eased);
    targetLookAt.current.lerpVectors(current.target, next.target, eased);

    // Add subtle interactive mouse parallax (igloo.inc style)
    const parallaxX = state.pointer.x * 1.2;
    const parallaxY = state.pointer.y * 0.8;

    const desiredCamPos = new THREE.Vector3(
      targetPosition.current.x + parallaxX,
      targetPosition.current.y + parallaxY,
      targetPosition.current.z
    );

    // Frame-rate independent exponential damping for buttery smooth motion
    const dampSpeed = Math.min(1, 1 - Math.pow(0.0005, delta));
    camera.position.lerp(desiredCamPos, dampSpeed);
    currentLookAt.current.lerp(targetLookAt.current, dampSpeed);

    camera.lookAt(currentLookAt.current);

    // Smoothly adapt perspective FOV
    const perspCamera = camera as THREE.PerspectiveCamera;
    const targetFov = THREE.MathUtils.lerp(current.fov, next.fov, eased);
    perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, targetFov, dampSpeed);
    perspCamera.updateProjectionMatrix();
  });

  return null;
}
