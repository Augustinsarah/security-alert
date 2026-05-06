function finalLove() {

  document.body.innerHTML = `
    <div id="loveScreen" style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background: radial-gradient(circle, #ffb6c1, #000);
      overflow:hidden;
      position:relative;
    ">
      <div style="
        font-size:100px;
        color:white;
        text-align:center;
        z-index:2;
      ">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;

  // 💕 ALL YOUR EMOJIS
  const emojis = [
    "❤️","💕","😍","😘","🫂","🥰","🥹","🤗","🫣","🤭","🫠","🫶","🫀",
    "🤴","👸","👩🏻‍❤️‍💋‍👨🏾","👩🏻‍❤️‍👨🏾","👑","💍","💎","💝","💞"
  ];

  // 💫 continuous floating
  setInterval(() => {
    createEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
  }, 300);
}

// 💫 emoji floating function
function createEmoji(emoji) {

  const el = document.createElement("div");

  el.innerText = emoji;

  el.style.position = "absolute";
  el.style.left = Math.random() * window.innerWidth + "px";
  el.style.top = window.innerHeight + "px";

  el.style.fontSize = (25 + Math.random() * 35) + "px";
  el.style.opacity = 1;
  el.style.transition = "all 4s linear";

  document.body.appendChild(el);

  setTimeout(() => {
    el.style.top = "-50px";
    el.style.opacity = 0;
  }, 50);

  setTimeout(() => {
    el.remove();
  }, 4000);
}
