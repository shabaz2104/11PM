const newGameBtn = document.getElementById("newGameBtn");
const settingsBtn = document.getElementById("settingsBtn");
const creditsBtn = document.getElementById("creditsBtn");
const quitBtn = document.getElementById("quitBtn");

const settingsModal = document.getElementById("settingsModal");
const creditsModal = document.getElementById("creditsModal");

const closeButtons = document.querySelectorAll(".closeModal");

// New Game → go to game.html
newGameBtn.addEventListener("click", () => {
  window.location.href = "game.html";
});

// Open modals
settingsBtn.addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
});

creditsBtn.addEventListener("click", () => {
  creditsModal.classList.remove("hidden");
});

// Close modals
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
    creditsModal.classList.add("hidden");
  });
});

// Quit (best we can do on web)
quitBtn.addEventListener("click", () => {
  window.close();
});