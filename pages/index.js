
import Head from 'next/head';
import '@/styles/globals.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fast Content AI</title>
      </Head>
      <div className="container">
        <img src="/fast-films-logo.png" alt="Fast Films Logo" className="logo" />
        <p className="tagline">Powered by Fast Films — <em>Let us tell your story.</em><span className="red-dot">●</span></p>
        <input type="text" id="prompt" placeholder="Enter your cinematic idea here..." />
        <div className="button-group">
          <button id="storylineBtn">Start Storyline</button>
          <button id="summaryBtn">Generate Summary</button>
          <button id="scriptBtn">Generate Script</button>
          <button id="storyboardBtn">Create Storyboard</button>
        </div>
        <div id="output"></div>
        <script src="/script.js"></script>
      </div>
    </>
  );
}
