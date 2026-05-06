const confirmBtn = document.getElementById("confirm");
const declineBtn = document.getElementById("decline");

const bootScreen = document.getElementById("bootScreen");
const monitor = document.getElementById("monitor");
const code = document.getElementById("code");

confirmBtn.onclick = () => {

  bootScreen.style.display = "none";
  monitor.style.display = "flex";

  const messages = [
    "SECURITY ALERT CODE: 001-X7",
    "BREACH DETECTED",
    "SYSTEM OVERRIDE ACTIVE",
    "MONITORING UNSTABLE",
    "TRACE RUNNING..."
  ];

  let i = 0;

  function showCode() {
    code.innerText = messages[i];
    i++;

    if (i < messages.length) {
      setTimeout(showCode, 1500);
    } else {
      startHeartbeatPhase();
    }
  }

  function startHeartbeatPhase() {

    monitor.style.background = "black";
    code.innerText = "";

    const heartbeat = new Audio("https://actions.google.com/sounds/v1/alarms/heartbeat_fast.ogg");
    heartbeat.play();

    setTimeout(() => {
      heartbeat.pause();
      startSmokePhase();
    }, 5000);
  }

  function startSmokePhase() {

    const smoke = new Audio("https://actions.google.com/sounds/v1/nature/wind_and_rain.ogg");
    smoke.play();

    setTimeout(() => {
      showFinalMessage();
    }, 4000);
  }

  function showFinalMessage() {

    monitor.innerHTML = `
      <div style="
        color: black;
        font-size: 60px;
        text-align: center;
        background: rgba(255,255,255,0.95);
        padding: 40px;
        border-radius: 20px;
      ">
        💖 SECURITY RESET COMPLETE 💖<br><br>
        SYSTEM STABLE<br><br>
        TRACE TERMINATED
      </div>
    `;

    setTimeout(() => {
      showLoveScreen();
    }, 4000);
  }

  function showLoveScreen() {

    document.body.innerHTML = `
      <div style="
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffb6c1;
        font-size: 80px;
        font-family: monospace;
      ">
        I LOVE YOU AUGGY 👩🏻‍❤️‍💋‍👨🏾
      </div>
    `;
  }

  showCode();
};

declineBtn.onclick = () => {
  bootScreen.innerHTML = "<h1>ACCESS DENIED</h1>";
};
