const EventListeners = (function () {
    const registroLink = document.getElementById("registro-link");
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
    const registroClose = document.getElementById("registro-close");
    const loginClose = document.getElementById("login-close");

    // Mostrar el formulario de registro
    registroLink.addEventListener("click", () => {
        Interfaz.mostrarFormulario("registro-overlay");
    });

    // Mostrar el formulario de inicio de sesión
    loginLink.addEventListener("click", () => {
        Interfaz.mostrarFormulario("login-overlay");
    });

    // Cerrar el formulario de registro
    registroClose.addEventListener("click", () => {
        Interfaz.ocultarFormulario("registro-overlay");
    });

    // Cerrar el formulario de inicio de sesión
    loginClose.addEventListener("click", () => {
        Interfaz.ocultarFormulario("login-overlay");
    });

    // Cerrar sesión
    logoutLink.addEventListener("click", () => {
        Interfaz.cerrarSesion();
    });
})();
