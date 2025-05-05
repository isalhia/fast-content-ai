import Head from "next/head";
import Image from "next/image";
import logo from "../public/fast-films-logo.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fast Content AI Portal</title>
        <meta name="description" content="AI-powered cinematic content generator" />
      </Head>
      <main className="container">
        <Image src={logo} alt="Fast Films Logo" width={120} height={120} />
        <h1>Fast Content AI Portal</h1>
        <textarea id="prompt" placeholder="Enter your idea here..." />
        <div className="buttons">
          <button id="storylineBtn">Start Storyline</button>
          <button id="summaryBtn">Generate Summary</button>
          <button id="scriptBtn">Generate Script</button>
          <button id="storyboardBtn">Create Storyboard</button>
        </div>
        <div id="output"></div>
      </main>
    </>
  );
}