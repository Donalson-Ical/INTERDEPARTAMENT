package com.raydc.futbol.modelo;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */

public class Jugador {

    // Atributos del jugador
    private Long   id;                                              // Identificador unico
    private String nombre;                                          // Nombre completo
    private String equipo;                                          // Equipo al que pertenece
    private String posicion;                                        // Posicion en el campo
    private int    edad;                                            // Edad del jugador
    private String nacionalidad;                                    // Pais de origen
    private int    goles;                                           // Goles anotados
    private int    asistencias;                                     // Asistencias dadas
    private int    partidosJugados;                                 // Total de partidos jugados
    private double promedioPases;                                   // Promedio de pases por partido

    // Constructor vacio
    public Jugador() {}

    // Constructor completo
    public Jugador(Long id, String nombre, String equipo, String posicion,
                   int edad, String nacionalidad,
                   int goles, int asistencias, int partidosJugados, double promedioPases) {
        this.id              = id;
        this.nombre          = nombre;
        this.equipo          = equipo;
        this.posicion        = posicion;
        this.edad            = edad;
        this.nacionalidad    = nacionalidad;
        this.goles           = goles;
        this.asistencias     = asistencias;
        this.partidosJugados = partidosJugados;
        this.promedioPases   = promedioPases;
    }

    // Constructor sin ID (para jugadores nuevos)
    public Jugador(String nombre, String equipo, String posicion,
                   int edad, String nacionalidad,
                   int goles, int asistencias, int partidosJugados, double promedioPases) {
        this.nombre          = nombre;
        this.equipo          = equipo;
        this.posicion        = posicion;
        this.edad            = edad;
        this.nacionalidad    = nacionalidad;
        this.goles           = goles;
        this.asistencias     = asistencias;
        this.partidosJugados = partidosJugados;
        this.promedioPases   = promedioPases;
    }

    // Getters y Setters
    public Long   getId()                   { return id; }
    public void   setId(Long id)            { this.id = id; }

    public String getNombre()               { return nombre; }
    public void   setNombre(String n)       { this.nombre = n; }

    public String getEquipo()               { return equipo; }
    public void   setEquipo(String e)       { this.equipo = e; }

    public String getPosicion()             { return posicion; }
    public void   setPosicion(String p)     { this.posicion = p; }

    public int    getEdad()                 { return edad; }
    public void   setEdad(int e)            { this.edad = e; }

    public String getNacionalidad()         { return nacionalidad; }
    public void   setNacionalidad(String n) { this.nacionalidad = n; }

    public int    getGoles()                { return goles; }
    public void   setGoles(int g)           { this.goles = g; }

    public int    getAsistencias()          { return asistencias; }
    public void   setAsistencias(int a)     { this.asistencias = a; }

    public int    getPartidosJugados()      { return partidosJugados; }
    public void   setPartidosJugados(int p) { this.partidosJugados = p; }

    public double getPromedioPases()        { return promedioPases; }
    public void   setPromedioPases(double p){ this.promedioPases = p; }

    @Override
    public String toString() {
        return nombre + " | " + equipo + " | " + posicion +
                " | Goles: " + goles + " | Asistencias: " + asistencias;
    }
}