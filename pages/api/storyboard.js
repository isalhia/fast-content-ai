
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const image = `https://fake-image-generator.com/rendered?prompt=${encodeURIComponent(prompt)}`;
    return res.status(200).json({ image });
  } catch (error) {
    console.error('Image generation error:', error);
    return res.status(500).json({ error: 'Failed to generate storyboard' });
  }
}
