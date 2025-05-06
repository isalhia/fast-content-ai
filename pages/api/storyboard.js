import { StabilityAI } from "stability-sdk";

const stability = new StabilityAI({
  apiKey: process.env.STABILITY_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await stability.textToImage({
      engine: "stable-diffusion-xl-1024-v1-0",
      prompt: prompt,
      cfg_scale: 10,
      steps: 30,
      width: 1024,
      height: 576,
    });

    const imageUrl = response.artifacts[0]?.url;

    if (!imageUrl) {
      return res.status(500).json({ error: "No image generated." });
    }

    return res.status(200).json({ image: imageUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Image generation failed." });
  }
}