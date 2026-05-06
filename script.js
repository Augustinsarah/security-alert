window.addEventListener("DOMContentLoaded", () => {

  const confirmBtn = document.getElementById("confirm");
  const declineBtn = document.getElementById("decline");

  const bootScreen = document.getElementById("bootScreen");
  const monitor = document.getElementById("monitor");
  const code = document.getElementById("code");

  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let siren;

  // CONFIRM CLICK
  confirmBtn.onclick = () => {
    audioCtx.resume();

    bootScreen.style.display = "none";
    monitor.style.display = "flex";

    code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";
    code.style.color = "red";

    startSiren();

    setTimeout(() => {
      code.innerText = "Scanning system...";
    }, 2000);

    setTimeout(() => {
      stopSiren();
      heartbeat();
    }, 4000);

    setTimeout(() => {
      showFinal();
    }, 8000);
  };

  // DECLINE
  declineBtn.onclick = () => {
    bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
  };

  // 🔴 SIREN SOUND
  function startSiren() {
    siren = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    siren.type = "sawtooth";
    siren.frequency.value = 700;
    gain.gain.value = 0.3;

    siren.connect(gain);
    gain.connect(audioCtx.destination);

    siren.start();

    setInterval(() => {
      siren.frequency.value = siren.frequency.value === 700 ? 1200 : 700;
    }, 400);
  }

  function stopSiren() {
    if (siren) siren.stop();
  }

  // ❤️ HEARTBEAT
  function heartbeat() {
    let count = 0;

    let interval = setInterval(() => {
      beep(60);
      beep(40);

      count++;
      if (count > 8) clearInterval(interval);
    }, 900);
  }

  function beep(freq) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;

    gain.gain.value = 1;
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  }

  // 💘 FINAL SCREEN
  function showFinal() {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background: radial-gradient(circle, pink, black);
        font-size:60px;
        color:white;
        text-align:center;
      ">
        I LOVE YOU AUGGY 💖
      </div>
    `;
  }

});
