# Ejemplos de Prueba - API Jugadores

## Requisitos Previos

- Aplicación ejecutándose en `http://localhost:8080`
- Cliente HTTP (curl, Postman, insomnia, etc.)

## 1. OPERACIONES CRUD

### 1.1 Obtener todos los jugadores

```bash
curl http://localhost:8080/api/jugadores
```

### 1.2 Buscar jugador por ID

```bash
curl http://localhost:8080/api/jugadores/1
```

### 1.3 Agregar nuevo jugador

```bash
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
```

### 1.4 Eliminar jugador

```bash
curl -X DELETE "http://localhost:8080/api/jugadores/11?nombre=Luis%20Suarez"
```

## 2. BUSQUEDAS AVANZADAS

### 2.1 Búsqueda por nombre (parcial)

```bash
# Buscar todos con "Ronaldo" en el nombre
curl "http://localhost:8080/api/jugadores/buscar/nombre?q=Ronaldo"
```

### 2.2 Búsqueda exacta (Tabla Hash)

```bash
curl "http://localhost:8080/api/jugadores/buscar/exacto?nombre=Cristiano%20Ronaldo"
```

### 2.3 Filtrar por equipo

```bash
curl "http://localhost:8080/api/jugadores/buscar/equipo?equipo=Real%20Madrid"
```

### 2.4 Filtrar por posición

```bash
curl "http://localhost:8080/api/jugadores/buscar/posicion?posicion=Delantero"
```

### 2.5 Filtrar por nacionalidad

```bash
curl "http://localhost:8080/api/jugadores/buscar/nacionalidad?pais=Brasil"
```

### 2.6 Jugadores con goles mínimos

```bash
curl "http://localhost:8080/api/jugadores/buscar/goles?minimo=100"
```

### 2.7 Ordenados por ID (Árbol AVL)

```bash
curl http://localhost:8080/api/jugadores/ordenados/id
```

## 3. RANKINGS

### 3.1 Top goleadores

```bash
curl http://localhost:8080/api/jugadores/ranking/goles
```

Respuesta esperada:

```json
[
  {
    "id": 1,
    "nombre": "Cristiano Ronaldo",
    "equipo": "Manchester United",
    "goles": 150,
    ...
  },
  {
    "id": 2,
    "nombre": "Lionel Messi",
    "goles": 129,
    ...
  },
  ...
]
```

### 3.2 Top asistentes

```bash
curl http://localhost:8080/api/jugadores/ranking/asistencias
```

### 3.3 Mejores en promedio de pases

```bash
curl http://localhost:8080/api/jugadores/ranking/pases
```

### 3.4 Por edad (de menor a mayor)

```bash
curl http://localhost:8080/api/jugadores/ranking/edad
```

### 3.5 Por partidos jugados

```bash
curl http://localhost:8080/api/jugadores/ranking/partidos
```

### 3.6 Por puntuación total

```bash
# Puntuación = goles*10 + asistencias*5
curl http://localhost:8080/api/jugadores/ranking/puntuacion
```

## 4. ESTADISTICAS

### 4.1 Estadísticas generales

```bash
curl http://localhost:8080/api/jugadores/estadisticas/general
```

Respuesta esperada:

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

### 4.2 Estadísticas por equipo

```bash
curl http://localhost:8080/api/jugadores/estadisticas/equipo
```

Respuesta esperada:

```json
{
  "Manchester United": {
    "jugadores": 1,
    "goles": 150,
    "asistencias": 42
  },
  "Real Madrid": {
    "jugadores": 2,
    "goles": 137,
    "asistencias": 66
  },
  ...
}
```

### 4.3 Estadísticas de estructuras de datos

```bash
curl http://localhost:8080/api/jugadores/estadisticas/estructuras
```

Respuesta esperada:

```json
{
  "lista.tamanio": 10,
  "tablaHash.tamanio": 10,
  "tablaHash.factorCarga": 0.15,
  "cola.tamanio": 10
}
```

## 5. INFORMACION Y DEMOSTRACION

### 5.1 Información del proyecto

```bash
curl http://localhost:8080/api/jugadores/info
```

Respuesta:

```json
{
  "proyecto": "Sistema de Estadisticas de Futbol - Programacion III",
  "autor": "Rodrigo Andres Yalibat Del Cid",
  "carnet": "0902 24 8046",
  "estructuras": "Lista Enlazada, Tabla Hash, Arbol AVL, Cola FIFO",
  "descripcion": "Demostracion de estructuras de datos..."
}
```

