package org.rodrodrod.estructura;

import org.rodrodrod.modelo.Jugador;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */


public class TablaHashJugadores {
    // Implementacion manual de una Tabla Hash con encadenamiento
    // Permite buscar jugadores por nombre en O(1) promedio
    // Maneja colisiones mediante listas enlazadas en cada celda
    // • Insertar jugador
    // • Buscar jugador por nombre
    // • Eliminar jugador por nombre
    // • Verificar si existe un jugador
    // • Mostrar todos los jugadores

    // Clase interna para manejar colisiones (encadenamiento)
    static class Entrada {
        String  clave;                                              // Nombre del jugador en minusculas
        Jugador jugador;                                            // Jugador almacenado
        Entrada siguiente;                                          // Siguiente entrada en caso de colision

        Entrada(String clave, Jugador jugador) {
            this.clave     = clave;
            this.jugador   = jugador;
            this.siguiente = null;
        }
    }

    // Atributos de la tabla
    private static final int CAPACIDAD = 64;                       // Numero de celdas de la tabla
    private final Entrada[]  tabla;                                 // Arreglo principal de la tabla
    private int              tamanio;                               // Cantidad de jugadores almacenados

    // Constructor
    public TablaHashJugadores() {
        this.tabla   = new Entrada[CAPACIDAD];
        this.tamanio = 0;
    }

    // Funcion hash: calcula el indice a partir del nombre del jugador
    private int hash(String clave) {
        int resultado = 0;
        for (int i = 0; i < clave.length(); i++) {
            resultado = (resultado * 31 + clave.charAt(i)) % CAPACIDAD; // Funcion polinomial
        }
        return Math.abs(resultado);                                 // Asegura indice positivo
    }

    // Insertar o actualizar un jugador en la tabla
    public void insertar(Jugador jugador) {
        String clave  = jugador.getNombre().toLowerCase();          // Clave en minusculas
        int    indice = hash(clave);                                // Calcula el indice

        Entrada actual = tabla[indice];

        // Verificar si ya existe la clave para actualizar
        while (actual != null) {
            if (actual.clave.equals(clave)) {
                actual.jugador = jugador;                           // Actualiza si ya existe
                return;
            }
            actual = actual.siguiente;
        }

        // No existe: insertar al inicio del encadenamiento
        Entrada nueva   = new Entrada(clave, jugador);
        nueva.siguiente = tabla[indice];                            // El nuevo apunta al anterior en esa celda
        tabla[indice]   = nueva;                                    // La celda ahora apunta al nuevo
        tamanio++;
    }

    // Buscar un jugador por nombre exacto
    public Jugador buscar(String nombre) {
        String clave  = nombre.toLowerCase();                       // Clave en minusculas
        int    indice = hash(clave);                                // Calcula el indice

        Entrada actual = tabla[indice];
        while (actual != null) {                                    // Recorre el encadenamiento
            if (actual.clave.equals(clave)) {
                return actual.jugador;                              // Jugador encontrado
            }
            actual = actual.siguiente;                              // Avanza al siguiente en la celda
        }
        return null;
    }

    // Eliminar un jugador por nombre
    public boolean eliminar(String nombre) {
        String clave  = nombre.toLowerCase();                       // Clave en minusculas
        int    indice = hash(clave);                                // Calcula el indice

        Entrada actual   = tabla[indice];
        Entrada anterior = null;

        while (actual != null) {                                    // Recorre buscando la clave
            if (actual.clave.equals(clave)) {
                if (anterior == null) {
                    tabla[indice] = actual.siguiente;               // Era el primero en la celda
                } else {
                    anterior.siguiente = actual.siguiente;          // Salta el nodo a eliminar
                }
                tamanio--;
                return true;
            }
            anterior = actual;
            actual   = actual.siguiente;                            // Avanza al siguiente en la celda
        }
        return false;
    }

    // Verificar si existe un jugador con ese nombre
    public boolean contiene(String nombre) {
        return buscar(nombre) != null;
    }

    // Devolver todos los jugadores en un arreglo
    public Jugador[] obtenerTodos() {
        Jugador[] resultado = new Jugador[tamanio];
        int indice = 0;
        for (Entrada entrada : tabla) {
            Entrada actual = entrada;
            while (actual != null) {                                // Recorre cada celda
                resultado[indice++] = actual.jugador;
                actual = actual.siguiente;
            }
        }
        return resultado;
    }

    // Retornar el numero de jugadores almacenados
    public int getTamanio() {
        return tamanio;
    }

    // Retornar el factor de carga actual
    public double getFactorCarga() {
        return (double) tamanio / CAPACIDAD;
    }

    // Vaciar la tabla completamente
    public void limpiar() {
        for (int i = 0; i < CAPACIDAD; i++) {
            tabla[i] = null;                                        // Limpia cada celda
        }
        tamanio = 0;
    }
}