let sirenOsc = null;
let sirenGain = null;
let blinkInterval = null;

function startDangerMode() {
  stopAllSounds();

  // 🎧 create ONE continuous siren
  sirenOsc = audioCtx.createOscillator();
  sirenGain = audioCtx.createGain();

  sirenOsc.type = "sawtooth";
  sirenGain.gain.value = 0.25;

  sirenOsc.connect(sirenGain);
  sirenGain.connect(audioCtx.destination);

  sirenOsc.start();

  // 🔁 smooth up-down siren loop
  function sweep() {
    const now = audioCtx.currentTime;

    // low → high
    sirenOsc.frequency.setValueAtTime(500, now);
    sirenOsc.frequency.linearRampToValueAtTime(1200, now + 0.7);

    // high → low
    sirenOsc.frequency.linearRampToValueAtTime(500, now + 1.4);
  }

  sweep();
  setInterval(sweep, 1400); // repeat cycle

  // 🔴 blinking background (slower = better)
  let on = false;
  blinkInterval = setInterval(() => {
    monitor.style.background = on ? "#300000" : "#000000";
    on = !on;
  }, 500);
}
