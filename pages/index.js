
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [editable, setEditable] = useState(false);

  const callAPI = async (route) => {
    try {
      const res = await fetch(`/api/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOutput(data.output || data.image || "Error");
      setEditable(true);
    } catch (err) {
      console.error(err);
      setOutput("Something went wrong.");
    }
  };

  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "2rem", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: "2rem" }}>🎬 Fast Content AI Portal</h1>
      <textarea
        rows={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your idea..."
        style={{ width: "100%", padding: "1rem", marginBottom: "1rem" }}
      />
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button onClick={() => callAPI("storyline")}>Start Storyline</button>
        <button onClick={() => callAPI("summary")}>Generate Summary</button>
        <button onClick={() => callAPI("script")}>Generate Script</button>
        <button onClick={() => callAPI("storyboard")}>Create Storyboard</button>
      </div>
      <hr style={{ margin: "2rem 0" }} />
      {output && (
        <>
          <h3>Output</h3>
          {editable ? (
            <textarea value={output} onChange={(e) => setOutput(e.target.value)} style={{ width: "100%", height: "300px" }} />
          ) : (
            <p>{output}</p>
          )}
        </>
      )}
    </main>
  );
}
