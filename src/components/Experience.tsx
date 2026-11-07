'use client';

import { SCROLL_PAGES } from '@/lib/config';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import SceneCanvas from '@/components/three/SceneCanvas';
import Navbar from '@/components/ui/Navbar';
import ScrollProgressIndicator from '@/components/ui/ScrollProgressIndicator';
import SceneOverlay from '@/components/overlays/SceneOverlay';

/**
 * Main experience component.
 * Orchestrates the 3D canvas, UI overlays, and scroll-driven animations.
 * The scroll container creates the height needed for the scroll-driven experience.
 */
export default function Experience() {
  const { progress, activeScene } = useScrollProgress();

  return (
    <>
      {/* Navigation */}
      <Navbar activeScene={activeScene} scrollProgress={progress} />

      {/* Fixed 3D Canvas */}
      <SceneCanvas scrollProgress={progress} />

      {/* Scene text overlays */}
      <SceneOverlay scrollProgress={progress} activeScene={activeScene} />

      {/* Scroll progress indicator */}
      <ScrollProgressIndicator progress={progress} />

      {/* Scroll spacer — creates the scrollable height */}
      <div
        style={{ height: `${SCROLL_PAGES * 100}vh` }}
        className="relative z-0"
      />

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 z-30 pointer-events-none bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </>
  );
}

