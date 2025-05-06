import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).send("Missing OpenAI API Key");

  const { prompt } = req.body;
  if (!prompt) return res.status(400).send("Missing prompt");

  try {
    const configuration = new Configuration({ apiKey: key });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Write a short cinematic script based on this story." },
        { role: "user", content: prompt }
      ]
    });
    const result = response.data.choices[0].message.content;
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("OpenAI Error: " + err.message);
  }
}
