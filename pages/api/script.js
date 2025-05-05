import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).send("Server Error: Missing OPENAI_API_KEY");

  const { prompt } = req.body;
  if (!prompt) return res.status(400).send("Client Error: Missing prompt in request body");

  try {
    const configuration = new Configuration({ apiKey: key });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Write the opening scene for a screenplay based on this idea." },
        { role: "user", content: prompt }
      ]
    });

    const result = response.data.choices[0].message.content;
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("OpenAI Error: " + err.message);
  }
}