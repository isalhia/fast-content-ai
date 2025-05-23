
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: `Give a short cinematic film treatment based on: ${prompt}` }],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content || "No output";
    res.status(200).json({ output });
  } catch (error) {
    console.error("Summary API error:", error);
    res.status(500).json({ error: "Summary generation failed" });
  }
}
