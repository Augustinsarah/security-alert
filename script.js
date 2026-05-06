const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// 🔊 alert sound (tun-tun)
function alertBeep() {
  const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  beep.play();
}

// ❤️ heartbeat
function heartbeatSound() {
  const hb = new Audio("https://actions.google.com/sounds/v1/alarms/heartbeat_fast.ogg");
  hb.play();
  return hb;
}

// unlock audio
function unlock() {
  const a = new Audio();
  a.play().catch(()=>{});
}

confirmBtn.onclick = () => {
  unlock();

  // 🔴 red alert screen
  bootScreen.style.display = "none";
  monitor.style.display = "flex";
  monitor.style.background = "#2b0000";

  code.style.color = "#ff4d4d";
  code.style.fontSize = "60px";
  code.style.textAlign = "center";

  code.innerText = "⚠️ SECURITY ACCESS REQUEST ⚠️";

  alertBeep();

  setTimeout(runCodePhase, 2500);
};

// 💻 REAL CODE STYLE TEXT
function runCodePhase() {

  monitor.style.background = "black";
  code.style.color = "#00ff66";
  code.style.fontSize = "28px";
  code.style.textAlign = "left";
  code.style.padding = "40px";

  const lines = [
    "> init.sys --run",
    "> loading kernel modules...",
    "> checking files...",
    "> scanning memory blocks...",
    "> verifying access layers...",
    "> system integrity: FAIL"
  ];

  let i = 0;

  function typeLine() {
    code.innerText += lines[i] + "\n";
    i++;

    if (i < lines.length) {
      setTimeout(typeLine, 600);
    } else {
      triggerAlert();
    }
  }

  code.innerText = "";
  typeLine();
}

// 🔴 second alert
function triggerAlert() {

  monitor.style.background = "#2b0000";
  code.style.color = "#ff4d4d";
  code.style.textAlign = "center";
  code.style.fontSize = "55px";
  code.style.padding = "0";

  code.innerText = "⚠️ UNEXPECTED TRIGGER DETECTED ⚠️";

  alertBeep();

  setTimeout(heartbeatPhase, 2500);
}

// ❤️ heartbeat phase
function heartbeatPhase() {

  monitor.style.background = "black";
  code.innerText = "";

  const hb = heartbeatSound();

  setTimeout(() => {
    hb.pause();
    hackedScreen();
  }, 5000);
}

// 😏 hacked message (math bold style)
function hackedScreen() {

  code.style.color = "white";
  code.style.textAlign = "center";
  code.style.fontSize = "70px";

  code.innerHTML = `
    <div style="font-family: 'Courier New', monospace;">
      <b>𝑺𝑨𝑹𝑨𝑯 𝑯𝑨𝑪𝑲𝑬𝑫 𝒀𝑶𝑼 😏</b>
      <br><br>
      <span style="font-size:40px;">
        22 OCT 2024<br><br>
        No escape available 💘
      </span>
    </div>
  `;

  setTimeout(loveScreen, 3500);
}

// 💘 final love screen (cute background)
function loveScreen() {

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      background: radial-gradient(circle, #ffb6c1, #000);
      text-align:center;
    ">
      <div style="
        font-size:90px;
        color:white;
        font-family: 'Courier New', monospace;
      ">
        𝑰 𝑳𝑶𝑽𝑬 𝒀𝑶𝑼 𝑨𝑼𝑮𝑮𝒀 💖
      </div>
    </div>
  `;
}

declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
