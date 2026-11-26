import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeartHandshake, Menu, Phone, X } from 'lucide-react';
import { FOUNDATION_INFO } from '../data/foundationData';
import { useFoundation } from '../context/FoundationContext';
import { Logo } from './Logo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/activities', label: 'Our Activities' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = useFoundation();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-nav)] backdrop-blur-md">
      {/* Subtle Top Utility Strip */}
      <div className="bg-[var(--bg-top-bar)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-[11px] sm:px-6 sm:text-xs lg:px-8">
          <p className="truncate font-medium text-blue-100">
            <span className="font-semibold text-white">{FOUNDATION_INFO.tagline}</span>
            <span className="mx-2 hidden text-blue-300 sm:inline">•</span>
            <span className="hidden italic text-blue-100 sm:inline">
              &ldquo;{FOUNDATION_INFO.motto}&rdquo;
            </span>
          </p>
          <a
            href={`tel:+92${settings.phoneDisplay.replace(/\D/g, '').replace(/^0/, '')}`}
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-white transition-colors hover:text-blue-200"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{settings.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="min-w-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1456A8]"
        >
          <Logo variant="light" size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[var(--bg-pill)] text-[var(--text-heading)]'
                    : 'text-[var(--text-body)] hover:bg-[var(--bg-surface-alt)] hover:text-[var(--text-heading)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            to="/donate"
            className="hidden items-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--btn-primary-text)] shadow-sm transition-all hover:bg-[var(--btn-primary-hover)] hover:shadow md:inline-flex"
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Donate Now</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-white text-[var(--text-heading)] transition hover:bg-[var(--bg-pill)] md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-white px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[var(--bg-pill)] text-[var(--text-heading)]'
                      : 'text-[var(--text-body)] hover:bg-[var(--bg-surface-alt)] hover:text-[var(--text-heading)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/donate"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--btn-primary-hover)]"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Donate &amp; Support</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
