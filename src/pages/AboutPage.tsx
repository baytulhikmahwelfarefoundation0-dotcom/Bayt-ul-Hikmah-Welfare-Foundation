import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Eye,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { FOUNDATION_INFO, IMPACT_METRICS, OFFICE_BEARERS } from '../data/foundationData';
import { MemberCard } from '../components/MemberCard';
import { LocationMap } from '../components/LocationMap';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Household-Level Identification',
    description:
      'Rather than waiting at an office desk, our outreach team visits neighborhoods across Samundri and Faisalabad to verify urgent family needs firsthand.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    description:
      'Every rupee entrusted to us is tracked by our Finance Secretary and channeled directly into rations, school fees, patient medicines, clean water, and tools.',
  },
  {
    icon: HeartHandshake,
    title: 'Dignity First',
    description:
      'Assistance is delivered privately and respectfully—empowering widows, students, patients, and differently-abled individuals without compromising self-respect.',
  },
];

export function AboutPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="hero-grid border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-hero-from)] to-[var(--bg-page)] py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
              <Users className="h-3.5 w-3.5 text-[var(--text-accent)]" />
              <span>About Our Foundation</span>
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-5xl">
              {FOUNDATION_INFO.name}
            </h1>
            <p className="mt-3 font-serif text-xl font-semibold italic text-[var(--text-accent)] sm:text-2xl">
              {FOUNDATION_INFO.tagline} • &ldquo;{FOUNDATION_INFO.motto}&rdquo;
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--text-body)] sm:text-lg">
              {FOUNDATION_INFO.intro}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-heading)] shadow-xs sm:text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-[var(--text-accent)]" />
              <span>Headquartered in {FOUNDATION_INFO.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)] py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--btn-primary-bg)] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-[var(--text-strong)]">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Bearers Directory */}
      <section className="arch-pattern py-14 sm:py-20" id="office-bearers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-accent)]">
              Executive Committee
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-4xl">
              Office Bearers
            </h2>
            <p className="mt-2 text-sm text-[var(--text-body)] sm:text-base">
              Meet the seven dedicated office bearers leading {FOUNDATION_INFO.name} across Samundri and the Faisalabad Division.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {OFFICE_BEARERS.map((member, idx) => (
              <MemberCard key={member.name} member={member} featured={idx === 0} />
            ))}
          </div>

          {/* Complete Roster Summary Table */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
            <div className="border-b border-[var(--border-subtle)] bg-[#0B3B75] px-6 py-4 text-white">
              <h3 className="text-base font-bold">Official Office Bearers Roster</h3>
              <p className="text-xs text-blue-200">
                Bayt-ul-Hikmah Welfare Foundation • {FOUNDATION_INFO.location}
              </p>
            </div>
            <div className="grid sm:grid-cols-2">
              {OFFICE_BEARERS.map((member) => (
                <div
                  key={member.rank}
                  className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3.5 text-sm sm:px-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--bg-pill)] text-xs font-bold text-[var(--text-heading)]">
                      {member.rank}
                    </span>
                    <div>
                      <p className="font-bold text-[var(--text-strong)]">{member.name}</p>
                      <p className="text-xs font-medium text-[var(--text-accent)]">{member.role}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--text-accent)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Where We Operate Map */}
          <div className="mt-12">
            <LocationMap compact />
          </div>
        </div>
      </section>

      {/* Impact & CTA */}
      <section className="border-t border-[var(--border-subtle)] bg-[#082A56] py-12 text-white sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Together, We Keep Families Standing Strong
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-100 sm:text-base">
                Whether through a monthly donation, sponsoring a child&apos;s schooling, or referring a family in need within Faisalabad Division, your partnership makes real relief possible.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/donate"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0B3B75] transition hover:bg-blue-50"
                >
                  Donate Now
                </Link>
                <Link
                  to="/contact"
                  className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              {IMPACT_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/15 bg-white/10 p-4"
                >
                  <p className="text-2xl font-extrabold">{m.value}</p>
                  <p className="mt-1 text-xs text-blue-100">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
