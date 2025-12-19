const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

let startTime = 0;
let elapsed = 0;
let intervalId = null;
let lapCount = 0;

function formatTime(timeMs) {
  const ms = Math.floor((timeMs % 1000) / 10);
  const totalSeconds = Math.floor(timeMs / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const hStr = String(hours).padStart(2, "0");
  const mStr = String(minutes).padStart(2, "0");
  const sStr = String(seconds).padStart(2, "0");
  const msStr = String(ms).padStart(2, "0");

  return `${hStr}:${mStr}:${sStr}.${msStr}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  display.textContent = formatTime(diff);
}

function start() {
  if (intervalId) return;
  startTime = Date.now();
  intervalId = setInterval(updateDisplay, 10);
}

function pause() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
  elapsed += Date.now() - startTime;
}

function reset() {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  elapsed = 0;
  lapCount = 0;
  display.textContent = "00:00:00.00";
  lapsContainer.innerHTML = "";
}

function addLap() {
  if (!intervalId && elapsed === 0) return;
  const currentTime =
    intervalId ? Date.now() - startTime + elapsed : elapsed;
  lapCount += 1;

  const li = document.createElement("li");
  const label = document.createElement("span");
  const time = document.createElement("span");

  label.textContent = `Lap ${lapCount}`;
  label.className = "label";
  time.textContent = formatTime(currentTime);
  time.className = "time";

  li.appendChild(label);
  li.appendChild(time);
  lapsContainer.prepend(li);
}

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
