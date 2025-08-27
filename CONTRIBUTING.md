# Contributing

Bedankt voor je interesse om bij te dragen! Hieronder de praktische richtlijnen om consistent, veilig en soepel samen te werken.

## Vereisten
- Node.js 18.x, npm 9+
- Optioneel: Expo CLI (`npx expo --version`)

## Setup
```bash
npm ci
npm run typecheck
npm run lint
npm run web # of: npm start
```

## Branching
- Werk vanaf `main` in feature branches: `feature/<korte-omschrijving>` of `fix/<korte-omschrijving>`
- Open een Pull Request (PR) naar `main`

## Commits (Conventional Commits)
- `feat: ...` nieuwe functionaliteit
- `fix: ...` bugfix
- `docs: ...` documentatie
- `chore: ...` onderhoud, tooling
- `refactor: ...` herstructurering zonder feature/fix
- `test: ...` tests
- Breaking changes: `feat!:` of footer `BREAKING CHANGE:`

## Codekwaliteit
- Formatter: Prettier
  - Format: `npm run format`
  - Check: `npm run format:check`
- Lint: ESLint
  - `npm run lint` en `npm run lint:fix`
- Types: TypeScript
  - `npm run typecheck`

## PR Checklist
- [ ] `npm run typecheck` zonder fouten
- [ ] `npm run lint` schoon, of `npm run lint:fix` toegepast
- [ ] `npm run build` werkt (web export)
- [ ] Documentatie/README bijgewerkt (indien nodig)
- [ ] Screenshots/Video toegevoegd (indien UI-wijziging)

## Environment
- Lokaal (client‑side): `.env.local` met uitsluitend publieke variabelen
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Server‑side secrets (niet in `.env.local`):
  - In Supabase Edge Functions: `OPENAI_API_KEY` (en eventueel `ANTHROPIC_API_KEY`), `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- CI/CD (Netlify/GitHub Pages): zet publieke EXPO vars in de platform‑env

## CI/CD
- GitHub Actions: `ci.yml` draait typecheck, lint en web build
- Netlify: build `npm run build`, publish naar `dist`
- GitHub Pages (preview): workflow met base path `/inzicht-coach/` en SPA fallback

## Releases & Release Notes
- Gebruik GitHub Releases; auto‑generated notes zijn geconfigureerd via `.github/release.yml`
- Labels sturen de indeling aan:
  - `breaking-change`, `feature`/`enhancement`, `fix`/`bug`, `docs`, `chore`/`build`/`ci`, `refactor`/`test`
- Wil je iets niet in de release notes? Gebruik label `skip-changelog`

## Stijl & Richting
- Houd componenten klein en herbruikbaar; voorkom over‑abstractie
- Houd services (Supabase, AI) side‑effect vrij waar mogelijk; goede foutafhandeling
- Schrijf UI met aandacht voor dark/light mode en toegankelijkheid

## Contact
- Open een issue of PR met je voorstel. Dank voor je bijdrage!
