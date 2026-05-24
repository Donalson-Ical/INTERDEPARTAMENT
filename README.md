# INTERDEPARTAMENT — Sistema de Estadísticas de Fútbol

### Programación III · Universidad Mariano Gálvez de Guatemala, Campus Cobán

> **Autor:** Rodrigo Andres Yalibat Del Cid — Carnet `0902-24-8046`
> **Rama:** `Rodrigo/jsb` · **Grupo:** Grupo 7 — Interdepartament
> **Catedrático:** Ing. Erwin Geovani De León Chamán · **Año:** 2026

---

## Descripción

Sistema completo de gestión y análisis de estadísticas de jugadores de fútbol, desarrollado con **Spring Boot 3.2.5** e implementando cuatro estructuras de datos fundamentales de forma **manual en Java puro** (sin frameworks de colecciones). El servicio central (`JugadorService`) mantiene las cuatro estructuras sincronizadas en memoria.

**Tareas completadas: 3 / 3 ✅**

---

## Estructura del proyecto

```
INTERDEPARTAMENT/
├── pom.xml
└── src/main/java/org/rodrodrod/
    ├── Main.java
    ├── controller/
    │   └── JugadorController.java       ← 30+ endpoints REST
    ├── service/
    │   └── JugadorService.java          ← 27 métodos, orquesta las 4 estructuras
    ├── modelo/
    │   ├── Jugador.java
    │   └── EventoPartido.java
    └── estructura/
        ├── ListaJugadores.java          ← Lista simplemente enlazada
        ├── TablaHashJugadores.java      ← Hash table con encadenamiento
        ├── ColaJugadores.java           ← Cola FIFO con nodos enlazados
        └── ArbolAVL.java               ← Árbol AVL autobalanceado
```

---

## Cómo ejecutar el proyecto

**Requisitos:** Java 17+ · Maven 3.6+

```bash
# 1. Clonar y cambiar a la rama
git clone https://github.com/Donalson-Ical/INTERDEPARTAMENT.git
cd INTERDEPARTAMENT
git checkout Rodrigo/jsb

# 2. Compilar y ejecutar
mvn spring-boot:run

# 3. Acceder a la API
# http://localhost:8080/api/jugadores
```

Para generar el JAR ejecutable:

```bash
mvn clean package
java -jar target/futbol-1.0.0.jar
```

