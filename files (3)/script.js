// =========================
// LOADER
// =========================
function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
}

if (document.readyState === "complete") {
    hideLoader();
} else {
    window.addEventListener("load", () => setTimeout(hideLoader, 350));
}

// =========================
// SCROLL PROGRESS BAR
// =========================
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + "%";
    }

    const heroLeft = document.querySelector(".hero-left");
    const heroRight = document.querySelector(".hero-right");
    if (heroLeft && heroRight) {
        const offset = window.scrollY * 0.2;
        heroLeft.style.transform = `translateY(${offset}px)`;
        heroRight.style.transform = `translateY(${offset * 0.5}px)`;
    }
});

// =========================
// NAV GLASS ON SCROLL
// =========================
const navEl = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (navEl) {
        navEl.classList.toggle("scrolled", window.scrollY > 40);
    }
});

// =========================
// CUSTOM CURSOR
// =========================
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate(
            { left: `${e.clientX}px`, top: `${e.clientY}px` },
            { duration: 300, fill: "forwards" }
        );
    });

    function bindCursorHover() {
        const hoverTargets = document.querySelectorAll("a, button, .album-card, .explore-card, .project-card");
        hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", () => cursorOutline.classList.add("hover"));
            el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover"));
        });
    }
    bindCursorHover();
    window.bindCursorHover = bindCursorHover;
}

// =========================
// MAGNETIC BUTTONS
// =========================
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
    });
});

// =========================
// TEXT REVEAL (word by word)
// =========================
function wrapWordsInSpans(el) {
    const words = el.textContent.split(" ");
    el.innerHTML = words
        .map((word, i) => `<span style="transition-delay:${i * 0.05}s">${word}&nbsp;</span>`)
        .join("");
}

const textRevealTargets = document.querySelectorAll("[data-text-reveal]");
textRevealTargets.forEach((el) => {
    el.classList.add("text-reveal");
    wrapWordsInSpans(el);
});

const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
    });
}, { threshold: 0.5 });

document.querySelectorAll(".text-reveal").forEach((el) => textRevealObserver.observe(el));

// =========================
// SCROLL REVEAL
// =========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// =========================
// ACTIVE NAV LINK (scroll-based, for in-page anchors)
// =========================
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll("nav ul li a");

if (sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    const href = link.getAttribute("href") || "";
                    if (href.endsWith(`#${id}`)) {
                        link.classList.add("active-link");
                    } else if (href.includes("#")) {
                        link.classList.remove("active-link");
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach((section) => navObserver.observe(section));
}

// =========================
// HOVER SOUND (generated, no audio file needed)
// =========================
let audioCtx = null;

function playHoverSound() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);
}

function bindHoverSounds() {
    const soundTargets = document.querySelectorAll(".btn, .genre-btn, .album-card, .social-icon, .explore-card");
    soundTargets.forEach((el) => {
        el.removeEventListener("mouseenter", playHoverSound);
        el.addEventListener("mouseenter", playHoverSound);
    });
}
bindHoverSounds();
window.bindHoverSounds = bindHoverSounds;

// =========================
// PAGE TRANSITIONS
// =========================
const veil = document.getElementById("page-veil");

document.body.classList.add("veil-in");

document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;

    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.remove("veil-in");
        document.body.classList.add("veil-out");
        setTimeout(() => { window.location.href = href; }, 420);
    });
});
