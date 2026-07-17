// =========================
// VINYL STAGE SPIN-UP
// =========================
const vinylStage = document.querySelector(".vinyl-stage");
if (vinylStage) {
    setTimeout(() => vinylStage.classList.add("spin"), 600);
}

// =========================
// STAT COUNTERS
// =========================
const statNums = document.querySelectorAll(".stat-num[data-count]");

function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

statNums.forEach((el) => statObserver.observe(el));

// =========================
// MARQUEE — duplicate track for seamless loop
// =========================
document.querySelectorAll(".marquee-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
});
