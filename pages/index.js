
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Fast Content AI Portal</title>
      </Head>
      <main>
        <img src="/fast-films-logo.png" alt="Fast Films Logo" className="logo" />
        <p className="tagline">
          Powered by Fast Films — <em>Let us tell your story.</em>
          <span className="red-dot"></span>
        </p>
        <input type="text" id="prompt" placeholder="Enter your idea..." />
        <div className="button-group">
          <button id="storylineBtn">Start Storyline</button>
          <button id="summaryBtn">Generate Summary</button>
          <button id="scriptBtn">Generate Script</button>
          <button id="storyboardBtn">Create Storyboard</button>
        </div>
        <div id="output" className="output-box"></div>
      </main>
      <Script src="/script.js" />
    </div>
  );
}
