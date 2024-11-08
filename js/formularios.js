// formularios.js
// Funciones para mostrar y ocultar formularios
function mostrarRegistro() {
    document.getElementById('registro-overlay').style.display = 'block';
    document.getElementById('login-overlay').style.display = 'none';
}

function cerrarFormularios() {
    document.getElementById('registro-overlay').style.display = 'none';
    document.getElementById('login-overlay').style.display = 'none';
}

function registrarUsuario() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Lógica para manejar el registro (por ejemplo, almacenar en localStorage)
    console.log('Usuario registrado:', { nombre, email });
    cerrarFormularios();
}

function iniciarSesion() {
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;

    // Lógica para manejar el inicio de sesión (por ejemplo, verificar en localStorage)
    console.log('Usuario inició sesión:', { correo });
    cerrarFormularios();
}