document.addEventListener('DOMContentLoaded', () => {
    /* Nav Toggler */
    /* const navOpenBtn = document.getElementById("open-nav-menu");
    const navCloseBtn = document.getElementById("close-nav-menu"); */
    const toggleNavBtn = document.getElementById("toggle-nav-menu");
    const navMenu = document.getElementById("mobile-nav");

    const topHeader = document.querySelector(".top-header");
    const mainHeaderLogo = document.querySelector(".main-header .logo");
    const responsiveLogo = document.querySelector(".main-header .responsive-content .logo");
    const mainHeaderNav = document.querySelector(".main-header>nav");
    const mainHeaderAcMenu = document.querySelector(".main-header .accessibility-menu")
    const mainContent = document.querySelector("#main-content")
    const footer = document.querySelector("footer")


    function openNavMenu() {
        navMenu.classList.add("open");
        navMenu.setAttribute("aria-hidden", "false");
        toggleNavBtn.setAttribute("aria-expanded", "true");
        toggleNavBtn.setAttribute("aria-label", "Cerrar menú de navegación")
        document.body.classList.add("nav-open");

        topHeader.setAttribute("aria-hidden", "true");
        mainHeaderLogo.setAttribute("aria-hidden", "true");
        responsiveLogo.setAttribute("aria-hidden", "true");
        mainHeaderNav.setAttribute("aria-hidden", "true");
        mainHeaderAcMenu.setAttribute("aria-hidden", "true");
        mainContent.setAttribute("aria-hidden", "true");
        footer.setAttribute("aria-hidden", "true");
        
    }

    function closeNavMenu() {
        navMenu.classList.remove("open");
        navMenu.setAttribute("aria-hidden", "true");
        toggleNavBtn.setAttribute("aria-expanded", "false");
        toggleNavBtn.setAttribute("aria-label", "Abrir menú de navegación")
        document.body.classList.remove("nav-open");

        topHeader.setAttribute("aria-hidden", "false");
        mainHeaderLogo.setAttribute("aria-hidden", "false");
        responsiveLogo.setAttribute("aria-hidden", "false");
        mainHeaderNav.setAttribute("aria-hidden", "false");
        mainHeaderAcMenu.setAttribute("aria-hidden", "false");
        mainContent.setAttribute("aria-hidden", "false");
        footer.setAttribute("aria-hidden", "false");
    }

    /* Toggler */
    toggleNavBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("open");
        if(isOpen) {
            closeNavMenu();
        } else {
            openNavMenu();
        }
    })

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