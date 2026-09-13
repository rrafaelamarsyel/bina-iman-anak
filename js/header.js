Promise.all([
    loadComponent("#header", "components/header.html"),
    loadComponent("#footer", "components/footer.html")
]).then(() => {
    const toggle = document.getElementById("navbarToggle");
    const menu = document.getElementById("navbar-menu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            menu.classList.toggle("active");
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                toggle.classList.remove("active");
                menu.classList.remove("active");
            });
        });
    }
});

function initNavbar() {
    const toggle = document.getElementById("navbarToggle");
    const menu = document.getElementById("navbar-menu");

    if (!menu) return;

    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop() || "index.html";

    menu.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");

        if (!href) return;

        const linkFile = href.split("/").pop();

        let isActive = false;

        if (
            (currentFile === "" || currentFile === "index.html") &&
            linkFile === "index.html"
        ) {
            isActive = true;
        } else if (currentFile === linkFile) {
            isActive = true;
        }

        link.classList.toggle("active", isActive);
    });

    if (toggle) {

        toggle.addEventListener("click", () => {

            const isOpen = menu.classList.toggle("active");

            toggle.classList.toggle("active", isOpen);

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        menu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("active");
                toggle.classList.remove("active");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }

    document.addEventListener("click", event => {

        if (!toggle || !menu.classList.contains("active")) {
            return;
        }

        const navbar = document.getElementById("navbar");

        if (navbar && !navbar.contains(event.target)) {

            menu.classList.remove("active");
            toggle.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });

}

async function loadComponent(selector, file) {

    const element = document.querySelector(selector);

    if (!element) return;

    try {

        const response = await fetch(
            file + "?v=" + Date.now(),
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Gagal memuat ${file}: ${response.status}`
            );
        }

        element.innerHTML = await response.text();

    } catch (error) {

        console.error(error);

    }
}

Promise.all([
    loadComponent("#header", "components/header.html"),
    loadComponent("#footer", "components/footer.html")
]).then(() => {

    initNavbar();

});
