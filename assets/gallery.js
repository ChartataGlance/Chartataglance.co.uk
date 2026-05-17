const patternMap = {
  "123buy": "123Buy",
  "buywedge": "BuyWedge",
  "reverseup": "ReverseUp",
  "bottom": "Bottom",
  "dbl_top": "Double Top",
  "oscilation": "Oscilation"
};

async function loadGallery(pattern) {
  const title = document.getElementById("gallery-title");
  const gallery = document.getElementById("gallery-list");
  const count = document.getElementById("gallery-count");
  const buttons = document.querySelectorAll("[data-pattern]");

  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.pattern === pattern);
  });

  title.textContent = `${patternMap[pattern] || pattern} Prediction Results`;
  gallery.innerHTML = "";
  count.textContent = "Loading...";

  try {
    const response = await fetch(`data/${pattern}.json`, { cache: "no-store" });
    const items = await response.json();

    count.textContent = `${items.length} result${items.length === 1 ? "" : "s"}`;

    if (!items.length) {
      gallery.innerHTML = `
        <div class="empty-state">
          No screenshots have been added for this pattern yet. Upload images to Cloudflare and add their URLs inside <strong>data/${pattern}.json</strong>.
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const card = document.createElement("article");
      card.className = "result-card";

      card.innerHTML = `
        <img loading="lazy" src="${item.image}" alt="${item.pattern} DAX AI prediction screenshot">
        <div class="card-body">
          <h3>${item.pattern}</h3>
          <p>${item.description || "AI prediction test result from DAX chart replay."}</p>
          <div class="meta">
            <span>Confidence: ${item.confidence}</span>
            <span>${item.date}</span>
          </div>
        </div>
      `;

      gallery.appendChild(card);
    });
  } catch (error) {
    count.textContent = "0 results";
    gallery.innerHTML = `
      <div class="empty-state">
        Could not load this gallery. Check that <strong>data/${pattern}.json</strong> exists and contains valid JSON.
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-pattern]").forEach(button => {
    button.addEventListener("click", () => loadGallery(button.dataset.pattern));
  });

  loadGallery("123buy");
});