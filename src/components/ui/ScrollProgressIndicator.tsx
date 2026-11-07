'use client';

import { COLORS } from '@/lib/config';

interface ScrollProgressIndicatorProps {
  progress: number;
}

/**
 * Vertical scroll progress indicator on the right side of the viewport.
 * Shows a thin gold line that fills as the user scrolls.
 */
export default function ScrollProgressIndicator({
  progress,
}: ScrollProgressIndicatorProps) {
  return (
    <>
      {/* Vertical progress bar (right side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
        <div
          className="relative w-[2px] h-32 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-150 ease-out"
            style={{
              height: `${progress * 100}%`,
              backgroundColor: COLORS.gold,
              boxShadow: `0 0 8px ${COLORS.gold}60`,
            }}
          />
        </div>
        <span
          className="text-[10px] tracking-[0.15em] font-light tabular-nums"
          style={{ color: `${COLORS.gold}90` }}
        >
          {Math.round(progress * 100)}%
        </span>
      </div>

      {/* Horizontal progress bar (top, mobile) */}
      <div className="fixed top-0 left-0 right-0 z-[60] md:hidden">
        <div
          className="h-[2px] transition-all duration-150 ease-out"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: COLORS.gold,
            boxShadow: `0 0 8px ${COLORS.gold}40`,
          }}
        />
      </div>
    </>
  );
}

