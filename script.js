const menu = document.getElementById('menu');
const game = document.getElementById('game');
const puzzle = document.getElementById('puzzle');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const winMessage = document.getElementById('win-message');
const gameControls = document.getElementById('game-controls');
const gallery = document.querySelector('.gallery');

let currentImage = '';
let board = [];
let emptyIndex;
let timer = 0;
let timerInterval;
let playing = false;

// Клик по картинке
document.querySelectorAll('.gallery img').forEach((img) => {
  img.addEventListener('click', () => {
    currentImage = img.src;
    menu.classList.add('hidden');
    game.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    gameControls.classList.add('hidden');
    puzzle.innerHTML = '';
    winMessage.classList.add('hidden');
  });
});

// Старт игры
startBtn.addEventListener('click', () => {
  if (!currentImage) {
    alert("Please select an image!");
    return;
  }
  startGame();
  startBtn.classList.add('hidden');
  gameControls.classList.remove('hidden');
});

// Назад в меню
backBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  game.classList.add('hidden');
  menu.classList.remove('hidden');
  puzzle.innerHTML = '';
  timerEl.textContent = 'Time: 0s';
  winMessage.classList.add('hidden');
  playing = false;
  currentImage = ''; // Сброс выбранного изображения
});

function startGame() {
  board = [...Array(8).keys()];
  board.push(null);
  shuffle(board);
  emptyIndex = board.indexOf(null);
  renderBoard();
  timer = 0;
  timerEl.textContent = 'Time: 0s';
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerEl.textContent = `Time: ${timer}s`;
  }, 1000);
  playing = true;
}

function shuffle(arr) {
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (!isSolvable(arr));
}

function isSolvable(arr) {
  let inv = 0;
  const nums = arr.filter(n => n !== null);
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) inv++;
    }
  }
  return inv % 2 === 0;
}

function renderBoard() {
  puzzle.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    if (board[i] !== null) {
      const row = Math.floor(board[i] / 3);
      const col = board[i] % 3;
      tile.style.backgroundImage = `url(${currentImage})`;
      tile.style.backgroundSize = '480px 480px';
      tile.style.backgroundPosition = `-${col * 160}px -${row * 160}px`;
      tile.addEventListener('click', () => tryMove(i));
    } else {
      tile.classList.add('empty');
    }
    puzzle.appendChild(tile);
  }
}

function tryMove(index) {
  if (!playing) return;
  const validMoves = [index - 1, index + 1, index - 3, index + 3];
  if (validMoves.includes(emptyIndex) && isAdjacent(index, emptyIndex)) {
    [board[index], board[emptyIndex]] = [board[emptyIndex], board[index]];
    emptyIndex = index;
    renderBoard();
    if (checkWin()) {
      clearInterval(timerInterval);
      playing = false;
      winMessage.classList.remove('hidden');
      winMessage.textContent = `🎉 You solved it in ${timer}s!`;
    }
  }
}

function isAdjacent(i, j) {
  const row1 = Math.floor(i / 3), col1 = i % 3;
  const row2 = Math.floor(j / 3), col2 = j % 3;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

function checkWin() {
  for (let i = 0; i < 8; i++) {
    if (board[i] !== i) return false;
  }
  return true;
}
VANTA.NET({
  el: "body",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x00ff88,
  backgroundColor: 0x001a0e,
  points: 10.0,
  maxDistance: 20.0,
  spacing: 15.0
});
