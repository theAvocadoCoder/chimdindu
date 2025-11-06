import confetti from "canvas-confetti";

export function initHome() {
  const btn = document.getElementById("celebrate-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    // simple burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    // optional multi-burst for extra hype
    const duration = 2000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  });
}
