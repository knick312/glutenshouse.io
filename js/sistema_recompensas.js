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

    // Buscar el cliente registrado con ese correo
    const cliente = clientesRegistrados.find(c => c.correo === correo && c.contrasena === contrasena);

    if (cliente) {
        alert(`Bienvenido, ${cliente.nombre}!`);
        clienteActual = cliente;
        mostrarSistemaPuntos();
        cerrarFormularios();
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

// Función para mostrar el sistema de puntos
function mostrarSistemaPuntos() {
    const sistemaPuntos = document.getElementById("sistema-puntos");
    sistemaPuntos.style.display = "block";
}

// Función para mostrar QR
function mostrarCodigoQR() {
    const codigoQR = new QRCode(document.getElementById("codigo-qr-img"), {
        text: `Nombre: ${clienteActual.nombre}\nNivel: ${clienteActual.nivel}\nEstrellas: ${clienteActual.estrellas}`,
        width: 128,
        height: 128,
    });
    document.getElementById("codigo-qr-overlay").style.display = "flex";
}

// Cerrar el overlay del QR
function cerrarCodigoQR() {
    document.getElementById("codigo-qr-overlay").style.display = "none";
}

// Evento para cerrar sesión
function cerrarSesion() {
    clienteActual = null;
    document.getElementById("sistema-puntos").style.display = "none";
    alert("Sesión cerrada.");
}
