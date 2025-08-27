# Inzicht Coach - AI-gedreven Alcoholreductie App

Een moderne React Native app (met Expo) die mensen helpt bewust met alcohol om te gaan en hun consumptie te verminderen of stoppen.

## 🚀 Quick Start

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

## 📱 Features

### ✅ **Volledig Geïmplementeerd:**

- **🏗️ Project Setup**: Expo React Native + TypeScript
- **🎨 Modern UI**: Tailwind CSS met dark/light mode
- **🔐 Authenticatie**: Supabase Auth met RLS
- **📊 Dashboard**: Real-time statistieken en voortgang
- **📝 Dagboek**: Alcohol logging met mood tracking
- **🤖 AI Coach**: Chat met empathische AI (Sam)
- **🎙️ Voice Journal**: Spraaknotities met transcriptie
- **📚 Kennisbank**: Artikelen en oefeningen
- **🏆 Gamification**: Punten, badges, streaks
- **👤 Profiel**: Gebruikersstatistieken en instellingen

### 🔧 **Technische Stack:**

- **Frontend**: React Native, Expo Router, TypeScript
- **Styling**: Tailwind CSS (via twrnc), Dark/Light mode
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State**: TanStack Query + Zustand
- **AI**: OpenAI (GPT-4 + Whisper) via Edge Functions
- **Cross-platform**: iOS, Android, Web

## 🏛️ **App Architectuur**

```
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Main tabs (Dashboard, Dagboek, etc.)
│   ├── auth/              # Login/Register screens
│   └── _layout.tsx        # Root layout met providers
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── logbook/       # Dagboek specifieke components
│   │   ├── voice/         # Voice recording components
│   │   └── ui/            # Generic UI components
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts     # Authentication
│   │   ├── useDailyLogs.ts# Dagboek functionaliteit
│   │   ├── useStats.ts    # Statistieken berekeningen
│   │   ├── useChat.ts     # AI Chat functionaliteit
│   │   └── useGamification.ts # Badges en punten
│   ├── services/          # External services
│   │   ├── supabase.ts    # Supabase client
│   │   └── ai.ts          # AI service calls
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── data/              # Static data (articles, exercises)
└── supabase/              # Database schema & edge functions
    ├── migrations/        # Database migrations
    └── functions/         # Edge functions (AI calls)
```

## 🎮 **Gamification System**

### Punten Systeem:
- **10 punten**: Alcoholvrije dag (0 glazen)
- **5 punten**: Binnen dagdoel (≤2 glazen)
- **0 punten**: Over dagdoel (>2 glazen)

### Badge System:
- 🏆 **Eerste Week** (7 dagen actief)
- 🥇 **Eerste Maand** (30 dagen actief)
- 🔥 **5-Dagen Streak** (5 dagen op rij binnen doel)
- ⚡ **10-Dagen Streak** (10 dagen consecutief)
- ✨ **30-Dagen Streak** (Een hele maand!)
- 👑 **100-Dagen Streak** (Kampioen status)
- 🦸 **Nul Held** (10 alcoholvrije dagen)
- 🎯 **Doel Bereiker** (90% van doelen behaald)
- 🎙️ **Spraak Dagboeker** (10 voice entries)
- 💬 **AI Gesprekspartner** (50 chat berichten)

## 🤖 **AI Coach "Sam"**

De AI coach is getraind in:
- **Motiverende Gespreksvoering (MI)**
- **Cognitieve Gedragstherapie (CGT)**
- **Nederlandse taal en cultuur**
- **Empathische, niet-oordelende communicatie**

### Features:
- 24/7 beschikbare chat support
- Context-aware gesprekken
- Quick actions voor acute situaties
- Voice journal transcriptie
- Patroon herkenning in gedrag

## 📊 **Database Schema**

### Hoofd Tabellen:
- `profiles` - Gebruikersprofielen
- `daily_logs` - Dagelijkse alcohol logs
- `voice_journals` - Spraaknotities
- `chat_messages` - AI chat historie
- `achievements` - Behaalde badges
- `motivation_cards` - Persoonlijke motivaties
- `user_points` - Punten en streak tracking

### Beveiliging:
- **Row Level Security (RLS)** op alle tabellen
- **JWT Authenticatie** via Supabase
- **API Keys** server-side only (Edge Functions)

## 🔒 **Privacy & Security**

- ✅ **Transport & At-Rest Encryptie** (HTTPS + database encryption)
- ✅ **GDPR/AVG Compliant** met privacy by design
- ✅ **Geen client-side API keys** (server-side only)
- ✅ **Row Level Security (RLS)** voor data isolatie  
- ✅ **Pseudonieme usage** mogelijk
- ✅ **Data export functionaliteit** (alle gebruikersdata)
- ✅ **Crisis support** met Nederlandse hulpnummers

*Zie [Privacy Documentatie](./docs/privacy/) voor complete DPIA en procedures.*

## 🌍 **Cross-Platform Support**

### iOS:
- Native iOS components
- Face ID / Touch ID support (via Expo)
- Push notifications
- Voice recording met AVAudioRecorder

### Android:
- Material Design elements
- Fingerprint / Pattern unlock
- Background notifications
- Voice recording met MediaRecorder

### Web:
- Responsive design (mobile-first)
- Progressive Web App features
- Web Audio API voor voice recording
- Browser notifications

## 🎯 **Gebruiker Journey**

1. **Onboarding**: Account maken → doelen stellen
2. **Daily Routine**: Dagboek invullen → punten verdienen
3. **Support**: AI chat voor moeilijke momenten
4. **Growth**: Badges verzamelen → streak opbouwen
5. **Insights**: Statistieken bekijken → patronen herkennen

## 📈 **Statistieken & Analytics**

### Dashboard Metrics:
- Huidige streak (opeenvolgende dagen binnen doel)
- Totaal punten verdiend
- Geld bespaard (€5 per vermeden drankje)
- Calorieën vermeden (150 per drankje)
- Percentage doelen behaald

### Weekly/Monthly Views:
- Alcoholvrije dagen per week
- Gemiddelde consumptie trends
- Mood tracking correlaties
- Voice journal sentiment analysis

## 🚨 **Crisis Support**

- **🆘 Noodknop** in profiel voor acute situaties
- **Crisis detectie** in AI chat gesprekken
- **Doorverwijzing** naar professionele hulp
- **24/7 bereikbaarheid** van AI coach

## 🔮 **Toekomstige Features**

- **Community functies** (anoniem forum)
- **Buddy systeem** (maatje koppeling)
- **Advanced AI**: GPT-4o, Claude integration
- **Wearables**: Apple Watch, Samsung Galaxy Watch
- **Offline modus** met sync
- **Telehealth integratie**

---

## 🛠️ **Development**

### Environment Variables:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### Key Commands:
```bash
npm run typecheck  # TypeScript validation
npm run lint       # ESLint checking
npx expo doctor    # Health check
```

**Status**: 🟢 **Production Ready** - Alle core features geïmplementeerd en getest!

---

*Deze app volgt evidence-based methoden uit de verslavingszorg en is ontworpen met privacy en veiligheid als hoogste prioriteit.*