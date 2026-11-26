import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  ACTIVITIES,
  DEFAULT_SETTINGS,
  type ActivityItem,
  type ContactSubmission,
  type SiteSettings,
} from '../data/foundationData';
import { supabase } from '../lib/supabase';

// ─── Helpers: map DB row ↔ app type ─────────────────────────────────────────

function rowToActivity(row: Record<string, unknown>): ActivityItem {
  return {
    id: row.id as string,
    number: row.number as string,
    title: row.title as string,
    category: row.category as ActivityItem['category'],
    summary: row.summary as string,
    frequency: row.frequency as string,
    iconName: row.icon_name as ActivityItem['iconName'],
    photoHint: (row.photo_hint as string) ?? '',
    images: (row.images as string[]) ?? [],
    partnerHighlight: (row.partner_highlight as string | null) ?? undefined,
  };
}

function rowToSubmission(row: Record<string, unknown>): ContactSubmission {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: (row.phone as string) ?? '',
    topic: (row.topic as string) ?? '',
    message: row.message as string,
    createdAt: row.created_at as string,
    status: row.status as 'new' | 'reviewed',
  };
}

function rowToSettings(row: Record<string, unknown>): SiteSettings {
  return {
    backendApiUrl: (row.backend_api_url as string) ?? '',
    phoneDisplay: (row.phone_display as string) ?? DEFAULT_SETTINGS.phoneDisplay,
    email: (row.email as string) ?? DEFAULT_SETTINGS.email,
    location: (row.location as string) ?? DEFAULT_SETTINGS.location,
    socialLinks: (row.social_links as SiteSettings['socialLinks']) ?? DEFAULT_SETTINGS.socialLinks,
  };
}

// ─── Context types ────────────────────────────────────────────────────────────

export interface ActivityFormInput {
  title: string;
  category: ActivityItem['category'];
  summary: string;
  frequency: string;
  iconName: ActivityItem['iconName'];
  images: string[];
}

