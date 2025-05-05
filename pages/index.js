import Head from "next/head";

export default function Home() {
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
        <input type="text" placeholder="Type your story idea…" id="prompt" />
        <div className="button-container">
          <button onclick="generateStoryline()">Start Storyline</button>
          <button onclick="generateSummary()">Generate Summary</button>
          <button onclick="generateScript()">Generate Script</button>
          <button onclick="generateStoryboard()">Create Storyboard</button>
        </div>
      </div>
      <script src="/script.js"></script>
    </>
  );
}
