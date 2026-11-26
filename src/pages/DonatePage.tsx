import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  Mail,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { BANK_ACCOUNTS, FOUNDATION_INFO } from '../data/foundationData';
import { useFoundation } from '../context/FoundationContext';
import { CopyButton } from '../components/CopyButton';

export function DonatePage() {
  const { activities } = useFoundation();
  const [searchParams] = useSearchParams();
  const initialProgram = searchParams.get('program') || 'General Welfare Fund';

  const [selectedProgram, setSelectedProgram] = useState(initialProgram);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');

  const programOptions = ['General Welfare Fund', ...activities.map((a) => a.title)];

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum, I have contributed${amount ? ` PKR ${amount}` : ''} towards "${selectedProgram}" for Bayt-ul-Hikmah Welfare Foundation.${
      donorName ? ` Donor name: ${donorName}.` : ''
    } Please confirm receipt.`
  );

  const mailtoSubject = encodeURIComponent(
    `Donation Receipt — ${selectedProgram}`
  );

  return (
    <div>
      {/* Header */}
      <section className="hero-grid border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-hero-from)] to-[var(--bg-page)] py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
            100% Direct Grassroots Relief
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-5xl">
            Support Bayt-ul-Hikmah
          </h1>
          <p className="mt-3 font-serif text-xl italic text-[var(--text-accent)] sm:text-2xl">
            &ldquo;{FOUNDATION_INFO.motto}&rdquo;
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-body)] sm:text-base">
            Your Zakat, Sadaqah, and monthly contributions go directly to verified widows, students, chronic patients, and vulnerable families across the Faisalabad Division.
          </p>
        </div>
      </section>

      {/* Account Cards + Receipt Helper */}
      <section className="arch-pattern py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Direct Accounts */}
            <div className="space-y-6 lg:col-span-7">
              <h2 className="text-xl font-extrabold text-[var(--text-heading)] sm:text-2xl">
                Official Donation Accounts
              </h2>

              {BANK_ACCOUNTS.map((acc) => {
                const isWallet = acc.id === 'easypaisa';
                return (
                  <div
                    key={acc.id}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--btn-primary-bg)] text-white">
                          {isWallet ? (
                            <Smartphone className="h-6 w-6" />
                          ) : (
                            <Building2 className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-accent)]">
                            {acc.badge}
                          </span>
                          <h3 className="text-lg font-bold text-[var(--text-strong)] sm:text-xl">
                            {acc.provider}
                          </h3>
                        </div>
                      </div>
                      <CopyButton text={acc.rawNumber} label="Copy Account Number" />
                    </div>

                    <div className="mt-5 grid gap-4 rounded-xl bg-[var(--bg-surface-alt)] p-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          Account Number
                        </p>
                        <p className="mt-1 break-all font-mono text-base font-extrabold text-[var(--text-heading)] sm:text-lg">
                          {acc.accountNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          Account Title
                        </p>
                        <p className="mt-1 text-base font-bold text-[var(--text-strong)]">
                          {acc.accountTitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-[var(--text-body)]">{acc.instructions}</p>
                  </div>
                );
              })}

              {/* Accountability Promise */}
              <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-pill)] p-5 text-sm text-[var(--text-heading)]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-accent)]" />
                <div>
                  <p className="font-bold">Transparent Accountability</p>
                  <p className="mt-1 text-[var(--text-body)]">
                    Every transfer is recorded by Finance Secretary Aliyan Khan and verified by President Muhammad Waleed Khan. Send your transfer screenshot via WhatsApp for confirmation and updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Cause & Confirmation Generator */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-[var(--text-heading)]">
                  Allocate Your Contribution
                </h2>
                <p className="mt-1.5 text-sm text-[var(--text-body)]">
                  After transferring via EasyPaisa or Habib Metro Bank, select the cause below to send a quick confirmation message with your receipt.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="program-select"
                      className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]"
                    >
                      Select Welfare Program
                    </label>
                    <select
                      id="program-select"
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3.5 py-2.5 text-sm font-medium text-[var(--text-strong)] focus:border-[#3B82F6] focus:outline-none"
                    >
                      {programOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="donor-name"
                      className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]"
                    >
                      Your Name (Optional)
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Muhammad Ahmed"
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3.5 py-2.5 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-muted)] focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="donation-amount"
                      className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]"
                    >
                      Amount in PKR (Optional)
                    </label>
                    <input
                      id="donation-amount"
                      type="number"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 5000"
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3.5 py-2.5 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-muted)] focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <a
                      href={`${FOUNDATION_INFO.whatsappHref}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--btn-primary-hover)]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Confirm via WhatsApp ({FOUNDATION_INFO.phoneDisplay})</span>
                    </a>

                    <a
                      href={`mailto:${FOUNDATION_INFO.email}?subject=${mailtoSubject}&body=${whatsappMessage}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-alt)] px-4 py-3 text-sm font-bold text-[var(--text-heading)] transition hover:bg-[var(--bg-pill)]"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Send Receipt via Email</span>
                    </a>
                  </div>

                  <div className="rounded-xl bg-[var(--bg-surface-alt)] p-3.5 text-xs text-[var(--text-body)]">
                    <p className="flex items-center gap-1.5 font-semibold text-[var(--text-heading)]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--text-accent)]" />
                      Need assistance with bank transfer?
                    </p>
                    <p className="mt-1">
                      Call {FOUNDATION_INFO.contactPerson} directly at{' '}
                      <a href={FOUNDATION_INFO.phoneHref} className="font-bold underline">
                        {FOUNDATION_INFO.phoneDisplay}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
