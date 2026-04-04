CREATE TABLE equipos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    entrenador VARCHAR(100),
    fecha_fundacion INT
);

CREATE TABLE jugadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    posicion VARCHAR(50) NOT NULL,
    nacionalidad VARCHAR(50),
    fecha_nacimiento DATE,
    numero_camiseta INT,
    id_equipo INT,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id)
);

CREATE TABLE estadisticas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    goles INT DEFAULT 0,
    asistencias INT DEFAULT 0,
    partidos_jugados INT DEFAULT 0,
    tarjetas_amarillas INT DEFAULT 0,
    tarjetas_rojas INT DEFAULT 0,
    id_jugador INT UNIQUE,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id)
);

CREATE TABLE partidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    equipo_local INT,
    equipo_visitante INT,
    goles_local INT DEFAULT 0,
    goles_visitante INT DEFAULT 0,
    FOREIGN KEY (equipo_local) REFERENCES equipos(id),
    FOREIGN KEY (equipo_visitante) REFERENCES equipos(id)
);