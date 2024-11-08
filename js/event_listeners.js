// event_listeners.js
// Event listeners
document.getElementById("registro-link").addEventListener("click", mostrarRegistro);
document.getElementById("login-close").addEventListener("click", cerrarFormularios);
document.getElementById("login-link").addEventListener("click", () => mostrarFormulario("login-overlay"));
const EventListeners = (function () {
    const registroLink = document.getElementById("registro-link");
    const loginLink = document.getElementById("login-link");
    const registroClose = document.getElementById("registro-close");
    const loginClose = document.getElementById("login-close");
    const perfilLink = document.getElementById("perfil-link");
    const codigoQRButton = document.getElementById("codigo-qr-button");

    registroLink.addEventListener("click", () => Interfaz.mostrarFormulario("registro-overlay"));
    loginLink.addEventListener("click", () => Interfaz.mostrarFormulario("login-overlay"));
    registroClose.addEventListener("click", () => Interfaz.ocultarFormulario("registro-overlay"));
    loginClose.addEventListener("click", () => Interfaz.ocultarFormulario("login-overlay"));
    perfilLink.addEventListener("click", () => Interfaz.mostrarFormulario("perfil-form"));
    codigoQRButton.addEventListener("click", Interfaz.mostrarCodigoQR);
})();