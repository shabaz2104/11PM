// desktop.js

const icons = document.querySelectorAll(".icon");
const closeButtons = document.querySelectorAll(".close-btn");

// ===== Report Requirements =====
const REQUIRED_PROJECT_CODE = "PRJ-44721";

// ===== Logs Sabotage State =====
let logsOpenedCount = 0;

// ===== Helpers =====
const projectCodeInput = document.getElementById("project-code");

function getTypedProjectCodeLength() {
  if (!projectCodeInput) return 0;
  return projectCodeInput.value.trim().length;
}

// ===== Window Open / Close =====

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const target = icon.dataset.window;
    const windowEl = document.getElementById(`${target}-window`);
    if (!windowEl) return;

    // ===== LOGS LOGIC =====
    if (target === "logs") {
      logsOpenedCount++;

      const logsBody = document.getElementById("logs-body");
      const typedLength = getTypedProjectCodeLength();
      const halfLength = Math.ceil(REQUIRED_PROJECT_CODE.length / 2);

      // FIRST sabotage: memory insult
      if (
        logsOpenedCount >= 2 &&
        typedLength >= halfLength &&
        !storyState.logsSabotaged
      ) {
        logsBody.innerHTML =
          "<b>System Notice</b><br /><br />" +
          "You have a short memory.<br />" +
          "You should have memorized it.";

        storyState.logsSabotaged = true;
      }

      // POST-REBOOT betrayal (ONLY after rebootlogs)
      if (storyState.logsPendingCorruption) {
        logsBody.innerHTML =
          "<b>System Log</b><br /><br />" +
          "You really thought that would work, huh?<br /><br />" +
          "Motion detected behind desk number 447.";

        storyState.logsPendingCorruption = false;

        if (storyState.behindYouPending) {
          setTimeout(() => {
            triggerBehindYouMessage();
            storyState.behindYouPending = false;
          }, 800);
        }
      }
    }

    windowEl.classList.remove("hidden");
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".window").classList.add("hidden");
  });
});

// ===== Work Report Submission Logic =====

const submitBtn = document.getElementById("submit-report");
const feedback = document.getElementById("report-feedback");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const projectCode = projectCodeInput.value.trim();
    const status = document.querySelector('input[name="status"]:checked');
    const confirmed = document.getElementById("confirm-checkbox").checked;

    if (!projectCode || !status || !confirmed) {
      feedback.textContent = "Report incomplete.";
      feedback.style.color = "red";
      return;
    }

    if (projectCode !== REQUIRED_PROJECT_CODE) {
      feedback.textContent = "Invalid project code.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent = "Report submitted successfully.";
    feedback.style.color = "green";
    window.reportSubmitted = true;
  });
}

// ===== Form Sabotage =====

function sabotageForm() {
  const phase = getPhase();
  const minutesLeft = getMinutesUntilDeadline();

  const checkbox = document.getElementById("confirm-checkbox");
  const submitBtn = document.getElementById("submit-report");
  const workWindow = document.getElementById("work-window");

  if (!workWindow || workWindow.classList.contains("hidden")) return;
  if (phase < 2) return;

  if (Math.random() < 0.15 && checkbox && checkbox.checked) {
    checkbox.checked = false;
  }

  if (minutesLeft <= 5 && submitBtn && Math.random() < 0.3) {
    submitBtn.disabled = true;
    submitBtn.textContent = "PLEASE WAIT...";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "SUBMIT REPORT";
    }, 2000);
  }
}

setInterval(sabotageForm, 3000);