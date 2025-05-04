
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const key = process.env.STABILITY_API_KEY;
  if (!key) return res.status(500).send("Server Error: Missing STABILITY_API_KEY");

  const { prompt } = req.body;
  if (!prompt) return res.status(400).send("Client Error: Missing prompt in request body");

  try {
    const response = await axios.post("https://api.stability.ai/v2beta/stable-image/generate/core", {
      prompt,
      model: "stable-diffusion-xl-v1-0",
    }, {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).send("Stability API Error: " + err.message);
  }
}
