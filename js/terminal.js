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

    // Memory
    storyState.commandsTyped.push(command);

    printLine("> " + command);
    handleCommand(command);
    terminalInput.value = "";
  }
});

function handleCommand(cmd) {
  switch (cmd) {

    case "help":
      printLine("Available commands:");
      printLine("help, whoami, clear, exit");

      // Appear ONLY after logs sabotage
      if (storyState.logsSabotaged && !storyState.logsPendingCorruption) {
        printLine("rebootlogs");
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

    case "rebootlogs":
      // One-time false hope
      if (!storyState.logsSabotaged || storyState.logsPendingCorruption) {
        printLine("Command not found.");
        break;
      }

      printLine("Rebooting log service...");
      setTimeout(() => {
        printLine("Logs refreshed. Please check.");

        // Arm betrayal (handled in desktop.js on log open)
        storyState.logsPendingCorruption = true;
        storyState.behindYouPending = true;
      }, 1000);
      break;

    case "":
      break;

    default:
      printLine("Command not found.");
  }
}