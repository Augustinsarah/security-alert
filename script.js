window.addEventListener("DOMContentLoaded", () => {

  const bootScreen = document.getElementById("bootScreen");
  const monitor = document.getElementById("monitor");
  const code = document.getElementById("code");

  const confirmBtn = document.getElementById("confirm");
  const declineBtn = document.getElementById("decline");

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let osc;
  let gain;
  let blink;

  // ===== CLICK CONFIRM (FIXED 100%) =====
  confirmBtn.addEventListener("click", () => {

    audioCtx.resume();

    bootScreen.style.display = "none";
    monitor.style.display = "flex";

    code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";
    code.style.color = "red";
    code.style.fontSize = "50px";
    code.style.textAlign = "center";

    startAlarm();

    setTimeout(scanPhase, 3000);
  });

  // ===== DECLINE =====
  declineBtn.addEventListener("click", () => {
    bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
  });

  // ===== 🚨 ORIGINAL LONG SECURITY SIREN =====
  function startAlarm() {

    stopAll();

    let on = false;
    blink = setInterval(() => {
      monitor.style.background = on ? "#400000" : "#000000";
      monitor.style.boxShadow = on ? "0 0 120px red" : "none";
      on = !on;
    }, 300);

    osc = audioCtx.createOscillator();
    gain = audioCtx.createGain();

    osc.type = "sawtooth";
    gain.gain.value = 0.25;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();

    let up = true;

    setInterval(() => {
      const t = audioCtx.currentTime;

      if (up) {
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.linearRampToValueAtTime(1200, t + 1.5);
      } else {
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.linearRampToValueAtTime(600, t + 1.5);
      }

      up = !up;
    }, 1500);
  }

  // ===== SCAN =====
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

  // ===== ALERT =====
  function alertPhase() {
    code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";
    code.style.color = "red";
    code.style.fontSize = "40px";

    setTimeout(() => {
      stopAll();
      setTimeout(hackedScreen, 5000);
    }, 2500);
  }

  // ===== HACKED =====
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

  // ===== FINAL =====
  function finalLove() {

    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background: radial-gradient(circle, #ffb6c1, #000);
        font-size:90px;
        color:white;
      ">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    `;
  }

  // ===== STOP =====
  function stopAll() {
    if (osc) osc.stop();
    if (blink) clearInterval(blink);
  }

});
