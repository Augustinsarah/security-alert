const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// 🔊 continuous monitor sound (tum…tum…tum…)
const monitorSound = new Audio("https://actions.google.com/sounds/v1/alarms/medical_monitor_beep.ogg");
monitorSound.loop = true;

// ❤️ heartbeat (strong one)
const heartSound = new Audio("https://actions.google.com/sounds/v1/alarms/heartbeat_fast.ogg");

// unlock audio
function unlock() {
  monitorSound.volume = 0;
  monitorSound.play().then(() => {
    monitorSound.pause();
    monitorSound.currentTime = 0;
    monitorSound.volume = 1;
  }).catch(()=>{});
}

confirmBtn.onclick = () => {

  unlock();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  // ▶ START CONTINUOUS SOUND
  monitorSound.play();

  // 🔴 first alert
  monitor.style.background = "#300000";
  code.style.color = "#ff4d4d";
  code.style.fontSize = "60px";
  code.style.textAlign = "center";

  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";

  setTimeout(codePhase, 2500);
};

// 💻 CODE PHASE
function codePhase() {

  monitor.style.background = "black";
  code.style.color = "#00ff66";
  code.style.fontSize = "26px";
  code.style.textAlign = "left";
  code.style.padding = "40px";

  const lines = [
    "> boot_sequence.init()",
    "> loading kernel...",
    "> checking files...",
    "> scanning memory...",
    "> injecting trace...",
    "> access violation detected"
  ];

  let i = 0;

  function typeLine() {
    if (i < lines.length) {
      code.innerText += lines[i] + "\n";
      i++;
      setTimeout(typeLine, 600);
    } else {
      alertPhase();
    }
  }

  code.innerText = "";
  typeLine();
}

// 🔴 ALERT → ❤️ HEARTBEAT
function alertPhase() {

  monitor.style.background = "#300000";
  code.style.color = "#ff4d4d";
  code.style.textAlign = "center";
  code.style.fontSize = "55px";

  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";

  setTimeout(() => {

    // stop monitor beep
    monitorSound.pause();

    // black screen
    monitor.style.background = "black";
    code.innerText = "";

    // ❤️ start heartbeat clearly
    heartSound.play();

    setTimeout(() => {
      heartSound.pause();
      hackedScreen();
    }, 5000);

  }, 2000);
}

// 😏 hacked
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

// 💘 final
function finalLove() {

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background: radial-gradient(circle, #ffb6c1, #000);
    ">
      <div style="font-size:90px; color:white; text-align:center;">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;
}

// decline
declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
