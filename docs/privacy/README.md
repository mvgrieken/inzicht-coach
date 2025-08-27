# Privacy & Security - Inzicht Coach

## 📋 **DPIA Samenvatting**

Inzicht Coach verwerkt **gezondheidsgegevens** (alcoholgebruik, stemming, voice recordings) en valt onder AVG/GDPR bijzondere categorieën.

### **Verwerkingsgrondslag**
- **Toestemming** (Art. 6.1.a + 9.2.a AVG) voor gezondheidsgegevens
- **Gerechtvaardigd belang** voor technische verwerking

### **Dataminimalisatie**
- Alleen strikt noodzakelijke gegevens
- Pseudonimisering waar mogelijk
- Automatische verwijdering na inactiviteit (2 jaar)

### **Bewaartermijnen**
- **Dagboek data**: 2 jaar na laatste activiteit
- **Audio opnames**: 30 dagen (na transcriptie)
- **Chat berichten**: 1 jaar
- **Account gegevens**: Tot verwijdering door gebruiker

## 🔒 **Technische Beveiliging**

### **Versleuteling**
- ✅ **Transport**: HTTPS/TLS 1.3 voor alle communicatie
- ✅ **At-rest**: Database encryptie via Supabase
- ✅ **Client Storage**: AsyncStorage encryptie (mobiel)
- ⚠️ **E2EE**: Niet geïmplementeerd (transport + at-rest only)

*Note: README wordt aangepast - geen echte end-to-end encryptie*

### **Toegangscontrole**
- Row Level Security (RLS) op alle tabellen
- JWT verificatie voor API calls
- Service keys alleen server-side
- Multi-factor authenticatie ondersteuning

### **API Beveiliging**
- Rate limiting per gebruiker
- Input validatie met Zod
- CORS policies geïmplementeerd
- Audit logging van gevoelige operaties

## 📱 **Privacy by Design**

### **Gebruikersrechten**
- **Inzage**: Volledige data export functionaliteit
- **Rectificatie**: Profile en data aanpassingen
- **Verwijdering**: Account deletion met data cascade
- **Overdraagbaarheid**: JSON export van alle data
- **Bezwaar**: Opt-out voor analytics/tracking

### **Consent Management**
- Expliciete toestemming bij eerste gebruik
- Granulaire privacy instellingen
- Withdraw consent functionaliteit
- Cookie/tracking opt-in voor web

## 🚨 **Crisis Support & Disclaimers**

### **Medische Disclaimer**
```
⚠️ BELANGRIJKE DISCLAIMER

Inzicht Coach is een ondersteunend hulpmiddel en geen vervanging 
voor professionele medische of psychologische hulp.

• Geen medische diagnoses of behandeladvies
• Bij ernstige problemen: raadpleeg je huisarts
• Crisis situaties: bel 113 (Suicide Prevention) of 112 (nood)
• Detox/ontwenning: altijd onder medisch toezicht
```

### **Crisis Herkenning in AI Chat**
- Keywords detectie ("zelfmoord", "geen uitweg", etc.)
- Automatische doorverwijzing naar professionele hulp
- Noodnummers altijd zichtbaar in app
- Escalatie procedures gedefinieerd

### **Nederlandse Hulpnummers**
- **113 Suicide Prevention**: 113 (24/7 gratis)
- **Jellinek**: 020-5732 600 (verslavingszorg)  
- **Huisarts**: Via je eigen huisartsenpraktijk
- **GGZ Spoedzorg**: 0900-1450 (crisisdienst)

## 📊 **Data Processing Overzicht**

### **Verwerkte Categorieën**
1. **Identiteit**: Email, naam (optioneel)
2. **Gezondheid**: Alcoholgebruik, stemming
3. **Gedrag**: App usage, chat historiek  
4. **Audio**: Voice journals (tijdelijk)
5. **Technisch**: Device info, crash logs

### **Deel met Derden**
- **Supabase**: Database hosting (verwerkersovereenkomst)
- **OpenAI**: AI processing (anonieme prompts)
- **Netlify**: Web hosting
- **Geen verkoop** van persoonlijke data

### **Internationale Overdracht**
- EU/US: Adequaatheidsbesluiting + SCCs
- Supabase: EU servers waar mogelijk
- OpenAI: US processing (necessary for AI functionality)

## 🛡️ **Beveiligingsmaatregelen**

### **Preventief**
- Input sanitization en validatie
- SQL injection preventie via ORM
- XSS protectie via CSP headers
- Secrets management via environment variables

### **Detective**  
- Audit logs voor gevoelige operaties
- Anomalie detectie op usage patterns
- Error monitoring via Sentry
- Security headers monitoring

### **Responsief**
- Incident response procedures
- Data breach notification (72u)
- User notification procedures
- Backup & recovery procedures

---

*Laatste update: Augustus 2025*
*Voor vragen: privacy@inzichtcoach.nl*