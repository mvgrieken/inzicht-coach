# Inzicht Coach - AI-gedreven Alcoholreductie App

![CI](https://github.com/mvgrieken/inzicht-coach/actions/workflows/ci.yml/badge.svg)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Finzicht-coach.netlify.app&label=Netlify%20Site&logo=netlify)](https://inzicht-coach.netlify.app/)
[![Netlify Deploys](https://img.shields.io/badge/Netlify-Deploys-blue?logo=netlify)](https://app.netlify.com/sites/inzicht-coach/deploys)

Live:
- Netlify: https://inzicht-coach.netlify.app/
- GitHub Pages: wordt automatisch gedeployed via Actions (Pages workflow)

Een moderne React Native app (met Expo) die mensen helpt bewust met alcohol om te gaan en hun consumptie te verminderen of stoppen.

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Run on specific platforms
npm run ios     # iOS (macOS required)
npm run android # Android
npm run web     # Web browser
```

## Features

### Volledig geïmplementeerd

- Project setup: Expo + TypeScript
- Modern UI: Tailwind CSS (twrnc), dark/light mode
- Authenticatie: Supabase Auth met RLS
- Dashboard: statistieken en voortgang
- Dagboek: alcohol logging met mood tracking
- AI Coach: chat met empathische AI (Sam)
- Voice Journal: spraaknotities met transcriptie
- Kennisbank: artikelen en oefeningen
- Gamification: punten, badges, streaks
- Profiel: gebruikersstatistieken en instellingen

### Technische stack

- Frontend: React Native, Expo Router, TypeScript
- Styling: Tailwind CSS (twrnc)
- Backend: Supabase (PostgreSQL, Auth, Storage)
- State: TanStack Query + Zustand
- AI: OpenAI (GPT-4, Whisper) via Supabase Edge Functions
- Platforms: iOS, Android, Web

## Architectuur

```
app/                    # Expo Router screens
  (tabs)/               # Hoofdtabbladen
  auth/                 # Login/Register
  _layout.tsx           # Root layout met providers
src/
  components/           # UI componenten (logbook/voice/ui)
  hooks/                # Custom hooks
  services/             # Externe services (supabase, ai)
  types/                # Types
  utils/                # Utilities
  data/                 # Statische data
supabase/
  migrations/           # Database migrations
  functions/            # Edge functions (AI)
```

## Gamification

- 10 punten: alcoholvrije dag (0 glazen)
- 5 punten: binnen dagdoel (≤ 2 glazen)
- 0 punten: over dagdoel (> 2 glazen)

Badges (selectie): eerste week/maand, 5/10/30/100-dagen streak, nul held, doel bereiker, spraak dagboeker, AI gesprekspartner.

## AI Coach “Sam”

- Gebaseerd op MI/CGT, NL-taal, empathische stijl
- 24/7 chat, context-aware gesprekken, quick actions
- Voice journal transcriptie, patroonherkenning

## Database & Security

Hoofdtabellen: `profiles`, `daily_logs`, `voice_journals`, `chat_messages`, `achievements`, `motivation_cards`, `user_points`.

Beveiliging:
- Row Level Security (RLS) op alle tabellen
- JWT Authenticatie (Supabase)
- API keys alleen server-side (Edge Functions)

## Privacy & Security

- Versleuteling voor gevoelige data
- GDPR/AVG compliant
- Geen client-side API keys
- Anonieme usage mogelijk
- Data export functionaliteit

## Cross-platform

- iOS/Android: biometrie, notificaties, voice recording
- Web: responsive, PWA-achtig, Web Audio API, browser notifications

## Gebruikersflow

1. Onboarding: account en doelen
2. Dagelijks: dagboek en punten
3. Support: AI chat
4. Groei: badges en streaks
5. Inzicht: statistieken en patronen

## Statistieken & Analytics

- Streak, punten, geld/calorieën bespaard, % doelen behaald
- Trends per week/maand, mood correlaties, voice sentiment

## Crisis Support

- Noodknop, detectie in AI chat, doorverwijzing hulp

## Toekomstig

- Community/buddy, advanced AI, wearables
- Offline sync, telehealth integratie

---

## Development

### Environment variables
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### .env.local (development)
- Maak in de projectroot een `.env.local` (staat in `.gitignore`).
- Zet hier alleen publieke variabelen voor de client in:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Server-side secrets (OPENAI/ANTHROPIC/SUPABASE_SERVICE_KEY) horen in Supabase/CI, niet in `.env.local`.

### Commands
```bash
npm run typecheck  # TypeScript validation
npm run lint       # ESLint checking
npm run build      # Static web export (dist)
npx expo doctor    # Health check
```

## Deployment

- Netlify
  - Configureer env vars in Netlify: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
  - Build command: `npm run build`, Publish directory: `dist` (ook vastgelegd in `netlify.toml`).
  - Trigger een deploy via Netlify Deploys of push naar `main` (repo is gekoppeld).
  - Live: https://inzicht-coach.netlify.app/

- GitHub Pages (preview)
  - Settings → Pages → Source: GitHub Actions.
  - Actions → Variables: voeg `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` toe.
  - Actions → Workflow “Deploy to GitHub Pages” → Run workflow (op `main`).
  - Base path is ingesteld op `/inzicht-coach/`; SPA fallback (`404.html`) wordt automatisch aangemaakt.

Status: Production Ready – core features geïmplementeerd en getest.

---

Deze app volgt evidence-based methoden uit de verslavingszorg en is ontworpen met privacy en veiligheid als hoge prioriteit.
