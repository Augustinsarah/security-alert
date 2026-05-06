function startAlarm() {

  stopAll();

  let on = false;

  // red flashing screen (keep it simple)
  blink = setInterval(() => {
    monitor.style.background = on ? "#3a0000" : "#000000";
    monitor.style.boxShadow = on ? "0 0 100px red" : "none";
    on = !on;
  }, 300);

  // 🚨 ORIGINAL STYLE WARNING ALARM SOUND
  alarmOsc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  alarmOsc.type = "sawtooth";  // harsh warning tone
  alarmOsc.frequency.value = 800; // steady danger tone

  gain.gain.value = 0.25;

  alarmOsc.connect(gain);
  gain.connect(audioCtx.destination);

  alarmOsc.start();

  // simple slow warning wobble (NOT ambulance sweep)
  setInterval(() => {
    const t = audioCtx.currentTime;

    alarmOsc.frequency.setValueAtTime(800, t);
    alarmOsc.frequency.linearRampToValueAtTime(950, t + 0.2);
    alarmOsc.frequency.linearRampToValueAtTime(800, t + 0.4);

  }, 500);
}
