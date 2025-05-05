export default function Home() {
  return (
    <main>
      <div className="container">
        <img src="/fast-films-logo.png" alt="Fast Films Logo" className="logo" />
        <h1 className="title">Powered by Fast Films — <em>Let us tell your story.</em><span className="dot"></span></h1>
        <textarea id="prompt" placeholder="Enter your story idea here..."></textarea>
        <div className="buttons">
          <button id="storylineBtn">Generate Storyline</button>
          <button id="summaryBtn">Generate Summary</button>
          <button id="scriptBtn">Generate Script</button>
          <button id="storyboardBtn">Generate Storyboard</button>
        </div>
        <div id="output"></div>
      </div>
      <script src="/script.js"></script>
    </main>
  );
}