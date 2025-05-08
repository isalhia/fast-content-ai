
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("width", "1024");
    formData.append("height", "576");
    formData.append("steps", "30");
    formData.append("cfg_scale", "7");
    formData.append("samples", "1");

    const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`
      },
      body: formData
    });

    const data = await response.json();
    if (data.message || !data.artifacts?.[0]?.base64) throw new Error(data.message || "No image generated");

    res.status(200).json({ image: `data:image/png;base64,${data.artifacts[0].base64}` });
  } catch (error) {
    console.error("Storyboard error:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
}
