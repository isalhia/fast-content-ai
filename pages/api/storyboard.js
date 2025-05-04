export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const key = process.env.STABILITY_API_KEY;
  if (!key) return res.status(500).send("Server Error: Missing STABILITY_API_KEY");

  const { prompt } = req.body;
  if (!prompt) return res.status(400).send("Client Error: Missing prompt in request body");

  try {
    const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "core",
        prompt,
        aspect_ratio: "16:9"
      })
    });

    const data = await response.json();
    if (data && data.artifacts && data.artifacts.length > 0) {
      res.status(200).send(data.artifacts[0].url);
    } else {
      throw new Error("No image returned");
    }
  } catch (err) {
    res.status(500).send("Stability API Error: " + err.message);
  }
}
