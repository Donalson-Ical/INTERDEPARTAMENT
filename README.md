# INTERDEPARTAMENT — Módulo de Estructuras de Datos

### Programación III · Universidad Mariano Gálvez de Guatemala, Campus Cobán

> **Autor:** Rodrigo Andres Yalibat Del Cid — Carnet `0902-24-8046`  
> **Rama:** `Rodrigo/jsb`  
> **Grupo:** Grupo 7 — Interdepartament  
> **Catedrático:** Ing. Erwin Geovani De León Chamán

---

## Descripción

Este módulo implementa las **estructuras de datos manuales** del sistema de estadísticas de fútbol interdepartamental. Todas las estructuras están escritas en **Java puro**, sin frameworks de colecciones ni librerías externas. El backend utiliza **Spring Boot 3.2.5** para exponer los datos vía REST; el servicio central (`JugadorService`) mantiene las cuatro estructuras sincronizadas en memoria.

---

## Estructura del proyecto

```
INTERDEPARTAMENT/
├── pom.xml
└── src/main/java/org/rodrodrod/
    ├── Main.java                          ← Entry point Spring Boot
    ├── modelo/
    │   ├── Jugador.java                   ← Entidad principal
    │   └── EventoPartido.java             ← Tipos de evento (GOL, tarjeta, etc.)
    ├── estructura/
    │   ├── ListaJugadores.java            ← Lista simplemente enlazada
    │   ├── TablaHashJugadores.java        ← Hash table con encadenamiento
    │   ├── ColaJugadores.java             ← Cola FIFO con nodos enlazados
    │   └── ArbolAVL.java                  ← Árbol AVL autobalanceado
    └── service/
        └── JugadorService.java            ← Capa de servicio (orquesta las 4 estructuras)
```

---

## Estructuras de datos implementadas

### `ListaJugadores` — Lista simplemente enlazada

Almacenamiento principal de jugadores con acceso secuencial.

| Operación                 | Descripción                             | Complejidad |
| ------------------------- | --------------------------------------- | ----------- |
| `agregar(Jugador)`        | Inserta al final                        | O(n)        |
| `buscarPorId(Long)`       | Recorre nodo a nodo                     | O(n)        |
| `buscarPorNombre(String)` | Búsqueda parcial, case-insensitive      | O(n)        |
| `eliminar(Long)`          | Elimina por ID                          | O(n)        |
| `obtenerTodos()`          | Devuelve arreglo de todos los jugadores | O(n)        |

---

### `TablaHashJugadores` — Tabla hash con encadenamiento

Búsqueda por nombre en tiempo constante promedio. Capacidad fija de **64 celdas**, función hash polinomial (`× 31`).

| Operación           | Descripción                    | Complejidad |
| ------------------- | ------------------------------ | ----------- |
| `insertar(Jugador)` | Inserta o actualiza por nombre | O(1) prom.  |
| `buscar(String)`    | Búsqueda por nombre exacto     | O(1) prom.  |
| `eliminar(String)`  | Elimina por nombre             | O(1) prom.  |
| `contiene(String)`  | Verifica existencia            | O(1) prom.  |
| `getFactorCarga()`  | Retorna tamaño / capacidad     | O(1)        |

---

### `ColaJugadores` — Cola FIFO

Procesa jugadores en orden de llegada (turnos, cola de espera).

| Operación          | Descripción           | Complejidad |
| ------------------ | --------------------- | ----------- |
| `encolar(Jugador)` | Agrega al final       | O(1)        |
| `desencolar()`     | Saca del frente       | O(1)        |
| `verFrente()`      | Consulta sin eliminar | O(1)        |

---

### `ArbolAVL` — Árbol binario autobalanceado

Búsqueda por ID garantizada en O(log n). Implementa las 4 rotaciones (LL, RR, LR, RL).

| Operación           | Descripción                         | Complejidad |
| ------------------- | ----------------------------------- | ----------- |
| `insertar(Jugador)` | Inserta y rebalancea                | O(log n)    |
| `buscar(Long)`      | Búsqueda por ID                     | O(log n)    |
| `eliminar(Long)`    | Elimina con sucesor inorden         | O(log n)    |
| `obtenerTodos()`    | Recorrido inorden (IDs ascendentes) | O(n)        |

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

## Tecnologías

| Tecnología                    | Uso                              |
| ----------------------------- | -------------------------------- |
| Java 17                       | Lenguaje principal               |
| Spring Boot 3.2.5             | Servidor REST                    |
| Spring WebFlux / RestTemplate | Consumo de API externa de fútbol |
| Thymeleaf                     | Servir archivos estáticos        |
| Maven                         | Gestión de dependencias          |

---

## Cómo correr el proyecto

**Requisitos:** Java 17+, Maven 3.8+

```bash
# Clonar el repositorio y cambiar a la rama
git clone https://github.com/Donalson-Ical/INTERDEPARTAMENT.git
cd INTERDEPARTAMENT
git checkout Rodrigo/jsb

# Compilar y ejecutar
mvn spring-boot:run
```

El servidor inicia en `http://localhost:8080` por defecto.

> **Nota:** Para habilitar la carga desde la API externa, reemplaza `TU_API_KEY` en `JugadorService.java` con una clave válida de [AllSports API](https://allsportsapi.com/).

---

## Lógica del servicio

`JugadorService` mantiene las **4 estructuras sincronizadas** en todo momento:

- `agregar()` → inserta en lista, tabla hash, árbol AVL y cola simultáneamente.
- `buscarPorId()` → usa el **árbol AVL** (O(log n)).
- `buscarPorNombre()` → usa la **lista** para búsqueda parcial (O(n)).
- `buscarNombreExacto()` → usa la **tabla hash** (O(1) promedio).
- `eliminar()` → elimina de lista, tabla hash y árbol AVL.
- `obtenerOrdenadosPorId()` → recorrido inorden del **árbol AVL**.

---

_Universidad Mariano Gálvez de Guatemala — Campus Cobán · 2024_
