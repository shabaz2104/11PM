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
function updateWorkReport() {
  const workBody = document.querySelector("#work-window .window-body");
  const phase = getPhase();

  if (phase === 1) {
    workBody.innerHTML =
      "Quarterly report draft.<br />Please finalize before leaving.";
  }

  if (phase === 2) {
    workBody.innerHTML =
      "Quarterly report draft.<br />You've been here longer than planned.";
  }

  if (phase >= 3) {
    const lastCommand =
      storyState.commandsTyped.slice(-1)[0] || "nothing";

    workBody.innerHTML =
      "Quarterly report draft.<br />Last input: <b>" +
      lastCommand +
      "</b>";
  }
}
setInterval(updateWorkReport, 2000);