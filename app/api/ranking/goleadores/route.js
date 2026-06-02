import mysql from 'mysql2/promise';

export async function GET() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'futbol_db'
        });

        const [rows] = await connection.execute(`
            SELECT 
                j.nombre AS jugador,
                j.posicion,
                e.goles,
                eq.nombre AS equipo
            FROM estadisticas e
            INNER JOIN jugadores j ON e.id_jugador = j.id
            INNER JOIN equipos eq ON j.id_equipo = eq.id
            ORDER BY e.goles DESC
            LIMIT 5;
        `);

        await connection.end();

        return new Response(JSON.stringify(rows, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}