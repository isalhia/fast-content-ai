
export default function Home() {
  return (
    <div className="container">
      <img src="/fast-films-logo.png" alt="Fast Films Logo" className="logo" />
      <h1>Fast Content AI Portal</h1>
      <div className="prompt-container">
        <input type="text" id="prompt" placeholder="Enter your prompt here..." />
        <div className="button-row">
          <button id="storylineBtn">Start Storyline</button>
        </div>
      </div>
      <div id="output" className="output"></div>
      <p className="footer">Powered by Fast Films — <em>Let us tell your story.</em><span className="red-dot"></span></p>
      <script src="/script.js"></script>
    </div>
  );
}
