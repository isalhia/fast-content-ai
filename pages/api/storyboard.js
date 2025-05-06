
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/sdxl',
      {
        prompt,
        aspect_ratio: '16:9',
        output_format: 'url'
      },
      {
        headers: {
          Authorization: 'Bearer sk-HAs63zm6nyA8nW0YSSMh9F74aIN0KXmNKmKMLMjbBIQ0ySIU',
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrl = response?.data?.image;

    if (!imageUrl) {
      return res.status(500).json({ error: 'Image generation failed' });
    }

    return res.status(200).json({ image: imageUrl });

  } catch (error) {
    console.error('Stability AI Error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Image generation failed' });
  }
}
