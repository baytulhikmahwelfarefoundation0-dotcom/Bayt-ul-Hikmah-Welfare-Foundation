import { useState } from 'react';
import type { OfficeBearer } from '../data/foundationData';

interface MemberCardProps {
  member: OfficeBearer;
  featured?: boolean;
}

export function MemberCard({ member, featured = false }: MemberCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-[var(--bg-surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured
          ? 'border-[#3B82F6]/40 shadow-md ring-1 ring-[#3B82F6]/20'
          : 'border-[var(--border-subtle)] shadow-xs'
      }`}
    >
      <div className="relative aspect-[4/4.4] w-full overflow-hidden bg-[var(--bg-surface-alt)]">
        {member.photo && !imgError ? (
          <img
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{ objectPosition: member.objectPosition || '50% 20%' }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#0B3B75] to-[#1D68C4] font-serif text-3xl font-bold text-white shadow-md ring-4 ring-white/20">
              {member.initials}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-accent)]">
              {member.role}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Official Office Bearer
            </p>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#051428]/40 to-transparent" />

        {/* Rank & Role Pill */}
        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur ${
              featured
                ? 'bg-[#0B3B75] text-white'
                : 'bg-white/95 text-[#0B3B75]'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                featured ? 'bg-blue-300' : 'bg-[#1456A8]'
              }`}
            />
            {member.role}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold tracking-tight text-[var(--text-strong)]">
            {member.name}
          </h3>
          <span className="font-mono text-xs font-bold text-[var(--text-accent)]">
            0{member.rank}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">{member.bio}</p>
      </div>
    </article>
  );
}
