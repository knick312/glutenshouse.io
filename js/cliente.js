class Cliente {
    constructor(nombre) {
        this.nombre = nombre;
        this.estrellas = 0;
        this.nivel = "Verde"; // Nivel inicial
        this.tarjeta = null;
    }

    // Realizar una compra y acumular estrellas
    realizarCompra(monto) {
        const estrellasGanadas = monto; // 1 estrella por cada $1 gastado
        this.estrellas += estrellasGanadas;

        // Actualización del nivel según las estrellas acumuladas
        if (this.estrellas >= 50 && this.nivel === "Verde") {
            this.nivel = "Oro";
        } else if (this.estrellas >= 100 && this.nivel === "Oro") {
            this.nivel = "Platino";
        }
    }

    // Canjear recompensas con las estrellas acumuladas
    canjearRecompensa(cantidadPuntos) {
        if (this.estrellas >= cantidadPuntos) {
            this.estrellas -= cantidadPuntos;
            return "Recompensa canjeada";
        } else {
            return "No tienes suficientes puntos para esta recompensa";
        }
    }
}
