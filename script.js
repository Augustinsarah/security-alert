const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

// 🔓 unlock audio (fixes silent issue)
function unlockAudio() {
  const silent = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  silent.volume = 0;
  silent.play().catch(() => {});
}

confirmBtn.onclick = () => {

  unlockAudio();

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  startHack();
};

function startHack() {

  const messages = [
    "SECURITY ALERT CODE: 001-X7",
    "BREACH DETECTED",
    "SYSTEM OVERRIDE ACTIVE",
    "MONITORING UNSTABLE",
    "TRACE RUNNING..."
  ];

  let i = 0;

  function show() {
    code.innerText = messages[i];
    i++;

    if (i < messages.length) {
      setTimeout(show, 1500);
    } else {
      heartbeat();
    }
  }

  function heartbeat() {

    monitor.style.background = "black";
    code.innerText = "";

    const hb = new Audio("https://actions.google.com/sounds/v1/alarms/heartbeat_fast.ogg");
    hb.play();

    setTimeout(() => {
      hb.pause();
      smoke();
    }, 5000);
  }

  function smoke() {

    const sm = new Audio("https://actions.google.com/sounds/v1/nature/wind_and_rain.ogg");
    sm.play();

    setTimeout(() => {
      finalScreen();
    }, 3000);
  }

  function finalScreen() {

    monitor.innerHTML = `
      <div style="
        color: black;
        font-size: 55px;
        text-align: center;
        background: white;
        padding: 40px;
        border-radius: 20px;
      ">
        💖 SECURITY RESET COMPLETE 💖<br><br>
        SYSTEM STABLE<br><br>
        TRACE TERMINATED
      </div>
    `;

    setTimeout(() => {
      document.body.innerHTML = `
        <div style="
          height: 100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:black;
        ">
          <div style="
            font-size: 90px;
            color: #ffb6c1;
            text-align:center;
          ">
            I LOVE YOU AUGGY 👩🏻‍❤️‍💋‍👨🏾
          </div>
        </div>
      `;
    }, 3000);
  }

  show();
}

function show() {
  const messages = [
    "SECURITY ALERT CODE: 001-X7",
    "BREACH DETECTED",
    "SYSTEM OVERRIDE ACTIVE",
    "MONITORING UNSTABLE",
    "TRACE RUNNING..."
  ];

  let i = 0;

  function run() {
    code.innerText = messages[i];
    i++;
    if (i < messages.length) {
      setTimeout(run, 1500);
    } else {
      heartbeat();
    }
  }

  run();
}

declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
