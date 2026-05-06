// ====== ELEMENTS ======
const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// ====== AUDIO ======
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let alarmOsc;
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
  code.style.color = "red";
  code.style.fontSize = "50px";
  code.style.textAlign = "center";

  startAlarm();

  setTimeout(scanPhase, 3000);
}

// ====== 🚨 REAL SECURITY BREACH ALARM (CORRECT SOUND) ======
function startAlarm() {

  stopAll();

  // 🔴 FLASHING RED SCREEN
  let on = false;
  blink = setInterval(() => {
    monitor.style.background = on ? "#400000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 120px red" : "none";
    on = !on;
  }, 200);

  // 🚨 SINGLE HARSH ALARM TONE (NOT AMBULANCE STYLE)
  alarmOsc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  alarmOsc.type = "square"; // harsh = security alarm feel
  alarmOsc.frequency.value = 1000; // fixed piercing warning tone

  gain.gain.value = 0.25;

  alarmOsc.connect(gain);
  gain.connect(audioCtx.destination);

  alarmOsc.start();

  // ⚠️ FAST PULSE (URGENT SYSTEM ALARM FEEL)
  setInterval(() => {
    const t = audioCtx.currentTime;

    alarmOsc.frequency.setValueAtTime(1000, t);
    alarmOsc.frequency.linearRampToValueAtTime(1300, t + 0.15);
    alarmOsc.frequency.linearRampToValueAtTime(900, t + 0.3);

  }, 300);
}

// ====== SCAN ======
function scanPhase() {

  const lines = [
    "> boot_sequence.init()",
    "> scanning system...",
    "> firewall check...",
    "> intrusion detected..."
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
  code.style.color = "red";
  code.style.fontSize = "40px";

  setTimeout(() => {

    stopAll();

    setTimeout(hackedScreen, 6000);

  }, 2500);
}

// ====== HACKED ======
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
      <div style="font-size:90px; color:white;">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;
}

// ====== STOP ======
function stopAll() {
  if (alarmOsc) alarmOsc.stop();
  if (blink) clearInterval(blink);
}
