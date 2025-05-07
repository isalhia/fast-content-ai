import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async (endpoint) => {
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.result || data.image || JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    }
  };

  return (
    <>
      <Head>
        <title>Fast Content AI Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <img src="/fast-films-logo.png" alt="Fast Films Logo" className="logo" />
        <p className="tagline">
          Powered by Fast Films — <em>Let us tell your story.</em>
          <span className="dot"></span>
        </p>
        <input
          type="text"
          placeholder="Type your story idea…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="button-container">
          <button onClick={() => handleGenerate("storyline")}>Start Storyline</button>
          <button onClick={() => handleGenerate("summary")}>Generate Summary</button>
          <button onClick={() => handleGenerate("script")}>Generate Script</button>
          <button onClick={() => handleGenerate("storyboard")}>Create Storyboard</button>
        </div>
        {response && <div className="response-box">{response}</div>}
      </div>
    </>
  );
}