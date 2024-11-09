const Interfaz = (function () {
    const overlay = document.getElementById("overlay");

    // Muestra el formulario flotante
    function mostrarFormulario(overlayId) {
        overlay.style.display = "flex";
        document.getElementById(overlayId).style.display = "block";
    }

    // Oculta el formulario flotante
    function ocultarFormulario(overlayId) {
        overlay.style.display = "none";
        document.getElementById(overlayId).style.display = "none";
    }

    // Muestra el sistema de puntos al iniciar sesión
    function mostrarSistemaPuntos() {
        const sistemaPuntos = document.getElementById("sistema-puntos");
        sistemaPuntos.style.display = "block"; // Muestra el sistema de recompensas
        document.getElementById("login-link").style.display = "none"; // Oculta "Iniciar sesión"
        document.getElementById("registro-link").style.display = "none"; // Oculta "Registro"
        document.getElementById("logout-link").style.display = "inline"; // Muestra "Cerrar sesión"
    }

    // Cierra la sesión y restablece la vista inicial
    function cerrarSesion() {
        document.getElementById("sistema-puntos").style.display = "none"; // Oculta sistema de puntos
        document.getElementById("login-link").style.display = "inline"; // Muestra "Iniciar sesión"
        document.getElementById("registro-link").style.display = "inline"; // Muestra "Registro"
        document.getElementById("logout-link").style.display = "none"; // Oculta "Cerrar sesión"
    }

    return {
        mostrarFormulario,
        ocultarFormulario,
        mostrarSistemaPuntos,
        cerrarSesion
    };
})();
