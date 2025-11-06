import "./style.css";
import { initHome } from "./pages/home";
import { initGames } from "./pages/games";
import { initMessages } from "./pages/messages";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(`[id^="nav-"]`).forEach(nav => {
    nav.addEventListener("click", showSection)
  })
  
  initHome();
  initGames();
  initMessages();
})

function showSection(e: Event) {
  document.querySelectorAll("section").forEach(section => {
    section.classList.toggle("hidden", true)
    section.classList.toggle("flex", false)
  })
  const section = document.getElementById((e.target as Element).id.split("-")[1])
  section?.classList.toggle("hidden", false)
  section?.classList.toggle("flex", true)
}
