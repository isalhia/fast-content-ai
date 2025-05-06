import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const key = process.env.STABILITY_API_KEY;
  const { prompt } = req.body;
  if (!key || !prompt) return res.status(400).send("Missing API Key or prompt");

  try {
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        prompt,
        output_format: "png",
        model: "stable-diffusion-xl-v1-0",
        steps: 30,
        cfg_scale: 7
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const imageUrl = response.data.image;
    res.status(200).json({ imageUrl });
  } catch (err) {
    res.status(500).send("Stability API Error: " + err.message);
  }
}
