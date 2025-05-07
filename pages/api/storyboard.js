// pages/api/storyboard.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      {
        prompt,
        output_format: 'png',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const imageUrl = response.data.image;
    res.status(200).json({ image: imageUrl });
  } catch (error) {
    console.error('Stability AI Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
}
