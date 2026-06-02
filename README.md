# Informe del Proyecto: Sistema de Análisis de Estadísticas Deportivas

## 1. Introducción

El proyecto es un sistema de análisis de estadísticas deportivas centrado en jugadores de fútbol. Se implementa como una aplicación Java con Spring Boot para el backend, un frontend basado en Next.js / React y recursos estáticos en HTML y CSS.

## 2. Autores

- Rodrigo Andres Yalibat Del Cid — Carnet: 0902-24-8046
- Berta Azucena Vicente Osorio — Carnet: 0902-24-19148
- Donalson Gumersindo Ical Xol — Carnet: 0902-23-21280
- Herberth Annidiel Alvare Sucup — Carnet: 0902-24-11784

## 3. Objetivo del sistema

El sistema ofrece servicios de consulta, filtrado y análisis de estadísticas deportivas mediante:

- API REST para acceso a datos de jugadores
- Estructuras de datos manuales para almacenamiento y búsqueda
- Intercambio de información en formato JSON
- Presentación de contenido estático en HTML/CSS

## 4. Alcance del repositorio

El repositorio actual incluye los siguientes artefactos y carpetas relevantes:

- `pom.xml`: configuración de Maven y dependencias de Spring Boot
- `package.json`: dependencias de frontend Next.js y React
- `app/`: frontend Next.js en ejecución
- `public/`: activos estáticos y contenido visible en el navegador
- `src/main/java/org/rodrodrod/`: código fuente Java del backend
- `src/main/resources/static/`: contenido HTML y CSS servido por Spring Boot
- `target/`: artefactos compilados generados por Maven

## 5. Tecnologías utilizadas

- Java 17
- Spring Boot 3.2.5
- Maven
- Next.js
- React
- HTML
- CSS
- JSON
- MySQL (a través de la dependencia `mysql2` en `package.json`)

## 6. Arquitectura y funcionalidades

### 6.1 Backend

El backend se organiza en capas:

- `controller`: expone la API REST
- `service`: lógica de negocio y coordinación de estructuras de datos
- `modelo`: entidad `Jugador` y otros modelos de datos
- `estructura`: implementaciones manuales de estructuras de datos

Las estructuras de datos que están presentes en el código son:

- `ListaJugadores`
- `TablaHashJugadores`
- `ArbolAVL`
- `ColaJugadores`

### 6.2 API REST

La aplicación expone aproximadamente 30 endpoints que permiten:

- Obtener todos los jugadores
- Obtener jugador por ID
- Agregar y eliminar jugadores
- Buscar por nombre, equipo, posición, nacionalidad y goles
- Generar rankings por goles, asistencias, pases, edad, partidos y puntuación
- Obtener estadísticas generales, por equipo y de estructuras de datos
- Consultar información del proyecto y una demostración de datos

### 6.3 Frontend y recursos estáticos

El proyecto contiene:

- Frontend en `app/` basado en Next.js / React
- Páginas estáticas en `public/`
- Recursos HTML y CSS en `src/main/resources/static/`

### 6.4 Formatos de datos

- Las peticiones y respuestas de la API usan JSON
- El frontend y las páginas estáticas utilizan HTML y CSS

## 7. Requerimientos de ejecución

El sistema está preparado para ejecutarse con:

- Java 17 o superior
- Maven 3.6 o superior
- Node.js para la compilación del frontend Next.js

## 8. Ejecución del sistema

### 8.1 Backend

Compilación y ejecución del backend:

```bash
mvn clean package
mvn spring-boot:run
```

Ejecución del artefacto JAR:

```bash
java -jar target/futbol-1.0.0.jar
```

### 8.2 Frontend

Instalación y compilación del frontend:

```bash
npm ci
npm run build
npm run start
```

## 9. Estado actual

El repositorio contiene una aplicación completa con:

- Backend Java Spring Boot funcional
- Frontend Next.js / React presente
- Recursos estáticos HTML y CSS
- Intercambio JSON en la API
- Dependencias de MySQL definidas
- Documentación en este archivo `README.md`

## 10. Convenciones de la rama `main`

- El paquete raíz es `org.rodrodrod`
- La clase principal es `org.rodrodrod.Main`
- El artefacto Maven es `futbol` versión `1.0.0`
- Este `README.md` es la única documentación en formato Markdown en `main`

## 11. Observaciones

El directorio actual refleja el estado presente del proyecto sin referencias a documentos eliminados o a contenido anterior.
