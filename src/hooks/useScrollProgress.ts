'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCENES } from '@/lib/config';

/**
 * GSAP ScrollTrigger hook for synchronized, inertial scroll progress.
 *
 * Provides ultra-smooth, bidirectional scrubbed progress (0 to 1)
 * matching the cinematic aesthetic of igloo.inc.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(SCENES[0].id);
  const progressRef = useRef(0);

  useEffect(() => {
    // Register GSAP ScrollTrigger safely in client environment
    gsap.registerPlugin(ScrollTrigger);

    // Create a virtual scroll trigger over the entire scroll height
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2, // Inertial smooth scrubbing like igloo.inc
      onUpdate: (self) => {
        const currentProgress = Math.max(0, Math.min(1, self.progress));
        progressRef.current = currentProgress;
        setProgress(currentProgress);

        // Determine active scene based on scroll ranges
        for (let i = SCENES.length - 1; i >= 0; i--) {
          if (currentProgress >= SCENES[i].scrollRange[0] - 0.02) {
            setActiveScene(SCENES[i].id);
            break;
          }
        }
      },
    });

    // Refresh ScrollTrigger to calculate correct layout bounds
    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, []);

  return { progress, activeScene };
}
