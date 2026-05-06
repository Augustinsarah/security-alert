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
      text-align:center;
    ">
      <div style="font-size:100px; color:white; z-index:2;">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>
    </div>
  `;

  const emojis = [
    "❤️","💕","😍","😘","🫂","🥰","🥹","🤗","🫣","🤭","🫠","🫶",
    "🫀","🤴👸","👩🏻‍❤️‍💋‍👨🏾","👩🏻‍❤️‍👨🏾","👑","💍","💎","💝","💞"
  ];

  const columns = 14; // more columns = smoother spread
  const colWidth = window.innerWidth / columns;

  setInterval(() => {

    const emoji = document.createElement("div");

    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    const col = Math.floor(Math.random() * columns);

    emoji.style.position = "absolute";
    emoji.style.left = (col * colWidth + Math.random() * (colWidth * 0.6)) + "px";
    emoji.style.top = window.innerHeight + "px";

    emoji.style.fontSize = (18 + Math.random() * 40) + "px";
    emoji.style.opacity = 1;
    emoji.style.transition = "all 4s linear";

    document.body.appendChild(emoji);

    setTimeout(() => {
      emoji.style.top = "-100px";
      emoji.style.opacity = 0;
    }, 50);

    setTimeout(() => {
      emoji.remove();
    }, 4000);

  }, 180);
} 
