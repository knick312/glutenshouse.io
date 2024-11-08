-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_recompensas;

-- Seleccionar la base de datos
USE sistema_recompensas;

-- Crear la tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estrellas INT NOT NULL DEFAULT 0,
    nivel VARCHAR(50) NOT NULL DEFAULT 'Verde',
    tarjeta_id INT,
    FOREIGN KEY (tarjeta_id) REFERENCES tarjetas(id)
);

-- Crear la tabla de tarjetas
CREATE TABLE IF NOT EXISTS tarjetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(16) NOT NULL,
    saldo_puntos INT NOT NULL DEFAULT 0
);

-- Insertar un cliente de ejemplo con tarjeta
INSERT INTO clientes (nombre, tarjeta_id) VALUES ('Nombre Cliente', 1);

-- Insertar una tarjeta de ejemplo
INSERT INTO tarjetas (numero, saldo_puntos) VALUES ('1234567890123456', 0);
