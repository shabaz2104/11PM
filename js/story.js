// story.js — single source of truth

const storyState = {
  startTime: Date.now(),
  phase: 1,
  commandsTyped: [],
  deadlineMinute: 15,
  logsSabotaged: false,
  logsPendingCorruption: false,
behindYouPending: false,
horrorTriggered: false,
};

function updatePhase() {
  const elapsed = (Date.now() - storyState.startTime) / 1000;

  if (elapsed < 120) {
    storyState.phase = 1; // normal
  } else if (elapsed < 240) {
    storyState.phase = 2; // subtle off
  } else if (elapsed < 360) {
    storyState.phase = 3; // aware
  } else {
    storyState.phase = 4; // hostile (later)
  }
}

function getPhase() {
  updatePhase();
  return storyState.phase;
}
function hasBeenIdle(seconds) {
  return (Date.now() - storyState.startTime) / 1000 > seconds;
}
function getMinutesUntilDeadline() {
  const elapsedMinutes = Math.floor(
    (Date.now() - storyState.startTime) / 60000
  );

  return storyState.deadlineMinute - elapsedMinutes;
}