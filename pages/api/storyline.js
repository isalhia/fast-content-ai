import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a cinematic story developer. Write a short story idea based on the prompt.",
        },
        { role: "user", content: prompt },
      ],
    });

    const result = completion.data.choices[0].message.content;
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("OpenAI Error: " + error.message);
  }
}
