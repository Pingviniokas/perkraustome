import OpenAI from 'openai';
import { movingCompanyInfo } from '../../config/chatbotConfig';

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
          content: movingCompanyInfo.systemMessage
        },
        {
          role: "user",
          content: req.body.message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return res.status(200).json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
