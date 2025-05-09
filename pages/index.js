
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const callAPI = async (route) => {
    setLoading(true);
    setEditable(false);
    setOutput("");
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
    setLoading(false);
  };

  return (
    <main style={{
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "monospace"
    }}>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        borderBottom: "1px solid #444",
        paddingBottom: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img src="/fast-films-logo.png" alt="Fast Films" style={{ height: "40px" }} />
          <h1 style={{ fontSize: "1.8rem", margin: 0 }}>Fast Content AI Portal</h1>
        </div>
        <span style={{
          background: "red",
          borderRadius: "50%",
          width: "12px",
          height: "12px",
          display: "inline-block",
          boxShadow: "0 0 8px red"
        }} />
      </header>

      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a scene or idea (e.g. The lady in the garden)..."
        style={{
          width: "100%",
          padding: "1rem",
          marginBottom: "1rem",
          fontSize: "1rem",
          backgroundColor: "#111",
          border: "1px solid #444",
          color: "#fff"
        }}
      />
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <button onClick={() => callAPI("storyline")}>Start Storyline</button>
        <button onClick={() => callAPI("summary")}>Generate Summary</button>
        <button onClick={() => callAPI("script")}>Generate Script</button>
        <button onClick={() => callAPI("storyboard")}>Create Storyboard</button>
      </div>

      {loading && <p style={{ marginTop: "2rem", color: "#0ff" }}>⏳ Generating...</p>}

      {!loading && output && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Output</h3>
          {editable ? (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              style={{ width: "100%", height: "300px", backgroundColor: "#111", color: "#0f0" }}
            />
          ) : (
            <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{output}</pre>
          )}
        </div>
      )}
    </main>
  );
}
