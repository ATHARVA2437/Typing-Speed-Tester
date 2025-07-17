const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const resetBtn = document.getElementById("reset");

let startTime;
let timerInterval;
let timeLimit = 60;

function getRandomQuote() {
  return fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => data.content);
}

function startTimer() {
  startTime = new Date();
  timer.textContent = `Time: ${timeLimit}s`;

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    const timeLeft = timeLimit - elapsed;

    timer.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      quoteInput.disabled = true;
      calculateResults();
    }
  }, 1000);
}

function calculateResults() {
  const enteredText = quoteInput.value.trim();
  const quoteText = quoteDisplay.innerText.trim();

  const totalWords = enteredText.split(/\s+/).filter(word => word).length;
  const elapsedTime = Math.floor((new Date() - startTime) / 1000) || 1;
  const wpm = Math.round((totalWords / elapsedTime) * 60);
  wpmDisplay.textContent = `WPM: ${wpm}`;

  let correctChars = 0;
  const minLen = Math.min(enteredText.length, quoteText.length);

  for (let i = 0; i < minLen; i++) {
    if (enteredText[i] === quoteText[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / quoteText.length) * 100);
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

function renderNewQuote() {
  getRandomQuote().then(quote => {
    quoteDisplay.innerText = quote;
    quoteInput.value = "";
    quoteInput.disabled = false;
    quoteInput.focus();
    clearInterval(timerInterval);
    startTimer();
    wpmDisplay.textContent = "WPM: 0";
    accuracyDisplay.textContent = "Accuracy: 0%";
  });
}

quoteInput.addEventListener("input", () => {
  const enteredText = quoteInput.value;
  const quoteText = quoteDisplay.innerText;

  if (enteredText === quoteText) {
    clearInterval(timerInterval);
    calculateResults();
    quoteInput.disabled = true;
  }
});

resetBtn.addEventListener("click", () => {
  renderNewQuote();
});
