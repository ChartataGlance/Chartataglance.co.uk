const API_URL = "https://chartsapi.chartataglance.co.uk";

async function loadGallery(pattern) {

    const title = document.getElementById("gallery-title");
    const gallery = document.getElementById("gallery");

    title.innerText = `${pattern} Results`;

    gallery.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            `${API_URL}/?pattern=${pattern}`
        );

        const data = await response.json();

        gallery.innerHTML = "";

        if (!data.images || data.images.length === 0) {

            gallery.innerHTML = `
                <p>No images found for ${pattern}</p>
            `;

            return;
        }

        data.images.reverse();

        data.images.forEach(item => {

            const confidence =
                item.name.match(/_([0-9.]+)\.png$/)?.[1] || "N/A";

            const card = document.createElement("div");

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

        gallery.innerHTML = `
            <p>Failed to load gallery.</p>
        `;
    }
}

loadGallery("buywedge");