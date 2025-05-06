
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Generate a storyline for: ${prompt}` }],
    });
    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "OpenAI error", details: err.message });
  }
}
