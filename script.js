const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// unlock audio
function unlock() {
  const a = new Audio();
  a.play().catch(()=>{});
}

confirmBtn.onclick = () => {

  unlock();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  // 🔴 FIRST ALERT
  monitor.style.background = "#300000";
  code.style.color = "#ff4d4d";
  code.style.fontSize = "60px";
  code.style.textAlign = "center";

  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";

  new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play();

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

// 🔴 ALERT + ❤️ HEARTBEAT (FIXED)
function alertPhase() {

  monitor.style.background = "#300000";
  code.style.color = "#ff4d4d";
  code.style.textAlign = "center";
  code.style.fontSize = "55px";
  code.style.padding = "0";

  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";

  const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  beep.play();

  const heart = new Audio("https://actions.google.com/sounds/v1/alarms/heartbeat_fast.ogg");

  setTimeout(() => {

    // ❤️ switch to black and start heartbeat immediately
    monitor.style.background = "black";
    code.innerText = "";

    heart.play().catch(()=>{});

    setTimeout(() => {
      heart.pause();
      hackedScreen();
    }, 5000);

  }, 2000);
}

// 😏 HACKED SCREEN
function hackedScreen() {

  code.style.color = "white";
  code.style.textAlign = "center";
  code.style.fontSize = "70px";

  code.innerHTML = `
    <div style="line-height:1.5;">
      <div style="font-size:75px;">
        𝕊𝔸ℝ𝔸ℍ ℍ𝔸ℂ𝕂𝔼𝔻 𝕐𝕆𝕌 😏
      </div>
      <br>
      <div style="font-size:35px;">
        22 OCT 2024<br><br>
        No escape available 💘
      </div>
    </div>
  `;

  setTimeout(finalLove, 3500);
}

// 💘 FINAL
function finalLove() {

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background: radial-gradient(circle, #ffb6c1, #000);
      text-align:center;
    ">
      <div style="font-size:90px; color:white;">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;
}

// ❌ DECLINE
declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