> **Nota:** Para habilitar la carga desde la API externa, reemplaza `TU_API_KEY` en `JugadorService.java` con una clave válida de [AllSports API](https://allsportsapi.com/).

**Troubleshooting rápido:**

| Problema                         | Solución                                         |
| -------------------------------- | ------------------------------------------------ |
| `mvn: El término no se reconoce` | Instala Maven o usa `mvnw`                       |
| Puerto 8080 en uso               | Cambia `server.port` en `application.properties` |
| Error de compilación             | Verifica que tengas Java 17+                     |

---

## Estructuras de datos implementadas

### `ListaJugadores` — Lista simplemente enlazada

Almacenamiento principal con acceso secuencial. Ideal para búsquedas parciales e iteración.

| Operación                 | Descripción                             | Complejidad |
| ------------------------- | --------------------------------------- | ----------- |
| `agregar(Jugador)`        | Inserta al final                        | O(n)        |
| `buscarPorId(Long)`       | Recorre nodo a nodo                     | O(n)        |
| `buscarPorNombre(String)` | Búsqueda parcial, case-insensitive      | O(n)        |
| `eliminar(Long)`          | Elimina por ID                          | O(n)        |
| `obtenerTodos()`          | Devuelve arreglo de todos los jugadores | O(n)        |

```
┌─────────┬──────────────┬──────────────┬─────┐
│ Jugador │ siguiente -> │ Jugador      │ ... │
└─────────┴──────────────┴──────────────┴─────┘
```

---

### `TablaHashJugadores` — Tabla hash con encadenamiento

Búsqueda por nombre exacto en tiempo constante promedio. Capacidad fija de **64 celdas**, función hash polinomial (× 31).

| Operación           | Descripción                    | Complejidad |
| ------------------- | ------------------------------ | ----------- |
| `insertar(Jugador)` | Inserta o actualiza por nombre | O(1) prom.  |
| `buscar(String)`    | Búsqueda exacta por nombre     | O(1) prom.  |
| `eliminar(String)`  | Elimina por nombre             | O(1) prom.  |
| `contiene(String)`  | Verifica existencia            | O(1) prom.  |
| `getFactorCarga()`  | Retorna tamaño / capacidad     | O(1)        |

```
┌───────┐  ┌──────────────────┐
│  [0]  │->│ nombre | jugador │
├───────┤  ├──────────────────┤
│  [1]  │->│ nombre | jugador │->│ siguiente...
│  ...  │  └──────────────────┘
├───────┤
│ [63]  │->│ nombre | jugador │
└───────┘
```

---

### `ArbolAVL` — Árbol binario autobalanceado

Búsqueda por ID garantizada en O(log n). Implementa las 4 rotaciones (LL, RR, LR, RL).

| Operación           | Descripción                         | Complejidad |
| ------------------- | ----------------------------------- | ----------- |
| `insertar(Jugador)` | Inserta y rebalancea                | O(log n)    |
| `buscar(Long)`      | Búsqueda por ID                     | O(log n)    |
| `eliminar(Long)`    | Elimina con sucesor inorden         | O(log n)    |
| `obtenerTodos()`    | Recorrido inorden (IDs ascendentes) | O(n)        |

```
       Raiz
      /    \
    ...    ...
   / \    / \
  ...  ...  ...
```

---

### `ColaJugadores` — Cola FIFO

Procesa jugadores en orden de llegada (turnos, cola de espera).

| Operación          | Descripción           | Complejidad |
| ------------------ | --------------------- | ----------- |
| `encolar(Jugador)` | Agrega al final       | O(1)        |
| `desencolar()`     | Saca del frente       | O(1)        |
| `verFrente()`      | Consulta sin eliminar | O(1)        |

```
Frente -> [Jugador] -> [Jugador] -> [Jugador] -> [Jugador] <- Fin
```

---

## Lógica del servicio

`JugadorService` mantiene las **4 estructuras sincronizadas** en todo momento:

| Operación                 | Estructura usada                     | Complejidad |
| ------------------------- | ------------------------------------ | ----------- |
| `agregar()`               | Inserta en **todas** simultáneamente | O(log n)    |
| `buscarPorId()`           | Árbol AVL                            | O(log n)    |
| `buscarPorNombre()`       | Lista (búsqueda parcial)             | O(n)        |
| `buscarNombreExacto()`    | Tabla Hash                           | O(1) prom.  |
| `eliminar()`              | Lista + Tabla Hash + AVL             | O(log n)    |
| `obtenerOrdenadosPorId()` | Recorrido inorden del AVL            | O(n)        |
| `rankingPorX()`           | Lista + Arrays.sort                  | O(n log n)  |

---

## Modelo de datos

### `Jugador`

```
id · nombre · equipo · posicion · edad · nacionalidad
goles · asistencias · partidosJugados · promedioPases
```

### `EventoPartido`

```
tipo (GOL / GOL EN PROPIA / TARJETA AMARILLA / TARJETA ROJA / SUSTITUCION)
minuto · jugador · equipo · descripcion
```

---

## Datos precargados

El sistema inicia con **10 jugadores internacionales** ya cargados:

| ID  | Nombre             | Equipo            | Pos       | Edad | País       | Goles | Asis. | Partidos |
| --- | ------------------ | ----------------- | --------- | ---- | ---------- | ----- | ----- | -------- |
| 1   | Cristiano Ronaldo  | Manchester United | Delantero | 39   | Portugal   | 150   | 42    | 220      |
| 2   | Lionel Messi       | Inter Miami       | Delantero | 36   | Argentina  | 129   | 40    | 180      |
| 3   | Kylian Mbappé      | Real Madrid       | Delantero | 25   | Francia    | 95    | 38    | 140      |
| 4   | Robert Lewandowski | Barcelona         | Delantero | 35   | Polonia    | 118   | 35    | 165      |
| 5   | Neymar Jr          | Al-Hilal          | Extremo   | 32   | Brasil     | 87    | 52    | 155      |
| 6   | Vinicius Junior    | Real Madrid       | Extremo   | 23   | Brasil     | 42    | 28    | 110      |
| 7   | Karim Benzema      | Al-Ittihad        | Delantero | 36   | Francia    | 105   | 38    | 160      |
| 8   | Erling Haaland     | Manchester City   | Delantero | 23   | Noruega    | 88    | 22    | 120      |
| 9   | Phil Foden         | Manchester City   | Extremo   | 24   | Inglaterra | 42    | 31    | 130      |
| 10  | Harry Kane         | Bayern Munich     | Delantero | 30   | Inglaterra | 96    | 44    | 175      |

**Total goles precargados: 985 · Promedio: 98.5 por jugador**

---

## Endpoints REST (30+)

### CRUD básico (4)

| Método | Endpoint                         | Descripción      | Estructura |
| ------ | -------------------------------- | ---------------- | ---------- |
| GET    | `/api/jugadores`                 | Obtener todos    | Lista      |
| GET    | `/api/jugadores/{id}`            | Buscar por ID    | Árbol AVL  |
| POST   | `/api/jugadores`                 | Agregar jugador  | Todas      |
| DELETE | `/api/jugadores/{id}?nombre=xxx` | Eliminar jugador | Todas      |

### Búsquedas (7)

| Endpoint                        | Descripción                  | Estructura         |
| ------------------------------- | ---------------------------- | ------------------ |
| `/buscar/nombre?q=xxx`          | Búsqueda parcial por nombre  | Lista — O(n)       |
| `/buscar/exacto?nombre=xxx`     | Búsqueda exacta por nombre   | Tabla Hash — O(1)  |
| `/buscar/equipo?equipo=xxx`     | Filtrar por equipo           | Lista — O(n)       |
| `/buscar/posicion?posicion=xxx` | Filtrar por posición         | Lista — O(n)       |
| `/buscar/nacionalidad?pais=xxx` | Filtrar por país             | Lista — O(n)       |
| `/buscar/goles?minimo=100`      | Jugadores con goles >= valor | Lista — O(n)       |
| `/ordenados/id`                 | Todos ordenados por ID       | AVL inorden — O(n) |

### Rankings (6)

| Endpoint               | Criterio                          |
| ---------------------- | --------------------------------- |
| `/ranking/goles`       | Mayor a menor goles               |
| `/ranking/asistencias` | Mayor a menor asistencias         |
| `/ranking/pases`       | Mayor a menor promedio de pases   |
| `/ranking/edad`        | Menor a mayor edad                |
| `/ranking/partidos`    | Mayor a menor partidos jugados    |
| `/ranking/puntuacion`  | Fórmula: goles×10 + asistencias×5 |

### Estadísticas (3)

| Endpoint                    | Descripción                                 |
| --------------------------- | ------------------------------------------- |
| `/estadisticas/general`     | Total goles, asistencias, promedio de edad  |
| `/estadisticas/equipo`      | Resumen agregado por equipo                 |
| `/estadisticas/estructuras` | Tamaño y factor de carga de cada estructura |

### Información (2)

| Endpoint | Descripción                                                 |
| -------- | ----------------------------------------------------------- |
| `/info`  | Datos del proyecto y autor                                  |
| `/demo`  | Top 3 goleadores, top 3 asistentes y estadísticas generales |

---

## Ejemplos de uso

### curl

```bash
# Obtener todos los jugadores
curl http://localhost:8080/api/jugadores

# Ranking de goleadores
curl http://localhost:8080/api/jugadores/ranking/goles

# Estadísticas generales
curl http://localhost:8080/api/jugadores/estadisticas/general

# Buscar por nombre (parcial)
curl "http://localhost:8080/api/jugadores/buscar/nombre?q=Ronaldo"

# Búsqueda exacta por Tabla Hash
curl "http://localhost:8080/api/jugadores/buscar/exacto?nombre=Cristiano%20Ronaldo"

# Filtrar brasileños
curl "http://localhost:8080/api/jugadores/buscar/nacionalidad?pais=Brasil"

# Jugadores con más de 100 goles
curl "http://localhost:8080/api/jugadores/buscar/goles?minimo=100"

# Agregar jugador
curl -X POST http://localhost:8080/api/jugadores \
  -H "Content-Type: application/json" \
  -d '{
    "id": 11,
    "nombre": "Luis Suarez",
    "equipo": "Atletico Madrid",
    "posicion": "Delantero",
    "edad": 37,
    "nacionalidad": "Uruguay",
    "goles": 85,
    "asistencias": 30,
    "partidosJugados": 128,
    "promedioPases": 76.2
  }'

# Eliminar jugador
curl -X DELETE "http://localhost:8080/api/jugadores/11?nombre=Luis%20Suarez"
```

### Python

```python
import requests

BASE_URL = "http://localhost:8080/api/jugadores"

# Obtener todos
jugadores = requests.get(BASE_URL).json()
print(f"Total jugadores: {len(jugadores)}")

# Ranking por goles
ranking = requests.get(f"{BASE_URL}/ranking/goles").json()
for i, j in enumerate(ranking[:3], 1):
    print(f"  {i}. {j['nombre']}: {j['goles']} goles")

# Estadísticas generales
stats = requests.get(f"{BASE_URL}/estadisticas/general").json()
print(stats)

# Agregar jugador
nuevo = {
    "id": 11, "nombre": "Test Player", "equipo": "Team X",
    "posicion": "Delantero", "edad": 30, "nacionalidad": "Mexico",
    "goles": 50, "asistencias": 20, "partidosJugados": 100, "promedioPases": 80.0
}
requests.post(BASE_URL, json=nuevo)
```

### JavaScript / Fetch

```javascript
const BASE = "http://localhost:8080/api/jugadores";

// Top 3 goleadores
fetch(`${BASE}/ranking/goles`)
  .then((r) => r.json())
  .then((data) =>
    data
      .slice(0, 3)
      .forEach((j, i) =>
        console.log(`${i + 1}. ${j.nombre}: ${j.goles} goles`),
      ),
  );

// Estadísticas
fetch(`${BASE}/estadisticas/general`)
  .then((r) => r.json())
  .then((data) => console.log(data));

// Agregar jugador
fetch(BASE, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: 11,
    nombre: "Nuevo Jugador",
    equipo: "Team X",
    posicion: "Delantero",
    edad: 25,
    nacionalidad: "Mexico",
    goles: 45,
    asistencias: 15,
    partidosJugados: 80,
    promedioPases: 79.5,
  }),
})
  .then((r) => r.text())
  .then(console.log);
```

---

## Respuestas JSON esperadas

### `GET /ranking/goles`

```json
[
  {
    "id": 1,
    "nombre": "Cristiano Ronaldo",
    "equipo": "Manchester United",
    "goles": 150
  },
  { "id": 2, "nombre": "Lionel Messi", "goles": 129 }
]
```

### `GET /estadisticas/general`

```json
{
  "totalJugadores": 10,
  "totalGoles": 985,
  "totalAsistencias": 360,
  "totalPartidos": 1344,
  "promedioEdad": 29.5,
  "golesPorJugador": 98.5
}
```

### `GET /estadisticas/equipo`

```json
{
  "Real Madrid": { "jugadores": 2, "goles": 137, "asistencias": 66 },
  "Manchester United": { "jugadores": 1, "goles": 150, "asistencias": 42 }
}
```

### `GET /estadisticas/estructuras`

```json
{
  "lista.tamanio": 10,
  "tablaHash.tamanio": 10,
  "tablaHash.factorCarga": 0.15,
  "cola.tamanio": 10
}
```

### `GET /info`

```json
{
  "proyecto": "Sistema de Estadisticas de Futbol - Programacion III",
  "autor": "Rodrigo Andres Yalibat Del Cid",
  "carnet": "0902 24 8046",
  "estructuras": "Lista Enlazada, Tabla Hash, Arbol AVL, Cola FIFO"
}
```

---

## Tecnologías

| Tecnología                    | Uso                              |
| ----------------------------- | -------------------------------- |
| Java 17                       | Lenguaje principal               |
| Spring Boot 3.2.5             | Servidor REST                    |
| Spring WebFlux / RestTemplate | Consumo de API externa de fútbol |
| Thymeleaf                     | Servir archivos estáticos        |
| Maven                         | Gestión de dependencias          |

---

## Resumen del proyecto

| Componente         | Métodos | Notas                              |
| ------------------ | ------- | ---------------------------------- |
| JugadorService     | 27      | Rankings, búsquedas, estadísticas  |
| JugadorController  | 30+     | CRUD, ranking, búsqueda, análisis  |
| ListaJugadores     | 9       | Enlazada simple, búsqueda flexible |
| TablaHashJugadores | 8       | O(1) búsqueda, encadenamiento      |
| ArbolAVL           | 7       | O(log n) balanceado, inorden       |
| ColaJugadores      | 8       | FIFO, encolar/desencolar           |

**Total: ~89 métodos · ~2000 líneas de código · 10 jugadores precargados**

---

_Universidad Mariano Gálvez de Guatemala — Campus Cobán · Programación III · 2026_
