'use client';

import dynamic from 'next/dynamic';

// Dynamic import to prevent SSR issues with Three.js
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <h1 className="text-4xl font-extralight tracking-[0.4em] text-[#C9A96E] mb-2">
          MSN
        </h1>
        <p className="text-xs tracking-[0.3em] text-white/30 uppercase mb-12">
          Residences
        </p>

        {/* Loading bar */}
        <div className="w-48 h-[1px] bg-white/10 mx-auto overflow-hidden">
          <div className="h-full bg-[#C9A96E] animate-loading-bar" />
        </div>

        <p className="text-[10px] tracking-[0.2em] text-white/20 uppercase mt-6">
          Loading Experience
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Experience />
    </main>
  );
}
