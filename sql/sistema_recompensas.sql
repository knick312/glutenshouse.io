-- Crear base de datos
CREATE DATABASE IF NOT EXISTS glutens_house;

-- Usar la base de datos
USE glutens_house;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    nivel VARCHAR(50) DEFAULT 'Verde',
    estrellas INT DEFAULT 0,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para registrar las compras realizadas por los usuarios
CREATE TABLE IF NOT EXISTS compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    monto DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Crear tabla de recompensas (si decides añadir un sistema de recompensas basado en puntos)
CREATE TABLE IF NOT EXISTS recompensas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    puntos_requeridos INT NOT NULL
);

-- Crear tabla para registrar los canjes de recompensas de los usuarios
CREATE TABLE IF NOT EXISTS canjes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    recompensa_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (recompensa_id) REFERENCES recompensas(id) ON DELETE CASCADE
);

-- Procedimiento para registrar una compra y actualizar las estrellas del usuario
DELIMITER //
CREATE PROCEDURE registrar_compra(IN usuario_id INT, IN monto DECIMAL(10, 2))
BEGIN
    -- Registrar la compra
    INSERT INTO compras (usuario_id, monto) VALUES (usuario_id, monto);
    
    -- Calcular las estrellas obtenidas (1 estrella por cada $1 gastado)
    UPDATE usuarios
    SET estrellas = estrellas + FLOOR(monto)
    WHERE id = usuario_id;

    -- Actualizar el nivel del usuario en base a las estrellas
    CALL actualizar_nivel(usuario_id);
END //
DELIMITER ;

-- Procedimiento para actualizar el nivel del usuario basado en las estrellas
DELIMITER //
CREATE PROCEDURE actualizar_nivel(IN usuario_id INT)
BEGIN
    DECLARE estrellas INT;

    -- Obtener la cantidad de estrellas del usuario
    SELECT estrellas INTO estrellas FROM usuarios WHERE id = usuario_id;

    -- Actualizar el nivel
    IF estrellas >= 100 THEN
        UPDATE usuarios SET nivel = 'Platino' WHERE id = usuario_id;
    ELSEIF estrellas >= 50 THEN
        UPDATE usuarios SET nivel = 'Oro' WHERE id = usuario_id;
    ELSE
        UPDATE usuarios SET nivel = 'Verde' WHERE id = usuario_id;
    END IF;
END //
DELIMITER ;

-- Procedimiento para registrar el canje de una recompensa
DELIMITER //
CREATE PROCEDURE registrar_canje(IN usuario_id INT, IN recompensa_id INT)
BEGIN
    DECLARE puntos_requeridos INT;
    DECLARE estrellas_usuario INT;

    -- Obtener los puntos requeridos para la recompensa
    SELECT puntos_requeridos INTO puntos_requeridos FROM recompensas WHERE id = recompensa_id;

    -- Obtener las estrellas del usuario
    SELECT estrellas INTO estrellas_usuario FROM usuarios WHERE id = usuario_id;

    -- Verificar si el usuario tiene suficientes estrellas
    IF estrellas_usuario >= puntos_requeridos THEN
        -- Registrar el canje
        INSERT INTO canjes (usuario_id, recompensa_id) VALUES (usuario_id, recompensa_id);
        
        -- Restar las estrellas del usuario
        UPDATE usuarios SET estrellas = estrellas - puntos_requeridos WHERE id = usuario_id;

        SELECT 'Canje realizado exitosamente' AS mensaje;
    ELSE
        SELECT 'No tienes suficientes estrellas para realizar el canje' AS mensaje;
    END IF;
END //
DELIMITER ;

-- Insertar usuarios de prueba
INSERT INTO usuarios (nombre, correo, contrasena) VALUES
('Juan Pérez', 'juan.perez@gmail.com', 'password123'),
('Ana Gómez', 'ana.gomez@yahoo.com', '12345abc');

-- Insertar recompensas de prueba
INSERT INTO recompensas (nombre, descripcion, puntos_requeridos) VALUES
('Descuento del 10%', 'Descuento en tu próxima compra', 50),
('Producto gratuito', 'Producto gratis por 100 estrellas', 100);
