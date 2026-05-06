window.addEventListener("DOMContentLoaded", () => {

  const bootScreen = document.getElementById("bootScreen");
  const monitor = document.getElementById("monitor");
  const code = document.getElementById("code");

  const confirmBtn = document.getElementById("confirm");
  const declineBtn = document.getElementById("decline");

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  let alarmOsc;
  let alarmGain;
  let blink;

  // ===== CONFIRM =====
  confirmBtn.addEventListener("click", async () => {
    await audioCtx.resume();

    bootScreen.style.display = "none";
    monitor.style.display = "flex";

    code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";
    code.style.color = "red";
    code.style.textAlign = "center";
    code.style.fontSize = "50px";

    startAlarm();

    setTimeout(showHack, 5000);
  });

  // ===== DECLINE =====
  declineBtn.addEventListener("click", () => {
    bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
  });

  // ===== 🚨 REAL CONTINUOUS SECURITY ALARM =====
  function startAlarm() {

    stopAll();

    // RED FLASH
    let on = false;
    blink = setInterval(() => {
      monitor.style.background = on ? "#400000" : "#000000";
      monitor.style.boxShadow = on ? "0 0 120px red" : "none";
      on = !on;
    }, 250);

    // 🔊 CONTINUOUS WARNING SIREN (REAL SECURITY STYLE)
    alarmOsc = audioCtx.createOscillator();
    alarmGain = audioCtx.createGain();

    alarmOsc.type = "square"; // harsh system alarm
    alarmGain.gain.value = 0.2;

    alarmOsc.connect(alarmGain);
    alarmGain.connect(audioCtx.destination);

    alarmOsc.start();

    // smooth repeating rise/fall (NOT ambulance, NOT beeps)
    let up = true;
    setInterval(() => {
      const t = audioCtx.currentTime;

      const f1 = up ? 700 : 1100;
      alarmOsc.frequency.setValueAtTime(f1, t);
      alarmOsc.frequency.linearRampToValueAtTime(up ? 1100 : 700, t + 1.2);

      up = !up;

    }, 1200);
  }

  // ===== HACKED SCREEN =====
  function showHack() {

    stopAll();

    monitor.innerHTML = `
      <div style="color:white;text-align:center;font-size:60px;">
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

  function stopAll() {
    if (alarmOsc) alarmOsc.stop();
    if (blink) clearInterval(blink);
  }

});
