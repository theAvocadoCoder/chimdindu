import { initClicker } from "../games/clicker";
import { initGuessNumber } from "../games/guessNumber";

export function initGames() {
  const container = document.getElementById("games")!;
  const gameContainer = document.getElementById("game-container") as HTMLElement;

  container.querySelector("#play-clicker")?.addEventListener("click", () => {
    initClicker(gameContainer);
  });

  container.querySelector("#play-guess")?.addEventListener("click", () => {
    initGuessNumber(gameContainer);
  });
}
