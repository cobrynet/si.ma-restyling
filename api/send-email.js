// Vercel Serverless Function per invio email con Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Abilita CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Gestisci richieste OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Accetta solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Metodo non consentito' });
  }

  try {
    const { name, email, phone, organization, message, department, departmentEmail } = req.body;

    // Validazione
    if (!name || !email || !phone || !message || !departmentEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tutti i campi obbligatori devono essere compilati' 
      });
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email non valida' 
      });
    }

    // Costruisci il corpo dell'email
    const emailBody = `
Nuova richiesta dal form contatti SI.MA

Dipartimento: ${department}
Nome: ${name}
Email: ${email}
Telefono: ${phone}
Organizzazione: ${organization || 'Non specificata'}

Messaggio:
${message}

---
Questo messaggio è stato inviato dal form contatti del sito SI.MA
    `;

    // Invia email con Resend
    const data = await resend.emails.send({
      from: 'SI.MA <noreply@assistenzalavanderie.it>',
      to: [departmentEmail],
      reply_to: email,
      subject: `Richiesta da ${name} per ${department}`,
      text: emailBody,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email inviata con successo',
      id: data.id 
    });

  } catch (error) {
    console.error('Errore invio email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore durante l\'invio dell\'email',
      error: error.message 
    });
  }
}
