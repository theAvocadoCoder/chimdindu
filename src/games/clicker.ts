const STORAGE_KEY = "clicker-best";

export function initClicker(container: HTMLElement) {
  container.innerHTML = `
    <div class="space-y-4 text-center">
      <h2 class="text-2xl font-bold text-red-500">Speed Clicker Challenge</h2>
      <p id="timer" class="text-lg">Time: 10</p>
      <button id="clickBtn" class="px-6 py-3 bg-red-600 text-white rounded-lg">Click me!</button>
      <p id="score" class="text-xl font-semibold"> </p>
      <p id="best" class="text-md text-gray-400"></p>
      <button class="hidden btn border-none" id="restartBtn">Restart</button>
    </div>
  `;

  const clickBtn = container.querySelector("#clickBtn") as HTMLButtonElement;
  const timerEl = container.querySelector("#timer") as HTMLElement;
  const scoreEl = container.querySelector("#score") as HTMLElement;
  const bestEl = container.querySelector("#best") as HTMLElement;
  const restartBtn = container.querySelector("#restartBtn") as HTMLButtonElement;

  let score = 0;
  let time = 10;
  let interval: number | null = null;

  bestEl.textContent = `Best Score: ${localStorage.getItem(STORAGE_KEY) || 0}`;

  clickBtn.addEventListener("click", () => {
    if (!interval) startGame();
    score++;
    scoreEl.textContent = `Score: ${score}`;
  });

  restartBtn.addEventListener("click", restartGame)

  function startGame() {
    interval = window.setInterval(() => {
      time--;
      timerEl.textContent = `Time: ${time}`;
      if (time <= 0) endGame();
    }, 1000);
  }

  function endGame() {
    if (interval) clearInterval(interval);
    clickBtn.disabled = true;
    const best = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    if (score > best) localStorage.setItem(STORAGE_KEY, String(score));
    bestEl.textContent = `Best Score: ${localStorage.getItem(STORAGE_KEY)}`;
    restartBtn.classList.toggle("hidden", false)
  }

  function restartGame() {
    score = 0;
    time = 10;
    interval = null;
    scoreEl.textContent = "";
    timerEl.textContent = `Time: ${time}`;
    clickBtn.disabled = false;
    restartBtn.classList.toggle("hidden", true)
  }
}
