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

// ===== System Messages =====

const systemMessages = {
  2: "You're working late.",
  3: "Everyone else already left.",
  4: "Why didn't you?"
};

let shownMessages = new Set();

function showSystemMessage(text) {
  let msg = document.getElementById("system-message");

  if (!msg) {
    msg = document.createElement("div");
    msg.id = "system-message";
    document.body.appendChild(msg);
  }

  msg.textContent = text;
  msg.classList.remove("system-hidden");

  setTimeout(() => {
    msg.classList.add("system-hidden");
  }, 4000);
}
function triggerBehindYouMessage() {
  showSystemMessage("I'm behind you.");
}

// Check phase and show messages
setInterval(() => {
  const phase = getPhase();

  if (systemMessages[phase] && !shownMessages.has(phase)) {
    showSystemMessage(systemMessages[phase]);
    shownMessages.add(phase);
  }
}, 1000);

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

// ===== Leaving Alarm =====

let alarmTriggered = false;

function triggerAlarm() {
  if (alarmTriggered) return;
  alarmTriggered = true;

  const overlay = document.createElement("div");
  overlay.id = "alarm-overlay";

  overlay.innerHTML = `
    <div id="alarm-box">
      <h1>⚠ OFFICE POLICY VIOLATION ⚠</h1>
      <p>Leaving so early?</p>
      <p>This action was not scheduled.</p>
    </div>
  `;

  document.body.appendChild(overlay);

  // Lock terminal input
  const input = document.getElementById("terminal-input");
  if (input) input.disabled = true;

  // Remove alarm after delay (for now)
  setTimeout(() => {
    overlay.remove();
    if (input) input.disabled = false;
  }, 6000);
}
// ===== In-Game Clock =====

const taskbarTime = document.getElementById("taskbar-time");
const taskbarDay = document.getElementById("taskbar-day");

// Game starts at 11:00 PM
const GAME_START_HOUR = 23;
const GAME_START_MINUTE = 0;

function updateGameClock() {
  const elapsedMinutes = Math.floor(
    (Date.now() - storyState.startTime) / 60000
  );

  let totalMinutes =
    GAME_START_HOUR * 60 + GAME_START_MINUTE + elapsedMinutes;

  let hours = Math.floor(totalMinutes / 60) % 24;
  let minutes = totalMinutes % 60;

  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  const timeString =
    displayHour +
    ":" +
    minutes.toString().padStart(2, "0") +
    " " +
    ampm;

  if (taskbarTime) taskbarTime.textContent = timeString;
}

// Update every 10 seconds (smooth but cheap)
setInterval(updateGameClock, 10000);
updateGameClock();