'use client';

import { useMemo } from 'react';
import { SCENES, COLORS } from '@/lib/config';

interface SceneOverlayProps {
  scrollProgress: number;
  activeScene: string;
}

// Scene architectural highlights (inspired by igloo.inc luxury specification panels)
const SCENE_METRICS: Record<string, { label: string; value: string }[]> = {
  exterior: [
    { label: 'Elevation', value: '45 Storeys' },
    { label: 'Architecture', value: 'Bronze & Glass' },
    { label: 'Residences', value: '180 Private Suites' },
  ],
  amenities: [
    { label: 'Infinity Pool', value: '50 Metres' },
    { label: 'Wellness Club', value: 'Technogym Equipped' },
    { label: 'Gardens', value: 'Zen Topiary' },
  ],
  lobby: [
    { label: 'Ceiling Height', value: '7.2 Metres' },
    { label: 'Finishes', value: 'Calacatta Marble' },
    { label: 'Concierge', value: '24 / 7 Bespoke' },
  ],
  apartment: [
    { label: 'Ceiling Height', value: '3.4 Metres' },
    { label: 'Flooring', value: 'Smoked French Oak' },
    { label: 'Kitchen', value: 'Custom Poliform' },
  ],
};

export default function SceneOverlay({
  scrollProgress,
  activeScene,
}: SceneOverlayProps) {
  const currentScene = useMemo(
    () => SCENES.find((s) => s.id === activeScene) || SCENES[0],
    [activeScene]
  );

  // Smooth opacity calculation with bell curve falloff for clean transitions
  const opacity = useMemo(() => {
    const { scrollRange } = currentScene;
    const rangeSize = scrollRange[1] - scrollRange[0];
    const localProgress = (scrollProgress - scrollRange[0]) / rangeSize;

    if (localProgress < 0.12) return Math.max(0, localProgress / 0.12);
    if (localProgress > 0.88) return Math.max(0, (1 - localProgress) / 0.12);
    return 1;
  }, [scrollProgress, currentScene]);

  const metrics = SCENE_METRICS[currentScene.id] || [];

  return (
    <div className="fixed inset-0 z-20 pointer-events-none select-none flex flex-col justify-between p-6 md:p-12 lg:p-16">
      {/* Top right scene status pill */}
      <div className="flex justify-end pt-16 md:pt-4">
        <div
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700"
          style={{ opacity: Math.max(0.4, opacity) }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: COLORS.gold }}
          />
          <span className="text-[10px] tracking-[0.25em] font-light uppercase text-white/70">
            {currentScene.label} // {currentScene.name}
          </span>
        </div>
      </div>

      {/* Main bottom narrative overlay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 md:pb-4">
        {/* Left Column: Scene Title & Narrative */}
        <div
          className="lg:col-span-7 transition-all duration-700 transform"
          style={{
            opacity,
            transform: `translateY(${(1 - opacity) * 16}px)`,
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs tracking-[0.3em] font-mono uppercase"
              style={{ color: COLORS.gold }}
            >
              Phase {currentScene.label}
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/40">
              MSN Architectural Experience
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 leading-tight"
            style={{ color: COLORS.offWhite }}
          >
            {currentScene.subtitle}
          </h1>

          <p className="text-sm md:text-base font-light text-white/60 leading-relaxed max-w-xl">
            {currentScene.description}
          </p>
        </div>

        {/* Right Column: Architectural Specifications */}
        <div
          className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end transition-all duration-700"
          style={{
            opacity,
            transform: `translateY(${(1 - opacity) * 12}px)`,
          }}
        >
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="px-4 py-2.5 rounded-lg border border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between gap-6 min-w-[220px]"
            >
              <span className="text-[10px] tracking-[0.18em] uppercase text-white/40">
                {metric.label}
              </span>
              <span
                className="text-xs tracking-[0.12em] font-light text-right"
                style={{ color: COLORS.goldLight }}
              >
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scene navigation waypoint dots (left center) */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5">
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <div key={scene.id} className="flex items-center gap-3 group">
              <div
                className="w-1.5 h-6 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: isActive ? COLORS.gold : 'rgba(255,255,255,0.12)',
                  boxShadow: isActive ? `0 0 10px ${COLORS.gold}80` : 'none',
                  transform: isActive ? 'scaleY(1.4)' : 'scaleY(1)',
                }}
              />
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-mono transition-all duration-500"
                style={{
                  color: isActive ? COLORS.gold : 'rgba(255,255,255,0.25)',
                }}
              >
                {scene.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Scroll to Explore cue at initial arrival */}
      {scrollProgress < 0.04 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto">
          <span
            className="text-[9px] tracking-[0.35em] uppercase font-mono text-white/40"
          >
            Scroll Down to Begin Walkthrough
          </span>
          <div className="w-[1px] h-9 overflow-hidden bg-white/10">
            <div
              className="w-full h-full animate-pulse"
              style={{
                background: `linear-gradient(to bottom, transparent, ${COLORS.gold})`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
