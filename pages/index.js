
import Head from "next/head";
import Image from "next/image";
import "@/styles/globals.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fast Content AI Portal</title>
        <meta name="description" content="Powered by Fast Films — Let us tell your story." />
      </Head>
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <Image
          src="/fast-films-logo.png"
          alt="Fast Films Logo"
          width={300}
          height={100}
          className="mb-6"
        />
        <p className="text-lg italic mb-2 text-center">
          Powered by Fast Films — <span className="italic">Let us tell your story.</span>
          <span className="ml-2 h-2 w-2 inline-block rounded-full bg-red-500 animate-pulse"></span>
        </p>

        <input
          id="prompt"
          type="text"
          placeholder="Type your idea here..."
          className="w-full max-w-xl px-4 py-2 text-black rounded mb-4"
        />

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button id="storylineBtn" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Start Storyline</button>
          <button id="summaryBtn" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Generate Summary</button>
          <button id="scriptBtn" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Generate Script</button>
          <button id="storyboardBtn" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Create Storyboard</button>
        </div>

        <div id="output" className="w-full max-w-3xl whitespace-pre-wrap bg-gray-900 p-4 rounded text-sm"></div>

        <script src="/script.js" defer></script>
      </main>
    </>
  );
}
