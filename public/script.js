
document.getElementById("startStoryline").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch("/api/storyline", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  document.getElementById("storylineOutput").innerText = data.result || data.error;
});

document.getElementById("generateSummary").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch("/api/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  document.getElementById("summaryOutput").innerText = data.result || data.error;
});

document.getElementById("generateScript").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch("/api/script", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  document.getElementById("scriptOutput").innerText = data.result || data.error;
});

document.getElementById("createStoryboard").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch("/api/storyboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  const image = document.getElementById("storyboardImage");
  if (data.imageUrl) {
    image.src = data.imageUrl;
    image.style.display = "block";
  } else {
    image.style.display = "none";
    document.getElementById("storyboardOutput").innerText = data.error || "No image generated.";
  }
});
