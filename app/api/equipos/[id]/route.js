import mysql from 'mysql2/promise';

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'futbol_db'
        });

        const [rows] = await connection.execute(
            'SELECT * FROM equipos WHERE id = ?',
            [id]
        );
        await connection.end();

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Equipo no encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(rows[0]), {
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