const images = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png"];
let cards = [...images, ...images];
cards.sort(() => 0.5 - Math.random());
let board = document.getElementById("game-board");
let flipped = [];
let lock = false;
let timerStarted = false;
let seconds = 0;
let interval;

cards.forEach(img => {
  const card = document.createElement("div");
  card.classList.add("card");
  const image = document.createElement("img");
  image.src = `images/${img}`;
  card.appendChild(image);

  card.addEventListener("click", () => {
    if (lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;
    if (!timerStarted) startTimer();

    card.classList.add("flipped");
    flipped.push(card);

    if (flipped.length === 2) {
      lock = true;
      const [a, b] = flipped;
      if (a.querySelector("img").src === b.querySelector("img").src) {
        a.classList.add("matched");
        b.classList.add("matched");
        flipped = [];
        lock = false;
      } else {
        setTimeout(() => {
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          flipped = [];
          lock = false;
        }, 800);
      }
    }

    if (document.querySelectorAll(".matched").length === cards.length) {
      clearInterval(interval);
      setTimeout(showPopup, 400);
    }
  });
  board.appendChild(card);
});

function startTimer() {
  timerStarted = true;
  interval = setInterval(() => {
    seconds++;
    document.getElementById("time").textContent = seconds;
  }, 1000);
  document.getElementById("subtitle").style.display = "none";
  const music = document.getElementById("bg-music");
  if (music) music.play().catch(() => {});
}
function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
    const btn = document.getElementById("nextLevelBtn");
    btn.addEventListener("click", () => {
      const name = document.getElementById("playerName").value.trim();
      if (!name) return alert("Please enter your name");
  
      localStorage.setItem("playerName", name);
      localStorage.setItem("levelPassed", "1");
      localStorage.setItem("level1Time", seconds); // 🕐 Сохраняем время 1 уровня
      window.location.href = "level2.html";
    }, { once: true });
  }
  function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
    const btn = document.getElementById("nextLevelBtn");
    btn.addEventListener("click", () => {
      const name = document.getElementById("playerName").value.trim();
      if (!name) return alert("Please enter your name");
      localStorage.setItem("playerName", name);
      localStorage.setItem("levelPassed", "1");
      localStorage.setItem("level1Time", seconds);
      window.location.href = "level2.html";
    }, { once: true });
  }
  const music = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("toggleMusic");
  const volumeSlider = document.getElementById("volumeControl");
  
  volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
  });
  
  let isPlaying = true;
  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      toggleBtn.textContent = "🔇";
    } else {
      music.play();
      toggleBtn.textContent = "🔈";
    }
    isPlaying = !isPlaying;
  });
    
  