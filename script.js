const emojis = [
  "❤️","💕","😍","😘","🫂","🥰","🥹","🤗","🫣","🤭","🫠","🫶",
  "🫀","🤴👸","👩🏻‍❤️‍💋‍👨🏾","👩🏻‍❤️‍👨🏾","👑","💍","💎","💝","💞"
];

// 💫 smooth evenly spread emoji rain
setInterval(() => {

  const emoji = document.createElement("div");

  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  // 👉 FIX: divide screen into columns to avoid clumps
  const columns = 12;
  const colWidth = window.innerWidth / columns;
  const randomCol = Math.floor(Math.random() * columns);

  emoji.style.position = "absolute";
  emoji.style.left = (randomCol * colWidth + Math.random() * (colWidth / 2)) + "px";
  emoji.style.top = window.innerHeight + "px";

  emoji.style.fontSize = (20 + Math.random() * 35) + "px";
  emoji.style.opacity = 1;
  emoji.style.transition = "all 4s linear";

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.style.top = "-80px";
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => {
    emoji.remove();
  }, 4000);

}, 200);
