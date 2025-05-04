
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState("");

  const callApi = async (endpoint) => {
    const prompt = document.getElementById("prompt").value;
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const text = await res.text();
      setOutput(text);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Fast Content AI</title>
      </Head>
      <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', textAlign: 'center', paddingTop: '50px' }}>
        <img src="/fast-films-logo.png" alt="Fast Films Logo" style={{ width: '150px', marginBottom: '20px' }} />
        <p style={{ fontStyle: 'italic' }}>
          Powered by Fast Films — Let us tell your story.
          <span style={{ color: 'red', marginLeft: '8px' }}>●</span>
        </p>
        <input id="prompt" type="text" placeholder="Enter your prompt..." style={{ padding: '10px', width: '80%', marginBottom: '20px' }} />
        <div>
          <button onClick={() => callApi("/api/storyline")}>Start Storyline</button>
          <button onClick={() => callApi("/api/summary")}>Generate Summary</button>
          <button onClick={() => callApi("/api/script")}>Generate Script</button>
          <button onClick={() => callApi("/api/storyboard")}>Create Storyboard</button>
        </div>
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>{output}</pre>
      </div>
    </>
  );
}
