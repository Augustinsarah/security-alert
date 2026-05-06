// ====== ELEMENTS ======
const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// ====== AUDIO SETUP ======
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let alarmOsc;
let alarmGain;
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

// ====== START SYSTEM ======
function startSystem() {

  audioCtx.resume();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";
  code.style.color = "#ff0000";
  code.style.fontSize = "48px";
  code.style.textAlign = "center";

  startAlarmMode();

  setTimeout(scanPhase, 3000);
}

// ====== BANK-STYLE ALARM (REALISTIC SIREN) ======
function startAlarmMode() {

  stopAll();

  // 🔴 FLASH RED SCREEN
  let on = false;
  blink = setInterval(() => {
    monitor.style.background = on ? "#3a0000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 100px red" : "none";
    on = !on;
  }, 300);

  // 🚨 ALARM SOUND (BANK STYLE)
  alarmOsc = audioCtx.createOscillator();
  alarmGain = audioCtx.createGain();

  alarmOsc.type = "square";
  alarmOsc.frequency.value = 900;

  alarmGain.gain.value = 0.25;

  alarmOsc.connect(alarmGain);
  alarmGain.connect(audioCtx.destination);

  alarmOsc.start();

  let high = true;

  setInterval(() => {
    const t = audioCtx.currentTime;

    alarmOsc.frequency.setValueAtTime(high ? 1400 : 600, t);
    high = !high;
  }, 400);
}

// ====== SCAN PHASE ======
function scanPhase() {

  document.body.style.background = "black";

  const lines = [
    "> boot_sequence.init()",
    "> loading security kernel...",
    "> scanning system files...",
    "> verifying access logs...",
    "> firewall breach detected..."
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

// ====== ALERT PHASE ======
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

// ====== HEARTBEAT (CLEAN + REALISTIC) ======
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
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.value = freq;

  gain.gain.value = vol;
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.35);
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

// ====== FINAL LOVE SCREEN ======
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
    "❤️","💕","😍","😘","🫶","🥰","🥹","🤗",
    "💞","💝","👑","💍","💎","🫂"
  ];

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

// ====== STOP ALL ======
function stopAll() {
  if (alarmOsc) alarmOsc.stop();
  if (blink) clearInterval(blink);
}
