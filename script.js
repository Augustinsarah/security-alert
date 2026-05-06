function startAlarm() {

  stopAll();

  // 🔴 RED FLASHING SCREEN
  let on = false;
  setInterval(() => {
    monitor.style.background = on ? "#400000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 120px red" : "none";
    on = !on;
  }, 300);

  // 🚨 LONG SECURITY WARNING SIREN (SMOOTH, ORIGINAL STYLE)
  const ctx = audioCtx;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth"; // classic alarm siren feel
  gain.gain.value = 0.25;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();

  // smooth up-down siren (long continuous warning sound)
  let up = true;

  setInterval(() => {
    const t = ctx.currentTime;

    if (up) {
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.linearRampToValueAtTime(1200, t + 1.5);
    } else {
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.linearRampToValueAtTime(600, t + 1.5);
    }

    up = !up;
  }, 1500);
}
