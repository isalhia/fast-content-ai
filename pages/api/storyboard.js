export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const key = process.env.STABILITY_API_KEY;
  if (!key) return res.status(500).send("Server Error: Missing STABILITY_API_KEY");

  const { prompt } = req.body;
  if (!prompt) return res.status(400).send("Client Error: Missing prompt in request body");

  try {
    const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-512-v2-1/text-to-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        samples: 1,
        steps: 30
      })
    });

    if (!response.ok) throw new Error("Stability API Error");

    const data = await response.json();
    res.status(200).send("Storyboard image created (mock response for now).");
  } catch (err) {
    res.status(500).send("Stability API Error: " + err.message);
  }
}