
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fast Content AI Portal</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <div class="container">
    <img src="/fast-films-logo.png" alt="Fast Films Logo" class="logo" />
    <p class="tagline">Powered by Fast Films — <em>Let us tell your story.</em> <span class="dot">🔴</span></p>
    <input type="text" id="prompt" placeholder="Type your story idea..." />
    <div class="buttons">
      <button id="storylineBtn">Start Storyline</button>
      <button id="summaryBtn">Generate Summary</button>
      <button id="scriptBtn">Generate Script</button>
      <button id="storyboardBtn">Create Storyboard</button>
    </div>
    <div id="output"></div>
  </div>
  <script src="/script.js"></script>
</body>
</html>
