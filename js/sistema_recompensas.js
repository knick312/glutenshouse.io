// Módulo Cliente
class Cliente {
    constructor(nombre, correo, contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.estrellas = 0;
        this.nivel = "Verde"; // Nivel inicial
        this.tarjeta = null;
    }

    realizarCompra(monto) {
        const estrellasGanadas = monto; // 1 estrella por cada $1 gastado
        this.estrellas += estrellasGanadas;
        this.actualizarNivel();
    }

    canjearRecompensa(cantidadPuntos) {
        if (this.estrellas >= cantidadPuntos) {
            this.estrellas -= cantidadPuntos;
            return "Recompensa canjeada";
        } else {
            return "No tienes suficientes puntos para esta recompensa";
        }
    }

    actualizarNivel() {
        if (this.estrellas >= 100) {
            this.nivel = "Platino";
        } else if (this.estrellas >= 50) {
            this.nivel = "Oro";
        } else {
            this.nivel = "Verde";
        }
    }
}

// Array para almacenar clientes registrados
let clientesRegistrados = [];
let clienteActual = null;

// Funciones de Interfaz
function mostrarFormulario(overlayId) {
    document.getElementById(overlayId).style.display = "flex";
}

function cerrarFormularios() {
    document.getElementById("login-overlay").style.display = "none";
    document.getElementById("registro-overlay").style.display = "none";
}

// Función para registrar un nuevo cliente
function registrarCliente() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo-registro").value;
    const contrasena = document.getElementById("contrasena-registro").value;

    // Crear una nueva instancia del cliente
    const nuevoCliente = new Cliente(nombre, correo, contrasena);
    clientesRegistrados.push(nuevoCliente);

    alert("Cliente registrado exitosamente.");
    cerrarFormularios();
}

// Función para iniciar sesión
function iniciarSesion() {
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    // Buscar al cliente en el array de clientes registrados
    clienteActual = clientesRegistrados.find(cliente => cliente.correo === correo && cliente.contrasena === contrasena);

    if (clienteActual) {
        alert("Inicio de sesión exitoso.");
        mostrarSistemaPuntos();
    } else {
        alert("Correo o contraseña incorrectos.");
    }

    cerrarFormularios();
}

// Función para mostrar el sistema de puntos
function mostrarSistemaPuntos() {
    document.getElementById("sistema-puntos").style.display = "flex";
    document.getElementById("nombre-usuario-span").innerText = clienteActual.nombre;
    document.getElementById("nivel-usuario-span").innerText = clienteActual.nivel;
    document.getElementById("estrellas-usuario-span").innerText = clienteActual.estrellas;
}

// Función para cerrar sesión
function cerrarSesion() {
    clienteActual = null;
    document.getElementById("sistema-puntos").style.display = "none";
    alert("Sesión cerrada.");
}

// Función para mostrar el código QR
function mostrarCodigoQR() {
    const qrContainer = document.getElementById("codigo-qr-img");
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: `Cliente: ${clienteActual.nombre}, Puntos: ${clienteActual.estrellas}`,
        width: 128,
        height: 128
    });
    document.getElementById("codigo-qr-overlay").style.display = "flex";
}

// Función para cerrar el QR
function cerrarCodigoQR() {
    document.getElementById("codigo-qr-overlay").style.display = "none";
}
