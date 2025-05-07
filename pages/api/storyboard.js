
import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { input } = req.body;

    const formData = new FormData();
    formData.append("prompt", input);
    formData.append("samples", "1");
    formData.append("style_preset", "photographic");
    formData.append("cfg_scale", "7");
    formData.append("steps", "30");

    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`
        },
        responseType: "json"
      }
    );

    const imageUrl = response.data.artifacts?.[0]?.base64
      ? `data:image/png;base64,${response.data.artifacts[0].base64}`
      : null;

    if (!imageUrl) {
      throw new Error("Image generation failed");
    }

    res.status(200).json({ image: imageUrl });
  } catch (error) {
    console.error("Stability API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
}
