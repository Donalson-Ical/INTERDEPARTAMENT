# Sistema de Estadísticas de Fútbol - Programación III

## Autor

- **Nombre**: Rodrigo Andres Yalibat Del Cid
- **Carnet**: 0902 24 8046
- **Curso**: Programación III

## Descripción del Proyecto

Sistema completo de gestión y análisis de estadísticas de jugadores de fútbol, desarrollado con Spring Boot y implementando estructuras de datos fundamentales de forma manual:

- **Lista Enlazada Simple**: Almacenamiento dinámico de jugadores en orden de inserción
- **Tabla Hash**: Búsqueda O(1) de jugadores por nombre exacto
- **Árbol AVL**: Búsqueda y ordenamiento O(log n) por ID
- **Cola FIFO**: Procesamiento de jugadores en orden de llegada

## Tareas Completadas

### 1. Inicio de Estructuras de Datos ✅

Definición e implementación de las estructuras base:

- `ListaJugadores.java` - Lista Simplemente Enlazada
- `TablaHashJugadores.java` - Tabla Hash con encadenamiento
- Almacenamiento y acceso simple de datos de jugadores

### 2. Implementación de Estructuras ✅

Estructuras principales completamente implementadas:

- `ArbolAVL.java` - Árbol binario autobalanceado
- `ColaJugadores.java` - Cola FIFO
- Totalmente integradas con el sistema de datos

### 3. Integración de Estructuras ✅

Uso real en el sistema mediante:

- Búsquedas y análisis complejos
- Rankings por múltiples criterios
- Estadísticas generales y por equipo
- Endpoints REST que demuestran cada estructura

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/org/rodrodrod/
│   │   ├── Main.java                          (Aplicación principal)
│   │   ├── controller/
│   │   │   └── JugadorController.java         (30+ endpoints REST)
│   │   ├── service/
│   │   │   └── JugadorService.java           (Lógica de negocio)
│   │   ├── modelo/
│   │   │   ├── Jugador.java                  (Entidad principal)
│   │   │   └── EventoPartido.java            (Eventos de partidos)
│   │   └── estructura/
│   │       ├── ListaJugadores.java
│   │       ├── TablaHashJugadores.java
│   │       ├── ArbolAVL.java
│   │       └── ColaJugadores.java
│   └── resources/
│       ├── static/
│       │   ├── index.html
│       │   ├── jugadores.html
│       │   └── buscar.html
│       └── controller/
└── test/
```

## Endpoints REST Disponibles

### CRUD Básico

- `GET /api/jugadores` - Obtener todos los jugadores
- `GET /api/jugadores/{id}` - Buscar por ID (Árbol AVL)
- `POST /api/jugadores` - Agregar nuevo jugador
- `DELETE /api/jugadores/{id}?nombre=xxx` - Eliminar jugador

### Búsquedas Avanzadas

- `GET /api/jugadores/buscar/nombre?q=nombre` - Búsqueda por nombre (Lista)
- `GET /api/jugadores/buscar/exacto?nombre=nombre` - Búsqueda exacta (Tabla Hash)
- `GET /api/jugadores/buscar/equipo?equipo=xxx` - Por equipo
- `GET /api/jugadores/buscar/posicion?posicion=xxx` - Por posición
- `GET /api/jugadores/buscar/nacionalidad?pais=xxx` - Por nacionalidad
- `GET /api/jugadores/buscar/goles?minimo=100` - Por goles mínimos
- `GET /api/jugadores/ordenados/id` - Ordenados por ID (AVL inorden)

### Rankings

- `GET /api/jugadores/ranking/goles` - Top goleadores
- `GET /api/jugadores/ranking/asistencias` - Top asistentes
- `GET /api/jugadores/ranking/pases` - Por promedio de pases
- `GET /api/jugadores/ranking/edad` - De menor a mayor edad
- `GET /api/jugadores/ranking/partidos` - Por partidos jugados
- `GET /api/jugadores/ranking/puntuacion` - Puntuación total (goles*10 + asistencias*5)

### Estadísticas

- `GET /api/jugadores/estadisticas/general` - Estadísticas generales del sistema
- `GET /api/jugadores/estadisticas/equipo` - Estadísticas por equipo
- `GET /api/jugadores/estadisticas/estructuras` - Información de estructuras de datos

### Información

- `GET /api/jugadores/info` - Información del proyecto
- `GET /api/jugadores/demo` - Demostración con datos reales

## Datos de Prueba

Sistema precargado con 10 jugadores internacionales:

- Cristiano Ronaldo (Manchester United)
- Lionel Messi (Inter Miami)
- Kylian Mbappé (Real Madrid)
- Robert Lewandowski (Barcelona)
- Y 6 más...

## Características Principales

### Búsquedas

- **Lista Enlazada**: Búsqueda por nombre (parcial y ordenada)
- **Tabla Hash**: Búsqueda exacta O(1)
- **Árbol AVL**: Búsqueda por ID O(log n)

### Análisis

- Rankings por múltiples criterios
- Estadísticas generales (goles, asistencias, edad promedio)
- Estadísticas por equipo
- Información de estado de estructuras

### Rendimiento

- Operaciones optimizadas según estructura
- Cada estructura tiene su caso de uso ideal
- Datos cargados al iniciar la aplicación

## Tecnologías Utilizadas

- **Java 17** - Lenguaje de programación
- **Spring Boot 3.2.5** - Framework web
- **Maven** - Gestor de dependencias
- **REST API** - Interfaz de comunicación

## Cómo Ejecutar

1. Compilar el proyecto:

   ```bash
   mvn clean compile
   ```

2. Ejecutar la aplicación:

   ```bash
   mvn spring-boot:run
   ```

3. Acceder a la API:
   ```
   http://localhost:8080/api/jugadores
   ```

## Ejemplo de Uso

### Obtener top 3 goleadores:

```bash
curl http://localhost:8080/api/jugadores/ranking/goles
```

### Buscar por nombre:

```bash
curl http://localhost:8080/api/jugadores/buscar/nombre?q=Ronaldo
```

### Obtener estadísticas generales:

```bash
curl http://localhost:8080/api/jugadores/estadisticas/general
```

### Agregar nuevo jugador:

```bash
curl -X POST http://localhost:8080/api/jugadores \
  -H "Content-Type: application/json" \
  -d '{
    "id": 11,
    "nombre": "Nuevo Jugador",
    "equipo": "Team X",
    "posicion": "Delantero",
    "edad": 28,
    "nacionalidad": "Mexico",
    "goles": 50,
    "asistencias": 25,
    "partidosJugados": 100,
    "promedioPases": 80.5
  }'
```

## Conclusión

El proyecto demuestra de forma práctica cómo las estructuras de datos fundamentales (listas, tablas hash, árboles) se utilizan en aplicaciones reales para resolver problemas de búsqueda, ordenamiento y análisis de datos con diferentes características de rendimiento.

Cada estructura tiene su lugar específico:

- **Lista**: Iteración ordenada
- **Tabla Hash**: Búsqueda rápida por clave exacta
- **Árbol AVL**: Búsqueda equilibrada con rango
- **Cola**: Procesamiento FIFO

---

**Programación III - UMG**
