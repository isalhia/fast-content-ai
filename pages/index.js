
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async (type) => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const output = data.result || data.script || data.summary || data.storyline || data.image || JSON.stringify(data);
      setResponse(output);
    } catch (err) {
      setResponse(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Fast Content AI Portal</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleClick('storyline')}>Storyline</button>
        <button onClick={() => handleClick('summary')}>Summary</button>
        <button onClick={() => handleClick('script')}>Script</button>
        <button onClick={() => handleClick('storyboard')}>Storyboard</button>
      </div>
      {loading && <p>Loading...</p>}
      {response && <pre style={{ whiteSpace: 'pre-wrap' }}>{response}</pre>}
    </div>
  );
}
