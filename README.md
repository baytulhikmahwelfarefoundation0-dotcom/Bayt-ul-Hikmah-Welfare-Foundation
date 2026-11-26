# Bayt-ul-Hikmah Welfare Foundation Website

**Tagline:** House of Hope and Care  
**Motto:** *"Charity doesn't decrease wealth."*  
**Location:** Samundri, District Faisalabad, Punjab, Pakistan

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 (White & Blue civic NGO theme)
- React Router (`/` Home, `/about` About & Office Bearers, `/activities` Welfare Activities, `/donate` Bank & EasyPaisa Accounts, `/contact` Contact & Referrals)

## Run Locally
```bash
npm install
npm run dev
```

## Build for Production
```bash
npm run build
```

## Adding Your Official Logo & Missing Photos
- **Logo:** Place your white-and-blue logo file at `public/logo.png` (or `public/logo.svg` / `public/logo.webp`). The site's `<Logo />` component automatically detects it and replaces the built-in vector crest placeholder.
- **General Secretary (Saad Kasana):** Place a photo at `public/team/saad-kasana.jpeg` to replace the `SK` monogram card on the About page.
- **Activity Field Photos (Optional):** Add field photos matching `public/activities/food-support.jpg`, `education.jpg`, `healthcare.jpg`, `clean-water.jpg`, `family-dignity.jpg`, `seasonal-support.jpg`, `livelihood.jpg`, `mobility-support.jpg`, and `household-essentials.jpg`.
- **Editing Program List (e.g., Activities 8 & 9):** All activities, office bearers, and bank details are stored in `src/data/foundationData.ts`.
