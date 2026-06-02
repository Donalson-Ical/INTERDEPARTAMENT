package org.rodrodrod.estructura;

import org.rodrodrod.modelo.Jugador;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */


public class ColaJugadores {
    // Implementacion manual de una Cola (FIFO) con nodos enlazados
    // El primero en entrar es el primero en salir
    // Util para procesar jugadores en orden de llegada (ej. turnos, colas de espera)
    // • Encolar jugador
    // • Desencolar jugador
    // • Ver frente de la cola
    // • Mostrar todos los jugadores en cola

    // Clase interna que representa cada nodo
    static class Nodo {
        Jugador jugador;                                            // Dato almacenado
        Nodo    siguiente;                                          // Referencia al siguiente nodo

        Nodo(Jugador jugador) {
            this.jugador   = jugador;
            this.siguiente = null;
        }
    }

    private Nodo frente;                                            // Primer elemento (sale primero)
    private Nodo fin;                                               // Ultimo elemento (entra ultimo)
    private int  tamanio;                                           // Cantidad de jugadores en cola

    // Constructor
    public ColaJugadores() {
        this.frente  = null;
        this.fin     = null;
        this.tamanio = 0;
    }

    // Encolar: agregar jugador al final de la cola
    public void encolar(Jugador jugador) {
        Nodo nuevo = new Nodo(jugador);
        if (fin == null) {
            frente = nuevo;                                         // Cola vacia: frente y fin apuntan al mismo
            fin    = nuevo;
        } else {
            fin.siguiente = nuevo;                                  // El ultimo nodo apunta al nuevo
            fin           = nuevo;                                  // El nuevo pasa a ser el fin
        }
        tamanio++;
    }

    // Desencolar: sacar el jugador del frente
    public Jugador desencolar() {
        if (frente == null) return null;

        Jugador jugador = frente.jugador;                           // Guarda el jugador a retornar
        frente          = frente.siguiente;                         // Avanza el frente
        if (frente == null) fin = null;                             // Si quedo vacia, fin tambien es null
        tamanio--;
        return jugador;
    }

    // Ver el jugador al frente sin sacarlo
    public Jugador verFrente() {
        return (frente == null) ? null : frente.jugador;
    }

    // Devolver todos los jugadores en un arreglo (sin desencolar)
    public Jugador[] obtenerTodos() {
        Jugador[] arreglo = new Jugador[tamanio];
        Nodo actual       = frente;
        int  indice       = 0;
        while (actual != null) {
            arreglo[indice++] = actual.jugador;
            actual = actual.siguiente;
        }
        return arreglo;
    }

    // Verificar si la cola esta vacia
    public boolean estaVacia() {
        return frente == null;
    }

    // Retornar la cantidad de jugadores en la cola
    public int getTamanio() {
        return tamanio;
    }

    // Vaciar la cola completamente
    public void limpiar() {
        frente  = null;
        fin     = null;
        tamanio = 0;
    }
}