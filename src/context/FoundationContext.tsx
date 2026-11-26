import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  ACTIVITIES,
  DEFAULT_SETTINGS,
  type ActivityItem,
  type ContactSubmission,
  type SiteSettings,
} from '../data/foundationData';

const STORAGE_KEYS = {
  activities: 'baytulhikmah_v2_activities',
  settings: 'baytulhikmah_v2_settings',
  submissions: 'baytulhikmah_v1_submissions',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

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
  addActivity: (input: ActivityFormInput) => void;
  updateActivity: (id: string, input: ActivityFormInput) => void;
  deleteActivity: (id: string) => void;
  resetActivities: () => void;
  updateSettings: (next: SiteSettings) => void;
  addSubmission: (input: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => void;
  toggleSubmissionStatus: (id: string) => void;
  deleteSubmission: (id: string) => void;
}

const FoundationContext = createContext<FoundationContextValue | null>(null);

export function FoundationProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<ActivityItem[]>(() =>
    readStorage(STORAGE_KEYS.activities, ACTIVITIES)
  );
  const [settings, setSettings] = useState<SiteSettings>(() =>
    readStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() =>
    readStorage(STORAGE_KEYS.submissions, [])
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.activities, activities);
  }, [activities]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.submissions, submissions);
  }, [submissions]);

  const addActivity = (input: ActivityFormInput) => {
    setActivities((prev) => {
      const nextNum = String(prev.length + 1).padStart(2, '0');
      const slug = input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const newItem: ActivityItem = {
        id: `${slug || 'activity'}-${Date.now()}`,
        number: nextNum,
        title: input.title.trim(),
        category: input.category,
        summary: input.summary.trim(),
        frequency: input.frequency.trim() || 'Ongoing Initiative',
        iconName: input.iconName,
        photoHint: input.images[0] || '',
        images: input.images.slice(0, 5),
      };
      return [...prev, newItem];
    });
  };

  const updateActivity = (id: string, input: ActivityFormInput) => {
    setActivities((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title: input.title.trim(),
              category: input.category,
              summary: input.summary.trim(),
              frequency: input.frequency.trim() || item.frequency,
              iconName: input.iconName,
              images: input.images.slice(0, 5),
              photoHint: input.images[0] || item.photoHint,
            }
          : item
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((item, idx) => ({ ...item, number: String(idx + 1).padStart(2, '0') }))
    );
  };

  const resetActivities = () => {
    setActivities(ACTIVITIES);
  };

  const updateSettings = (next: SiteSettings) => {
    setSettings(next);
  };

  const addSubmission = (input: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => {
    const newEntry: ContactSubmission = {
      id: `sub-${Date.now()}`,
      name: input.name.trim(),
      phone: input.phone.trim(),
      topic: input.topic,
      message: input.message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setSubmissions((prev) => [newEntry, ...prev]);

    if (settings.backendApiUrl.trim()) {
      const endpoint = `${settings.backendApiUrl.replace(/\/$/, '')}/contact`;
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      }).catch(() => {
        // Silently keep local copy if backend endpoint isn't wired yet
      });
    }
  };

  const toggleSubmissionStatus = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'new' ? 'reviewed' : 'new' } : s
      )
    );
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <FoundationContext.Provider
      value={{
        activities,
        settings,
        submissions,
        addActivity,
        updateActivity,
        deleteActivity,
        resetActivities,
        updateSettings,
        addSubmission,
        toggleSubmissionStatus,
        deleteSubmission,
      }}
    >
      {children}
    </FoundationContext.Provider>
  );
}

export function useFoundation() {
  const ctx = useContext(FoundationContext);
  if (!ctx) {
    throw new Error('useFoundation must be used within FoundationProvider');
  }
  return ctx;
}
