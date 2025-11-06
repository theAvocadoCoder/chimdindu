export function initGuessNumber(container: HTMLElement) {
  let ceiling: number, number: number, attempts: number;
  initValues();

  container.innerHTML = `
    <div class="space-y-4 text-center">
      <h2 class="text-xl font-bold">Guess the Number (1-${ceiling!})</h2>
      <input
        id="guessInput" type="number" min="1" max="20"
        class="border p-2 rounded-md w-24 text-center"
      />
      <button id="guessBtn" class="px-4 py-2 bg-red-600 text-white rounded-md">Guess</button>
      <p id="feedback" class="text-lg"></p>
      <button class="hidden btn border-none" id="restartBtn">Restart</button>
    </div>
  `;

  const input = container.querySelector("#guessInput") as HTMLInputElement;
  const feedback = container.querySelector("#feedback") as HTMLElement;
  const guessBtn = container.querySelector("#guessBtn") as HTMLButtonElement;
  const restartBtn = container.querySelector("#restartBtn") as HTMLButtonElement;

  restartBtn.addEventListener("click", restartGame)
  input.addEventListener("keydown", (e) => {if (e.key === "Enter") guess()})
  guessBtn.addEventListener("click", guess);

  function guess() {
    if (attempts === 0) restartBtn.classList.toggle("hidden", false);
    const val = Number(input.value);
    attempts++;
    if (val === number) {
      feedback.textContent = `Correct! You guessed it in ${attempts} tries 🎉`;
    }
    else {
      feedback.textContent = `${val} is ${val > ceiling ? "wayyy too high!" : val > number ? "too high" : "too low!"}`;
      input.value = "";
    }
  }

  function restartGame() {
    initValues();
    (container.querySelector("h2") as HTMLElement).textContent = `Guess the Number (1-${ceiling!})`;
    input.value = "";
    feedback.textContent = "";
    restartBtn.classList.toggle("hidden", true);
  }

  function initValues() {
    ceiling = Math.ceil(Math.random() * 9) * 10;
    number = Math.ceil(Math.random() * ceiling - 1);
    attempts = 0;
  }
}
