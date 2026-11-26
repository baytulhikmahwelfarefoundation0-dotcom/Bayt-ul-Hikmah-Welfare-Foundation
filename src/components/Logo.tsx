import { useEffect, useState } from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const CUSTOM_LOGO_CANDIDATES = ['/logo.png', '/logo.svg', '/logo.webp', '/logo.jpg', '/logo.jpeg'];

export function Logo({ variant = 'light', size = 'md', showText = true }: LogoProps) {
  const [customLogoSrc, setCustomLogoSrc] = useState<string | null>('/logo.jpg');

  useEffect(() => {
    let cancelled = false;

    const checkLogo = (index: number) => {
      if (index >= CUSTOM_LOGO_CANDIDATES.length || cancelled) return;
      const src = CUSTOM_LOGO_CANDIDATES[index];
      const probe = new Image();
      probe.onload = () => {
        if (!cancelled) setCustomLogoSrc(src);
      };
      probe.onerror = () => {
        checkLogo(index + 1);
      };
      probe.src = src;
    };

    checkLogo(0);
    return () => {
      cancelled = true;
    };
  }, []);

  const iconSizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  }[size];

  const isDarkSurface = variant === 'dark';

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {customLogoSrc ? (
        <div
          className={`${iconSizes} overflow-hidden rounded-xl bg-[#EEF1F8] shadow-sm ring-1 ${
            isDarkSurface ? 'ring-white/25' : 'ring-[#0B3B75]/15'
          }`}
        >
          <img
            src={customLogoSrc}
            alt="Bayt-ul-Hikmah Welfare Foundation Logo"
            className="h-full w-full scale-[1.32] object-cover"
          />
        </div>
      ) : (
        <div
          className={`${iconSizes} relative flex shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 ${
            isDarkSurface
              ? 'bg-white text-[#0B3B75] ring-2 ring-white/20'
              : 'bg-gradient-to-br from-[#0B3B75] to-[#1456A8] text-white ring-1 ring-[#0B3B75]/20'
          }`}
          aria-label="Bayt-ul-Hikmah Crest Placeholder"
        >
          {/* White & Blue Architectural Crest SVG ("Bayt-ul-Hikmah" — House of Wisdom, Hope & Care) */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
          >
            {/* Pointed Arch Frame */}
            <path
              d="M24 5C17 10.5 11 16.5 11 25V39H37V25C37 16.5 31 10.5 24 5Z"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Open Book / House of Wisdom */}
            <path
              d="M16.5 28.5C19 27.2 21.8 27.5 24 29.2C26.2 27.5 29 27.2 31.5 28.5V34.5C29 33.4 26.2 33.7 24 35.2C21.8 33.7 19 33.4 16.5 34.5V28.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Rising Crescent / Hope Star */}
            <circle cx="24" cy="18.5" r="3" fill="currentColor" />
            <path
              d="M24 12.5V14.2M19.2 15L20.4 16.2M28.8 15L27.6 16.2"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={`font-bold tracking-tight ${
              size === 'lg' ? 'text-lg sm:text-xl' : 'text-base sm:text-[17px]'
            } ${isDarkSurface ? 'text-white' : 'text-[#0B3B75]'}`}
          >
            Bayt-ul-Hikmah
          </span>
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
              isDarkSurface ? 'text-blue-200' : 'text-[#1456A8]'
            }`}
          >
            Welfare Foundation
          </span>
        </div>
      )}
    </div>
  );
}
