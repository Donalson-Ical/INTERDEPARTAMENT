package org.rodrodrod.modelo;

/*
 * @Nombre  Rodrigo Andres Yalibat Del Cid
 * @Carnet  0902 24 8046
 * @Curso   Programacion III
 */

public class EventoPartido {

    // tipos de eventos posibles en un partido
    public static final String GOL              = "GOL";
    public static final String GOL_PROPIA       = "GOL EN PROPIA";
    public static final String TARJETA_AMARILLA = "TARJETA AMARILLA";
    public static final String TARJETA_ROJA     = "TARJETA ROJA";
    public static final String SUSTITUCION      = "SUSTITUCION";

    // atributos del evento
    private String tipo;                                            // tipo de evento
    private String minuto;                                          // minuto en que ocurrio
    private String jugador;                                         // jugador involucrado
    private String equipo;                                          // equipo al que pertenece
    private String descripcion;                                     // descripcion adicional

    // constructor vacio
    public EventoPartido() {}

    // constructor completo
    public EventoPartido(String tipo, String minuto, String jugador,
                         String equipo, String descripcion) {
        this.tipo        = tipo;
        this.minuto      = minuto;
        this.jugador     = jugador;
        this.equipo      = equipo;
        this.descripcion = descripcion;
    }

    // getters y setters
    public String getTipo()                  { return tipo; }
    public void   setTipo(String t)          { this.tipo = t; }

    public String getMinuto()                { return minuto; }
    public void   setMinuto(String m)        { this.minuto = m; }

    public String getJugador()               { return jugador; }
    public void   setJugador(String j)       { this.jugador = j; }

    public String getEquipo()                { return equipo; }
    public void   setEquipo(String e)        { this.equipo = e; }

    public String getDescripcion()           { return descripcion; }
    public void   setDescripcion(String d)   { this.descripcion = d; }

    @Override
    public String toString() {
        return "[" + minuto + "'] " + tipo + " - " + jugador + " (" + equipo + ")";
    }
}