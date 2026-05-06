function finalLove() {

  document.body.innerHTML = `
    <div id="loveScreen" style="
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background: radial-gradient(circle, #ffb6c1, #000);
      overflow:hidden;
      position:relative;
    ">

      <div id="loveText" style="
        font-size:90px;
        color:white;
        text-align:center;
        z-index:2;
      ">
        𝕀 𝕃𝕆𝕍𝔼 𝕐𝕆𝕌 𝔸𝕌𝔾𝔾𝕐 💖
      </div>

      <button id="loveBtn" style="
        margin-top:30px;
        padding:12px 25px;
        font-size:20px;
        border:none;
        border-radius:20px;
        background:#ff69b4;
        color:white;
        cursor:pointer;
        z-index:2;
      ">
        Tap me 💘
      </button>

    </div>
  `;

  // 💖 floating hearts automatically
  setInterval(createHeart, 400);

  document.getElementById("loveBtn").onclick = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(createHeart, i * 100);
    }
  };

  // 👆 clicking anywhere = hearts burst
  document.body.onclick = (e) => {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createHeart(e.clientX, e.clientY), i * 80);
    }
  };
}

// 💖 heart generator
function createHeart(x = Math.random() * window.innerWidth, y = window.innerHeight) {

  const heart = document.createElement("div");

  heart.innerText = "💖";
  heart.style.position = "absolute";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = (20 + Math.random() * 30) + "px";
  heart.style.opacity = 1;
  heart.style.transition = "all 2s linear";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.top = (y - 200) + "px";
    heart.style.opacity = 0;
  }, 50);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}
