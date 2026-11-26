import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, HeartHandshake } from 'lucide-react';
import type { ActivityItem } from '../data/foundationData';
import { useFoundation } from '../context/FoundationContext';
import { ActivityIcon } from '../components/ActivityIcon';

const CATEGORIES: Array<'All' | ActivityItem['category']> = [
  'All',
  'Basic Needs',
  'Education & Health',
  'Dignity & Livelihood',
];

function renderHighlightedSummary(text: string) {
  const target = 'Alkhidmat Foundation';
  const idx = text.indexOf(target);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + target.length);
  return (
    <>
      {before}
      <span className="rounded bg-[#EBF3FC] px-1.5 py-0.5 font-bold text-[#0B3B75]">
        {target}
      </span>
      {after}
    </>
  );
}

function ActivityCard({ activity }: { activity: ActivityItem }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const uploadedImages = activity.images || [];
  const hasUploadedImages = uploadedImages.length > 0;
  const displayedSrc = hasUploadedImages
    ? uploadedImages[activeImageIdx] || uploadedImages[0]
    : activity.photoHint;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm transition hover:border-[var(--border-strong)] hover:shadow-md">
      {/* Field Photo / Clean Architectural Frame */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B3B75] via-[#1456A8] to-[#1D68C4] p-6 text-white sm:h-48">
        {displayedSrc && (
          <img
            src={displayedSrc}
            alt={activity.title}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {!hasUploadedImages && (
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/25">
              <ActivityIcon name={activity.iconName} className="h-7 w-7 text-white" />
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-blue-100">
              <Camera className="h-3 w-3" />
              <span>Program {activity.number} • Field Gallery</span>
            </span>
          </div>
        )}

        {hasUploadedImages && uploadedImages.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 z-10 flex gap-1 rounded-full bg-[#07264D]/75 px-2 py-1 backdrop-blur">
            {uploadedImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition ${
                  idx === activeImageIdx ? 'bg-white' : 'bg-white/40 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-[var(--bg-pill)] px-2.5 py-1 text-[11px] font-bold text-[var(--text-heading)]">
              {activity.category}
            </span>
            <span className="text-xs font-semibold text-[var(--text-accent)]">
              {activity.frequency}
            </span>
          </div>

          <h2 className="mt-3 text-xl font-bold text-[var(--text-strong)]">{activity.title}</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-body)]">
            {renderHighlightedSummary(activity.summary)}
          </p>

          {activity.partnerHighlight && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#1456A8]/25 bg-[#EBF3FC] px-3 py-1.5 text-xs font-bold text-[#0B3B75]">
              <HeartHandshake className="h-3.5 w-3.5 text-[#1456A8]" />
              <span>{activity.partnerHighlight}</span>
            </div>
          )}

          {hasUploadedImages && uploadedImages.length > 1 && (
            <div className="mt-3 flex gap-1.5">
              {uploadedImages.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`h-9 w-9 overflow-hidden rounded-lg border-2 transition ${
                    idx === activeImageIdx
                      ? 'border-[var(--text-accent)]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
          <Link
            to={`/donate?program=${encodeURIComponent(activity.title)}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--bg-pill)] px-4 py-2.5 text-sm font-bold text-[var(--text-heading)] transition hover:bg-[var(--btn-primary-bg)] hover:text-white"
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Support {activity.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ActivitiesPage() {
  const { activities } = useFoundation();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ActivityItem['category']>('All');

  const filteredActivities =
    selectedCategory === 'All'
      ? activities
      : activities.filter((a) => a.category === selectedCategory);

  return (
    <div>
      {/* Header */}
      <section className="hero-grid border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-hero-from)] to-[var(--bg-page)] py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
            {activities.length} Core Welfare Initiatives
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-5xl">
            Our Activities on the Ground
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-body)] sm:text-lg">
            Every program addresses a real, verified household need across Samundri and the Faisalabad Division—combining immediate relief with sustainable independence.
          </p>

          {/* Filter Pills */}
          <div className="mt-7 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    active
                      ? 'bg-[var(--btn-primary-bg)] text-white shadow-sm'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-body)] hover:bg-[var(--bg-pill)] hover:text-[var(--text-heading)]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activities Cards */}
      <section className="arch-pattern py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
