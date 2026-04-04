# Diseño de Base de Datos
## Sistema de Análisis de Estadísticas de Fútbol
### Universidad Mariano Gálvez - Campus Cobán
### Programación III - 2024

---

## 1. Descripción del Problema

El sistema busca resolver la necesidad de almacenar, consultar 
y analizar estadísticas de fútbol de forma eficiente. 
Actualmente no existe una forma organizada de consultar el 
rendimiento de jugadores y equipos en un mismo lugar.

El sistema permitirá:
- Consultar estadísticas de jugadores y equipos
- Ver rankings de goleadores y asistencias
- Registrar resultados de partidos
- Analizar el rendimiento por equipo

---

## 2. Arquitectura de la Base de Datos

La base de datos se llama futbol_db y está compuesta 
por 4 tablas principales:

- equipos: almacena información de los equipos
- jugadores: almacena información de cada jugador
- estadisticas: almacena el rendimiento de cada jugador
- partidos: almacena los resultados de los partidos

---

## 3. Diseño de Tablas y Relaciones

### Tabla: equipos
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT PK | Identificador único |
| nombre | VARCHAR(100) | Nombre del equipo |
| pais | VARCHAR(50) | País del equipo |
| entrenador | VARCHAR(100) | Nombre del entrenador |
| fecha_fundacion | INT | Año de fundación |

### Tabla: jugadores
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT PK | Identificador único |
| nombre | VARCHAR(100) | Nombre del jugador |
| posicion | VARCHAR(50) | Posición en el campo |
| nacionalidad | VARCHAR(50) | País de origen |
| fecha_nacimiento | DATE | Fecha de nacimiento |
| numero_camiseta | INT | Número de camiseta |
| id_equipo | INT FK | Referencia a equipos |

### Tabla: estadisticas
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT PK | Identificador único |
| goles | INT | Total de goles |
| asistencias | INT | Total de asistencias |
| partidos_jugados | INT | Partidos jugados |
| tarjetas_amarillas | INT | Total tarjetas amarillas |
| tarjetas_rojas | INT | Total tarjetas rojas |
| id_jugador | INT FK | Referencia a jugadores |

### Tabla: partidos
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT PK | Identificador único |
| fecha | DATE | Fecha del partido |
| equipo_local | INT FK | Referencia a equipos |
| equipo_visitante | INT FK | Referencia a equipos |
| goles_local | INT | Goles del equipo local |
| goles_visitante | INT | Goles del visitante |

---

## 4. Relaciones entre Tablas

- Un equipo puede tener muchos jugadores
- Un jugador pertenece a un solo equipo
- Un jugador tiene una sola estadistica
- Un partido involucra dos equipos

---

## 5. Selección de Estructuras de Datos

| Estructura | Uso en el sistema |
|---|---|
| Lista enlazada | Almacenar catálogo de jugadores |
| Árbol AVL | Ranking de goleadores ordenado |
| Tabla Hash | Búsqueda rápida por ID de jugador |
| Cola | Registro de eventos del partido |
| Grafo | Relaciones entre jugadores |