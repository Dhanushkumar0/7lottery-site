// LUCKY NUMBER GENERATOR
document.getElementById("generateLuckyNumbers").addEventListener("click", () => {
  const numbers = [];

  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 49) + 1;
    if (!numbers.includes(num)) numbers.push(num);
  }

  numbers.sort((a, b) => a - b);

  const reasons = [
    "Because today the stars are smiling at you 🌟",
    "Luck whispered your name in the winds 🍃",
    "These numbers danced in your dreams last night 💤",
    "Because the universe thinks you’re awesome 💫",
    "They came from a rainbow-colored butterfly 🦋",
  ];

  const reason = reasons[Math.floor(Math.random() * reasons.length)];

  document.getElementById("luckyNumbersOutput").innerHTML = `
    <h3>Your Lucky Numbers: [${numbers.join(", ")}]</h3>
    <p>Reason: ${reason}</p>
  `;
});

// HEADER SCROLL EFFECT
window.addEventListener("scroll", () => {
  const title = document.querySelector(".hero h2");
  const scrollY = window.scrollY;
  const fadeStart = 0;
  const fadeEnd = 200;

  if (scrollY <= fadeStart) {
    title.style.opacity = 1;
  } else if (scrollY >= fadeEnd) {
    title.style.opacity = 0;
  } else {
    title.style.opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
  }
});

// UPDATE DATE & TIME DISPLAY
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const formattedTime = now.toLocaleString('en-US', options);
  document.getElementById("currentDateTime").textContent = `As of: ${formattedTime}`;
}
updateDateTime();
setInterval(updateDateTime, 60000); // Refresh every 1 min

// HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ACTIVE NAV LINK
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// COIN ANIMATION
const coinContainer = document.querySelector('.coin-bg');
const numberOfCoins = 15;

for (let i = 0; i < numberOfCoins; i++) {
  const coin = document.createElement('img');
  coin.src = 'src/coin.png';
  coin.classList.add('coin');
  coin.style.width = `${Math.random() * 20 + 30}px`;
  coin.style.left = `${Math.random() * 100}%`;
  coin.style.animationDuration = `${5 + Math.random() * 5}s`;
  coin.style.animationDelay = `${Math.random() * 5}s`;
  coinContainer.appendChild(coin);
}

// SHOW RESULTS FROM GOOGLE SHEET CSV
function showResultsFromCSV(csvText) {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });

  const data = parsed.data;
  const container = document.querySelector('.lottery-results');
  container.innerHTML = ''; // Clear old results

  data.forEach(entry => {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-entry';
    resultDiv.innerHTML = `
      <span class="result-time">${entry.Time}</span>
      <span class="result-numbers">${entry.Numbers}</span>
    `;
    container.appendChild(resultDiv);
  });
}

// LOAD CSV ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQrdH7JWaj5vGTX42jc8CkUFsJ3mwMNUH0otPvuqPZt3MXk4lqRedt2RfSr9pJCANJtO99nwMx-MWRL/pub?output=csv&t=' + new Date().getTime())
    .then(res => res.text())
    .then(showResultsFromCSV)
    .catch(err => console.error('Failed to load spreadsheet:', err));
});
