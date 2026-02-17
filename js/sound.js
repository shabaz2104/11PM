// js/sound.js

const Sound = {
  boot: new Audio("assets/sounds/computer start black screen.mp3"),
  click: new Audio("assets/sounds/mouse click.mp3"),
  presence: new Audio("assets/sounds/creaking spook sound.mp3"),

  init() {
    this.boot.volume = 0.5;
    this.click.volume = 0.15;
    this.presence.volume = 0.05;
    this.presence.loop = true;
  },

  playBoot() {
    this.boot.currentTime = 0;
    this.boot.play();
  },

  playClick() {
    this.click.currentTime = 0;
    this.click.play();
  },

  startPresence() {
    this.presence.currentTime = 0;
    this.presence.play();
  },

  stopPresence() {
    this.presence.pause();
    this.presence.currentTime = 0;
  }
};

window.Sound = Sound;