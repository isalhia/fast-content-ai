document.getElementById("storylineBtn").addEventListener("click", async () => {
  await callApi("/api/storyline");
});
document.getElementById("summaryBtn").addEventListener("click", async () => {
  await callApi("/api/summary");
});
document.getElementById("scriptBtn").addEventListener("click", async () => {
  await callApi("/api/script");
});
document.getElementById("storyboardBtn").addEventListener("click", async () => {
  await callApi("/api/storyboard");
});
async function callApi(endpoint) {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) {
    alert("Please enter a prompt.");
    return;
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const text = await res.text();
    document.getElementById("output").innerHTML = `<pre>${text}</pre>`;
  } catch (err) {
    document.getElementById("output").innerHTML = `<pre>Error: ${err.message}</pre>`;
  }
}
