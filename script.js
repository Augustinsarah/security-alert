// ====== ELEMENTS ======
const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// ====== AUDIO ======
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ====== BUTTON SETUP (FIXED STABILITY) ======
window.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirm");
  const declineBtn = document.getElementById("decline");

  if (confirmBtn) {
    confirmBtn.onclick = () => startSystem();
  }

  if (declineBtn) {
    declineBtn.onclick = () => {
      if (bootScreen) bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
    };
  }
});

// ====== START SYSTEM ======
function startSystem() {

  audioCtx.resume();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  code.style.color = "red";
  code.style.fontSize = "50px";
  code.style.textAlign = "center";
  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";

  startDangerMode();

  setTimeout(codePhase, 3000);
}

// ====== DANGER MODE ======
let siren;
let blink;

function startDangerMode() {

  stopAll();

  siren = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  siren.type = "sawtooth";
  siren.frequency.value = 700;
  gain.gain.value = 0.3;

  siren.connect(gain);
  gain.connect(audioCtx.destination);

  siren.start();

  let up = true;

  setInterval(() => {
    siren.frequency.setValueAtTime(up ? 1200 : 500, audioCtx.currentTime);
    up = !up;
  }, 600);

  document.body.style.background = "#200000";
}

// ====== CODE PHASE ======
function codePhase() {

  document.body.style.background = "black";

  const lines = [
    "> boot_sequence.init()",
    "> scanning memory...",
    "> checking files...",
    "> injecting trace...",
    "> system unstable..."
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

// ====== ALERT ======
function alertPhase() {

  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";
  code.style.color = "red";
  code.style.fontSize = "40px";

  setTimeout(() => {

    stopAll();

    playHeartbeat(8000);

    setTimeout(hackedScreen, 8000);

  }, 3000);
}

// ====== HEARTBEAT ======
function playHeartbeat(duration) {

  let interval = setInterval(() => {
    pulse(60, 1);
    pulse(45, 0.7);
  }, 1000);

  setTimeout(() => clearInterval(interval), duration);
}

function pulse(freq, vol) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.value = freq;

  gain.gain.value = vol;
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
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

  setTimeout(finalLove, 4000);
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

  const emojis = ["❤️","💕","😍","😘","🫶","🥰","💞","💍","👑","💝"];

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

// ====== STOP ALL ======
function stopAll() {
  if (siren) siren.stop();
}
