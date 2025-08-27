# Inzicht Coach 🍃

Een empathische AI-coach app voor mensen die willen stoppen of minderen met alcohol. Gebouwd met React Native, Expo, Supabase en OpenAI.

## 🚀 Features

- **AI Coach**: Persoonlijke begeleiding met motiverende gespreksvoering
- **Dagelijks Logboek**: Bijhouden van alcoholgebruik en stemming
- **Spraakdagboek**: Voice-to-text functionaliteit voor reflectie
- **Gamification**: Punten, badges en streaks voor motivatie
- **Motivatiekaarten**: Persoonlijke herinneringen aan je doelen
- **Statistieken**: Inzicht in je voortgang en patronen
- **Dark Mode**: Ondersteuning voor donkere modus
- **Offline Support**: Werkt ook zonder internetverbinding

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo, TypeScript
- **Styling**: Tailwind CSS (twrnc)
- **State Management**: Zustand, React Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI GPT-4 (Edge Functions)
- **Voice**: Expo AV, Whisper API
- **Deployment**: Netlify

## 📋 Vereisten

- Node.js 18+
- npm of yarn
- Expo CLI
- Supabase account
- OpenAI API key

## 🚀 Snel Starten

### 1. Repository Klonen

```bash
git clone https://github.com/your-username/inzicht-coach.git
cd inzicht-coach
```

### 2. Dependencies Installeren

```bash
npm install
```

### 3. Environment Variables Instellen

Kopieer het voorbeeld bestand en vul je eigen waarden in:

```bash
cp env.example .env
```

Vul de volgende variabelen in:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Database Setup

Voer de Supabase migraties uit:

```bash
# Installeer Supabase CLI
npm install -g supabase

# Login en link je project
supabase login
supabase link --project-ref your-project-ref

# Voer migraties uit
supabase db push
```

### 5. Development Server Starten

```bash
npm run dev
```

De app is nu beschikbaar op `http://localhost:19006`

## 🏗️ Project Structuur

```
inzicht-coach/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigatie
│   ├── auth/              # Authenticatie pagina's
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Herbruikbare componenten
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functies
├── supabase/
│   ├── functions/         # Edge functions
│   └── migrations/        # Database migraties
└── assets/                # Static assets
```

## 🔧 Development

### Scripts

```bash
# Development
npm run dev              # Start development server
npm run android          # Start Android emulator
npm run ios              # Start iOS simulator

# Code Quality
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run typecheck        # TypeScript check
npm run format           # Prettier format
npm run validate         # Run all checks

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Build & Deploy
npm run build            # Production build
npm run deploy:push      # Deploy to Netlify
```

### Code Style

We gebruiken:
- **ESLint** voor code linting
- **Prettier** voor code formatting
- **TypeScript** voor type safety
- **Husky** voor git hooks

### Git Workflow

1. Maak een feature branch: `git checkout -b feature/your-feature`
2. Commit je wijzigingen: `git commit -m "feat: add new feature"`
3. Push naar remote: `git push origin feature/your-feature`
4. Maak een Pull Request

## 🔒 Security

- **Row Level Security (RLS)** op alle database tabellen
- **Input validatie** met Zod schemas
- **Rate limiting** op API endpoints
- **Environment variables** voor gevoelige data
- **Audit logging** voor security monitoring

## 📱 Deployment

### Netlify (Web)

1. Connect je repository aan Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables instellen in Netlify dashboard

### Mobile Apps

```bash
# Build voor production
eas build --platform ios
eas build --platform android

# Submit naar app stores
eas submit --platform ios
eas submit --platform android
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## 📊 Monitoring

- **Error Tracking**: Sentry (optioneel)
- **Analytics**: Custom analytics
- **Performance**: React Query DevTools
- **Logs**: Supabase logs

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch
3. Commit je wijzigingen
4. Push naar de branch
5. Open een Pull Request

### Commit Conventies

We gebruiken [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nieuwe features
- `fix:` bug fixes
- `docs:` documentatie
- `style:` formatting
- `refactor:` code refactoring
- `test:` tests
- `chore:` build tasks

## 📄 Licentie

Dit project is gelicenseerd onder de MIT License - zie [LICENSE](LICENSE) voor details.

## 🆘 Support

- **Documentatie**: [docs.inzichtcoach.nl](https://docs.inzichtcoach.nl)
- **Issues**: [GitHub Issues](https://github.com/your-username/inzicht-coach/issues)
- **Email**: support@inzichtcoach.nl

## 🙏 Dankbetuiging

- [Expo](https://expo.dev/) voor het geweldige React Native framework
- [Supabase](https://supabase.com/) voor de backend services
- [OpenAI](https://openai.com/) voor de AI functionaliteit
- Alle contributors en testers

---

**Let op**: Deze app is geen vervanging voor professionele medische hulp. Bij ernstige problemen, neem contact op met een arts of hulpverlener.
