import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { FOUNDATION_INFO } from '../data/foundationData';
import { useFoundation } from '../context/FoundationContext';
import { LocationMap } from '../components/LocationMap';
import { SocialIcon } from '../components/SocialIcon';

export function ContactPage() {
  const { addSubmission, settings } = useFoundation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    addSubmission({ name, phone, topic, message });

    const text = encodeURIComponent(
      `Assalam-o-Alaikum, my name is ${name}${phone ? ` (${phone})` : ''}.\nTopic: ${topic}\n\n${message}`
    );
    const waDigits = `92${settings.phoneDisplay.replace(/\D/g, '').replace(/^0/, '')}`;
    window.open(`https://wa.me/${waDigits}?text=${text}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div>
      {/* Header */}
      <section className="hero-grid border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-hero-from)] to-[var(--bg-page)] py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
            Reach Our Team
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-body)] sm:text-lg">
            Reach out to refer a deserving household, volunteer for our monthly drives, or ask about sponsorship opportunities across Samundri and the Faisalabad Division.
          </p>
        </div>
      </section>

      <section className="arch-pattern py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-12">
            {/* Contact Details */}
            <div className="flex lg:col-span-5">
              <div className="flex h-full w-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-7">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-heading)] sm:text-2xl">
                    Direct Foundation Contacts
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--text-body)]">
                    Primary Point of Contact:{' '}
                    <strong className="text-[var(--text-strong)]">{FOUNDATION_INFO.contactPerson}</strong>
                  </p>
                </div>

                <div className="mt-6 flex flex-1 flex-col justify-between gap-3.5">
                  <a
                    href={`tel:+92${settings.phoneDisplay.replace(/\D/g, '').replace(/^0/, '')}`}
                    className="flex items-start gap-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] p-4 transition hover:border-[var(--border-strong)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--btn-primary-bg)] text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-accent)]">
                        Phone &amp; WhatsApp
                      </p>
                      <p className="mt-0.5 font-mono text-base font-bold text-[var(--text-strong)]">
                        {settings.phoneDisplay}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-start gap-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] p-4 transition hover:border-[var(--border-strong)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--btn-primary-bg)] text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-accent)]">
                        Official Email
                      </p>
                      <p className="mt-0.5 break-all text-sm font-bold text-[var(--text-strong)]">
                        {settings.email}
                      </p>
                    </div>
                  </a>

                  {settings.socialLinks
                    .filter((s) => s.enabled && s.url.trim() && s.icon !== 'whatsapp')
                    .map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] p-4 transition hover:border-[var(--border-strong)]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--btn-primary-bg)] text-white">
                          <SocialIcon name={social.icon} className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-accent)]">
                            {social.platform}
                          </p>
                          <p className="mt-0.5 break-all text-sm font-bold text-[var(--text-strong)]">
                            {social.label}
                          </p>
                        </div>
                      </a>
                    ))}

                  <div className="flex items-start gap-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--btn-primary-bg)] text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-accent)]">
                        Location &amp; Service Area
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-[var(--text-strong)]">
                        {settings.location}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        Active across {FOUNDATION_INFO.serviceArea}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Message / Referral Form */}
            <div className="flex lg:col-span-7">
              <div className="flex h-full w-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-7">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-heading)] sm:text-2xl">
                    Send a Message or Refer a Family
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--text-body)]">
                    Submit your note below to connect directly with our executive team via WhatsApp or Email.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3.5 py-2.5 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-muted)] focus:border-[#3B82F6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]"
                      >
                        Phone / WhatsApp Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3.5 py-2.5 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-muted)] focus:border-[#3B82F6] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3.5 py-2.5 text-sm font-medium text-[var(--text-strong)] focus:border-[#3B82F6] focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Refer a Family in Need">Refer a Family in Need</option>
                      <option value="Donation & Sponsorship">Donation &amp; Sponsorship</option>
                      <option value="Volunteer With Us">Volunteer With Us</option>
                      <option value="Medical / Education Case">Medical / Education Case</option>
                    </select>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-[var(--text-heading)]"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message, family location in Samundri / Faisalabad, or how you would like to help..."
                      className="mt-1.5 min-h-[130px] w-full flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3.5 py-2.5 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-muted)] focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--btn-primary-hover)]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send via WhatsApp</span>
                    </button>

                    <a
                      href={`mailto:${settings.email}?subject=${encodeURIComponent(
                        `[${topic}] Message from ${name || 'Website Visitor'}`
                      )}&body=${encodeURIComponent(
                        `Name: ${name}\nPhone: ${phone}\n\n${message}`
                      )}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-alt)] px-5 py-3 text-sm font-bold text-[var(--text-heading)] transition hover:bg-[var(--bg-pill)]"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send via Email</span>
                    </a>
                  </div>

                  {submitted && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-3.5 text-sm font-medium text-[var(--text-strong)]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      <span>
                        Message recorded &amp; WhatsApp chat prepared! Contact number: {settings.phoneDisplay}.
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Interactive Location Map */}
          <div className="mt-10">
            <LocationMap />
          </div>
        </div>
      </section>
    </div>
  );
}
