import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a helpful moving company assistant. Help customers with moving quotes, services, and scheduling."
      }, {
        role: "user",
        content: req.body.message
      }],
    });

    return res.status(200).json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
