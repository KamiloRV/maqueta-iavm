document.addEventListener("DOMContentLoaded", () => {
    const toggleAccessibilityMenu = document.getElementById("toggle-accessibility");
    const accessibilityOptions = document.getElementById("accessibility-options");

    toggleAccessibilityMenu.addEventListener("click", () => {
        const expanded = toggleAccessibilityMenu.getAttribute("aria-expanded") === "true";
        toggleAccessibilityMenu.setAttribute("aria-expanded", !expanded);
        accessibilityOptions.hidden = expanded; // alterna mostrar/ocultar
    });

    /* Text Controls */
    const increaseBtn = document.getElementById("increase-text");
    const decreaseBtn = document.getElementById("decrease-text");
    const resetBtn = document.getElementById("toggle-animations");

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

    increaseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (fontSize < maxFontSize) {
        fontSize += baseFontSize * 0.1; // incrementa 10%
        document.documentElement.style.fontSize = fontSize + "px";
        saveFontSize(fontSize);
        }
    });

    decreaseBtn.addEventListener("click", (e) => {
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
    const darkModeToggle = document.getElementById("toggle-dark");

    // Cargar preferencia guardada
    let savedMode = localStorage.getItem("dark-mode");

    // Inicializar estado
    if (savedMode === "enabled") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        /* btn.textContent = "☀️"; */
    } else if (savedMode === "disabled") {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        /* btn.textContent = "🌙"; */
    } else {
        // Ninguna preferencia guardada → usar preferencia del sistema
        if (prefersDark) {
            body.classList.remove("light-mode");
            body.classList.remove("dark-mode"); // deja que el CSS de prefers-color-scheme actúe
            /* btn.textContent = "☀️"; */ // mostrar que al click puede cambiar
        } else {
            body.classList.remove("light-mode");
            body.classList.remove("dark-mode");
            /* btn.textContent = "🌙"; */
        }
    }

    // Toggle
    darkModeToggle.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            // estaba forzando dark → pasar a light
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            localStorage.setItem("dark-mode", "disabled");
            /* btn.textContent = "🌙"; */
        } else if (body.classList.contains("light-mode")) {
            // estaba forzando light → pasar a dark
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
            /* btn.textContent = "☀️"; */
        } else {
            // No había clase → usar la inversa de la preferencia del sistema
            if (prefersDark) {
                body.classList.add("light-mode");
                localStorage.setItem("dark-mode", "disabled");
                /* btn.textContent = "🌙"; */
            } else {
                body.classList.add("dark-mode");
                localStorage.setItem("dark-mode", "enabled");
                /* btn.textContent = "☀️"; */
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

        // Limpiar localStorage
        localStorage.removeItem("fontSize");
        localStorage.removeItem("dark-mode");
    });
});