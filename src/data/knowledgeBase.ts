export interface Article {
  id: string;
  title: string;
  content: string;
  category: 'alcohol' | 'coping' | 'health' | 'motivation';
  readTime: number; // minutes
  tags: string[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  type: 'breathing' | 'meditation' | 'planning' | 'quiz';
  icon: string;
}

export const KNOWLEDGE_ARTICLES: Article[] = [
  {
    id: 'alcohol-sleep',
    title: 'Waarom is alcohol slecht voor je slaap?',
    content: `
Hoewel alcohol je in eerste instantie slaperig kan maken, heeft het een negatief effect op je slaapkwaliteit.

**Wat doet alcohol met je slaap?**
- Verstoort de REM-slaap (droomslaap)
- Zorgt voor meer ontwaken tijdens de nacht
- Veroorzaakt dehydratie
- Kan tot snurken en slaapapneu leiden

**De gevolgen**
- Je voelt je minder uitgerust
- Concentratieproblemen overdag
- Verhoogde stress en prikkelbaarheid
- Verzwakt immuunsysteem

**Verbetering na stoppen**
Al na een week zonder alcohol merk je:
- Diepere slaap
- Meer energie overdag
- Betere concentratie
- Verbeterde stemming

Je lichaam heeft ongeveer 1 week nodig om het slaapritme te herstellen na regelmatig alcoholgebruik.
    `,
    category: 'alcohol',
    readTime: 5,
    tags: ['slaap', 'gezondheid', 'herstel'],
  },
  {
    id: 'coping-cravings',
    title: '5 manieren om met trek om te gaan',
    content: `
Trek in alcohol is normaal en gaat voorbij. Hier zijn bewezen strategieën:

**1. De "HALT" check**
Ben je Hongerig, Angry (boos), Lonely (eenzaam), of Tired (moe)?
Deze gevoelens versterken vaak trek in alcohol.

**2. Afleidingstechnieken**
- 10 minuten wandelen
- Bel een vriend
- Neem een douche
- Doe een puzzel of game

**3. Ademhalingsoefening**
- Adem 4 tellen in
- Houd 4 tellen vast
- Adem 6 tellen uit
- Herhaal 5 keer

**4. Het "surf de golf" principe**
Trek komt op als een golf - het wordt sterker, bereikt een piek, en gaat dan weer weg.
Gemiddeld duurt intense trek 15-20 minuten.

**5. Herinner jezelf waarom**
- Bekijk je motivatiekaartje
- Denk aan je doelen
- Visualiseer hoe goed je je morgen voelt als je nu nee zegt

**Onthoud:** Trek betekent niet dat je faalt. Het betekent dat je brein zich aanpast aan een gezondere levensstijl!
    `,
    category: 'coping',
    readTime: 3,
    tags: ['trek', 'coping', 'strategieën'],
  },
  {
    id: 'benefits-reducing',
    title: 'De voordelen van minder drinken',
    content: `
Al na een week minder drinken merk je positieve veranderingen:

**Week 1: Direct effect**
- Betere slaap
- Meer energie
- Minder opgeblazen gevoel
- Zuiniger (meer geld over)

**Maand 1: Lichaam herstelt**
- Betere huidconditie
- Gewichtsverlies (alcohol bevat veel calorieën)
- Stabielere stemming
- Betere concentratie

**Maand 3: Diepe veranderingen**
- Significant lager risico op hart- en vaatziekten
- Beter functionerend immuunsysteem
- Meer zelfvertrouwen
- Betere relaties

**Financiële voordelen**
Bij 2 glazen per dag bespaar je:
- €300+ per maand
- €3600+ per jaar
- Genoeg voor een mooie vakantie!

**Gezondheidsvoordelen**
- 30% lager risico op bepaalde kankers
- Beter leverfunction
- Lager bloeddruk
- Betere mentale gezondheid

**Het belangrijkste**: Je voelt je meer jezelf, meer in controle, en meer tevreden met het leven.
    `,
    category: 'motivation',
    readTime: 4,
    tags: ['voordelen', 'gezondheid', 'motivatie'],
  },
  {
    id: 'dealing-stress',
    title: 'Stress zonder alcohol',
    content: `
Veel mensen gebruiken alcohol om te ontspannen. Hier zijn gezondere alternatieven:

**Directe stressverlichting**
- Diepe ademhaling (meest effectief)
- Korte wandeling
- Muziek luisteren
- Contact met een vriend

**Langetermijn stress management**
- Regelmatige sport
- Mindfulness of meditatie
- Goede nachtrust
- Healthy grenzen stellen

**Waarom alcohol stress eigenlijk verergert**
- Verstoort je slaap (minder weerstand)
- Verhoogt cortisol levels
- Kan tot angst en depressie leiden
- Maskeert problemen in plaats van ze op te lossen

**Effectieve alternatieven voor ontspanning**
- Warme thee of bad
- Yoga of stretching
- Lezen of puzzelen
- Creativiteit (tekenen, schrijven)
- Massage of zelfmassage

**Pro tip**: Maak een "stress toolkit" - een lijst van 5-10 dingen die jou helpen ontspannen, zodat je altijd een alternatief paraat hebt.
    `,
    category: 'coping',
    readTime: 4,
    tags: ['stress', 'ontspanning', 'alternatieven'],
  },
];

export const EXERCISES: Exercise[] = [
  {
    id: 'breathing-4-7-8',
    title: '4-7-8 Ademhalingsoefening',
    description: 'Een snelle en effectieve manier om te ontspannen en trek te doorbreken',
    duration: 5,
    type: 'breathing',
    icon: '🌬️',
  },
  {
    id: 'trigger-scan',
    title: 'Triggerscan',
    description: 'Ontdek je persoonlijke drinkprikkels en hoe je ermee omgaat',
    duration: 15,
    type: 'planning',
    icon: '📝',
  },
  {
    id: 'goal-setting',
    title: 'SMART Doelen Stellen',
    description: 'Maak concrete, haalbare doelen voor je alcoholreductie',
    duration: 10,
    type: 'planning',
    icon: '🎯',
  },
  {
    id: 'mindful-moment',
    title: 'Mindful Moment',
    description: 'Een korte mindfulness oefening om het moment bewust te ervaren',
    duration: 8,
    type: 'meditation',
    icon: '🧘',
  },
  {
    id: 'knowledge-quiz',
    title: 'Alcoholkennis Quiz',
    description: 'Test je kennis over alcohol en gezondheid',
    duration: 5,
    type: 'quiz',
    icon: '🧠',
  },
];

export const CATEGORIES = [
  {
    id: 'alcohol',
    title: 'Over Alcohol',
    subtitle: 'Effecten op lichaam & geest',
    icon: '🧠',
    color: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    id: 'coping',
    title: 'Coping Strategieën',
    subtitle: 'Omgaan met trek & stress',
    icon: '💪',
    color: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    id: 'health',
    title: 'Gezonde Gewoontes',
    subtitle: 'Alternatieven & ontspanning',
    icon: '🌱',
    color: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  {
    id: 'motivation',
    title: 'Motivatie',
    subtitle: 'Verhalen & inspiratie',
    icon: '❤️',
    color: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
  },
] as const;