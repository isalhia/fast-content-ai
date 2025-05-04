import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;
  const key = process.env.STABILITY_API_KEY;
  if (!prompt || !key) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        prompt,
        output_format: "jpeg",
        steps: 30,
        cfg_scale: 7,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const image = response.data?.image;
    if (!image) throw new Error("No image returned");

    res.status(200).send("Storyboard image generated.");
  } catch (error) {
    res.status(500).send("Stability API Error: " + error.message);
  }
}
