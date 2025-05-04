
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState("");

  async function callApi(endpoint) {
    const prompt = document.getElementById("prompt").value;
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
      const text = await res.text();
      setOutput(text);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  return (
    <>
      <Head>
        <title>Fast Content AI Portal</title>
      </Head>
      <div className="container">
        <Image
          src="/fast-films-logo.png"
          alt="Fast Films Logo"
          width={120}
          height={120}
        />
        <input id="prompt" placeholder="Type your cinematic prompt..." />
        <div className="buttons">
          <button onClick={() => callApi("/api/storyline")}>Start Storyline</button>
          <button onClick={() => callApi("/api/summary")}>Generate Summary</button>
          <button onClick={() => callApi("/api/script")}>Generate Script</button>
          <button onClick={() => callApi("/api/storyboard")}>Create Storyboard</button>
        </div>
        <pre>{output}</pre>
        <p className="footer">
          Powered by Fast Films — <em>Let us tell your story.</em>
          <span className="dot" />
        </p>
      </div>
      <style jsx>{`
        .container {
          background: #000;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
        }
        input {
          margin: 1rem 0;
          padding: 0.5rem;
          width: 300px;
        }
        .buttons button {
          margin: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .footer {
          margin-top: 2rem;
          font-size: 0.9rem;
        }
        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
          margin-left: 5px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
