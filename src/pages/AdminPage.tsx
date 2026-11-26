import { useRef, useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  Edit3,
  Eye,
  EyeOff,
  ImagePlus,
  Inbox,
  LayoutGrid,
  Link2,
  LogIn,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Settings,
  Trash2,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useFoundation, type ActivityFormInput } from '../context/FoundationContext';
import type { ActivityItem, SocialIconKey, SocialLinkItem } from '../data/foundationData';
import { ActivityIcon } from '../components/ActivityIcon';
import { SocialIcon } from '../components/SocialIcon';

type AdminTab = 'activities' | 'submissions' | 'settings';

const EMPTY_ACTIVITY_FORM: ActivityFormInput = {
  title: '',
  category: 'Basic Needs',
  summary: '',
  frequency: '',
  iconName: 'utensils',
  images: [],
};

const ICON_CHOICES: Array<{ value: ActivityItem['iconName']; label: string }> = [
  { value: 'utensils', label: 'Food / Utensils' },
  { value: 'book', label: 'Education / Book' },
  { value: 'heart-pulse', label: 'Healthcare / Pulse' },
  { value: 'droplets', label: 'Clean Water' },
  { value: 'sparkles', label: 'Family Dignity' },
  { value: 'snowflake', label: 'Seasonal / Winter' },
  { value: 'briefcase', label: 'Livelihood / Business' },
  { value: 'accessibility', label: 'Mobility Support' },
  { value: 'home', label: 'Household Essentials' },
];

const SOCIAL_ICON_CHOICES: Array<{ value: SocialIconKey; label: string }> = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'globe', label: 'Website / Globe' },
  { value: 'mail', label: 'Email' },
];

