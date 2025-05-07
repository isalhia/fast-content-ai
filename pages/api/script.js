
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a screenwriter helping generate short cinematic scripts."
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0.7
    });

    res.status(200).json({ result: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error in /api/script:", error);
    res.status(500).json({ error: "Failed to generate script" });
  }
}