interface FoundationContextValue {
  activities: ActivityItem[];
  settings: SiteSettings;
  submissions: ContactSubmission[];
  loading: boolean;
  addActivity: (input: ActivityFormInput) => Promise<void>;
  updateActivity: (id: string, input: ActivityFormInput) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  resetActivities: () => Promise<void>;
  updateSettings: (next: SiteSettings) => Promise<void>;
  addSubmission: (input: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  toggleSubmissionStatus: (id: string) => Promise<void>;
  deleteSubmission: (id: string) => Promise<void>;
}

const FoundationContext = createContext<FoundationContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function FoundationProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<ActivityItem[]>(ACTIVITIES);
  const [settings, setSettings]     = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading]        = useState(true);

  // ── Load from Supabase (re-runs on auth change) ────────────────────────────
  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      // Activities + settings are public-readable
      const [{ data: actRows }, { data: setRow }] = await Promise.all([
        supabase.from('activities').select('*').order('number'),
        supabase.from('settings').select('*').eq('id', 1).maybeSingle(),
      ]);

      if (actRows && actRows.length > 0) {
        setActivities(actRows.map(rowToActivity));
      }
      // else keep the in-code fallback (ACTIVITIES) already set as initial state

      if (setRow) {
        setSettings(rowToSettings(setRow as Record<string, unknown>));
      }

      // Submissions are admin-only — only load if authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: subRows } = await supabase
          .from('submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (subRows) setSubmissions(subRows.map(rowToSubmission));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
    // Re-load when auth state changes (e.g. admin logs in → fetch submissions)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadAll();
    });
    return () => listener.subscription.unsubscribe();
  }, [loadAll]);

  // ── Activities CRUD ───────────────────────────────────────────────────────
  const addActivity = useCallback(async (input: ActivityFormInput) => {
    const { data: existing } = await supabase.from('activities').select('number').order('number', { ascending: false }).limit(1);
    const nextNum = existing && existing.length > 0
      ? String(parseInt(existing[0].number) + 1).padStart(2, '0')
      : String(activities.length + 1).padStart(2, '0');
    const slug = input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `${slug || 'activity'}-${Date.now()}`;

    const row = {
      id,
      number: nextNum,
      title: input.title.trim(),
      category: input.category,
      summary: input.summary.trim(),
      frequency: input.frequency.trim() || 'Ongoing Initiative',
      icon_name: input.iconName,
      photo_hint: input.images[0] ?? '',
      images: input.images.slice(0, 5),
      partner_highlight: null as string | null,
    };

    const { error } = await supabase.from('activities').insert(row);
    if (!error) {
      setActivities((prev) => [...prev, rowToActivity(row as Record<string, unknown>)]);
    }
  }, [activities.length]);

  const updateActivity = useCallback(async (id: string, input: ActivityFormInput) => {
    const updates = {
      title: input.title.trim(),
      category: input.category,
      summary: input.summary.trim(),
      frequency: input.frequency.trim() || 'Ongoing Initiative',
      icon_name: input.iconName,
      images: input.images.slice(0, 5),
      photo_hint: input.images[0] ?? '',
    };
    const { error } = await supabase.from('activities').update(updates).eq('id', id);
    if (!error) {
      setActivities((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                title: updates.title,
                category: updates.category as ActivityItem['category'],
                summary: updates.summary,
                frequency: updates.frequency,
                iconName: updates.icon_name as ActivityItem['iconName'],
                images: updates.images,
                photoHint: updates.photo_hint,
              }
            : item
        )
      );
    }
  }, []);

  const deleteActivity = useCallback(async (id: string) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) {
      setActivities((prev) =>
        prev
          .filter((item) => item.id !== id)
          .map((item, idx) => ({ ...item, number: String(idx + 1).padStart(2, '0') }))
      );
    }
  }, []);

  const resetActivities = useCallback(async () => {
    await supabase.from('activities').delete().neq('id', '');
    const rows = ACTIVITIES.map((a) => ({
      id: a.id, number: a.number, title: a.title, category: a.category,
      summary: a.summary, frequency: a.frequency, icon_name: a.iconName,
      photo_hint: a.photoHint ?? '', images: a.images ?? [],
      partner_highlight: a.partnerHighlight ?? null,
    }));
    await supabase.from('activities').insert(rows);
    setActivities(ACTIVITIES);
  }, []);

  // ── Settings ──────────────────────────────────────────────────────────────
  const updateSettings = useCallback(async (next: SiteSettings) => {
    const row = {
      id: 1,
      backend_api_url: next.backendApiUrl,
      phone_display: next.phoneDisplay,
      email: next.email,
      location: next.location,
      social_links: next.socialLinks,
    };
    const { error } = await supabase.from('settings').upsert(row, { onConflict: 'id' });
    if (error) {
      console.error('Settings save error:', error);
      throw error;
    }
    setSettings(next);
  }, []);

  // ── Submissions ───────────────────────────────────────────────────────────
  const addSubmission = useCallback(
    async (input: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => {
      const id = `sub-${Date.now()}`;
      const row = {
        id,
        name: input.name.trim(),
        phone: input.phone.trim(),
        topic: input.topic,
        message: input.message.trim(),
        status: 'new' as const,
      };
      const { error } = await supabase.from('submissions').insert(row);
      if (!error) {
        setSubmissions((prev) => [{ ...row, createdAt: new Date().toISOString() }, ...prev]);
      }
    },
    []
  );

  const toggleSubmissionStatus = useCallback(async (id: string) => {
    const sub = submissions.find((s) => s.id === id);
    if (!sub) return;
    const next = sub.status === 'new' ? 'reviewed' : 'new';
    const { error } = await supabase.from('submissions').update({ status: next }).eq('id', id);
    if (!error) {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: next } : s)));
    }
  }, [submissions]);

  const deleteSubmission = useCallback(async (id: string) => {
    const { error } = await supabase.from('submissions').delete().eq('id', id);
    if (!error) setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <FoundationContext.Provider
      value={{
        activities, settings, submissions, loading,
        addActivity, updateActivity, deleteActivity, resetActivities,
        updateSettings, addSubmission, toggleSubmissionStatus, deleteSubmission,
      }}
    >
      {children}
    </FoundationContext.Provider>
  );
}

export function useFoundation() {
  const ctx = useContext(FoundationContext);
  if (!ctx) throw new Error('useFoundation must be used within FoundationProvider');
  return ctx;
}
