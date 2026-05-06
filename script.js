// ====== ELEMENTS ======
const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// ====== AUDIO ENGINE ======
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ====== 🔴 DANGER MODE (SIREN + BLINK) ======
let sirenOsc = null;
let sirenGain = null;
let blinkInterval = null;
let sweepInterval = null;

function startDangerMode() {
  stopAllSounds();

  sirenOsc = audioCtx.createOscillator();
  sirenGain = audioCtx.createGain();

  sirenOsc.type = "sawtooth";
  sirenGain.gain.value = 0.35;

  sirenOsc.connect(sirenGain);
  sirenGain.connect(audioCtx.destination);

  sirenOsc.start();

  function sweep() {
    const now = audioCtx.currentTime;
    sirenOsc.frequency.setValueAtTime(500, now);
    sirenOsc.frequency.linearRampToValueAtTime(1200, now + 0.8);
    sirenOsc.frequency.linearRampToValueAtTime(500, now + 1.6);
  }

  sweep();
  sweepInterval = setInterval(sweep, 1600);

  let on = false;
  blinkInterval = setInterval(() => {
    monitor.style.background = on ? "#300000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 80px red" : "0 0 0px black";
    on = !on;
  }, 500);
}

// ====== 💻 MONITOR SOUND ======
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
  }, 900);

  monitor.style.background = "black";
}

// ====== ❤️ REAL HEARTBEAT ======
function playHeartbeat(duration = 9000) {
  let interval = setInterval(() => {
    let now = audioCtx.currentTime;

    heartbeatBeat(now, 60, 1.0);
    heartbeatBeat(now + 0.28, 48, 0.7);

  }, 1100);

  setTimeout(() => clearInterval(interval), duration);
}

function heartbeatBeat(time, freq, volume) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, time);

  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + 0.4);
}

// ====== STOP ALL ======
function stopAllSounds() {
  if (sirenOsc) {
    sirenOsc.stop();
    sirenOsc = null;
  }
  if (blinkInterval) clearInterval(blinkInterval);
  if (monitorInterval) clearInterval(monitorInterval);
  if (sweepInterval) clearInterval(sweepInterval);
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

  setTimeout(codePhase, 4000);
};

// ====== CODE PHASE ======
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
      setTimeout(typeLine, 1000);
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

    playHeartbeat(9000);

    setTimeout(() => {
      hackedScreen();
    }, 9000);

  }, 4000);
}

// ====== HACKED ======
function hackedScreen() {

  code.style.color = "white";
  code.style.textAlign = "center";
  code.style.fontSize = "70px";

  code.innerHTML = `
    <div style="line-height:1.5;">
      <div style="font-size:80px;">
        𝕊𝔸ℝ𝔸ℍ ℍ𝔸ℂ𝕂𝔼𝔻 𝕐𝕆𝕌 😏
      </div>
      <br>
      <div style="font-size:35px;">
        22 OCT 2024<br><br>
        No escape available 💘
      </div>
    </div>
  `;

  setTimeout(finalLove, 6000);
}

// ====== LOVE (FINAL WITH EMOJIS) ======
function finalLove() {

  document.body.innerHTML = `
    <div id="loveScreen" style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background: radial-gradient(circle, #ffb6c1, #000);
      overflow:hidden;
      position:relative;
      text-align:center;
    ">
      <div style="font-size:100px; color:white; z-index:2;">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;

  const emojis = [
    "❤️","💕","😍","😘","🫂","🥰","🥹","🤗","🫣","🤭","🫠","🫶",
    "🫀","🤴👸","👩🏻‍❤️‍💋‍👨🏾","👩🏻‍❤️‍👨🏾","👑","💍","💎","💝","💞"
  ];

  setInterval(() => {

    const emoji = document.createElement("div");

    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.position = "absolute";
    emoji.style.left = Math.random() * window.innerWidth + "px";
    emoji.style.top = window.innerHeight + "px";

    emoji.style.fontSize = (20 + Math.random() * 40) + "px";
    emoji.style.opacity = 1;
    emoji.style.transition = "all 4s linear";

    document.body.appendChild(emoji);

    setTimeout(() => {
      emoji.style.top = "-50px";
      emoji.style.opacity = 0;
    }, 50);

    setTimeout(() => {
      emoji.remove();
    }, 4000);

  }, 300);
}

// ====== DECLINE ======
declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
