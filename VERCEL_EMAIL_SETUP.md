# Configurazione Email per Vercel

Questo progetto usa **Resend** per inviare email tramite le serverless functions di Vercel.

## Setup su Vercel

### 1. Crea un account Resend
1. Vai su [resend.com](https://resend.com)
2. Crea un account gratuito
3. Verifica il tuo dominio (o usa il dominio di test per sviluppo)

### 2. Ottieni la API Key
1. Vai su [resend.com/api-keys](https://resend.com/api-keys)
2. Crea una nuova API key
3. Copia la chiave (inizia con `re_`)

### 3. Configura Vercel
1. Vai sul tuo progetto Vercel
2. Vai su **Settings** → **Environment Variables**
3. Aggiungi la variabile:
   - **Name**: `RESEND_API_KEY`
   - **Value**: La tua API key di Resend (es. `re_abc123...`)
   - **Environment**: Seleziona Production, Preview, e Development

### 4. Verifica il dominio email
In Resend, devi verificare il dominio da cui vuoi inviare email:
- Per sviluppo/test puoi usare `onboarding@resend.dev`
- Per produzione verifica `assistenzalavanderie.it` seguendo le istruzioni DNS di Resend

### 5. Deploy
Fai il deploy su Vercel e la funzione `/api/send-email` sarà disponibile automaticamente.

## Test locale

Per testare localmente:
```bash
npm install
vercel dev
```

Crea un file `.env.local` con:
```
RESEND_API_KEY=re_your_api_key
```

## Destinatari Email

Le email verranno inviate a:
- **Amministrazione**: amministrazione@assistenzalavanderie.it
- **Commerciale**: commerciale@assistenzalavanderie.it
- **Assistenza**: manutenzione@assistenzalavanderie.it

## Alternative a Resend

Se preferisci usare un altro servizio, puoi modificare `/api/send-email.js` per usare:
- **SendGrid**: Cambia `RESEND_API_KEY` con `SENDGRID_API_KEY`
- **Mailgun**: Aggiungi `MAILGUN_API_KEY` e `MAILGUN_DOMAIN`
