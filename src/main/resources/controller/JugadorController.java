package org.rodrodrod.controller;

import java.util.List;
import org.rodrodrod.modelo.Jugador;
import org.rodrodrod.service.JugadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jugadores")
@CrossOrigin(origins = "*")
public class JugadorController {

    @Autowired
    private JugadorService service;

    @GetMapping
    public List<Jugador> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/ordenados")
    public List<Jugador> obtenerOrdenados() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Jugador buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @GetMapping("/exacto")
    public Jugador buscarExacto(@RequestParam String nombre) {
        return service.buscarExacto(nombre);
    }

    @GetMapping("/buscar")
    public List<Jugador> buscarParcial(@RequestParam String nombre) {
        return service.buscarParcial(nombre);
    }

    @PostMapping
    public Jugador agregar(@RequestBody Jugador jugador) {
        service.agregar(jugador);
        return jugador;
    }

    @DeleteMapping("/{id}")
    public void eliminar(
        @PathVariable Long id,
        @RequestParam String nombre
    ) {
        service.eliminar(id, nombre);
    }
}