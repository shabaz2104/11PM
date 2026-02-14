// desktop.js

const icons = document.querySelectorAll(".icon");
const closeButtons = document.querySelectorAll(".close-btn");

// ===== Window Open / Close =====

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

// ===== Work Report Submission Logic =====

const submitBtn = document.getElementById("submit-report");
const feedback = document.getElementById("report-feedback");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const projectCode = document.getElementById("project-code").value.trim();
    const status = document.querySelector('input[name="status"]:checked');
    const confirmed = document.getElementById("confirm-checkbox").checked;

    if (!projectCode || !status || !confirmed) {
      feedback.textContent = "Report incomplete.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent = "Report submitted successfully.";
    feedback.style.color = "green";

    window.reportSubmitted = true;
  });
}