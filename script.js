let hackedAlarm;

function hackedScreen() {

  startHackedAlarm(); // 🔊 add sound HERE

  monitor.innerHTML = `
    <div style="color:white; text-align:center; font-size:60px;">
      𝕊𝔸ℝ𝔸ℍ ℍ𝔸ℂ𝕂𝔼𝔻 𝕐𝕆𝕌 😏<br><br>
      22 OCT 2024<br><br>
      No escape 💘
    </div>
  `;

  setTimeout(() => {
    stopHackedAlarm();
    finalLove();
  }, 5000);
}
