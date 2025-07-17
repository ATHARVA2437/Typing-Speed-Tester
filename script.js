const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let timer;
let startTime;
let currentQuote = "";

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests help improve your speed and accuracy.",
  "Practice makes a person perfect.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Simplicity is the soul of efficiency."
];

function startTest() {
  quoteInput.disabled = false;
  quoteInput.value = "";
  quoteInput.focus();
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = currentQuote;

  timerEl.textContent = 0;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;

  startTime = new Date();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetTest() {
  clearInterval(timer);
  timerEl.textContent = 0;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;
  quoteDisplay.textContent = 'Click "Start Test" to begin typing.';
  quoteInput.value = "";
  quoteInput.disabled = true;
}

function updateTimer() {
  const timeElapsed = Math.floor((new Date() - startTime) / 1000);
  timerEl.textContent = timeElapsed;
}
