import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BANK_ACCOUNTS, FOUNDATION_INFO } from '../data/foundationData';
import { useFoundation } from '../context/FoundationContext';
import { Logo } from './Logo';
import { SocialIcon } from './SocialIcon';

export function Footer() {
  const { settings } = useFoundation();
  const activeSocials = settings.socialLinks.filter((s) => s.url.trim());

  return (
    <footer className="relative overflow-hidden border-t border-[#0B3B75]/15 bg-gradient-to-b from-[#082A56] to-[#061F40] text-white">
      {/* Subtle architectural arch motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[32px] border-white/[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-4">
            <Logo variant="dark" size="md" />
            <p className="font-serif text-xl italic text-blue-200">
              &ldquo;{FOUNDATION_INFO.motto}&rdquo;
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-blue-100/80">
              {FOUNDATION_INFO.intro}
            </p>

            {/* Social Icon Pills */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {activeSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.platform}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-2 text-xs font-semibold text-blue-100 transition hover:border-white/30 hover:bg-white/15 hover:text-white"
                  >
                    <SocialIcon name={social.icon} className="h-3.5 w-3.5 text-blue-300" />
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-300">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-blue-100/90 transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100/90 transition hover:text-white">
                  About Us &amp; Team
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-blue-100/90 transition hover:text-white">
                  Our Activities
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-blue-100/90 transition hover:text-white">
                  Donate Now
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100/90 transition hover:text-white">
                  Contact &amp; Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Accounts */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-300">
              Verified Giving Channels
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              {BANK_ACCOUNTS.map((acc) => (
                <Link
                  key={acc.id}
                  to="/donate"
                  className="block rounded-xl border border-white/10 bg-white/[0.06] p-3.5 transition hover:border-white/25 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-blue-200">{acc.provider}</p>
                    <ArrowUpRight className="h-3.5 w-3.5 text-blue-300" />
                  </div>
                  <p className="mt-1 font-mono text-sm font-bold tracking-wide text-white">
                    {acc.accountNumber}
                  </p>
                  <p className="mt-0.5 text-xs text-blue-100/70">
                    Title: {acc.accountTitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-300">
              Contact &amp; Location
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-blue-100/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                <span>{settings.location}</span>
              </li>
              <li>
                <a
                  href={`tel:+92${settings.phoneDisplay.replace(/\D/g, '').replace(/^0/, '')}`}
                  className="flex items-center gap-2.5 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-blue-300" />
                  <span>{settings.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-2.5 break-all transition hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                  <span>{settings.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-blue-200/75 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {FOUNDATION_INFO.name}. All rights reserved.
          </p>
          <p className="font-medium text-blue-200">
            {FOUNDATION_INFO.tagline} • {FOUNDATION_INFO.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  );
}
