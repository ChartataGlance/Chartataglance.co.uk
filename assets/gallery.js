const API_URL = "https://chartsapi.chartataglance.workers.dev";

async function loadGallery(pattern) {
  const title = document.getElementById("gallery-title");
  const gallery = document.getElementById("gallery");

  title.innerText = `${pattern} Results`;
  gallery.innerHTML = "<p>Loading...</p>";

  const response = await fetch(`${API_URL}/?pattern=${pattern}`);
  const data = await response.json();

  gallery.innerHTML = "";

  data.images.forEach(item => {
    const confidence = item.name.match(/_([0-9.]+)\.png$/)?.[1] || "N/A";

    gallery.innerHTML += `
      <div class="card">
        <img loading="lazy" src="${item.url}" alt="${pattern} AI DAX pattern result">
        <div class="card-body">
          <h3>${pattern}</h3>
          <p>Confidence: ${confidence}</p>
          <a href="${item.url}" target="_blank">Open Full Image</a>
        </div>
      </div>
    `;
  });
}

loadGallery("buywedge");