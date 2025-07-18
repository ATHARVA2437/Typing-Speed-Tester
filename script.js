const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const newQuoteButton = document.getElementById("new-quote");
const resetButton = document.getElementById("reset");

let time = 60;
let timer = null;
let correctChars = 0;
let totalChars = 0;
let currentQuote = "";
let timeElapsed = 0;

// Offline list of quotes
const offlineQuotes = [
  "Stay hungry, stay foolish.",
  "The best way to get started is to quit talking and begin doing.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Do what you can with all you have, wherever you are.",
  "Act as if what you do makes a difference. It does.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "Hardships often prepare ordinary people for an extraordinary destiny."
];

function getQuote() {
  currentQuote = offlineQuotes[Math.floor(Math.random() * offlineQuotes.length)];
  quoteDisplay.textContent = currentQuote;
  quoteInput.value = "";
  resetStats();
}

function resetStats() {
  time = 60;
  timeElapsed = 0;
  correctChars = 0;
  totalChars = 0;
  timerDisplay.textContent = `Time: ${time}s`;
  wpmDisplay.textContent = `WPM: 0`;
  accuracyDisplay.textContent = `Accuracy: 0%`;
  clearInterval(timer);
  timer = null;
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    timeElapsed++;
    timerDisplay.textContent = `Time: ${time}s`;
    if (time <= 0) clearInterval(timer);
  }, 1000);
}

function updateStats() {
  if (timeElapsed === 0) {
    wpmDisplay.textContent = `WPM: 0`;
    accuracyDisplay.textContent = `Accuracy: 0%`;
    return;
  }
  const wpm = Math.round((correctChars / 5) / (timeElapsed / 60));
  const accuracy = Math.round((correctChars / totalChars) * 100) || 0;
  wpmDisplay.textContent = `WPM: ${wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
}

quoteInput.addEventListener("input", () => {
  const typedText = quoteInput.value;
  totalChars = typedText.length;

  correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentQuote[i]) correctChars++;
  }

  if (!timer) startTimer();
  updateStats();
});

newQuoteButton.addEventListener("click", getQuote);
resetButton.addEventListener("click", getQuote);

// Load the first quote
getQuote();
