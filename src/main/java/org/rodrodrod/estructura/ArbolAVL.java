package org.rodrodrod.estructura;

import org.rodrodrod.modelo.Jugador;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */


public class ArbolAVL {
    // Implementacion manual de un Arbol AVL (Adelson-Velsky y Landis)
    // Arbol binario de busqueda autobalanceado
    // Busqueda por ID en O(log n) garantizado
    // • Insertar jugador
    // • Buscar jugador por ID
    // • Eliminar jugador por ID
    // • Recorrido inorden (jugadores ordenados por ID)

    // Clase interna que representa cada nodo del arbol
    static class Nodo {
        Jugador jugador;                                            // Dato almacenado
        Nodo    izquierdo;                                          // Hijo izquierdo
        Nodo    derecho;                                            // Hijo derecho
        int     altura;                                             // Altura del nodo

        Nodo(Jugador jugador) {
            this.jugador   = jugador;
            this.izquierdo = null;
            this.derecho   = null;
            this.altura    = 1;
        }
    }

    private Nodo raiz;                                              // Raiz del arbol

    // Constructor
    public ArbolAVL() {
        this.raiz = null;
    }

    // ── Utilidades internas ──────────────────────────────────────────────────

    private int altura(Nodo nodo) {
        return (nodo == null) ? 0 : nodo.altura;
    }

    private int balance(Nodo nodo) {
        return (nodo == null) ? 0 : altura(nodo.izquierdo) - altura(nodo.derecho);
    }

    private void actualizarAltura(Nodo nodo) {
        nodo.altura = 1 + Math.max(altura(nodo.izquierdo), altura(nodo.derecho));
    }

    // ── Rotaciones ──────────────────────────────────────────────────────────

    private Nodo rotarDerecha(Nodo y) {
        Nodo x  = y.izquierdo;
        Nodo t2 = x.derecho;
        x.derecho   = y;                                            // Rotacion
        y.izquierdo = t2;
        actualizarAltura(y);
        actualizarAltura(x);
        return x;                                                   // Nueva raiz del subarbol
    }

    private Nodo rotarIzquierda(Nodo x) {
        Nodo y  = x.derecho;
        Nodo t2 = y.izquierdo;
        y.izquierdo = x;                                            // Rotacion
        x.derecho   = t2;
        actualizarAltura(x);
        actualizarAltura(y);
        return y;                                                   // Nueva raiz del subarbol
    }

    private Nodo rebalancear(Nodo nodo) {
        actualizarAltura(nodo);
        int b = balance(nodo);

        if (b > 1  && balance(nodo.izquierdo) >= 0)                // Caso Izquierda-Izquierda
            return rotarDerecha(nodo);

        if (b > 1  && balance(nodo.izquierdo) < 0) {               // Caso Izquierda-Derecha
            nodo.izquierdo = rotarIzquierda(nodo.izquierdo);
            return rotarDerecha(nodo);
        }

        if (b < -1 && balance(nodo.derecho) <= 0)                  // Caso Derecha-Derecha
            return rotarIzquierda(nodo);

        if (b < -1 && balance(nodo.derecho) > 0) {                 // Caso Derecha-Izquierda
            nodo.derecho = rotarDerecha(nodo.derecho);
            return rotarIzquierda(nodo);
        }

        return nodo;
    }

    // ── Operaciones publicas ─────────────────────────────────────────────────

    // Insertar un jugador (ordenado por ID)
    public void insertar(Jugador jugador) {
        raiz = insertar(raiz, jugador);
    }

    private Nodo insertar(Nodo nodo, Jugador jugador) {
        if (nodo == null) return new Nodo(jugador);

        long idNuevo  = jugador.getId();
        long idActual = nodo.jugador.getId();

        if (idNuevo < idActual)
            nodo.izquierdo = insertar(nodo.izquierdo, jugador);
        else if (idNuevo > idActual)
            nodo.derecho   = insertar(nodo.derecho, jugador);
        else {
            nodo.jugador = jugador;                                 // Actualiza si el ID ya existe
            return nodo;
        }

        return rebalancear(nodo);
    }

    // Buscar jugador por ID
    public Jugador buscar(Long id) {
        Nodo resultado = buscar(raiz, id);
        return (resultado == null) ? null : resultado.jugador;
    }

    private Nodo buscar(Nodo nodo, Long id) {
        if (nodo == null)                    return null;
        if (id.equals(nodo.jugador.getId())) return nodo;
        if (id < nodo.jugador.getId())       return buscar(nodo.izquierdo, id);
        return buscar(nodo.derecho, id);
    }

    // Eliminar jugador por ID
    public void eliminar(Long id) {
        raiz = eliminar(raiz, id);
    }

    private Nodo eliminar(Nodo nodo, Long id) {
        if (nodo == null) return null;

        if (id < nodo.jugador.getId())
            nodo.izquierdo = eliminar(nodo.izquierdo, id);
        else if (id > nodo.jugador.getId())
            nodo.derecho   = eliminar(nodo.derecho, id);
        else {
            if (nodo.izquierdo == null) return nodo.derecho;       // Sin hijo izquierdo
            if (nodo.derecho   == null) return nodo.izquierdo;     // Sin hijo derecho

            // Sucesor inorden (menor del subarbol derecho)
            Nodo sucesor = minimoNodo(nodo.derecho);
            nodo.jugador = sucesor.jugador;
            nodo.derecho = eliminar(nodo.derecho, sucesor.jugador.getId());
        }

        return rebalancear(nodo);
    }

    private Nodo minimoNodo(Nodo nodo) {
        Nodo actual = nodo;
        while (actual.izquierdo != null) actual = actual.izquierdo;
        return actual;
    }

    // Devolver todos los jugadores ordenados por ID (inorden)
    public Jugador[] obtenerTodos() {
        int       total   = contarNodos(raiz);
        Jugador[] arreglo = new Jugador[total];
        int[]     indice  = {0};
        inorden(raiz, arreglo, indice);
        return arreglo;
    }

    private int contarNodos(Nodo nodo) {
        if (nodo == null) return 0;
        return 1 + contarNodos(nodo.izquierdo) + contarNodos(nodo.derecho);
    }

    private void inorden(Nodo nodo, Jugador[] arreglo, int[] indice) {
        if (nodo == null) return;
        inorden(nodo.izquierdo, arreglo, indice);
        arreglo[indice[0]++] = nodo.jugador;
        inorden(nodo.derecho, arreglo, indice);
    }

    // Verificar si el arbol esta vacio
    public boolean estaVacio() {
        return raiz == null;
    }

    // Vaciar el arbol
    public void limpiar() {
        raiz = null;
    }
}