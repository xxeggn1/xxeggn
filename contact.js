// =========================
// COPY EMAIL TO CLIPBOARD
// =========================
const copyEmailEl = document.getElementById("copy-email");

if (copyEmailEl) {
    copyEmailEl.addEventListener("click", () => {
        const email = copyEmailEl.dataset.email;
        navigator.clipboard.writeText(email).then(() => {
            const label = copyEmailEl.querySelector(".copy-icon");
            const original = label.textContent;
            copyEmailEl.classList.add("copied");
            label.textContent = "Copied ✓";
            setTimeout(() => {
                copyEmailEl.classList.remove("copied");
                label.textContent = original;
            }, 1800);
        });
    });
}

// =========================
// CONTACT FORM (mailto handoff)
// =========================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("field-name").value.trim();
        const email = document.getElementById("field-email").value.trim();
        const message = document.getElementById("field-message").value.trim();
        const to = contactForm.dataset.to;

        const subject = encodeURIComponent(`Hey from ${name || "your site"}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
}
