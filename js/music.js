// =========================
// ALBUM DATA
// =========================
const genreDescriptions = {
    pop: "My top three pop albums of all time — catchy, polished, and endlessly replayable records that shaped how I hear music.",
    rnb: "My top three R&B albums — smooth vocals, soulful production, and timeless grooves.",
    hiphop: "My top three hip-hop albums — bold storytelling and beats that hit hard.",
    rock: "My top three rock albums — raw energy and unforgettable hooks I keep coming back to."
};

const albumData = {
    pop: [
        { title: "Thriller", artist: "Michael Jackson", year: "1982", rating: "★★★★★", genre: "Pop", runtime: "42 min 19 sec", image: "images/albums/thriller.webp", tracks: "Human Nature, Beat It, Wanna Be Startin' Somethin'", review: "My favorite pop album of all time." },
        { title: "21", artist: "Adele", year: "2011", rating: "★★★★★", genre: "Pop / Soul", runtime: "48 min 12 sec", image: "images/albums/21.webp", tracks: "One And Only, Someone Like You, Turning Tables", review: "One of the greatest breakup albums ever made." },
        { title: "Bad", artist: "Michael Jackson", year: "1987", rating: "★★★★★", genre: "Pop / Funk", runtime: "48 min 16 sec", image: "images/albums/bad.webp", tracks: "Bad, Smooth Criminal, Man in the Mirror", review: "A legendary follow-up to Thriller filled with classic hits." }
    ],
    rnb: [
        { title: "Diamond Life", artist: "Sade", year: "1984", rating: "★★★★★", genre: "Smooth Jazz / Soul", runtime: "38 min 52 sec", image: "images/albums/diamondlife.jpg", tracks: "Smooth Operator, I Will Be Your Friend, Frankie's First Affair", review: "A smooth and timeless masterpiece by Sade." },
        { title: "janet.", artist: "Janet Jackson", year: "1993", rating: "★★★★★", genre: "R&B / Pop", runtime: "1 hr 15 min 23 sec", image: "images/albums/janet.webp", tracks: "This Time, Again, Any Time Any Place", review: "My favorite Janet Jackson album with incredible R&B production." },
        { title: "All for You", artist: "Janet Jackson", year: "2001", rating: "★★★★★", genre: "R&B / Dance-Pop", runtime: "1 hr 13 min 56 sec", image: "images/albums/allforyou.jpg", tracks: "Feel So Right, Someone to Call My Lover, When We Oooo", review: "One of Janet's most fun and uplifting albums." }
    ],
    hiphop: [
        { title: "Graduation", artist: "Kanye West", year: "2007", rating: "★★★★★", genre: "Hip-Hop", runtime: "~53 min", image: "images/albums/graduation.webp", tracks: "Good Morning, Big Brother, Homecoming", review: "A bold, anthemic album that pushed hip-hop into new stadium-sized territory." },
        { title: "good kid, m.A.A.d city", artist: "Kendrick Lamar", year: "2012", rating: "★★★★½", genre: "Hip-Hop", runtime: "~68 min", image: "images/albums/goodkid.webp", tracks: "Swimming Pools (Drank), Money Trees, m.A.A.d city", review: "A cinematic concept album about growing up in Compton, packed with storytelling." },
        { title: "The Miseducation of Lauryn Hill", artist: "Lauryn Hill", year: "1998", rating: "★★★★½", genre: "Hip-Hop / Neo-Soul", runtime: "~77 min", image: "images/albums/miseducation.webp", tracks: "Doo Wop (That Thing), Forgive Them Father, Tell Him", review: "A genre-blending classic mixing hip-hop, soul, and reggae with deeply personal lyrics." }
    ],
    rock: [
        { title: "Parallel Lines", artist: "Blondie", year: "1978", rating: "★★★★★", genre: "Rock / New Wave", runtime: "~38 min", image: "images/albums/parallellines.webp", tracks: "Heart of Glass, One Way or Another, Sunday Girl", review: "A perfect blend of punk energy and pop hooks that defined new wave." },
        { title: "OK Computer", artist: "Radiohead", year: "1997", rating: "★★★★★", genre: "Alternative Rock", runtime: "~53 min", image: "images/albums/okcomputer.webp", tracks: "Lucky, Karma Police, No Surprises", review: "A haunting, atmospheric masterpiece that redefined what rock albums could sound like." },
        { title: "Jagged Little Pill", artist: "Alanis Morissette", year: "1995", rating: "★★★★★", genre: "Alternative Rock", runtime: "~57 min", image: "images/albums/jaggedlittlepill.webp", tracks: "You Oughta Know, Ironic, Hand in My Pocket", review: "Raw, honest, and packed with hits — a defining 90s rock record." }
    ]
};

