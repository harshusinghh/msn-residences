import { SceneSection, NavItem } from '@/types';

/**
 * Scene configuration for the MSN Residences walkthrough.
 * Each scene defines camera positions, target look-at coordinates, and scroll ranges.
 * Continuous coordinates ensure an uninterrupted 3D architectural flythrough.
 */
export const SCENES: SceneSection[] = [
  {
    id: 'exterior',
    name: 'Exterior',
    label: '01',
    subtitle: 'The Architectural Icon',
    description:
      'Rising majestically into the twilight sky, MSN Residences combines bold bronze fins, double-glazed panoramic facades, and warm architectural uplighting.',
    scrollRange: [0, 0.28],
    cameraPosition: [52, 24, 52],
    cameraTarget: [0, 15, 0],
    fov: 46,
  },
  {
    id: 'amenities',
    name: 'Amenities',
    label: '02',
    subtitle: 'Resort Living Reimagined',
    description:
      'Immerse yourself in private sanctuary — featuring an illuminated infinity edge pool, state-of-the-art wellness pavilion, sunken lounge cabanas, and landscaped gardens.',
    scrollRange: [0.28, 0.52],
    cameraPosition: [28, 7, 28],
    cameraTarget: [16, 2.8, 6],
    fov: 52,
  },
  {
    id: 'lobby',
    name: 'Lobby',
    label: '03',
    subtitle: 'The Grand Arrival',
    description:
      'Cross the threshold under the bronze porte-cochère into a double-height atrium featuring book-matched Calacatta marble, bespoke sculptural chandelier, and concierge salon.',
    scrollRange: [0.52, 0.76],
    cameraPosition: [0, 3.2, 16],
    cameraTarget: [0, 3.2, -2],
    fov: 56,
  },
  {
    id: 'apartment',
    name: 'Apartment',
    label: '04',
    subtitle: 'The Sky Residence',
    description:
      'Enter an expansive sky residence with continuous 3.4m ceiling heights, smoked oak chevron flooring, custom Poliform kitchen island, and sweeping horizon vistas.',
    scrollRange: [0.76, 1.0],
    cameraPosition: [-3.5, 23.5, 4.5],
    cameraTarget: [2.5, 23, -3.5],
    fov: 60,
  },
];

export const NAV_ITEMS: NavItem[] = SCENES.map((scene) => ({
  label: scene.name,
  sectionId: scene.id,
  scrollTarget: scene.scrollRange[0],
}));

/** Total scroll height multiplier (viewport heights) for smooth pacing */
export const SCROLL_PAGES = 9;

/** Brand color palette - Luxury Dark Charcoal & Warm Bronze/Champagne Gold */
export const COLORS = {
  gold: '#C9A96E',
  goldLight: '#E8D5A8',
  goldDark: '#9C7A3C',
  charcoal: '#0a0a0f',
  charcoalLight: '#161620',
  charcoalBorder: 'rgba(201, 169, 110, 0.18)',
  offWhite: '#FAF7F2',
  warmMuted: '#9E9AA5',
} as const;
