
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fast Content AI Portal</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <img src="/fast-films-logo.png" alt="Fast Films Logo" className="logo" />
      <h1>Powered by Fast Films — <em>Let us tell your story.</em><span className="red-dot"></span></h1>
      <input id="prompt" type="text" placeholder="Enter your story prompt here..." />
      <div>
        <button id="storylineBtn">Start Storyline</button>
        <button id="summaryBtn">Generate Summary</button>
        <button id="scriptBtn">Generate Script</button>
        <button id="storyboardBtn">Create Storyboard</button>
      </div>
      <div id="output"></div>
      <script src="/script.js"></script>
    </div>
  );
}
