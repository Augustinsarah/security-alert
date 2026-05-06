const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// 🎧 audio elements
const monitorSound = document.getElementById("monitorSound");
const heartSound = document.getElementById("heartSound");

// ================= START =================
confirmBtn.onclick = () => {

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  // 🔊 START CONTINUOUS TUM-TUM
  monitorSound.loop = true;
  monitorSound.currentTime = 0;
  monitorSound.play();

  // 🔴 FIRST ALERT
  monitor.style.background = "#300000";
  code.style.color = "#ff4d4d";
  code.style.fontSize = "60px";
  code.style.textAlign = "center";

  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";

  setTimeout(codePhase, 2500);
};

// ================= CODE =================
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

// ================= ALERT =================
function alertPhase() {

  monitor.style.background = "#300000";
  code.style.color = "#ff4d4d";
  code.style.textAlign = "center";
  code.style.fontSize = "55px";

  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";

  setTimeout(() => {

    // 🔇 stop monitor sound
    monitorSound.pause();

    // ❤️ start heartbeat
    heartSound.currentTime = 0;
    heartSound.play();

    monitor.style.background = "black";
    code.innerText = "";

    setTimeout(() => {
      heartSound.pause();
      hackedScreen();
    }, 5000);

  }, 2000);
}

// ================= HACKED =================
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

// ================= LOVE =================
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

// ================= DECLINE =================
declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
