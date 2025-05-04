
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
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
          className="logo"
        />
        <input
          id="prompt"
          className="prompt-input"
          placeholder="Type your cinematic prompt here..."
        />
        <div className="button-group">
          <button onClick={() => callApi("/api/storyline")}>Start Storyline</button>
          <button onClick={() => callApi("/api/summary")}>Generate Summary</button>
          <button onClick={() => callApi("/api/script")}>Generate Script</button>
          <button onClick={() => callApi("/api/storyboard")}>Create Storyboard</button>
        </div>
        <div className="output">
          <pre>{output}</pre>
        </div>
        <div className="footer">
          Powered by Fast Films —
          <span className="tagline"> Let us tell your story.</span>
          <span className="dot" />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #000;
          color: #fff;
          padding: 2rem;
          text-align: center;
        }
        .logo {
          margin-bottom: 1rem;
        }
        .prompt-input {
          width: 100%;
          max-width: 500px;
          padding: 10px;
          margin: 1rem 0;
          font-size: 1.1rem;
          border-radius: 8px;
        }
        .button-group button {
          background-color: #222;
          color: #fff;
          padding: 0.75rem 1.5rem;
          margin: 0.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s ease;
        }
        .button-group button:hover {
          background-color: #333;
        }
        .output {
          white-space: pre-wrap;
          background-color: #111;
          padding: 1rem;
          margin-top: 1rem;
          max-width: 700px;
          border-radius: 10px;
        }
        .footer {
          margin-top: 2rem;
          font-size: 0.9rem;
        }
        .tagline {
          font-style: italic;
          margin-left: 5px;
        }
        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
          margin-left: 5px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
