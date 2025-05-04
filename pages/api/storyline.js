
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a cinematic story developer. Write a short story idea based on the prompt." },
        { role: "user", content: prompt }
      ]
    });

    res.status(200).send(response.choices[0].message.content);
  } catch (err) {
    res.status(500).send("OpenAI Error: " + err.message);
  }
}
