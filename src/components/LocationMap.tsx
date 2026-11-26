import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { FOUNDATION_INFO } from '../data/foundationData';

interface LocationMapProps {
  compact?: boolean;
}

const OSM_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=72.9188%2C31.0351%2C72.9988%2C31.0951&layer=mapnik&marker=31.065143%2C72.958842';

const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=31.065143,72.958842';

export function LocationMap({ compact = false }: LocationMapProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--btn-primary-bg)] text-white">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-accent)]">
              Grassroots Operations Hub
            </span>
            <h3 className="text-base font-bold text-[var(--text-strong)] sm:text-lg">
              {FOUNDATION_INFO.location}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Active household outreach across {FOUNDATION_INFO.serviceArea}
            </p>
          </div>
        </div>

        <a
          href={MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-bold text-[var(--text-heading)] shadow-xs transition hover:bg-[var(--btn-primary-bg)] hover:text-white"
        >
          <Navigation className="h-3.5 w-3.5" />
          <span>Open in Google Maps</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Embedded Interactive Map */}
      <div className={`relative w-full bg-[var(--bg-surface-alt)] ${compact ? 'h-72 sm:h-80' : 'h-80 sm:h-96'}`}>
        <div className="hero-grid absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-white shadow-md">
            <MapPin className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-bold text-[var(--text-heading)]">
            Samundri, District Faisalabad
          </p>
          <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
            31.0651° N, 72.9588° E • Punjab, Pakistan
          </p>
        </div>

        <iframe
          title="Bayt-ul-Hikmah Welfare Foundation Location — Samundri, District Faisalabad"
          src={OSM_EMBED_URL}
          className="relative z-10 h-full w-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