function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 960;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => reject(new Error('Invalid image file'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// ─── Login screen component (uses Supabase Auth) ──────────────────────────────
function AdminLoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (authError) {
      setError(authError.message ?? 'Invalid email or password.');
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F7FD] px-4">
      <div className="w-full max-w-sm">
        {/* Logo / branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg mb-4 overflow-hidden border border-gray-100">
            <img src="/logo.jpg" alt="Bayt-ul-Hikmah" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B3B75]">Admin Panel</h1>
          <p className="text-sm text-[#516887] mt-1">Bayt-ul-Hikmah Welfare Foundation</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#465872] mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B75] focus:border-transparent transition"
            />
          </div>

          {/* Password with eye toggle */}
          <div>
            <label className="block text-sm font-semibold text-[#465872] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B75] focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-[#0B3B75] transition"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#0B3B75] text-white font-semibold py-3 rounded-xl hover:bg-[#1456A8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in…</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 shrink-0" />
                <span>Sign In</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#516887]">
            <Link to="/" className="underline hover:text-[#0B3B75]">
              ← Back to public site
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export function AdminPage() {
  // ─── Auth gate (Supabase session) ───────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
      setAuthChecked(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F7FD]">
        <span className="animate-spin w-8 h-8 border-4 border-[#0B3B75] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}

// ─── Full dashboard (all hooks unconditionally called) ────────────────────────
function AdminDashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // ─── Dashboard ──────────────────────────────────────────────────────────────
  const {
    activities,
    settings,
    submissions,
    addActivity,
    updateActivity,
    deleteActivity,
    resetActivities,
    updateSettings,
    toggleSubmissionStatus,
    deleteSubmission,
  } = useFoundation();

  const [activeTab, setActiveTab] = useState<AdminTab>('activities');

  // Activity form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activityForm, setActivityForm] = useState<ActivityFormInput>(EMPTY_ACTIVITY_FORM);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [activityNotice, setActivityNotice] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Settings form state
  const [settingsDraft, setSettingsDraft] = useState(settings);

  // Keep draft in sync when settings load from Supabase
  useEffect(() => {
    setSettingsDraft(settings);
  }, [settings]);
  const [newSocialPlatform, setNewSocialPlatform] = useState('');
  const [newSocialIcon, setNewSocialIcon] = useState<SocialIconKey>('globe');
  const [newSocialLabel, setNewSocialLabel] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Submissions filter
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'new' | 'reviewed'>('all');

  const newSubmissionsCount = submissions.filter((s) => s.status === 'new').length;

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = 5 - activityForm.images.length;
    if (remaining <= 0) {
      setActivityNotice('Maximum 5 images allowed per activity.');
      return;
    }

    const toProcess = files.slice(0, remaining);
    try {
      const encoded = await Promise.all(toProcess.map(compressImageFile));
      setActivityForm((prev) => ({
        ...prev,
        images: [...prev.images, ...encoded].slice(0, 5),
      }));
      setActivityNotice('');
    } catch {
      setActivityNotice('Could not process one of the selected image files.');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddImageUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    if (activityForm.images.length >= 5) {
      setActivityNotice('Maximum 5 images allowed per activity.');
      return;
    }
    setActivityForm((prev) => ({
      ...prev,
      images: [...prev.images, trimmed].slice(0, 5),
    }));
    setImageUrlInput('');
    setActivityNotice('');
  };

  const handleRemoveImage = (index: number) => {
    setActivityForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleActivitySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!activityForm.title.trim() || !activityForm.summary.trim()) return;

    if (editingId) {
      updateActivity(editingId, activityForm);
      setActivityNotice(`Updated "${activityForm.title}" successfully.`);
      setEditingId(null);
    } else {
      addActivity(activityForm);
      setActivityNotice(`Added "${activityForm.title}" to website activities.`);
    }
    setActivityForm(EMPTY_ACTIVITY_FORM);
  };

  const handleEditActivity = (item: ActivityItem) => {
    setEditingId(item.id);
    setActivityForm({
      title: item.title,
      category: item.category,
      summary: item.summary,
      frequency: item.frequency,
      iconName: item.iconName,
      images: item.images || [],
    });
    setActivityNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setActivityForm(EMPTY_ACTIVITY_FORM);
    setActivityNotice('');
  };

  const handleSocialFieldChange = (
    id: string,
    field: keyof SocialLinkItem,
    value: string | boolean
  ) => {
    setSettingsDraft((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        // Auto-enable when a URL is entered
        if (field === 'url' && typeof value === 'string' && value.trim()) {
          updated.enabled = true;
        }
        return updated;
      }),
    }));
  };

  const handleAddSocialLink = () => {
    if (!newSocialPlatform.trim() || !newSocialUrl.trim()) return;
    const newItem: SocialLinkItem = {
      id: `social-${Date.now()}`,
      platform: newSocialPlatform.trim(),
      icon: newSocialIcon,
      label: newSocialLabel.trim() || newSocialPlatform.trim(),
      url: newSocialUrl.trim(),
      enabled: true,
    };
    setSettingsDraft((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newItem],
    }));
    setNewSocialPlatform('');
    setNewSocialLabel('');
    setNewSocialUrl('');
  };

  const handleRemoveSocialLink = (id: string) => {
    setSettingsDraft((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((item) => item.id !== id),
    }));
  };

  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    updateSettings(settingsDraft);
    setSettingsSaved(true);
    window.setTimeout(() => setSettingsSaved(false), 2500);
  };

  const filteredSubmissions =
    submissionFilter === 'all'
      ? submissions
      : submissions.filter((s) => s.status === submissionFilter);

  return (
    <div className="min-h-screen bg-[#F4F8FD] text-[#0F1E36]">
      {/* Top Admin Header */}
      <div className="border-b border-[#0B3B75]/15 bg-[#0B3B75] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-200">
              <Database className="h-3.5 w-3.5" />
              <span>Foundation Admin Panel • Preview Mode (No DB Connected Yet)</span>
            </div>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight">
              Bayt-ul-Hikmah Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#0B3B75] shadow-sm transition hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Public Site</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setActiveTab('activities')}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${
              activeTab === 'activities'
                ? 'border-white text-white'
                : 'border-transparent text-blue-200 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Activities ({activities.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${
              activeTab === 'submissions'
                ? 'border-white text-white'
                : 'border-transparent text-blue-200 hover:text-white'
            }`}
          >
            <Inbox className="h-4 w-4" />
            <span>Contact Form Submissions</span>
            {newSubmissionsCount > 0 && (
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-extrabold text-[#0B3B75]">
                {newSubmissionsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${
              activeTab === 'settings'
                ? 'border-white text-white'
                : 'border-transparent text-blue-200 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Social Links &amp; Backend URL</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* TAB 1: ACTIVITIES CRUD + UP TO 5 IMAGES */}
        {activeTab === 'activities' && (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Create / Edit Form */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#0B3B75]/15 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-[#0B3B75]">
                    {editingId ? 'Edit Activity' : 'Add New Activity'}
                  </h2>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="text-xs font-bold text-[#1456A8] hover:underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleActivitySubmit} className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="act-title"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                    >
                      Activity Name *
                    </label>
                    <input
                      id="act-title"
                      type="text"
                      required
                      value={activityForm.title}
                      onChange={(e) =>
                        setActivityForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="e.g. Ramadan Ration Drive"
                      className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="act-cat"
                        className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                      >
                        Category *
                      </label>
                      <select
                        id="act-cat"
                        value={activityForm.category}
                        onChange={(e) =>
                          setActivityForm((prev) => ({
                            ...prev,
                            category: e.target.value as ActivityItem['category'],
                          }))
                        }
                        className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3 py-2.5 text-sm font-medium text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                      >
                        <option value="Basic Needs">Basic Needs</option>
                        <option value="Education & Health">Education &amp; Health</option>
                        <option value="Dignity & Livelihood">Dignity &amp; Livelihood</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="act-icon"
                        className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                      >
                        Icon
                      </label>
                      <select
                        id="act-icon"
                        value={activityForm.iconName}
                        onChange={(e) =>
                          setActivityForm((prev) => ({
                            ...prev,
                            iconName: e.target.value as ActivityItem['iconName'],
                          }))
                        }
                        className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3 py-2.5 text-sm font-medium text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                      >
                        {ICON_CHOICES.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="act-freq"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                    >
                      Schedule / Frequency Label
                    </label>
                    <input
                      id="act-freq"
                      type="text"
                      value={activityForm.frequency}
                      onChange={(e) =>
                        setActivityForm((prev) => ({ ...prev, frequency: e.target.value }))
                      }
                      placeholder="e.g. Monthly Rations & Meal Drives"
                      className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="act-desc"
                      className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                    >
                      Description *
                    </label>
                    <textarea
                      id="act-desc"
                      rows={4}
                      required
                      value={activityForm.summary}
                      onChange={(e) =>
                        setActivityForm((prev) => ({ ...prev, summary: e.target.value }))
                      }
                      placeholder="Describe how this activity helps families..."
                      className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                    />
                  </div>

                  {/* Up to 5 Images Uploader */}
                  <div className="rounded-xl border border-dashed border-[#1456A8]/35 bg-[#F8FAFD] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B3B75]">
                        Activity Images ({activityForm.images.length} / 5)
                      </span>
                      <button
                        type="button"
                        disabled={activityForm.images.length >= 5}
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B3B75] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1456A8] disabled:opacity-40"
                      >
                        <ImagePlus className="h-3.5 w-3.5" />
                        <span>Upload Files</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="mt-3 flex gap-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="Or paste image URL..."
                        className="flex-1 rounded-lg border border-[#0B3B75]/20 bg-white px-3 py-1.5 text-xs text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                      />
                      <button
                        type="button"
                        disabled={activityForm.images.length >= 5 || !imageUrlInput.trim()}
                        onClick={handleAddImageUrl}
                        className="rounded-lg bg-[#EBF3FC] px-3 py-1.5 text-xs font-bold text-[#0B3B75] transition hover:bg-[#1456A8] hover:text-white disabled:opacity-40"
                      >
                        Add URL
                      </button>
                    </div>

                    {activityForm.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {activityForm.images.map((src, idx) => (
                          <div
                            key={`${src.slice(0, 24)}-${idx}`}
                            className="group relative aspect-square overflow-hidden rounded-lg border border-[#0B3B75]/15 bg-white"
                          >
                            <img
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              aria-label="Remove image"
                              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B3B75] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#1456A8]"
                  >
                    {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span>{editingId ? 'Save Changes' : 'Add Activity'}</span>
                  </button>

                  {activityNotice && (
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{activityNotice}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Existing Activities List */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#0B3B75]">
                    Published Welfare Activities ({activities.length})
                  </h2>
                  <p className="text-xs text-[#465872]">
                    Changes sync live with Home and Our Activities pages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetActivities}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#0B3B75]/20 bg-white px-3.5 py-2 text-xs font-bold text-[#0B3B75] transition hover:bg-[#EBF3FC]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <div className="space-y-3">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-[#0B3B75]/15 bg-white p-5 shadow-sm sm:flex-row sm:items-start"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBF3FC] text-[#0B3B75]">
                        <ActivityIcon name={item.iconName} className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#1456A8]">
                            #{item.number}
                          </span>
                          <h3 className="text-base font-bold text-[#0F1E36]">{item.title}</h3>
                          <span className="rounded-full bg-[#F5F9FE] px-2.5 py-0.5 text-[11px] font-bold text-[#1456A8]">
                            {item.category}
                          </span>
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#0B3B75]">
                            {item.images?.length || 0}/5 imgs
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#465872]">
                          {item.summary}
                        </p>
                        {item.images && item.images.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.images.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt={`${item.title} ${i + 1}`}
                                className="h-12 w-12 rounded-lg border border-[#0B3B75]/15 object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditActivity(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#EBF3FC] px-3 py-1.5 text-xs font-bold text-[#0B3B75] transition hover:bg-[#1456A8] hover:text-white"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteActivity(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT FORM SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#0B3B75]">
                  Contact Form &amp; Family Referral Inbox
                </h2>
                <p className="text-sm text-[#465872]">
                  Every submission made on the public Contact page is captured here.
                </p>
              </div>

              <div className="flex gap-2">
                {(['all', 'new', 'reviewed'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSubmissionFilter(status)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition ${
                      submissionFilter === status
                        ? 'bg-[#0B3B75] text-white'
                        : 'border border-[#0B3B75]/15 bg-white text-[#334866] hover:bg-[#EBF3FC]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="rounded-2xl border border-[#0B3B75]/15 bg-white p-12 text-center shadow-sm">
                <Inbox className="mx-auto h-10 w-10 text-[#1456A8]/50" />
                <h3 className="mt-3 text-base font-bold text-[#0F1E36]">
                  No Contact Submissions Yet
                </h3>
                <p className="mt-1 text-sm text-[#465872]">
                  Submit the form on the{' '}
                  <Link to="/contact" className="font-bold text-[#1456A8] underline">
                    Contact page
                  </Link>{' '}
                  to see entries appear here live.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-2xl border border-[#0B3B75]/15 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-[#0F1E36]">{sub.name}</h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${
                              sub.status === 'new'
                                ? 'bg-blue-100 text-[#0B3B75]'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {sub.status}
                          </span>
                          <span className="rounded-full bg-[#F5F9FE] px-2.5 py-0.5 text-[11px] font-semibold text-[#1456A8]">
                            {sub.topic}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#516887]">
                          Phone: <span className="font-mono font-semibold">{sub.phone || 'Not provided'}</span> •{' '}
                          {new Date(sub.createdAt).toLocaleString()}
                        </p>
                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#334866]">
                          {sub.message}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleSubmissionStatus(sub.id)}
                          className="rounded-lg bg-[#EBF3FC] px-3 py-1.5 text-xs font-bold text-[#0B3B75] transition hover:bg-[#1456A8] hover:text-white"
                        >
                          {sub.status === 'new' ? 'Mark Reviewed' : 'Reopen'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteSubmission(sub.id)}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SOCIAL MEDIA ICONS & BACKEND URL */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-8">
            {/* Backend Connection Card */}
            <div className="rounded-2xl border border-[#0B3B75]/15 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B3B75] text-white">
                  <Link2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-[#0B3B75]">
                    Backend API URL &amp; General Info
                  </h2>
                  <p className="mt-0.5 text-xs text-[#465872]">
                    Leave empty while testing without a database. Once you connect your Node.js / Vercel backend + DB string, enter the API base URL below.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="backend-url"
                    className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                  >
                    Backend API Base URL
                  </label>
                  <input
                    id="backend-url"
                    type="url"
                    value={settingsDraft.backendApiUrl}
                    onChange={(e) =>
                      setSettingsDraft((prev) => ({ ...prev, backendApiUrl: e.target.value }))
                    }
                    placeholder="https://your-api.vercel.app/api"
                    className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3.5 py-2.5 font-mono text-sm text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="set-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                  >
                    Phone Display
                  </label>
                  <input
                    id="set-phone"
                    type="text"
                    value={settingsDraft.phoneDisplay}
                    onChange={(e) =>
                      setSettingsDraft((prev) => ({ ...prev, phoneDisplay: e.target.value }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="set-email"
                    className="block text-xs font-bold uppercase tracking-wider text-[#0B3B75]"
                  >
                    Official Email
                  </label>
                  <input
                    id="set-email"
                    type="email"
                    value={settingsDraft.email}
                    onChange={(e) =>
                      setSettingsDraft((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="mt-1.5 w-full rounded-xl border border-[#0B3B75]/20 bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#0F1E36] focus:border-[#1456A8] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Icons & URLs Manager */}
            <div className="rounded-2xl border border-[#0B3B75]/15 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B3B75]">
                Social Media Icons &amp; URLs
              </h2>
              <p className="mt-0.5 text-xs text-[#465872]">
                Enable, edit, or add social media icons shown in the site footer and contact channels.
              </p>

              <div className="mt-5 space-y-3">
                {settingsDraft.socialLinks.map((social) => (
                  <div
                    key={social.id}
                    className="grid items-center gap-3 rounded-xl border border-[#0B3B75]/10 bg-[#F8FAFD] p-4 sm:grid-cols-12"
                  >
                    <div className="flex items-center gap-2.5 sm:col-span-3">
                      <input
                        type="checkbox"
                        checked={social.enabled}
                        onChange={(e) =>
                          handleSocialFieldChange(social.id, 'enabled', e.target.checked)
                        }
                        aria-label={`Enable ${social.platform}`}
                        className="h-4 w-4 accent-[#0B3B75]"
                      />
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EBF3FC] text-[#0B3B75]">
                        <SocialIcon name={social.icon} className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold text-[#0F1E36]">{social.platform}</span>
                    </div>

                    <div className="sm:col-span-2">
                      <select
                        value={social.icon}
                        onChange={(e) =>
                          handleSocialFieldChange(social.id, 'icon', e.target.value)
                        }
                        className="w-full rounded-lg border border-[#0B3B75]/20 bg-white px-2.5 py-1.5 text-xs font-medium text-[#0F1E36]"
                      >
                        {SOCIAL_ICON_CHOICES.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={social.label}
                        onChange={(e) =>
                          handleSocialFieldChange(social.id, 'label', e.target.value)
                        }
                        placeholder="Handle or Display Label"
                        className="w-full rounded-lg border border-[#0B3B75]/20 bg-white px-3 py-1.5 text-xs text-[#0F1E36]"
                      />
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-4">
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) =>
                          handleSocialFieldChange(social.id, 'url', e.target.value)
                        }
                        placeholder="https://..."
                        className="w-full rounded-lg border border-[#0B3B75]/20 bg-white px-3 py-1.5 text-xs text-[#0F1E36]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSocialLink(social.id)}
                        aria-label={`Remove ${social.platform}`}
                        className="rounded-lg p-1.5 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Social Platform */}
              <div className="mt-5 rounded-xl border border-dashed border-[#1456A8]/30 bg-[#F5F9FE] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0B3B75]">
                  Add Another Social Icon
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-12">
                  <input
                    type="text"
                    value={newSocialPlatform}
                    onChange={(e) => setNewSocialPlatform(e.target.value)}
                    placeholder="Platform (e.g. TikTok)"
                    className="rounded-lg border border-[#0B3B75]/20 bg-white px-3 py-2 text-xs sm:col-span-3"
                  />
                  <select
                    value={newSocialIcon}
                    onChange={(e) => setNewSocialIcon(e.target.value as SocialIconKey)}
                    className="rounded-lg border border-[#0B3B75]/20 bg-white px-2.5 py-2 text-xs sm:col-span-2"
                  >
                    {SOCIAL_ICON_CHOICES.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newSocialLabel}
                    onChange={(e) => setNewSocialLabel(e.target.value)}
                    placeholder="Display handle"
                    className="rounded-lg border border-[#0B3B75]/20 bg-white px-3 py-2 text-xs sm:col-span-3"
                  />
                  <input
                    type="url"
                    value={newSocialUrl}
                    onChange={(e) => setNewSocialUrl(e.target.value)}
                    placeholder="https://..."
                    className="rounded-lg border border-[#0B3B75]/20 bg-white px-3 py-2 text-xs sm:col-span-3"
                  />
                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="rounded-lg bg-[#0B3B75] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#1456A8] sm:col-span-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B3B75] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#1456A8]"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </button>

              {settingsSaved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Settings updated!
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
