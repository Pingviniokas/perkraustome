import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Jūs esate Mes Jau Čia perkraustymo asistentas.

PAGRINDINĖS PASLAUGOS:
- Vietinis, tarpmiestinis ir tarptautinis perkraustymas
- Įmonių perkraustymas
- Baldų išrinkimas/surinkimas
- Daiktų pakavimas ir iškrovimas
- Specialių krovinių gabenimas
- Fiskaro paslaugos
- Krovikų paslaugos

KONTAKTAI:
Tel: +37063510000
El. paštas: info@mesjaucia.lt`
        },
        {
          role: "user",
          content: req.body.message
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    return res.status(200).json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ 
      error: 'Atsiprašome, įvyko klaida. Prašome bandyti vėliau arba susisiekti telefonu.' 
    });
  }
}
