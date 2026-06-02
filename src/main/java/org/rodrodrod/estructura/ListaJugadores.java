package org.rodrodrod.estructura;

import org.rodrodrod.modelo.Jugador;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */


public class ListaJugadores {
    // Implementacion manual de una Lista Simplemente Enlazada
    // Permite almacenar y acceder a datos de jugadores de forma dinamica
    // • Agregar jugador
    // • Buscar jugador por ID
    // • Buscar jugadores por nombre
    // • Eliminar jugador
    // • Mostrar todos los jugadores

    // Clase interna que representa cada nodo de la lista
    static class Nodo {
        Jugador jugador;                                            // Dato almacenado en el nodo
        Nodo    siguiente;                                          // Referencia al siguiente nodo

        Nodo(Jugador jugador) {
            this.jugador   = jugador;
            this.siguiente = null;
        }
    }

    // Atributos de la lista
    private Nodo cabeza;                                            // Primer nodo de la lista
    private int  tamanio;                                           // Cantidad de jugadores

    // Constructor
    public ListaJugadores() {
        this.cabeza  = null;
        this.tamanio = 0;
    }

    // Agregar un jugador al final de la lista
    public void agregar(Jugador jugador) {
        Nodo nuevo = new Nodo(jugador);                             // Crea el nuevo nodo
        if (cabeza == null) {
            cabeza = nuevo;                                         // Si la lista esta vacia, el nuevo es la cabeza
        } else {
            Nodo actual = cabeza;
            while (actual.siguiente != null) {                      // Recorre hasta el ultimo nodo
                actual = actual.siguiente;
            }
            actual.siguiente = nuevo;                               // El ultimo nodo apunta al nuevo
        }
        tamanio++;
    }

    // Buscar un jugador por su ID
    public Jugador buscarPorId(Long id) {
        Nodo actual = cabeza;
        while (actual != null) {                                    // Recorre buscando el ID
            if (actual.jugador.getId().equals(id)) {
                return actual.jugador;                              // Retorna el jugador encontrado
            }
            actual = actual.siguiente;                              // Avanza al siguiente nodo
        }
        return null;
    }

    // Buscar jugadores por nombre (busqueda parcial, sin distinguir mayusculas)
    public Jugador[] buscarPorNombre(String nombre) {
        // Primera pasada: contar coincidencias
        int  contador = 0;
        Nodo actual   = cabeza;
        while (actual != null) {
            if (actual.jugador.getNombre().toLowerCase().contains(nombre.toLowerCase())) {
                contador++;
            }
            actual = actual.siguiente;
        }

        // Segunda pasada: llenar el arreglo con los encontrados
        Jugador[] resultados = new Jugador[contador];
        int indice = 0;
        actual = cabeza;
        while (actual != null) {
            if (actual.jugador.getNombre().toLowerCase().contains(nombre.toLowerCase())) {
                resultados[indice++] = actual.jugador;
            }
            actual = actual.siguiente;                              // Avanza al siguiente nodo
        }
        return resultados;
    }

    // Eliminar un jugador por su ID
    public boolean eliminar(Long id) {
        if (cabeza == null) return false;

        if (cabeza.jugador.getId().equals(id)) {
            cabeza = cabeza.siguiente;                              // Si es la cabeza, se actualiza la cabeza
            tamanio--;
            return true;
        }
        Nodo actual = cabeza;
        while (actual.siguiente != null) {                          // Recorre buscando el ID
            if (actual.siguiente.jugador.getId().equals(id)) {
                actual.siguiente = actual.siguiente.siguiente;      // Salta el nodo a eliminar
                tamanio--;
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    // Devolver todos los jugadores en un arreglo
    public Jugador[] obtenerTodos() {
        Jugador[] arreglo = new Jugador[tamanio];
        Nodo actual       = cabeza;                                 // Empieza desde la cabeza
        int  indice       = 0;
        while (actual != null) {
            arreglo[indice++] = actual.jugador;
            actual = actual.siguiente;                              // Avanza al siguiente nodo
        }
        return arreglo;
    }

    // Verificar si la lista esta vacia
    public boolean estaVacia() {
        return cabeza == null;
    }

    // Retornar el numero de jugadores en la lista
    public int getTamanio() {
        return tamanio;
    }

    // Vaciar la lista completamente
    public void limpiar() {
        cabeza  = null;
        tamanio = 0;
    }
}