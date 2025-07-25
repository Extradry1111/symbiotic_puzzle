if (localStorage.getItem("levelPassed") !== "1") {
    window.location.href = "index.html";
  }
  
  const images2 = [
    "image1.png", "image2.png", "image3.png", "image4.png",
    "image5.png", "image6.png", "image7.png", "image8.png",
    "image9.png", "image10.png"
  ];
  let cards2 = [...images2, ...images2];
  cards2.sort(() => 0.5 - Math.random());
  let board2 = document.getElementById("game-board2");
  let flipped2 = [];
  let lock2 = false;
  let timerStarted2 = false;
  let seconds2 = 0;
  let interval2;
  
  cards2.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");
    const image = document.createElement("img");
    image.src = `images/${img}`;
    card.appendChild(image);
  
    card.addEventListener("click", () => {
      if (lock2 || card.classList.contains("flipped") || card.classList.contains("matched")) return;
      if (!timerStarted2) startTimer2();
  
      card.classList.add("flipped");
      flipped2.push(card);
  
      if (flipped2.length === 2) {
        lock2 = true;
        const [a, b] = flipped2;
        if (a.querySelector("img").src === b.querySelector("img").src) {
          a.classList.add("matched");
          b.classList.add("matched");
          flipped2 = [];
          lock2 = false;
        } else {
          setTimeout(() => {
            a.classList.remove("flipped");
            b.classList.remove("flipped");
            flipped2 = [];
            lock2 = false;
          }, 800);
        }
      }
  
      if (document.querySelectorAll(".matched").length === cards2.length) {
        clearInterval(interval2);
        setTimeout(() => document.getElementById("popup2").classList.remove("hidden"), 400);
      }
    });
    board2.appendChild(card);
  });
  
  function startTimer2() {
    timerStarted2 = true;
    interval2 = setInterval(() => {
      seconds2++;
      document.getElementById("time2").textContent = seconds2;
    }, 1000);
  }
  
  function saveScore() {
    const name = document.getElementById("playerName2").value.trim();
    if (!name) return alert("Enter name");
    localStorage.setItem("finalPlayerName", name);
    localStorage.setItem("finalTime", seconds2);
    window.location.href = "leaderboard.html";
  }
  
  function restartGame() {
    localStorage.clear();
    window.location.href = "index.html";
  }
  function showWinPopup() {
    document.getElementById("win-popup").classList.remove("hidden");
    const level1Time = parseInt(localStorage.getItem("level1Time") || "0");
    const totalTime = level1Time + seconds;
    const name = localStorage.getItem("playerName") || "Anonymous";
  
    // Сохраняем в лидерборд
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    leaderboard.push({
      name,
      level1: level1Time,
      level2: seconds,
      total: totalTime
    });
    leaderboard.sort((a, b) => a.total - b.total);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
  function showWinPopup() {
    document.getElementById("win-popup").classList.remove("hidden");
    const level1Time = parseInt(localStorage.getItem("level1Time") || "0");
    const totalTime = level1Time + seconds;
    const name = localStorage.getItem("playerName") || "Anonymous";
  
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    leaderboard.push({
      name,
      level1: level1Time,
      level2: seconds,
      total: totalTime
    });
    leaderboard.sort((a, b) => a.total - b.total);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
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
    