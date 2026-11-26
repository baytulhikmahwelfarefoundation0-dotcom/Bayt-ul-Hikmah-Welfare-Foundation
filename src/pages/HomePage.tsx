import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { BANK_ACCOUNTS, FOUNDATION_INFO, IMPACT_METRICS } from '../data/foundationData';
import { useFoundation } from '../context/FoundationContext';
import { ActivityIcon } from '../components/ActivityIcon';
import { CopyButton } from '../components/CopyButton';

export function HomePage() {
  const { activities } = useFoundation();
  const featuredActivities = activities.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-grid relative overflow-hidden border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-hero-from)] via-[var(--bg-page)] to-[var(--bg-page)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-0 h-96 w-96 rounded-full bg-[#3B82F6]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.11em] text-[var(--text-heading)] shadow-xs sm:text-xs">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--text-accent)]" />
                <span className="truncate">Samundri • Faisalabad Division, Pakistan</span>
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
                {FOUNDATION_INFO.name}
              </h1>

              <div className="mt-4 flex items-start gap-3 sm:items-center">
                <span className="mt-1.5 h-6 w-1 shrink-0 rounded-full bg-[var(--text-accent)] sm:mt-0" />
                <p className="font-serif text-xl font-semibold italic text-[var(--text-accent)] sm:text-[1.75rem]">
                  {FOUNDATION_INFO.tagline} — &ldquo;{FOUNDATION_INFO.motto}&rdquo;
                </p>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--text-body)] sm:text-lg">
                {FOUNDATION_INFO.intro}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-6 py-3.5 text-sm font-bold text-[var(--btn-primary-text)] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[var(--btn-primary-hover)] hover:shadow-lg"
                >
                  <HeartHandshake className="h-4 w-4" />
                  <span>Support a Family</span>
                </Link>
                <Link
                  to="/activities"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3.5 text-sm font-bold text-[var(--text-heading)] shadow-xs transition hover:bg-[var(--bg-surface-alt)]"
                >
                  <span>Our Activities ({activities.length})</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[var(--text-accent)] transition hover:bg-[var(--bg-pill)]"
                >
                  <Users className="h-4 w-4" />
                  <span>About &amp; Team</span>
                </Link>
              </div>

              {/* Concise Trust Indicators */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--border-subtle)] pt-5 text-xs font-semibold text-[var(--text-muted)] sm:mt-8">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--text-accent)]" />
                  Household-Level Verification
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[var(--text-accent)]" />
                  Direct &amp; Transparent Aid
                </span>
              </div>
            </div>

            {/* Right Impact Summary Card */}
            <div className="lg:col-span-5">
              <div
                style={{ background: 'var(--hero-card-bg)' }}
                className="relative overflow-hidden rounded-3xl border border-blue-400/20 p-5 text-white shadow-2xl sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border-[22px] border-white/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/[0.04]"
                />
                <div className="relative">
                  <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100">
                    Impact At a Glance
                  </span>
                  <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                    Serving Faisalabad Division
                  </h2>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {IMPACT_METRICS.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-sm transition hover:bg-white/[0.12]"
                      >
                        <p className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-[11px] font-medium leading-snug text-blue-100/90 sm:text-xs">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 text-[#0B3B75] shadow-md">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#1456A8]">
                        Direct EasyPaisa
                      </p>
                      <p className="font-mono text-base font-extrabold">
                        {BANK_ACCOUNTS[0].accountNumber}
                      </p>
                    </div>
                    <CopyButton text={BANK_ACCOUNTS[0].rawNumber} label="Copy Number" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Activities Preview (4 Cards) */}
      <section className="arch-pattern py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-accent)]">
                Core Programs
              </span>
              <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-3xl">
                How We Serve Families
              </h2>
            </div>
            <Link
              to="/activities"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-bold text-[var(--text-heading)] shadow-xs transition hover:bg-[var(--bg-surface-alt)]"
            >
              <span>View All {activities.length} Activities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredActivities.map((activity) => (
              <article
                key={activity.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-lg sm:p-6"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1D68C4] to-[#60A5FA] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-pill)] text-[var(--text-accent)] transition-colors group-hover:bg-[var(--btn-primary-bg)] group-hover:text-white">
                      <ActivityIcon name={activity.iconName} className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                      {activity.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[var(--text-strong)]">
                    {activity.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-body)]">
                    {activity.summary}
                  </p>
                </div>

                <Link
                  to="/activities"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-accent)] transition group-hover:translate-x-0.5"
                >
                  <span>Read more</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Action Strip */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-xs sm:p-9">
            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--text-heading)] sm:text-2xl">
                  Ready to support a family or connect with our team?
                </h2>
                <p className="mt-1.5 text-sm text-[var(--text-body)]">
                  Explore verified giving channels or meet the 7 Office Bearers leading our work in Samundri &amp; Faisalabad.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--btn-primary-bg)] px-5 py-3 text-sm font-bold text-[var(--btn-primary-text)] shadow-sm transition hover:bg-[var(--btn-primary-hover)]"
                >
                  Donate Details
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-alt)] px-5 py-3 text-sm font-bold text-[var(--text-heading)] transition hover:bg-[var(--bg-pill)]"
                >
                  Meet Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
