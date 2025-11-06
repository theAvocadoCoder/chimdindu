import "./style.css";
import { initHome } from "./pages/home";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(`[id^="nav-"]`).forEach(nav => {
    nav.addEventListener("click", showSection)
  })
  
  initHome();
})

function showSection(e: Event) {
  document.querySelectorAll("section").forEach(section => {
    section.classList.toggle("hidden", true)
  })
  document.getElementById((e.target as Element).id.split("-")[1])?.classList.toggle("hidden", false)
}
