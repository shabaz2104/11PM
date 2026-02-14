const icons = document.querySelectorAll(".icon");
const windows = document.querySelectorAll(".window");
const closeButtons = document.querySelectorAll(".close-btn");

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const target = icon.dataset.window;
    const windowEl = document.getElementById(`${target}-window`);
    if (windowEl) {
      windowEl.classList.remove("hidden");
    }
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".window").classList.add("hidden");
  });
});