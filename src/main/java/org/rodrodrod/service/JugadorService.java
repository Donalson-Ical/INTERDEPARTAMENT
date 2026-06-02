package org.rodrodrod.service;

import org.rodrodrod.estructura.ArbolAVL;
import org.rodrodrod.estructura.ColaJugadores;
import org.rodrodrod.estructura.ListaJugadores;
import org.rodrodrod.estructura.TablaHashJugadores;
import org.rodrodrod.modelo.Jugador;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */

@Service
public class JugadorService {

    private final ListaJugadores     lista;
    private final TablaHashJugadores tablaHash;
    private final ArbolAVL           arbol;
    private final ColaJugadores      cola;

    public JugadorService() {
        this.lista     = new ListaJugadores();
        this.tablaHash = new TablaHashJugadores();
        this.arbol     = new ArbolAVL();
        this.cola      = new ColaJugadores();
    }

    // ── 🔥 CONSUMIR API EXTERNA ─────────────────────────────────────────────

    public void cargarDesdeApi() {
        RestTemplate rest = new RestTemplate();

        String url = "https://apiv2.allsportsapi.com/football/?met=Players&APIkey=TU_API_KEY";

        try {
            String response = rest.getForObject(url, String.class);

            System.out.println("RESPUESTA DE LA API:");
            System.out.println(response);

        } catch (Exception e) {
            System.out.println("Error al consumir API:");
            e.printStackTrace();
        }
    }

    // ── Agregar ─────────────────────────────────────────────────────────────

    public void agregar(Jugador jugador) {
        lista.agregar(jugador);
        tablaHash.insertar(jugador);
        arbol.insertar(jugador);
        cola.encolar(jugador);
    }

    // ── Buscar ──────────────────────────────────────────────────────────────

    public Jugador buscarPorId(Long id) {
        return arbol.buscar(id);
    }

    public Jugador[] buscarPorNombre(String nombre) {
        return lista.buscarPorNombre(nombre);
    }

    public Jugador buscarNombreExacto(String nombre) {
        return tablaHash.buscar(nombre);
    }

    // ── Eliminar ────────────────────────────────────────────────────────────

    public boolean eliminar(Long id, String nombre) {
        boolean eliminado = lista.eliminar(id);
        tablaHash.eliminar(nombre);
        arbol.eliminar(id);
        return eliminado;
    }

    // ── Obtener todos ───────────────────────────────────────────────────────

    public Jugador[] obtenerTodos() {
        return lista.obtenerTodos();
    }

    public Jugador[] obtenerOrdenadosPorId() {
        return arbol.obtenerTodos();
    }

    // ── Acceso a estructuras ────────────────────────────────────────────────

    public ListaJugadores     getLista()     { return lista; }
    public TablaHashJugadores getTablaHash() { return tablaHash; }
    public ArbolAVL           getArbol()     { return arbol; }
    public ColaJugadores      getCola()      { return cola; }
}