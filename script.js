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

  // 💘 ALL YOUR EMOJIS
  const emojis = [
    "❤️","💕","😍","😘","🫂","🥰","🥹","🤗","🫣","🤭","🫠","🫶",
    "🫀","🤴👸","👩🏻‍❤️‍💋‍👨🏾","👩🏻‍❤️‍👨🏾","👑","💍","💎","💝","💞"
  ];

  // 💫 create floating emojis continuously
  setInterval(() => {
    createEmoji(emojis);
  }, 300);
}

// 💫 EMOJI CREATOR
function createEmoji(emojis) {

  const emoji = document.createElement("div");

  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.position = "absolute";
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = window.innerHeight + "px";

  emoji.style.fontSize = (20 + Math.random() * 40) + "px";
  emoji.style.opacity = 1;
  emoji.style.transition = "all 4s linear";

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.style.top = "-50px";
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => {
    emoji.remove();
  }, 4000);
}
