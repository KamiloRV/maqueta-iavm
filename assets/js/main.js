document.addEventListener('DOMContentLoaded', () => {
    /* Trap Focus */
    function trapFocus(e) {
        const focusableEls = navMenu.querySelectorAll(
            'a, button, input, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.key === "Tab") {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else { // tab
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        }

        if (e.key === "Escape") {
            navCloseBtn.click();
        }
    }

    /* Nav Toggler */
    const navOpenBtn = document.getElementById("open-nav-menu");
    const navCloseBtn = document.getElementById("close-nav-menu");
    const navMenu = document.getElementById("nav-menu");

    navOpenBtn.addEventListener("click", () => {
        navMenu.classList.add("open");
        navMenu.setAttribute("aria-hidden", "false");
        navOpenBtn.setAttribute("aria-expanded", "true");
        document.body.classList.add("nav-open");

        navCloseBtn.focus();
        document.addEventListener("keydown", trapFocus);
    });

    navCloseBtn.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navMenu.setAttribute("aria-hidden", "true");
        navOpenBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");

        navOpenBtn.focus();
        document.removeEventListener("keydown", trapFocus);
    });

    /* Sub Menu Toggler */
    document.querySelectorAll(".menu-item-has-children").forEach(item => {
        const link = item.querySelector("a");

        // Función para abrir/cerrar submenú
        const toggleSubmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const submenu = item.querySelector(".sub-menu");
            const isOpen = item.classList.toggle("open");

            link.setAttribute("aria-expanded", isOpen ? "true" : "false");
            submenu.setAttribute("aria-hidden", isOpen ? "false" : "true");

            // Cerrar otros submenús
            document.querySelectorAll(".menu-item-has-children.open").forEach(other => {
                if (other !== item) {
                    other.classList.remove("open");
                    const otherBtn = other.querySelector(".submenu-toggle");
                    const otherSub = other.querySelector(".sub-menu");
                    if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                    if (otherSub) otherSub.setAttribute("aria-hidden", "true");
                    // Cambiar SVG a cerrado
                    if (otherBtn) {
                        otherBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                            <path d="M5.10557 10.2111L0.723607 1.44721C0.391156 0.782313 0.874652 0 1.61803 0H10.382C11.1253 0 11.6088 0.782312 11.2764 1.44721L6.89443 10.2111C6.5259 10.9482 5.4741 10.9482 5.10557 10.2111Z" fill="#FFFAFA"/>
                        </svg>`;
                    }
                }
            });
        };

        link.addEventListener("click", toggleSubmenu);

        // Evitar que click dentro del menú cierre por listener del document
        link.addEventListener("click", e => e.stopPropagation());
        link.addEventListener("click", e => e.stopPropagation());
    });

    // Cerrar submenú al hacer click fuera
    document.addEventListener("click", () => {
        document.querySelectorAll(".menu-item-has-children.open").forEach(item => {
            const btn = item.querySelector(".submenu-toggle");
            const submenu = item.querySelector(".sub-menu");
            item.classList.remove("open");
            if (btn) btn.setAttribute("aria-expanded", "false");
            if (submenu) submenu.setAttribute("aria-hidden", "true");
            // Cambiar SVG a cerrado
            if (btn) {
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M5.10557 10.2111L0.723607 1.44721C0.391156 0.782313 0.874652 0 1.61803 0H10.382C11.1253 0 11.6088 0.782312 11.2764 1.44721L6.89443 10.2111C6.5259 10.9482 5.4741 10.9482 5.10557 10.2111Z" fill="#FFFAFA"/>
                </svg>`;
            }
        });
    });
});