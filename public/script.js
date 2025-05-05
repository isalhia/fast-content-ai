
document.addEventListener("DOMContentLoaded", () => {
  const promptInput = document.getElementById("prompt");
  const outputArea = document.getElementById("output");

  const callApi = async (endpoint) => {
    const prompt = promptInput.value;
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const text = await res.text();
      outputArea.innerHTML = `<pre>${text}</pre>`;
    } catch (err) {
      outputArea.innerHTML = `<pre>Error: ${err.message}</pre>`;
    }
  };

  document.getElementById("storylineBtn")?.addEventListener("click", () => {
    callApi("/api/storyline");
  });

  document.getElementById("summaryBtn")?.addEventListener("click", () => {
    callApi("/api/summary");
  });

  document.getElementById("scriptBtn")?.addEventListener("click", () => {
    callApi("/api/script");
  });

  document.getElementById("storyboardBtn")?.addEventListener("click", () => {
    callApi("/api/storyboard");
  });
});
