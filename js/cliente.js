// sistema_recompensas.js
class Cliente {
    constructor(nombre) {
        this.nombre = nombre;
        this.estrellas = 0;
        this.nivel = "Verde"; // Nivel inicial
        this.tarjeta = null;
    }

    realizarCompra(monto) {
        this.estrellas += monto; // 1 estrella por cada $1 gastado
        this.verificarNivel();
    }

    canjearRecompensa(cantidadPuntos) {
        if (this.estrellas >= cantidadPuntos) {
            this.estrellas -= cantidadPuntos;
            return "Recompensa canjeada";
        } else {
            return "No tienes suficientes puntos para esta recompensa";
        }
    }

    verificarNivel() {
        if (this.estrellas >= 50 && this.nivel === "Verde") {
            this.nivel = "Oro";
        } else if (this.estrellas >= 100 && this.nivel === "Oro") {
            this.nivel = "Platino";
        }
    }
}

// Declarar una instancia de Cliente como ejemplo
const usuario_ejemplo = new Cliente("NombreEjemplo");