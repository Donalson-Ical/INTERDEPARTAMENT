package org.rodrodrod.controller;

import org.rodrodrod.modelo.Jugador;
import org.rodrodrod.service.JugadorService;
import org.springframework.web.bind.annotation.*;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */

@RestController
@RequestMapping("/api/jugadores")
public class JugadorController {

    private final JugadorService service;

    public JugadorController(JugadorService service) {
        this.service = service;
    }

    // GET /api/jugadores → todos los jugadores
    @GetMapping
    public Jugador[] obtenerTodos() {
        return service.obtenerTodos();
    }

    // GET /api/jugadores/ordenados → todos ordenados por ID (AVL)
    @GetMapping("/ordenados")
    public Jugador[] obtenerOrdenados() {
        return service.obtenerOrdenadosPorId();
    }

    // GET /api/jugadores/{id} → buscar por ID (usa AVL)
    @GetMapping("/{id}")
    public Jugador buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // GET /api/jugadores/exacto?nombre=xxx → búsqueda exacta por nombre (usa Hash)
    @GetMapping("/exacto")
    public Jugador buscarNombreExacto(@RequestParam String nombre) {
        return service.buscarNombreExacto(nombre);
    }

    // GET /api/jugadores/buscar?nombre=xxx → búsqueda parcial (usa Lista)
    @GetMapping("/buscar")
    public Jugador[] buscarPorNombre(@RequestParam String nombre) {
        return service.buscarPorNombre(nombre);
    }

    // POST /api/jugadores → agregar jugador
    @PostMapping
    public Jugador agregar(@RequestBody Jugador jugador) {
        service.agregar(jugador);
        return jugador;
    }

    // DELETE /api/jugadores/{id}?nombre=xxx → eliminar
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id, @RequestParam String nombre) {
        boolean ok = service.eliminar(id, nombre);
        return ok ? "Eliminado" : "No encontrado";
    }
}