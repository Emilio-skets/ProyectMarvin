/* CONFIG */
const CONFIG = {
    whatsappNumber: "16783275251",
};

/* 1. Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        const menu = document.getElementById("navMenu");
        if (menu?.classList.contains("show")) bootstrap.Collapse.getInstance(menu)?.hide();
    });
});

/* 2. Scroll Top button */
const scrollBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
    scrollBtn?.classList.toggle("show", window.scrollY > 400);
});
scrollBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* 3. Active nav link on scroll */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach((l) => {
        l.classList.remove("active-link");
        if (l.getAttribute("href") === `#${current}`) l.classList.add("active-link");
    });
});

/* 4. Modal galería — empareja cada ANTES con su DESPUÉS */
function abrirGaleria(antes, despues, titulo) {
    document.getElementById("tituloModal").textContent = titulo;
    const cont = document.getElementById("galeriaPares");

    const total = Math.max(antes.length, despues.length);
    let html = "";

    for (let i = 0; i < total; i++) {
        const imgAntes = antes[i];
        const imgDespues = despues[i];
        html += `
            <div class="par-comparacion row g-3">
                <div class="col-6">
                    <p class="par-label">ANTES</p>
                    ${imgAntes
                ? `<img src="${imgAntes}" class="galeria-img" alt="Antes" onerror="this.style.display='none'">`
                : `<div class="galeria-vacia">Próximamente</div>`}
                </div>
                <div class="col-6">
                    <p class="par-label">DESPUÉS</p>
                    ${imgDespues
                ? `<img src="${imgDespues}" class="galeria-img" alt="Después" onerror="this.style.display='none'">`
                : `<div class="galeria-vacia">Próximamente</div>`}
                </div>
            </div>
        `;
    }

    if (total === 0) {
        html = `<p class="text-center text-muted py-4 mb-0">Imágenes próximamente.</p>`;
    }

    cont.innerHTML = html;
    new bootstrap.Modal(document.getElementById("modalGaleria")).show();
}

/* 5. Formulario + WhatsApp */
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    const name = document.getElementById("f-name");
    const phone = document.getElementById("f-phone");
    const email = document.getElementById("f-email");
    const service = document.getElementById("f-service");
    const msg = document.getElementById("f-msg");

    const campos = [name, phone, email, service, msg];

    campos.forEach((campo) => {
        if (campo.value.trim() === "") {
            campo.classList.add("is-invalid");
            valid = false;
        } else {
            campo.classList.remove("is-invalid");

        }
    });
    const emailRegess = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegess.test(email.value.trim())) {
        email.classList.add("is-invalid");
        valid = false;
    }

    if (valid) {
        const numero = "16783275251";
        const texto = `
Hola, quiero información.

👤 Nombre: ${name.value}
📞 Teléfono: ${phone.value}
📧 Correo: ${email.value}
🛠 Servicio: ${service.value}
📝 Mensaje:
${msg.value}
`;

        const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(texto)}`;
        window.open(url, "_blank");

        document.getElementById("contactSuccess").classList.remove("d-none");
        form.reset();
    }
});

/* Quitar estado inválido al escribir */
document.querySelectorAll(".form-control, .form-select").forEach((el) => {
    el.addEventListener("input", () => el.classList.remove("is-invalid"));
});