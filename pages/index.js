
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
      fontFamily: "system-ui",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "4rem", margin: 0, fontWeight: "bold" }}>FAST</h1>
        <h2 style={{ fontSize: "3rem", marginTop: "0.2rem", fontWeight: 300 }}>Films</h2>
        <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
          Powered by Fast Films — <i>Let us tell your story.</i>
          <span style={{
            background: "red",
            display: "inline-block",
            marginLeft: "0.5rem",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            boxShadow: "0 0 8px red"
          }}></span>
        </p>
      </div>

      <input
        type="text"
        placeholder="Type your story idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "10px",
          border: "none",
          marginBottom: "1.5rem"
        }}
      />

      <div style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "2rem"
      }}>
        <button onClick={() => callAPI("storyline")} style={buttonStyle}>Start Storyline</button>
        <button onClick={() => callAPI("summary")} style={buttonStyle}>Generate Summary</button>
        <button onClick={() => callAPI("script")} style={buttonStyle}>Generate Script</button>
        <button onClick={() => callAPI("storyboard")} style={buttonStyle}>Create Storyboard</button>
      </div>

      {loading && <p style={{ color: "#0ff" }}>⏳ Generating...</p>}

      {!loading && output && (
        <div style={{ maxWidth: "800px", width: "100%", marginTop: "1rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Output</h3>
          {editable ? (
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#111",
                color: "#0f0",
                padding: "1rem",
                borderRadius: "8px",
                fontSize: "1rem"
              }}
            />
          ) : (
            <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{output}</pre>
          )}
        </div>
      )}
    </main>
  );
}

const buttonStyle = {
  padding: "0.8rem 1.2rem",
  backgroundColor: "#111",
  border: "1px solid #fff",
  color: "#fff",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer"
};
