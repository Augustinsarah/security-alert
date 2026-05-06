// ====== ELEMENTS ======
const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// ====== AUDIO ======
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let siren;
let blinkInterval;

// ====== INIT BUTTONS (FIXED STABILITY) ======
window.addEventListener("DOMContentLoaded", () => {

  const confirmBtn = document.getElementById("confirm");
  const declineBtn = document.getElementById("decline");

  confirmBtn.addEventListener("click", startSystem);

  declineBtn.addEventListener("click", () => {
    bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
  });
});

// ====== START SYSTEM ======
function startSystem() {

  audioCtx.resume();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";
  code.style.color = "darkred";
  code.style.fontSize = "50px";
  code.style.textAlign = "center";

  startDangerMode();

  setTimeout(codePhase, 3000);
}

// ====== DANGER MODE (RED BLINK + SIREN) ======
function startDangerMode() {

  stopAll();

  // 🔴 BLINK EFFECT
  let on = false;
  blinkInterval = setInterval(() => {
    monitor.style.background = on ? "#300000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 80px red" : "none";
    on = !on;
  }, 400);

  // 🚨 SIREN SOUND
  siren = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  siren.type = "sawtooth";
  siren.frequency.value = 600;
  gain.gain.value = 0.3;

  siren.connect(gain);
  gain.connect(audioCtx.destination);

  siren.start();

  setInterval(() => {
    const t = audioCtx.currentTime;
    siren.frequency.setValueAtTime(500, t);
    siren.frequency.linearRampToValueAtTime(1200, t + 0.6);
  }, 800);
}

// ====== CODE SCAN ======
function codePhase() {

  document.body.style.background = "black";

  const lines = [
    "> boot_sequence.init()",
    "> loading kernel...",
    "> checking files...",
    "> scanning memory...",
    "> system override detected..."
  ];

  let i = 0;
  code.innerText = "";

  function type() {
    if (i < lines.length) {
      code.innerText += lines[i] + "\n";
      i++;
      setTimeout(type, 900);
    } else {
      alertPhase();
    }
  }

  type();
}

// ====== ALERT PHASE ======
function alertPhase() {

  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";
  code.style.color = "red";
  code.style.fontSize = "45px";

  setTimeout(() => {

    stopAll();

    playHeartbeat(8000);

    setTimeout(hackedScreen, 8000);

  }, 3000);
}

// ====== HEARTBEAT (REALISTIC) ======
function playHeartbeat(duration) {

  let count = 0;

  let interval = setInterval(() => {

    heartbeatSound(55, 1);
    setTimeout(() => heartbeatSound(40, 0.7), 200);

    count++;
    if (count > 10) clearInterval(interval);

  }, 900);

  setTimeout(() => clearInterval(interval), duration);
}

function heartbeatSound(freq, vol) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.value = freq;

  gain.gain.value = vol;
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.4);
}

// ====== HACKED SCREEN ======
function hackedScreen() {

  monitor.innerHTML = `
    <div style="color:white; text-align:center; font-size:60px;">
      𝕊𝔸ℝ𝔸ℍ ℍ𝔸ℂ𝕂𝔼𝔻 𝕐𝕆𝕌 😏<br><br>
      22 OCT 2024<br><br>
      No escape 💘
    </div>
  `;

  setTimeout(finalLove, 5000);
}

// ====== FINAL LOVE + FLOATING EMOJIS ======
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

  const emojis = [
    "❤️","💕","😍","😘","🫶","🥰","🥹","🤗","💞","💝",
    "👑","💍","💎","🫂","🤭","🫣"
  ];

  setInterval(() => {

    const e = document.createElement("div");

    e.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    e.style.position = "absolute";
    e.style.left = Math.random() * window.innerWidth + "px";
    e.style.top = window.innerHeight + "px";
    e.style.fontSize = (20 + Math.random() * 40) + "px";
    e.style.transition = "all 4s linear";

    document.body.appendChild(e);

    setTimeout(() => {
      e.style.top = "-100px";
      e.style.opacity = "0";
    }, 50);

    setTimeout(() => e.remove(), 4000);

  }, 250);
}

// ====== CLEANUP ======
function stopAll() {
  if (siren) siren.stop();
  if (blinkInterval) clearInterval(blinkInterval);
}
