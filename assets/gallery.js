const API_URL =
  "https://chartsapi.chartataglance.co.uk";

const patterns = [
  "buywedge",
  "123up",
  "reverseup",
  "bottom",
  "dbl_top",
  "oscilation"
];

const gallery =
  document.getElementById("gallery");

const galleryTitle =
  document.getElementById("gallery-title");

const galleryStatus =
  document.getElementById("gallery-status");

const patternNav =
  document.getElementById("pattern-nav");

patterns.forEach(pattern => {

  const btn = document.createElement("button");

  btn.innerText = pattern;

  btn.onclick = () => loadGallery(pattern);

  patternNav.appendChild(btn);
});

async function loadGallery(pattern) {

  galleryTitle.innerText =
    `${pattern} AI Results`;

  galleryStatus.innerText =
    "Loading...";

  gallery.innerHTML = "";

  try {

    const response = await fetch(
      `${API_URL}/?pattern=${pattern}`
    );

    const data = await response.json();

    if (!data.images || data.images.length === 0) {

      galleryStatus.innerText =
        `No images found for ${pattern}`;

      return;
    }

    galleryStatus.innerText =
      `${data.count} images loaded`;

    data.images.reverse();

    data.images.forEach(item => {

      const confidence =
        item.name.match(
          /_([0-9.]+)\.png$/
        )?.[1] || "N/A";

      const card =
        document.createElement("div");

      card.className = "card";

      card.innerHTML = `
        <img
          loading="lazy"
          src="${item.url}"
          alt="${pattern}"
        >

        <div class="card-body">

          <h3>${pattern}</h3>

          <p>
            Confidence: ${confidence}
          </p>

          <a
            href="${item.url}"
            target="_blank"
          >
            Open Full Image
          </a>

        </div>
      `;

      gallery.appendChild(card);
    });

  } catch (err) {

    console.error(err);

    galleryStatus.innerText =
      "Failed to load gallery.";
  }
}

loadGallery("buywedge");