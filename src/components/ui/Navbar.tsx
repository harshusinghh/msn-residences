'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, COLORS } from '@/lib/config';

interface NavbarProps {
  activeScene: string;
  scrollProgress: number;
}

/**
 * Minimal luxury navigation bar.
 * Fixed at top with transparent background that becomes solid on scroll.
 */
export default function Navbar({ activeScene, scrollProgress }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollProgress > 0.02);
  }, [scrollProgress]);

  const handleNavClick = (scrollTarget: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollTarget * docHeight,
      behavior: 'smooth',
    });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(201, 169, 110, 0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="text-2xl font-light tracking-[0.3em]"
              style={{ color: COLORS.gold }}
            >
              MSN
            </div>
            <div className="hidden sm:block text-xs tracking-[0.2em] text-white/50 uppercase">
              Residences
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.scrollTarget)}
                className="relative text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                style={{
                  color:
                    activeScene === item.sectionId
                      ? COLORS.gold
                      : 'rgba(255,255,255,0.5)',
                }}
              >
                {item.label}
                {activeScene === item.sectionId && (
                  <span
                    className="absolute -bottom-2 left-0 right-0 h-[1px] transition-all duration-500"
                    style={{ backgroundColor: COLORS.gold }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              className="text-xs tracking-[0.15em] uppercase px-6 py-2.5 border transition-all duration-300 hover:bg-white/5"
              style={{
                borderColor: `${COLORS.gold}40`,
                color: COLORS.gold,
              }}
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-20 left-0 right-0 border-t"
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(20px)',
            borderColor: `${COLORS.gold}15`,
          }}
        >
          <div className="px-6 py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.scrollTarget)}
                className="block w-full text-left text-sm tracking-[0.15em] uppercase py-2 transition-colors"
                style={{
                  color:
                    activeScene === item.sectionId
                      ? COLORS.gold
                      : 'rgba(255,255,255,0.5)',
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              className="w-full text-xs tracking-[0.15em] uppercase px-6 py-3 border mt-4 transition-all duration-300"
              style={{
                borderColor: `${COLORS.gold}40`,
                color: COLORS.gold,
              }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

