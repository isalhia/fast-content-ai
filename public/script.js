async function fetchData(endpoint) {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  alert(data.result || "Success!");
}

function generateStoryline() { fetchData("storyline"); }
function generateSummary() { fetchData("summary"); }
function generateScript() { fetchData("script"); }
function generateStoryboard() { fetchData("storyboard"); }