### 5.2 Demostración completa

```bash
curl http://localhost:8080/api/jugadores/demo
```

Respuesta: Incluye top 3 goleadores, top 3 asistentes, estadísticas generales

## 6. EJEMPLOS CON PYTHON

```python
import requests
import json

BASE_URL = "http://localhost:8080/api/jugadores"

# Obtener todos
response = requests.get(f"{BASE_URL}")
jugadores = response.json()
print(f"Total jugadores: {len(jugadores)}")

# Búsqueda por nombre
response = requests.get(f"{BASE_URL}/buscar/nombre", params={"q": "Messi"})
resultados = response.json()
print(f"Resultados para 'Messi': {len(resultados)}")

# Ranking por goles
response = requests.get(f"{BASE_URL}/ranking/goles")
ranking = response.json()
print(f"Top 3 goleadores:")
for i, jugador in enumerate(ranking[:3], 1):
    print(f"  {i}. {jugador['nombre']}: {jugador['goles']} goles")

# Estadísticas generales
response = requests.get(f"{BASE_URL}/estadisticas/general")
stats = response.json()
print(f"Estadísticas generales: {json.dumps(stats, indent=2)}")

# Agregar nuevo jugador
nuevo_jugador = {
    "id": 11,
    "nombre": "Test Player",
    "equipo": "Test Team",
    "posicion": "Delantero",
    "edad": 30,
    "nacionalidad": "Test",
    "goles": 50,
    "asistencias": 20,
    "partidosJugados": 100,
    "promedioPases": 80.0
}
response = requests.post(f"{BASE_URL}", json=nuevo_jugador)
print(response.text)
```

## 7. EJEMPLOS CON JAVASCRIPT/FETCH

```javascript
const BASE_URL = "http://localhost:8080/api/jugadores";

// Obtener todos
fetch(`${BASE_URL}`)
  .then(res => res.json())
  .then(data => console.log(`Total jugadores: ${data.length}`));

// Búsqueda
fetch(`${BASE_URL}/buscar/nombre?q=Ronaldo`)
  .then(res => res.json())
  .then(data => console.log("Resultados:", data));

// Ranking
fetch(`${BASE_URL}/ranking/goles`)
  .then(res => res.json())
  .then(data => {
    console.log("Top 3 goleadores:");
    data.slice(0, 3).forEach((j, i) => {
      console.log(`${i+1}. ${j.nombre}: ${j.goles} goles`);
    });
  });

// Estadísticas
fetch(`${BASE_URL}/estadisticas/general`)
  .then(res => res.json())
  .then(data => console.log("Estadísticas:", data));

// Agregar jugador
fetch(`${BASE_URL}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: 11,
    nombre: "Nuevo Jugador",
    equipo: "Team X",
    posicion: "Delantero",
    edad: 25,
    nacionalidad": "Mexico",
    goles: 45,
    asistencias: 15,
    partidosJugados: 80,
    promedioPases: 79.5
  })
})
  .then(res => res.text())
  .then(msg => console.log(msg));
```

## 8. CASOS DE USO REALES

### Caso 1: Buscar mejores Brasileños

```bash
curl "http://localhost:8080/api/jugadores/buscar/nacionalidad?pais=Brasil" | jq '.[] | {nombre, equipo, goles, asistencias}'
```

### Caso 2: Top 5 goleadores de Manchester

```bash
curl http://localhost:8080/api/jugadores | jq 'group_by(.equipo)[] | select(.[0].equipo == "Manchester United") | sort_by(.goles) | reverse | .[0:5]'
```

### Caso 3: Extremos con mejor promedio de pases

```bash
curl "http://localhost:8080/api/jugadores/buscar/posicion?posicion=Extremo" | jq 'sort_by(.promedioPases) | reverse | .[0:3]'
```

### Caso 4: Comparar estructura de datos

```bash
curl http://localhost:8080/api/jugadores/estadisticas/estructuras | jq
```

---

**Nota**: Algunos ejemplos usan `jq` para formatear JSON. Instálalo con:

- macOS: `brew install jq`
- Linux: `sudo apt-get install jq`
- Windows: Descargar desde https://stedolan.github.io/jq/download/
