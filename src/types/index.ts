import * as THREE from 'three';

/** Defines a single scene section in the walkthrough */
export interface SceneSection {
  id: string;
  name: string;
  label: string;
  subtitle: string;
  description: string;
  /** Scroll progress range [start, end] where 0-1 maps to entire scroll */
  scrollRange: [number, number];
  /** Camera position at this scene */
  cameraPosition: THREE.Vector3Tuple;
  /** Camera look-at target at this scene */
  cameraTarget: THREE.Vector3Tuple;
  /** Camera FOV at this scene */
  fov?: number;
}

/** Camera state used for interpolation */
export interface CameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

/** Navigation item */
export interface NavItem {
  label: string;
  sectionId: string;
  scrollTarget: number;
}

