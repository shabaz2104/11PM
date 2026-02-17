// ===== Boot System =====

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
  // Prevent re-triggering
  if (storyState.horrorTriggered) return;

  // 🔊 Stop presence sound right before message
  if (window.Sound) Sound.stopPresence();

  // Mark horror as started
  storyState.horrorTriggered = true;

  showSystemMessage("I'm behind you");

  // 🔊 Restart presence sound after message (permanent)
  setTimeout(() => {
    if (window.Sound) Sound.startPresence();
  }, 200);

  // Trigger malicious email shortly after
  setTimeout(() => {
    sendCreepyEmail();
  }, 2000);
}

// Phase-based system messages
setInterval(() => {
  const phase = getPhase();

  if (systemMessages[phase] && !shownMessages.has(phase)) {
    showSystemMessage(systemMessages[phase]);
    shownMessages.add(phase);
  }
}, 1000);

// ===== Boot Sequence =====

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

      // 🔊 INIT + BOOT SOUND
      if (window.Sound) {
        Sound.init();
        Sound.playBoot();
      }

      // 🔔 Send first email immediately after boot
      sendInitialEmail();
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

  const input = document.getElementById("terminal-input");
  if (input) input.disabled = true;

  setTimeout(() => {
    overlay.remove();
    if (input) input.disabled = false;
  }, 6000);
}

// ===== In-Game Clock =====

const taskbarTime = document.getElementById("taskbar-time");
const taskbarDay = document.getElementById("taskbar-day");

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

setInterval(updateGameClock, 10000);
updateGameClock();

// ===== Email System =====

const emailList = document.getElementById("email-list");
const emailContent = document.querySelector(".email-content");
const mailDot = document.getElementById("mail-dot");

const emails = [];
let firstEmailSent = false;

function addEmail(subject, body) {
  emails.push({ subject, body, read: false });
  renderInbox();
  showMailNotification();
}

function renderInbox() {
  if (!emailList) return;
  emailList.innerHTML = "";

  emails.forEach((email, index) => {
    const item = document.createElement("div");
    item.className = "email-item";
    item.innerHTML = `<b>${email.subject}</b>`;

    item.addEventListener("click", () => {
      openEmail(index);
    });

    emailList.appendChild(item);
  });
}

function openEmail(index) {
  const email = emails[index];
  email.read = true;

  emailContent.innerHTML = `
    <p><b>From:</b> operations@company.internal</p>
    <p><b>Subject:</b> ${email.subject}</p>
    <hr />
    <p>${email.body}</p>
  `;

  hideMailNotificationIfAllRead();
}

function showMailNotification() {
  if (mailDot) mailDot.classList.remove("hidden");
}

function hideMailNotificationIfAllRead() {
  const unread = emails.some(e => !e.read);
  if (!unread && mailDot) {
    mailDot.classList.add("hidden");
  }
}

// ===== Email Triggers =====

function sendInitialEmail() {
  if (firstEmailSent) return;

  addEmail(
    "Pending Report Submission",
    "This is a reminder that your quarterly report is still marked as incomplete.<br /><br />" +
    "Please ensure submission before the end of your shift.<br /><br />" +
    "Failure to comply may require escalation."
  );

  firstEmailSent = true;
}

function sendCreepyEmail() {
  addEmail(
    "RE:",
    "Oh.<br /><br />Did I scare you?"
  );
}