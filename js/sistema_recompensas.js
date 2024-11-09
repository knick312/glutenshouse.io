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
        document.getElementById(overlayId).style.display = "block";
    }

    function ocultarFormulario(overlayId) {
        overlay.style.display = "none";
        document.getElementById(overlayId).style.display = "none";
    }

    function mostrarSistemaPuntos() {
        const sistemaPuntos = document.getElementById("sistema-puntos");
        sistemaPuntos.style.display = "block";
        document.getElementById("login-link").style.display = "none";
        document.getElementById("registro-link").style.display = "none";
        document.getElementById("logout-link").style.display = "inline";
    }

    function cerrarSesion() {
        document.getElementById("sistema-puntos").style.display = "none";
        document.getElementById("login-link").style.display = "inline";
        document.getElementById("registro-link").style.display = "inline";
        document.getElementById("logout-link").style.display = "none";
    }

    return {
        mostrarFormulario,
        ocultarFormulario,
        mostrarSistemaPuntos,
        cerrarSesion,
    };
})();

// Módulo de Event Listeners
const EventListeners = (function () {
    const registroLink = document.getElementById("registro-link");
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
    const registroClose = document.getElementById("registro-close");
    const loginClose = document.getElementById("login-close");

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

    logoutLink.addEventListener("click", () => {
        Interfaz.cerrarSesion();
    });
})();
