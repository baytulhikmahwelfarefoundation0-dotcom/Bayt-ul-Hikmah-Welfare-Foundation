export type SocialIconKey =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'whatsapp'
  | 'globe'
  | 'mail';

export interface SocialLinkItem {
  id: string;
  platform: string;
  icon: SocialIconKey;
  label: string;
  url: string;
  enabled: boolean;
}

export interface SiteSettings {
  backendApiUrl: string;
  phoneDisplay: string;
  email: string;
  location: string;
  socialLinks: SocialLinkItem[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  topic: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed';
}

export interface ActivityItem {
  id: string;
  number: string;
  title: string;
  category: 'Basic Needs' | 'Education & Health' | 'Dignity & Livelihood';
  summary: string;
  frequency: string;
  iconName:
    | 'utensils'
    | 'book'
    | 'heart-pulse'
    | 'droplets'
    | 'sparkles'
    | 'snowflake'
    | 'briefcase'
    | 'accessibility'
    | 'home';
  photoHint: string;
  images: string[];
  partnerHighlight?: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  detail: string;
}

export interface OfficeBearer {
  rank: number;
  role: string;
  name: string;
  photo?: string;
  objectPosition?: string;
  initials: string;
  bio: string;
}

export const FOUNDATION_INFO = {
  name: 'Bayt-ul-Hikmah Welfare Foundation',
  shortName: 'Bayt-ul-Hikmah',
  tagline: 'House of Hope and Care',
  motto: "Charity doesn't decrease wealth.",
  intro:
    'Bayt-ul-Hikmah Welfare Foundation is a grassroots organization serving families in need across the Faisalabad division. We identify urgent needs at the household level and meet them directly, with transparency and dignity.',
  location: 'Samundri, District Faisalabad, Punjab, Pakistan',
  serviceArea: 'Faisalabad Division, Pakistan',
  contactPerson: 'Muhammad Waleed Khan, President',
  phoneDisplay: '0317 2420140',
  phoneHref: 'tel:+923172420140',
  whatsappHref: 'https://wa.me/923172420140',
  email: 'baytulhikmahwelfarefoundation0@gmail.com',
  instagramHandle: '@baytulhikmah.welfarefoundation',
  instagramHref: 'https://instagram.com/baytulhikmah.welfarefoundation',
};

export const DEFAULT_SETTINGS: SiteSettings = {
  backendApiUrl: '',
  phoneDisplay: FOUNDATION_INFO.phoneDisplay,
  email: FOUNDATION_INFO.email,
  location: FOUNDATION_INFO.location,
  socialLinks: [
    {
      id: 'instagram',
      platform: 'Instagram',
      icon: 'instagram',
      label: '@baytulhikmah.welfarefoundation',
      url: FOUNDATION_INFO.instagramHref,
      enabled: true,
    },
    {
      id: 'whatsapp',
      platform: 'WhatsApp',
      icon: 'whatsapp',
      label: '0317 2420140',
      url: FOUNDATION_INFO.whatsappHref,
      enabled: true,
    },
    {
      id: 'facebook',
      platform: 'Facebook',
      icon: 'facebook',
      label: 'Bayt-ul-Hikmah Welfare Foundation',
      url: '',
      enabled: false,
    },
    {
      id: 'youtube',
      platform: 'YouTube',
      icon: 'youtube',
      label: 'Bayt-ul-Hikmah Channel',
      url: '',
      enabled: false,
    },
  ],
};

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    value: '1,500+',
    label: 'People served at Ramadan Iftar drives',
    detail: 'Warm community Iftar meals hosted across the holy month',
  },
  {
    value: '10–15',
    label: 'Children with full schooling covered',
    detail: 'Tuition, books, uniforms, and supplies uninterrupted',
  },
  {
    value: '8–10',
    label: 'Chronic patients supported every month',
    detail: 'Continuous medicines and clinical care, including cancer support',
  },
  {
    value: '4x',
    label: 'Madrassa meal drives every month',
    detail: 'Freshly prepared weekly meals for local students',
  },
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'food-support',
    number: '01',
    title: 'Food Support',
    category: 'Basic Needs',
    summary:
      'Every month, we deliver rations to widowed women and low-income families so no household goes hungry. We also run meal drives in local madrassas four times a month. During Ramadan, our Iftar drives have served over 1,500 people.',
    frequency: 'Monthly Rations & 4x/Month Meal Drives',
    iconName: 'utensils',
    photoHint: '/activities/food-support.jpg',
    images: [],
  },
  {
    id: 'education',
    number: '02',
    title: 'Education',
    category: 'Education & Health',
    summary:
      'We cover the full schooling expenses of 10-15 children, so financial hardship never interrupts their studies.',
    frequency: 'Ongoing Academic Year Support',
    iconName: 'book',
    photoHint: '/activities/education.jpg',
    images: [],
  },
  {
    id: 'healthcare',
    number: '03',
    title: 'Healthcare',
    category: 'Education & Health',
    summary:
      "Each month we provide medical and medicine support to 8-10 chronic patients, including a cancer patient, so treatment doesn't stop when money runs out.",
    frequency: 'Monthly Medical Aid',
    iconName: 'heart-pulse',
    photoHint: '/activities/healthcare.jpg',
    images: [],
  },
  {
    id: 'clean-water',
    number: '04',
    title: 'Clean Water',
    category: 'Basic Needs',
    summary:
      "We install water taps and connections in homes that had no access to water, bringing a basic necessity to families' doorsteps.",
    frequency: 'Household Installations',
    iconName: 'droplets',
    photoHint: '/activities/clean-water.jpg',
    images: [],
  },
  {
    id: 'family-dignity',
    number: '05',
    title: 'Family Dignity',
    category: 'Dignity & Livelihood',
    summary:
      'We provide essential marriage items for deserving young women and their families, so no family has to start this milestone in hardship.',
    frequency: 'Case-by-Case Family Assistance',
    iconName: 'sparkles',
    photoHint: '/activities/family-dignity.jpg',
    images: [],
  },
  {
    id: 'seasonal-support',
    number: '06',
    title: 'Seasonal Support',
    category: 'Basic Needs',
    summary:
      'When winter arrives, we distribute warm clothing and bedding to vulnerable families.',
    frequency: 'Annual Winter Relief Drive',
    iconName: 'snowflake',
    photoHint: '/activities/seasonal-support.jpg',
    images: [],
  },
  {
    id: 'livelihood',
    number: '07',
    title: 'Livelihood',
    category: 'Dignity & Livelihood',
    summary:
      'We create dignified employment for people with disabilities. We also help families start small businesses, such as a tuck shop or a fruit cart, so they can earn a steady, respectable income.',
    frequency: 'Self-Reliance Empowerment',
    iconName: 'briefcase',
    photoHint: '/activities/livelihood.jpg',
    images: [],
  },
  {
    id: 'mobility-support',
    number: '08',
    title: 'Mobility Support',
    category: 'Education & Health',
    summary:
      'We provide mobility aids such as wheelchairs to those who need them—delivered with the support and collaboration of Alkhidmat Foundation—helping people move with independence.',
    frequency: 'Direct Aid Distribution',
    iconName: 'accessibility',
    photoHint: '/activities/mobility-support.jpg',
    images: [],
    partnerHighlight: 'With the help of Alkhidmat Foundation',
  },
  {
    id: 'household-essentials',
    number: '09',
    title: 'Household Essentials',
    category: 'Dignity & Livelihood',
    summary:
      'We supply basic household items to families in need, so they can run their homes with dignity.',
    frequency: 'Verified Household Aid',
    iconName: 'home',
    photoHint: '/activities/household-essentials.jpg',
    images: [],
  },
];

