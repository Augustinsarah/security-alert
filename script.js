// ====== ELEMENTS ======
const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// ====== AUDIO ======
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscLow;
let oscHigh;
let gain;
let blink;

// ====== INIT ======
window.addEventListener("DOMContentLoaded", () => {

  const confirmBtn = document.getElementById("confirm");
  const declineBtn = document.getElementById("decline");

  confirmBtn.addEventListener("click", startSystem);

  declineBtn.addEventListener("click", () => {
    bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
  });
});

// ====== START ======
function startSystem() {

  audioCtx.resume();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";
  code.style.color = "#ff0000";
  code.style.fontSize = "50px";
  code.style.textAlign = "center";

  startIntrusionAlarm();

  setTimeout(scanPhase, 3000);
}

// ====== 🚨 LASER TRAP SECURITY ALARM (REALISTIC BREACH SOUND) ======
function startIntrusionAlarm() {

  stopAll();

  // 🔴 RED FLASH
  let on = false;
  blink = setInterval(() => {
    monitor.style.background = on ? "#3a0000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 100px red" : "none";
    on = !on;
  }, 250);

  // 🔊 LOW WARNING OSCILLATOR
  oscLow = audioCtx.createOscillator();
  const gainLow = audioCtx.createGain();

  oscLow.type = "sine";
  oscLow.frequency.value = 420;

  gainLow.gain.value = 0.2;

  oscLow.connect(gainLow);
  gainLow.connect(audioCtx.destination);

  oscLow.start();

  // 🔊 HIGH WARNING OSCILLATOR
  oscHigh = audioCtx.createOscillator();
  const gainHigh = audioCtx.createGain();

  oscHigh.type = "sine";
  oscHigh.frequency.value = 900;

  gainHigh.gain.value = 0.15;

  oscHigh.connect(gainHigh);
  gainHigh.connect(audioCtx.destination);

  oscHigh.start();

  // 🚨 SLOW “BREACH SWEEP” (REAL SECURITY FEEL)
  let up = true;

  setInterval(() => {

    const t = audioCtx.currentTime;

    let lowFreq = up ? 380 : 520;
    let highFreq = up ? 850 : 1050;

    oscLow.frequency.setValueAtTime(lowFreq, t);
    oscHigh.frequency.setValueAtTime(highFreq, t);

    up = !up;

  }, 700);
}

// ====== SCAN PHASE ======
function scanPhase() {

  document.body.style.background = "black";

  const lines = [
    "> boot_sequence.init()",
    "> scanning restricted zone...",
    "> laser grid detected...",
    "> bypass attempt detected...",
    "> security breach escalating..."
  ];

  let i = 0;
  code.innerText = "";

  function type() {
    if (i < lines.length) {
      code.innerText += lines[i] + "\n";
      i++;
      setTimeout(type, 800);
    } else {
      alertPhase();
    }
  }

  type();
}

// ====== ALERT ======
function alertPhase() {

  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";
  code.style.color = "#ff0000";
  code.style.fontSize = "40px";

  setTimeout(() => {

    stopAll();

    playHeartbeat(8000);

    setTimeout(hackedScreen, 8000);

  }, 2500);
}

// ====== HEARTBEAT ======
function playHeartbeat(duration) {

  let count = 0;

  let interval = setInterval(() => {

    beat(55, 1);
    setTimeout(() => beat(40, 0.8), 180);

    count++;
    if (count > 10) clearInterval(interval);

  }, 900);

  setTimeout(() => clearInterval(interval), duration);
}

function beat(freq, vol) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();

  o.type = "triangle";
  o.frequency.value = freq;

  g.gain.value = vol;
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

  o.connect(g);
  g.connect(audioCtx.destination);

  o.start();
  o.stop(audioCtx.currentTime + 0.35);
}

// ====== HACKED SCREEN ======
function hackedScreen() {

  monitor.innerHTML = `
    <div style="color:white; text-align:center; font-size:60px;">
      𝕊𝔸ℝ𝔸ℍ ℍ𝔸ℂ𝕂𝔼𝔻 𝕐𝕆𝕌 😏<br><br>
      22 OCT 2024<br><br>
      No escape available 💘
    </div>
  `;

  setTimeout(finalLove, 5000);
}

// ====== FINAL LOVE ======
function finalLove() {

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background: radial-gradient(circle, #ffb6c1, #000);
      overflow:hidden;
      position:relative;
    ">
      <div style="font-size:90px; color:white; z-index:2;">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;

  const emojis = ["❤️","💕","😍","😘","🫶","🥰","💞","💝","👑","💍","💎","🫂"];

  setInterval(() => {

    const e = document.createElement("div");

    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    e.style.position = "absolute";
    e.style.left = Math.random() * window.innerWidth + "px";
    e.style.top = window.innerHeight + "px";
    e.style.fontSize = (20 + Math.random() * 45) + "px";
    e.style.transition = "all 4s linear";

    document.body.appendChild(e);

    setTimeout(() => {
      e.style.top = "-100px";
      e.style.opacity = "0";
    }, 50);

    setTimeout(() => e.remove(), 4000);

  }, 200);
}

// ====== STOP ======
function stopAll() {
  if (oscLow) oscLow.stop();
  if (oscHigh) oscHigh.stop();
  if (blink) clearInterval(blink);
}
