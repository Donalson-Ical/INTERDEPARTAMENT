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

    // GET /api/jugadores/{id} → buscar por ID (usa AVL)
    @GetMapping("/{id}")
    public Jugador buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // POST /api/jugadores → agregar jugador
    @PostMapping
    public String agregar(@RequestBody Jugador jugador) {
        service.agregar(jugador);
        return "Jugador agregado: " + jugador.getNombre();
    }

    // DELETE /api/jugadores/{id}?nombre=xxx → eliminar
    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id, @RequestParam String nombre) {
        boolean ok = service.eliminar(id, nombre);
        return ok ? "Eliminado" : "No encontrado";
    }
}