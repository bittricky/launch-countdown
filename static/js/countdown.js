(() => {
  function updateTimer() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 8);
    endDate.setHours(23);
    endDate.setMinutes(55);
    endDate.setSeconds(41);

    function update() {
      const now = new Date();
      const diff = endDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = String(days).padStart(
        2,
        "0"
      );
      document.getElementById("hours").textContent = String(hours).padStart(
        2,
        "0"
      );
      document.getElementById("minutes").textContent = String(minutes).padStart(
        2,
        "0"
      );
      document.getElementById("seconds").textContent = String(seconds).padStart(
        2,
        "0"
      );
    }

    setInterval(update, 1000);
    update();
  }

  document.addEventListener("DOMContentLoaded", updateTimer);
})();
