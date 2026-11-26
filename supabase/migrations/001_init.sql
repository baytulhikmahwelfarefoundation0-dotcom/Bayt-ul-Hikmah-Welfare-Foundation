-- ============================================================
-- Bayt-ul-Hikmah Welfare Foundation — Supabase DB Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── Activities ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activities (
  id               TEXT PRIMARY KEY,
  number           TEXT NOT NULL,
  title            TEXT NOT NULL,
  category         TEXT NOT NULL,
  summary          TEXT NOT NULL DEFAULT '',
  frequency        TEXT NOT NULL DEFAULT 'Ongoing Initiative',
  icon_name        TEXT NOT NULL DEFAULT 'utensils',
  photo_hint       TEXT NOT NULL DEFAULT '',
  images           JSONB NOT NULL DEFAULT '[]',
  partner_highlight TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Submissions ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.submissions (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL DEFAULT '',
  topic      TEXT NOT NULL DEFAULT '',
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Settings (single-row table) ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.settings (
  id              INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  backend_api_url TEXT NOT NULL DEFAULT '',
  phone_display   TEXT NOT NULL DEFAULT '0317 2420140',
  email           TEXT NOT NULL DEFAULT 'baytulhikmahwelfarefoundation0@gmail.com',
  location        TEXT NOT NULL DEFAULT 'Samundri, District Faisalabad, Punjab, Pakistan',
  social_links    JSONB NOT NULL DEFAULT '[]',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── RLS: Enable but allow anon read + authenticated write ───
ALTER TABLE public.activities  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings    ENABLE ROW LEVEL SECURITY;

-- Activities: anyone can read; only authenticated admin can write
CREATE POLICY "Public read activities"
  ON public.activities FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin insert activities"
  ON public.activities FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin update activities"
  ON public.activities FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin delete activities"
  ON public.activities FOR DELETE TO authenticated USING (true);

-- Submissions: anon can insert (contact form); only authenticated can read/delete
CREATE POLICY "Anon insert submission"
  ON public.submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admin read submissions"
  ON public.submissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin update submission"
  ON public.submissions FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin delete submission"
  ON public.submissions FOR DELETE TO authenticated USING (true);

-- Settings: anyone can read; only authenticated can write
CREATE POLICY "Public read settings"
  ON public.settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin upsert settings"
  ON public.settings FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin update settings"
  ON public.settings FOR UPDATE TO authenticated USING (true);

-- ── Auto-update updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
