// Módulo de Cliente
class Cliente {
    constructor(nombre) {
        this.nombre = nombre;
        this.estrellas = 0;
        this.nivel = "Verde"; // Nivel inicial
        this.tarjeta = null;
    }

    realizarCompra(monto) {
        const estrellasGanadas = monto; // 1 estrella por cada $1 gastado
        this.estrellas += estrellasGanadas;

        // Comprobar si el cliente alcanza un nuevo nivel
        if (this.estrellas >= 50 && this.nivel === "Verde") {
            this.nivel = "Oro";
        } else if (this.estrellas >= 100 && this.nivel === "Oro") {
            this.nivel = "Platino";
        }
    }

    canjearRecompensa(cantidadPuntos) {
        // Definir las reglas para canjear recompensas
        if (this.estrellas >= cantidadPuntos) {
            this.estrellas -= cantidadPuntos;
            return "Recompensa canjeada";
        } else {
            return "No tienes suficientes puntos para esta recompensa";
        }
    }
}

// Módulo de Interfaz
const Interfaz = (function () {
    const overlay = document.getElementById("overlay");

    function mostrarFormulario(overlayId) {
        overlay.style.display = "flex";
        const formulario = document.getElementById(overlayId);
        if (formulario) {
            formulario.style.display = "block";
            formulario.addEventListener("submit", guardarCambiosPerfil);
        }
    }

    function ocultarFormulario(overlayId) {
        overlay.style.display = "none";
        const formulario = document.getElementById(overlayId);
        if (formulario) {
            formulario.style.display = "none";
        }
    }

    function guardarCambiosPerfil(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;

        // Aquí puedes realizar una solicitud para guardar los cambios en el perfil (por ejemplo, a través de una API)

        // Luego, puedes actualizar la información en la interfaz si es necesario
        // Ejemplo:
        document.getElementById("nombre-actual").textContent = nombre;
        document.getElementById("email-actual").textContent = email;
        document.getElementById("telefono-actual").textContent = telefono;

        // Oculta el formulario
        ocultarFormulario("perfil-form");
    }

    function mostrarCodigoQR() {
        // Mostrar el código QR de la tarjeta actual
        const tarjeta = usuario_ejemplo.tarjeta;
        if (tarjeta) {
            // Usamos la librería qrcode.min.js para generar el código QR
            const qr = new QRCode(document.getElementById("codigo-qr-container"), {
                text: `Tarjeta: ${tarjeta.numero}`,
                width: 128,
                height: 128
            });

            // Mostramos el overlay
            mostrarOverlay('codigo-qr-overlay');
        } else {
            actualizarResultadoInteraccion('No se ha emitido una tarjeta aún.');
        }
    }

    return {
        mostrarFormulario,
        ocultarFormulario,
        mostrarCodigoQR,
    };
})();

// Módulo de Event Listeners
const EventListeners = (function () {
    const registroLink = document.getElementById("registro-link");
    const loginLink = document.getElementById("login-link");
    const registroClose = document.getElementById("registro-close");
    const loginClose = document.getElementById("login-close");
    const perfilLink = document.getElementById("perfil-link");
    const codigoQRButton = document.getElementById("codigo-qr-button");

    registroLink.addEventListener("click", () => {
        Interfaz.mostrarFormulario("registro-overlay");
    });

    loginLink.addEventListener("click", () => {
        Interfaz.mostrarFormulario("login-overlay");
    });

    registroClose.addEventListener("click", () => {
        Interfaz.ocultarFormulario("registro-overlay");
    });

    loginClose.addEventListener("click", () => {
        Interfaz.ocultarFormulario("login-overlay");
    });

    perfilLink.addEventListener("click", () => {
        Interfaz.mostrarFormulario("perfil-form");
    });

    codigoQRButton.addEventListener("click", () => {
        Interfaz.mostrarCodigoQR();
    });
})();