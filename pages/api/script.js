
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: `Write a script for: ${prompt}` }],
    });

    return res.status(200).json({
      message: completion.data.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ error: 'OpenAI API Error', details: error.message });
  }
}
