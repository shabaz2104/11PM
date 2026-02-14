// terminal.js

const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

function printLine(text = "") {
  const line = document.createElement("div");
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Initial terminal output
printLine("Terminal ready.");
printLine("Type 'help' to see available commands.");

// Handle input
terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = terminalInput.value.trim();

    // 🔴 STEP 7.2 — MEMORY: store every command
    storyState.commandsTyped.push(command);

    printLine("> " + command);
    handleCommand(command);
    terminalInput.value = "";
  }
});

function handleCommand(cmd) {
  switch (cmd) {

    case "help":
      if (getPhase() <= 2) {
        printLine("Available commands:");
        printLine("help, whoami, clear, exit");
      } else {
        printLine("You already asked that.");
      }
      break;

    case "whoami":
      if (getPhase() === 1) {
        printLine("Employee44721");
      } else if (getPhase() === 2) {
        printLine("Employee 44721");
      } else {
        printLine("You already know.");
      }
      break;

    case "clear":
      terminalOutput.innerHTML = "";
      break;

  case "exit":
  printLine("Requesting system logout...");
  setTimeout(() => {
    triggerAlarm();
  }, 1000);
  break;

    case "":
      // Do nothing on empty input
      break;

    default:
      printLine("Command not found.");
  }
}