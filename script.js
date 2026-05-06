const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// 🔓 unlock audio (fix Chrome block)
function unlockAudio() {
  const a = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  a.volume = 0;
  a.play().catch(() => {});
}

// ⚡ SCREEN FLASH + SHAKE
function flashShake() {
  document.body.style.transition = "0.1s";
  document.body.style.background = "white";

  setTimeout(() => {
    document.body.style.background = "black";
  }, 150);

  document.body.style.transform = "translateX(10px)";
  setTimeout(() => document.body.style.transform = "translateX(-10px)", 100);
  setTimeout(() => document.body.style.transform = "translateX(0px)", 200);
}

confirmBtn.onclick = () => {

  unlockAudio();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  startSequence();
};

function startSequence() {

  const messages = [
    "SYSTEM SCAN INITIATED...",
    "FIREWALL BYPASSED...",
    "DEVICE TRACE ACTIVE...",
    "LOCATION UNKNOWN...",
    "BREACH IMMINENT..."
  ];

  let i = 0;

  function runScan() {
    code.innerText = messages[i];
    flashShake();
    i++;

    if (i < messages.length) {
      setTimeout(runScan, 1200);
    } else {
      breachAlert();
    }
  }

  function breachAlert() {

    monitor.style.background = "#200000";
    code.innerHTML = "🚨 SECURITY BREACH DETECTED 🚨";

    const alarm = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
    alarm.play();

    setTimeout(() => {
      heartbeatPhase();
    }, 3000);
  }

  function heartbeatPhase() {

    monitor.style.background = "black";
    code.innerText = "";

    const hb = new Audio("https://actions.google.com/sounds/v1/alarms/heartbeat_fast.ogg");
    hb.play();

    setTimeout(() => {
      hb.pause();
      smokePhase();
    }, 5000);
  }

  function smokePhase() {

    const smoke = new Audio("https://actions.google.com/sounds/v1/nature/wind_and_rain.ogg");
    smoke.play();

    setTimeout(() => {
      finalScene();
    }, 3000);
  }

  function finalScene() {

    monitor.innerHTML = `
      <div style="
        color: black;
        font-size: 55px;
        text-align: center;
        background: rgba(255,255,255,0.95);
        padding: 40px;
        border-radius: 20px;
        animation: fadeIn 2s ease;
      ">
        💖 SYSTEM RESTORED 💖<br><br>
        ALL THREATS NEUTRALIZED
      </div>
    `;

    setTimeout(loveScreen, 3000);
  }

  function loveScreen() {

    document.body.innerHTML = `
      <div id="love">
        I LOVE YOU AUGGY 👩🏻‍❤️‍💋‍👨🏾
      </div>
    `;

    // 💖 floating hearts
    setInterval(() => {
      const heart = document.createElement("div");
      heart.innerHTML = "💖";
      heart.style.position = "absolute";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = "30px";
      heart.style.animation = "floatUp 4s linear";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 4000);
    }, 300);
  }

  runScan();
}

declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};

// 💖 animations injected
const style = document.createElement("style");
style.innerHTML = `
@keyframes floatUp {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100vh); opacity: 0; }
}

#love {
  height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:black;
  color:#ffb6c1;
  font-size:80px;
  text-align:center;
}
`;
document.head.appendChild(style);
