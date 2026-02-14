const bootTextEl = document.getElementById("boot-text");
const bootScreen = document.getElementById("boot-screen");
const desktop = document.getElementById("desktop");

const bootLines = [
  "Booting workstation...",
  "Loading system files...",
  "Verifying user credentials...",
  "Initializing desktop environment...",
  "",
  "Welcome."
];

let lineIndex = 0;

function showNextLine() {
  if (lineIndex < bootLines.length) {
    bootTextEl.textContent += bootLines[lineIndex] + "\n";
    lineIndex++;
    setTimeout(showNextLine, 700);
  } else {
    // Transition to desktop
    setTimeout(() => {
      bootScreen.classList.add("hidden");
      desktop.classList.remove("hidden");
    }, 1000);
  }
}

showNextLine();