function renderAlbumCard(a, rank) {
    return `
        <div class="album-card reveal active"
            data-title="${a.title}" data-artist="${a.artist}" data-year="${a.year}"
            data-rating="${a.rating}" data-genre="${a.genre}" data-runtime="${a.runtime}"
            data-image="${a.image}" data-tracks="${a.tracks}" data-review="${a.review}">
            <div class="album-art">
                <span class="rank-badge">#${rank}</span>
                <img src="${a.image}" alt="${a.title}">
                <div class="art-disc"></div>
            </div>
            <h3>${a.title}</h3>
            <p>${a.artist}</p>
            <span class="rating">${a.rating}</span>
        </div>
    `;
}

function renderGenre(genre) {
    const grid = document.createElement("div");
    grid.className = "album-grid";
    grid.innerHTML = albumData[genre].map((a, i) => renderAlbumCard(a, i + 1)).join("");
    return grid.outerHTML;
}

const genreContent = document.getElementById("genre-content");
const genreDescription = document.getElementById("genre-description");

if (genreContent) {
    genreContent.innerHTML = renderGenre("pop");
    genreDescription.textContent = genreDescriptions.pop;
    setupAlbumCards();
    applyTiltEffect();
    if (window.bindHoverSounds) window.bindHoverSounds();
    if (window.bindCursorHover) window.bindCursorHover();
}

// =========================
// GENRE BUTTONS
// =========================
const genreButtons = document.querySelectorAll(".genre-btn");

genreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        genreButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const genre = button.dataset.genre;
        genreContent.innerHTML = renderGenre(genre);
        genreDescription.textContent = genreDescriptions[genre];

        setupAlbumCards();
        applyTiltEffect();
        if (window.bindHoverSounds) window.bindHoverSounds();
        if (window.bindCursorHover) window.bindCursorHover();
    });
});

// =========================
// MODAL
// =========================
const modal = document.getElementById("album-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalArtist = document.getElementById("modal-artist");
const modalYear = document.getElementById("modal-year");
const modalReview = document.getElementById("modal-review");
const modalTracks = document.getElementById("modal-tracks");
const modalRating = document.getElementById("modal-rating");
const modalGenre = document.getElementById("modal-genre");
const modalRuntime = document.getElementById("modal-runtime");
const closeBtn = document.querySelector(".close-btn");

function setupAlbumCards() {
    const cards = document.querySelectorAll(".album-card");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImage.src = card.dataset.image;
            modalTitle.textContent = card.dataset.title;
            modalArtist.textContent = card.dataset.artist;
            modalYear.textContent = card.dataset.year;
            modalGenre.textContent = card.dataset.genre;
            modalRuntime.innerHTML = `<strong>Runtime:</strong> ${card.dataset.runtime}`;
            modalRating.textContent = card.dataset.rating;
            modalReview.textContent = card.dataset.review;

            const tracks = card.dataset.tracks.split(",");
            modalTracks.innerHTML = "";
            tracks.forEach((track) => {
                modalTracks.innerHTML += `<li>${track.trim()}</li>`;
            });
        });
    });
}

if (modal) {
    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") modal.style.display = "none";
    });
}

// =========================
// 3D TILT ON ALBUM CARDS
// =========================
function applyTiltEffect() {
    const cards = document.querySelectorAll(".album-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
        });
    });
}
