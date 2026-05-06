window.addEventListener("DOMContentLoaded", () => {

  const confirmBtn = document.getElementById("confirm");
  const declineBtn = document.getElementById("decline");

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (typeof startSystem === "function") {
        startSystem();
      }
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      const boot = document.getElementById("bootScreen");
      if (boot) boot.innerHTML = "<h1>ACCESS DENIED</h1>";
    });
  }

});
