function startAlarm() {

  stopAll();

  // 🔴 SCREEN FLASH
  let on = false;
  setInterval(() => {
    monitor.style.background = on ? "#400000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 120px red" : "none";
    on = !on;
  }, 300);

  // 🚨 ORIGINAL STYLE SECURITY SIREN (LONG + SMOOTH)
  const ctx = audioCtx;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth"; // classic warning siren feel
  gain.gain.value = 0.25;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();

  // 🔊 SLOW UP & DOWN SIREN (NOT FAST, NOT BEEPS)
  let up = true;
  let freq = 600;

  setInterval(() => {

    const t = ctx.currentTime;

    if (up) {
      freq = 600;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(1200, t + 1.2);
    } else {
      freq = 1200;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(600, t + 1.2);
    }

    up = !up;

  }, 1200);
}
