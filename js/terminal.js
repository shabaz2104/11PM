const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

function printLine(text = "") {
  const line = document.createElement("div");
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

printLine("Terminal ready.");
printLine("Type 'help' to see available commands.");

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = terminalInput.value.trim();
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
      break;

    case "whoami":
      printLine("Employee44721");
      break;

    case "clear":
      terminalOutput.innerHTML = "";
      break;

    case "exit":
      printLine("Closing terminal...");
      break;

    case "":
      break;

    default:
      printLine("Command not found.");
  }
}