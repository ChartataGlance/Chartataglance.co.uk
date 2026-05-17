function updateDateTime() {
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  if (!dateEl || !timeEl) return;

  const now = new Date();

  dateEl.textContent = now.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  timeEl.textContent = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

updateDateTime();
setInterval(updateDateTime, 1000);