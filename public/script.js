
document.addEventListener('DOMContentLoaded', () => {
  const buttons = [
    { id: 'storylineBtn', endpoint: '/api/storyline', outputId: 'storylineOutput' },
    { id: 'summaryBtn', endpoint: '/api/summary', outputId: 'summaryOutput' },
    { id: 'scriptBtn', endpoint: '/api/script', outputId: 'scriptOutput' },
    { id: 'storyboardBtn', endpoint: '/api/storyboard', outputId: 'storyboardOutput', isImage: true }
  ];

  buttons.forEach(({ id, endpoint, outputId, isImage }) => {
    const btn = document.getElementById(id);
    const output = document.getElementById(outputId);

    if (btn && output) {
      btn.addEventListener('click', async () => {
        const userInput = document.getElementById('userInput').value.trim();
        if (!userInput) {
          output.innerHTML = '<p style="color:red;">Please enter a prompt first.</p>';
          return;
        }

        try {
          output.innerHTML = '<p>Loading...</p>';
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: userInput })
          });

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          if (isImage) {
            const { imageUrl } = await response.json();
            output.innerHTML = imageUrl ? `<img src="${imageUrl}" alt="Generated Image" style="max-width:100%;">` : '<p>No image returned.</p>';
          } else {
            const { result } = await response.json();
            output.innerText = result || 'No result returned.';
          }
        } catch (error) {
          console.error('Fetch error:', error);
          output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        }
      });
    }
  });
});