export const OFFICE_BEARERS: OfficeBearer[] = [
  {
    rank: 1,
    role: 'President',
    name: 'Muhammad Waleed Khan',
    photo: '/team/waleed-khan.jpeg',
    objectPosition: '50% 18%',
    initials: 'WK',
    bio: 'Leads the foundation’s strategy, donor accountability, and direct household outreach across Samundri and the Faisalabad division.',
  },
  {
    rank: 2,
    role: 'Vice President',
    name: 'Abdul Sattar Tariq',
    photo: '/team/abdul-sattar.jpeg',
    objectPosition: '50% 24%',
    initials: 'AS',
    bio: 'Oversees field operations, family verification drives, and regional coordination across underserved neighborhoods.',
  },
  {
    rank: 3,
    role: 'General Secretary',
    name: 'Saad Kasana',
    photo: '/team/saad-kasana.jpeg',
    objectPosition: '50% 18%',
    initials: 'SK',
    bio: 'Coordinates executive administration, volunteer mobilization, and monthly welfare scheduling.',
  },
  {
    rank: 4,
    role: 'Joint Secretary',
    name: 'Hanan Athar',
    photo: '/team/hanan-athar.jpeg',
    objectPosition: '50% 15%',
    initials: 'HA',
    bio: 'Supports program logistics, madrassa meal drives, and timely distribution of monthly rations and educational supplies.',
  },
  {
    rank: 5,
    role: 'Finance Secretary',
    name: 'Aliyan Khan',
    photo: '/team/aliyan-khan.jpeg',
    objectPosition: '50% 18%',
    initials: 'AK',
    bio: 'Maintains transparent records of donations, patient medical stipends, and school sponsorships.',
  },
  {
    rank: 6,
    role: 'Press Secretary',
    name: 'Roman Athar',
    photo: '/team/roman-athar.jpeg',
    objectPosition: '50% 15%',
    initials: 'RA',
    bio: 'Documents community impact, manages public communications, and shares verified stories of hope.',
  },
  {
    rank: 7,
    role: 'Outreach Secretary',
    name: 'Umair Manzoor',
    photo: '/team/umair-manzoor.jpeg',
    objectPosition: '50% 22%',
    initials: 'UM',
    bio: 'Identifies vulnerable families on the ground and builds community partnerships for sustainable relief.',
  },
];

export const BANK_ACCOUNTS = [
  {
    id: 'easypaisa',
    provider: 'EasyPaisa Account',
    badge: 'Mobile Wallet • Instant Transfer',
    accountNumber: '0318-7107557',
    rawNumber: '03187107557',
    accountTitle: 'Muhammad Waleed Khan',
    instructions: 'Send via EasyPaisa app, JazzCash, or any Raast-enabled mobile banking app.',
  },
  {
    id: 'habib-metro',
    provider: 'Habib Metro Bank',
    badge: 'Direct Bank Transfer',
    accountNumber: '6063820363714126268',
    rawNumber: '6063820363714126268',
    accountTitle: 'Muhammad Waleed Khan',
    instructions: 'Use for IBFT or direct bank deposits from any local or international bank.',
  },
];
