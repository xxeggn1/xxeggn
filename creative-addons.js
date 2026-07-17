// =========================
// 3D TILT + SPOTLIGHT (merged, rAF-throttled for smoothness)
// =========================
function bindTiltCards() {
    document.querySelectorAll(".tilt-card").forEach((card) => {
        if (card.dataset.tiltBound) return;
        card.dataset.tiltBound = "1";

        let raf = null;
        let pending = null;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            pending = { x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width, h: rect.height };
            if (raf) return;
            raf = requestAnimationFrame(() => {
                const { x, y, w, h } = pending;
                const rotateX = ((y - h / 2) / (h / 2)) * -5;
                const rotateY = ((x - w / 2) / (w / 2)) * 5;
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
                raf = null;
            });
        }, { passive: true });

        card.addEventListener("mouseleave", () => {
            if (raf) cancelAnimationFrame(raf);
            raf = null;
            card.style.transform = "";
        });
    });
}

function bindSpotlights() {
    document.querySelectorAll(".spotlight").forEach((el) => {
        if (el.dataset.spotlightBound) return;
        el.dataset.spotlightBound = "1";

        let raf = null;
        let pending = null;

        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            pending = { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 };
            if (raf) return;
            raf = requestAnimationFrame(() => {
                el.style.setProperty("--mx", `${pending.x}%`);
                el.style.setProperty("--my", `${pending.y}%`);
                raf = null;
            });
        }, { passive: true });
    });
}

bindTiltCards();
bindSpotlights();

window.bindTiltCards = bindTiltCards;
window.bindSpotlights = bindSpotlights;