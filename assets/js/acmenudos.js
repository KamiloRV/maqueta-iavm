document.addEventListener("DOMContentLoaded", () => {
    const accessibilityMenus = document.querySelectorAll("[data-accessibility-menu]");

    /* const toggleAccessibilityMenu = document.querySelector("#toggle-accessibility");
    const accessibilityOptions = document.querySelector("#accessibility-options");
    const accessibilityClose = document.querySelector("#ac-close") */

    const skipBtn = document.querySelector("#skip-to-content");
    const mainHeader = document.querySelector(".main-header");
    const mainContent = document.querySelector("#main-content");
    const mainFooter = document.querySelector("footer");
    const mobileNav = document.querySelector(".nav-container");
    const headerLogo = document.querySelector(".main-header .logo");

    accessibilityMenus.forEach(menu => {
        const toggleBtn = menu.querySelector(".toggle-accessibility");
        const options = menu.querySelector(".accessibility-options");
        const closeBtn = menu.querySelector(".ac-close")

        const isMobileMenu = menu.closest(".main-header"); 

        function openMenu() {
            toggleBtn.setAttribute("aria-expanded", "true");
            toggleBtn.setAttribute("aria-label", 'Cerrar menú de accesibilidad');
            options.hidden = false;
            options.focus();

            if (isMobileMenu) {
                mobileNav?.setAttribute("aria-hidden", "true");
                headerLogo?.setAttribute("aria-hidden", "true");
            } else {
                skipBtn?.setAttribute("aria-hidden", "true");
                mainHeader?.setAttribute("aria-hidden", "true");
                mainContent?.setAttribute("aria-hidden", "true");
                mainFooter?.setAttribute("aria-hidden", "true");
            }
        }

        function closeMenu() {
            toggleBtn.setAttribute("aria-expanded", "false");
            toggleBtn.setAttribute("aria-label", 'Abrir menú de accesibilidad');
            options.hidden = true;
            toggleBtn.focus();

            if (isMobileMenu) {
                mobileNav?.setAttribute("aria-hidden", "false");
                headerLogo?.setAttribute("aria-hidden", "false");
            } else {
                skipBtn?.setAttribute("aria-hidden", "false");
                mainHeader?.setAttribute("aria-hidden", "false");
                mainContent?.setAttribute("aria-hidden", "false");
                mainFooter?.setAttribute("aria-hidden", "false");
            }
        }

        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
            expanded ? closeMenu() : openMenu();
        });

        closeBtn?.addEventListener("click", closeMenu);

        document.addEventListener("click", (e) => {
            if (!menu.contains(e.target) && toggleBtn.getAttribute("aria-expanded") === "true") {
                closeMenu();
            }
        });

        /* Controls */
        const increaseBtn = menu.querySelector(".increase-text");
        const decreaseBtn = menu.querySelector(".decrease-text");
        const resetBtn = menu.querySelector(".reset-all");
        const darkModeToggle = menu.querySelector(".toggle-mode");

        // Detectar font-size actual del <html> en px
        function getCurrentFontSize() {
            const html = document.documentElement;
            const style = window.getComputedStyle(html).fontSize;
            return parseFloat(style); // valor en px
        }

        // Guardar tamaño en localStorage
        function saveFontSize(size) {
            localStorage.setItem("fontSize", size);
        }

        // Cargar tamaño guardado
        function loadFontSize() {
            const saved = localStorage.getItem("fontSize");
            if (saved) {
            document.documentElement.style.fontSize = saved + "px";
            return parseFloat(saved);
            }
            return getCurrentFontSize();
        }

        let baseFontSize = getCurrentFontSize(); // valor inicial según media query
        let fontSize = loadFontSize(); // carga si hay algo guardado o usa base
        const maxFontSize = baseFontSize * 1.2;   // hasta 120%
        const minFontSize = baseFontSize * 0.8; // hasta 80%

        increaseBtn?.addEventListener("click", (e) => {
            e.preventDefault();

            if (fontSize < maxFontSize) {
                fontSize += baseFontSize * 0.1; // incrementa 10%
                document.documentElement.style.fontSize = fontSize + "px";
                saveFontSize(fontSize);
            }
        });

        decreaseBtn?.addEventListener("click", (e) => {
            e.preventDefault();

            if (fontSize > minFontSize) {
                fontSize -= baseFontSize * 0.1; // disminuye 10%
                document.documentElement.style.fontSize = fontSize + "px";
                saveFontSize(fontSize);
            }
        });

        /* Dark Mode */
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const body = document.body;

        // Cargar preferencia guardada
        let savedMode = localStorage.getItem("dark-mode");

        const basePath = window.location.pathname.includes('/maqueta-iavm/')
        ? '/maqueta-iavm/'
        : '/';


        // Inicializar estado
        if (savedMode === "enabled") {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
            darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#lightmode" /></svg>`
        } else if (savedMode === "disabled") {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
            darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#darkmode" /></svg>`
        } else {
            // Ninguna preferencia guardada → usar preferencia del sistema
            if (prefersDark) {
                body.classList.remove("light-mode");
                body.classList.remove("dark-mode"); // deja que el CSS de prefers-color-scheme actúe
                darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#lightmode" /></svg>`
            } else {
                body.classList.remove("light-mode");
                body.classList.remove("dark-mode");
                darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#darkmode" /></svg>`
            }
        }

        // Toggle
        darkModeToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            if (body.classList.contains("dark-mode")) {
                // estaba forzando dark → pasar a light
                body.classList.remove("dark-mode");
                body.classList.add("light-mode");
                localStorage.setItem("dark-mode", "disabled");
                darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#darkmode" /></svg>`;
            } else if (body.classList.contains("light-mode")) {
                // estaba forzando light → pasar a dark
                body.classList.remove("light-mode");
                body.classList.add("dark-mode");
                localStorage.setItem("dark-mode", "enabled");
                darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#lightmode" /></svg>`;
            } else {
                // No había clase → usar la inversa de la preferencia del sistema
                if (prefersDark) {
                    body.classList.add("light-mode");
                    localStorage.setItem("dark-mode", "disabled");
                    darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#darkmode" /></svg>`;
                } else {
                    body.classList.add("dark-mode");
                    localStorage.setItem("dark-mode", "enabled");
                    darkModeToggle.innerHTML = `<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="${basePath}assets/sprite.svg#lightmode" /></svg>`;
                }
            }
        });

        // Reset total
        resetBtn.addEventListener("click", () => {
            // Restablecer fuente
            fontSize = baseFontSize;
            document.documentElement.style.fontSize = "";

            // Restablecer modo según sistema
            body.classList.remove("dark-mode", "light-mode");
            /* toggleBtn.textContent = prefersDark ? "☀️" : "🌙"; */
            darkModeToggle.innerHTML = prefersDark ? '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="/assets/sprite.svg#lightmode" /></svg>' : '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#darkmode" /></svg>';

            // Limpiar localStorage
            localStorage.removeItem("fontSize");
            localStorage.removeItem("dark-mode");
        });
    })

    /* Text Controls */
    /* const increaseBtn = document.getElementById("increase-text");
    const decreaseBtn = document.getElementById("decrease-text");
    const resetBtn = document.getElementById("reset-all"); */

    // Detectar font-size actual del <html> en px
    /* function getCurrentFontSize() {
        const html = document.documentElement;
        const style = window.getComputedStyle(html).fontSize;
        return parseFloat(style); // valor en px
    } */

    // Guardar tamaño en localStorage
    /* function saveFontSize(size) {
        localStorage.setItem("fontSize", size);
    } */

    // Cargar tamaño guardado
    /* function loadFontSize() {
        const saved = localStorage.getItem("fontSize");
        if (saved) {
        document.documentElement.style.fontSize = saved + "px";
        return parseFloat(saved);
        }
        return getCurrentFontSize();
    } */

    /* let baseFontSize = getCurrentFontSize(); // valor inicial según media query
    let fontSize = loadFontSize(); // carga si hay algo guardado o usa base
    const maxFontSize = baseFontSize * 1.2;   // hasta 120%
    const minFontSize = baseFontSize * 0.8; // hasta 80% */

    /* increaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (fontSize < maxFontSize) {
        fontSize += baseFontSize * 0.1; // incrementa 10%
        document.documentElement.style.fontSize = fontSize + "px";
        saveFontSize(fontSize);
        }
    }); */

    /* decreaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (fontSize > minFontSize) {
        fontSize -= baseFontSize * 0.1; // disminuye 10%
        document.documentElement.style.fontSize = fontSize + "px";
        saveFontSize(fontSize);
        }
    }); */

    /* Dark Mode */
    /* const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const body = document.body;
    const darkModeToggle = document.getElementById("toggle-mode");

    // Cargar preferencia guardada
    let savedMode = localStorage.getItem("dark-mode");

    // Inicializar estado
    if (savedMode === "enabled") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#lightmode" /></svg>'
    } else if (savedMode === "disabled") {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#darkmode" /></svg>'
    } else {
        // Ninguna preferencia guardada → usar preferencia del sistema
        if (prefersDark) {
            body.classList.remove("light-mode");
            body.classList.remove("dark-mode"); // deja que el CSS de prefers-color-scheme actúe
            darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#lightmode" /></svg>'
        } else {
            body.classList.remove("light-mode");
            body.classList.remove("dark-mode");
            darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#darkmode" /></svg>'
        }
    } */

    // Toggle
    /* darkModeToggle.addEventListener("click", (e) => {
        e.stopPropagation();

        if (body.classList.contains("dark-mode")) {
            // estaba forzando dark → pasar a light
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            localStorage.setItem("dark-mode", "disabled");
            darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#darkmode" /></svg>';
        } else if (body.classList.contains("light-mode")) {
            // estaba forzando light → pasar a dark
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
            darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#lightmode" /></svg>';
        } else {
            // No había clase → usar la inversa de la preferencia del sistema
            if (prefersDark) {
                body.classList.add("light-mode");
                localStorage.setItem("dark-mode", "disabled");
                darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#darkmode" /></svg>';
            } else {
                body.classList.add("dark-mode");
                localStorage.setItem("dark-mode", "enabled");
                darkModeToggle.innerHTML = '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#lightmode" /></svg>';
            }
        }
    }); */

    // Reset total
    /* resetBtn.addEventListener("click", () => {
        // Restablecer fuente
        fontSize = baseFontSize;
        document.documentElement.style.fontSize = "";

        // Restablecer modo según sistema
        body.classList.remove("dark-mode", "light-mode");
        // toggleBtn.textContent = prefersDark ? "☀️" : "🌙";
        darkModeToggle.innerHTML = prefersDark ? '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#lightmode" /></svg>' : '<svg aria-hidden="true" focusable="false" width="75" height="75"><use xlink:href="assets/sprite.svg#darkmode" /></svg>';

        // Limpiar localStorage
        localStorage.removeItem("fontSize");
        localStorage.removeItem("dark-mode");
    });

    // Cerrar menu
    accessibilityClose.addEventListener("click", () => {
        toggleAccessibilityMenu.setAttribute("aria-expanded", "false");
        accessibilityOptions.hidden = true; // oculta el menú
        skipBtn.setAttribute("aria-hidden", "false")
        mainHeader.setAttribute("aria-hidden", "false")
        mainContent.setAttribute("aria-hidden", "false")
        mainFooter.setAttribute("aria-hidden", "false")
    })
    // Detectar clic fuera del menú y del botón
    document.addEventListener("click", (e) => {
        const isClickInside = toggleAccessibilityMenu.contains(e.target) || accessibilityOptions.contains(e.target);
        
        if (!isClickInside) {
            toggleAccessibilityMenu.setAttribute("aria-expanded", "false");
            accessibilityOptions.hidden = true; // oculta el menú
            skipBtn.setAttribute("aria-hidden", "false")
            mainHeader.setAttribute("aria-hidden", "false")
            mainContent.setAttribute("aria-hidden", "false")
            mainFooter.setAttribute("aria-hidden", "false")
        }
    }); */
});