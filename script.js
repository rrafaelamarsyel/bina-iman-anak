const galeriData = {
    know: [
        { src: "assets/tk-bksn.jpg", caption: "Belajar cerita Alkitab bersama" },
        { src: "assets/tk-kenaikanYesus.jpg", caption: "Aktivitas saat Kenaikan Tuhan Yesus" }
    ],
    grow: [
        { src: "assets/bir-games1.jpg", caption: "Bermain dan belajar bersama teman" },
        { src: "assets/bir-games2.jpg", caption: "Games kelompok yang seru" },
        { src: "assets/bir-kelas.jpg", caption: "Membangun karakter lewat kegiatan bersama" }
    ],
    serve: [
        { src: "assets/lektor.jpg", caption: "Kegiatan pelayanan anak" },
        { src: "assets/user2.jpg", caption: "Anak-anak belajar membantu sesama" },
        { src: "assets/user3.jpg", caption: "Kegiatan bersama gereja" }
    ]
};

const judulKategori = {
    know: "Know — Mengenal",
    grow: "Grow — Bertumbuh",
    serve: "Serve — Melayani"
};

let kategoriAktif = null;
let indexAktif = 0;

const overlay = document.getElementById("lightboxOverlay");
const imgEl = document.getElementById("lightboxImg");
const titleEl = document.getElementById("lightboxTitle");
const captionEl = document.getElementById("lightboxCaption");
const btnClose = document.getElementById("lightboxClose");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");

function tampilkanFoto() {
    const foto = galeriData[kategoriAktif][indexAktif];
    imgEl.src = foto.src;
    imgEl.alt = judulKategori[kategoriAktif];
    titleEl.textContent = judulKategori[kategoriAktif];
    captionEl.textContent = foto.caption;
}

function bukaModal(kategori) {
    kategoriAktif = kategori;
    indexAktif = 0;
    tampilkanFoto();
    overlay.classList.add("active");
}

function tutupModal() {
    overlay.classList.remove("active");
}

function fotoBerikutnya() {
    const total = galeriData[kategoriAktif].length;
    indexAktif = (indexAktif + 1) % total;
    tampilkanFoto();
}

function fotoSebelumnya() {
    const total = galeriData[kategoriAktif].length;
    indexAktif = (indexAktif - 1 + total) % total;
    tampilkanFoto();
}

document.querySelectorAll(".why-card").forEach(card => {
    card.addEventListener("click", () => {
        bukaModal(card.dataset.category);
    });
});

btnClose.addEventListener("click", tutupModal);
btnNext.addEventListener("click", fotoBerikutnya);
btnPrev.addEventListener("click", fotoSebelumnya);

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        tutupModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") tutupModal();
    if (e.key === "ArrowRight") fotoBerikutnya();
    if (e.key === "ArrowLeft") fotoSebelumnya();
});
