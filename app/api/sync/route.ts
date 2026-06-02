import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export async function GET() {
  const connection = await mysql.createConnection(dbConfig)

  try {
    // 1. Obtener goleadores de La Liga desde la API
    const res = await fetch(
      'https://api.football-data.org/v4/competitions/PD/scorers?limit=20',
      { headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! } }
    )
    const data = await res.json()
    const scorers = data.scorers

    for (const item of scorers) {
      const jugador = item.player
      const equipo = item.team
      const stats = item

      // 2. Insertar o actualizar equipo
      await connection.execute(
        `INSERT INTO equipos (id, nombre, pais) 
         VALUES (?, ?, ?) 
         ON DUPLICATE KEY UPDATE nombre=VALUES(nombre)`,
        [equipo.id, equipo.name, equipo.area?.name || 'Desconocido']
      )

      // 3. Insertar o actualizar jugador
      await connection.execute(
        `INSERT INTO jugadores (id, nombre, posicion, nacionalidad, id_equipo) 
         VALUES (?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), id_equipo=VALUES(id_equipo)`,
        [
          jugador.id,
          jugador.name,
          jugador.position || 'Desconocido',
          jugador.nationality || 'Desconocido',
          equipo.id
        ]
      )

      // 4. Insertar o actualizar estadisticas
      await connection.execute(
        `INSERT INTO estadisticas (id_jugador, goles, asistencias, partidos_jugados) 
         VALUES (?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE 
         goles=VALUES(goles), 
         asistencias=VALUES(asistencias), 
         partidos_jugados=VALUES(partidos_jugados)`,
        [
          jugador.id,
          stats.goals || 0,
          stats.assists || 0,
          stats.playedMatches || 0
        ]
      )
    }

    await connection.end()
    return NextResponse.json({ 
      mensaje: 'Datos sincronizados correctamente',
      jugadores: scorers.length 
    })

  } catch (error) {
    await connection.end()
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
