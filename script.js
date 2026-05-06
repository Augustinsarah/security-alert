// ====== ELEMENTS ======
const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// ====== AUDIO ENGINE ======
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 🔴 BLINK + SIREN
let sirenInterval = null;
let blinkInterval = null;

function startDangerMode() {
  stopAllSounds();

  // 🚨 SIREN SOUND (wee-woo)
  sirenInterval = setInterval(() => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.3);

    gain.gain.value = 0.3;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  }, 300);

  // 🔴 BLINKING RED BACKGROUND
  let on = false;
  blinkInterval = setInterval(() => {
    monitor.style.background = on ? "#300000" : "#000000";
    on = !on;
  }, 300);
}

// 💻 monitor "tum-tum"
let monitorInterval = null;

function startMonitorSound() {
  stopAllSounds();

  monitorInterval = setInterval(() => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = 800;
    gain.gain.value = 0.2;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  }, 800);

  monitor.style.background = "black";
}

// ❤️ heartbeat
function playHeartbeat(duration = 5000) {
  let interval = setInterval(() => {
    let now = audioCtx.currentTime;

    beat(now, 150, 0.6);
    beat(now + 0.2, 120, 0.4);

  }, 1000);

  setTimeout(() => clearInterval(interval), duration);
}

function beat(time, freq, vol) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + 0.2);
}

// 🛑 STOP ALL
function stopAllSounds() {
  if (sirenInterval) clearInterval(sirenInterval);
  if (monitorInterval) clearInterval(monitorInterval);
  if (blinkInterval) clearInterval(blinkInterval);
}

// ====== START ======
confirmBtn.onclick = () => {

  audioCtx.resume();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  code.style.color = "#ff4d4d";
  code.style.fontSize = "60px";
  code.style.textAlign = "center";
  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";

  startDangerMode();

  setTimeout(codePhase, 2500);
};

// ====== CODE ======
function codePhase() {

  code.style.color = "#00ff66";
  code.style.fontSize = "26px";
  code.style.textAlign = "left";
  code.style.padding = "40px";

  startMonitorSound();

  const lines = [
    "> boot_sequence.init()",
    "> loading kernel...",
    "> checking files...",
    "> scanning memory...",
    "> injecting trace...",
    "> access violation detected"
  ];

  let i = 0;
  code.innerText = "";

  function typeLine() {
    if (i < lines.length) {
      code.innerText += lines[i] + "\n";
      i++;
      setTimeout(typeLine, 600);
    } else {
      alertPhase();
    }
  }

  typeLine();
}

// ====== ALERT ======
function alertPhase() {

  code.style.color = "#ff4d4d";
  code.style.textAlign = "center";
  code.style.fontSize = "55px";
  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";

  startDangerMode();

  setTimeout(() => {

    stopAllSounds();

    monitor.style.background = "black";
    code.innerText = "";

    playHeartbeat(5000);

    setTimeout(() => {
      hackedScreen();
    }, 5000);

  }, 2000);
}

// ====== HACKED ======
function hackedScreen() {

  code.style.color = "white";
  code.style.textAlign = "center";
  code.style.fontSize = "70px";

  code.innerHTML = `
    <div>
      𝕊𝔸ℝ𝔸ℍ ℍ𝔸ℂ𝕂𝔼𝔻 𝕐𝕆𝕌 😏
      <br><br>
      <span style="font-size:35px;">
        22 OCT 2024<br><br>
        No escape available 💘
      </span>
    </div>
  `;

  setTimeout(finalLove, 3500);
}

// ====== LOVE ======
function finalLove() {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background: radial-gradient(circle, #ffb6c1, #000);
    ">
      <div style="font-size:90px; color:white;">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;
}

// ====== DECLINE ======
declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
